from eth_account.messages import encode_defunct
from web3 import Web3
from typing import Optional, Tuple, Dict, List
import os
from datetime import datetime, timedelta
import jwt
import json

# Initialize Web3
w3 = Web3()

# Secret key for JWT
SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'your-secret-key-here')  # Change this in production

# In-memory database for ownership records (replace with a real database in production)
ownership_db: Dict[str, List[str]] = {}

def generate_nonce() -> str:
    """Generate a random nonce for wallet verification."""
    return os.urandom(32).hex()

def verify_signature(message: str, signature: str, address: str) -> bool:
    """Verify the signature of a message."""
    try:
        message_hash = encode_defunct(text=message)
        recovered_address = w3.eth.account.recover_message(message_hash, signature=signature)
        return recovered_address.lower() == address.lower()
    except Exception:
        return False

def create_auth_token(address: str) -> str:
    """Create a JWT token for the authenticated wallet."""
    payload = {
        'address': address,
        'exp': datetime.utcnow() + timedelta(days=1)  # Token expires in 1 day
    }
    return jwt.encode(payload, SECRET_KEY, algorithm='HS256')

def verify_auth_token(token: str) -> Optional[str]:
    """Verify the JWT token and return the wallet address if valid."""
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        return payload['address']
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None

def verify_wallet_ownership(address: str, signature: str, nonce: str) -> Tuple[bool, Optional[str]]:
    """
    Verify wallet ownership and return a tuple of (is_valid, token).
    If verification fails, token will be None.
    """
    message = f"Sign this message to verify your wallet ownership. Nonce: {nonce}"
    
    if verify_signature(message, signature, address):
        token = create_auth_token(address)
        return True, token
    return False, None

def register_ownership(owner_address: str, asset_id: str) -> bool:
    """
    Register ownership of an asset to a wallet address.
    Returns True if registration was successful.
    """
    if owner_address not in ownership_db:
        ownership_db[owner_address] = []
    
    if asset_id not in ownership_db[owner_address]:
        ownership_db[owner_address].append(asset_id)
    
    return True

def transfer_ownership(current_owner: str, new_owner: str, asset_id: str, 
                      current_owner_signature: str, new_owner_signature: str) -> bool:
    """
    Transfer ownership of an asset from one wallet to another.
    Both the current owner and new owner must sign to approve the transfer.
    Returns True if transfer was successful.
    """
    # Verify current owner actually owns the asset
    if current_owner not in ownership_db or asset_id not in ownership_db[current_owner]:
        return False
    
    # Verify both signatures
    current_owner_message = f"I authorize the transfer of asset {asset_id} to {new_owner}"
    new_owner_message = f"I accept ownership of asset {asset_id} from {current_owner}"
    
    if not verify_signature(current_owner_message, current_owner_signature, current_owner):
        return False
    
    if not verify_signature(new_owner_message, new_owner_signature, new_owner):
        return False
    
    # Transfer ownership
    ownership_db[current_owner].remove(asset_id)
    if new_owner not in ownership_db:
        ownership_db[new_owner] = []
    ownership_db[new_owner].append(asset_id)
    
    return True

def get_owned_assets(owner_address: str) -> List[str]:
    """
    Get all assets owned by a wallet address.
    """
    return ownership_db.get(owner_address, []) 