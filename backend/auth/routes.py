from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import Optional
from .wallet import generate_nonce, verify_wallet_ownership, verify_auth_token

router = APIRouter()

class WalletVerificationRequest(BaseModel):
    address: str
    signature: str
    nonce: str

class NonceResponse(BaseModel):
    nonce: str

class VerificationResponse(BaseModel):
    token: str
    address: str

@router.get("/nonce", response_model=NonceResponse)
async def get_nonce():
    """Get a nonce for wallet verification."""
    return {"nonce": generate_nonce()}

@router.post("/verify", response_model=VerificationResponse)
async def verify_wallet(request: WalletVerificationRequest):
    """Verify wallet ownership and return an auth token."""
    is_valid, token = verify_wallet_ownership(
        request.address,
        request.signature,
        request.nonce
    )
    
    if not is_valid:
        raise HTTPException(status_code=401, detail="Invalid signature")
    
    return {
        "token": token,
        "address": request.address
    }

def get_current_wallet(token: str = Depends(lambda x: x.headers.get("Authorization", "").replace("Bearer ", ""))):
    """Dependency to get the current wallet address from the token."""
    address = verify_auth_token(token)
    if not address:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    return address 