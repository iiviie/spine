from eth_account.messages import encode_defunct
from web3 import Web3
from typing import Optional, Tuple
import os
from datetime import datetime, timedelta
import jwt

# Initialize Web3
w3 = Web3()

# Secret key for JWT
SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'your-secret-key-here')  # Change this in production

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