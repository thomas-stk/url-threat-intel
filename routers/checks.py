from fastapi import APIRouter, Request
from slowapi import Limiter
from slowapi.util import get_remote_address
from services.abuseipdb import check_abuseipdb
from services.virustotal import check_virustotal_url


limiter = Limiter(key_func=get_remote_address)
router = APIRouter()

@router.get("/check/ip")
@limiter.limit("10/minute")
async def check_ip(request: Request, ip: str):
    result = await check_abuseipdb(ip)
    return result  

@router.get("/check/url")
@limiter.limit("10/minute")
async def check_url(request: Request, url: str):
    result = await check_virustotal_url(url)
    return result   

