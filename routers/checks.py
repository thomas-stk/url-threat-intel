from fastapi import APIRouter, Request
from slowapi import Limiter
from slowapi.util import get_remote_address
from services.abuseipdb import check_abuseipdb
from services.virustotal import check_virustotal_url
from pydantic import IPvAnyAddress, AnyHttpUrl


limiter = Limiter(key_func=get_remote_address)
router = APIRouter()

@router.get("/check/ip")
@limiter.limit("10/minute")
async def check_ip(request: Request, ip: IPvAnyAddress):
    result = await check_abuseipdb(str(ip))
    return result

@router.get("/check/url")
@limiter.limit("10/minute")
async def check_url(request: Request, url: AnyHttpUrl):
    result = await check_virustotal_url(str(url))
    return result   

