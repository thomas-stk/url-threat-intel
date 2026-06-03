from fastapi import APIRouter, Request, HTTPException
from slowapi import Limiter
from slowapi.util import get_remote_address
from services.abuseipdb import check_abuseipdb
from services.virustotal import check_virustotal_url
from services.virustotal import check_virustotal_ip
from pydantic import IPvAnyAddress, AnyHttpUrl
import asyncio

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

def is_ip(target: str) -> bool:
    try:
        IPvAnyAddress(target)
        return True
    except Exception:
        return False

@router.get("/analyze")
@limiter.limit("5/minute")
async def analyze(request: Request, target: str) -> dict:
    try:
        if is_ip(target):
            results = await asyncio.gather(
                check_abuseipdb(target),
                check_virustotal_ip(target)
            )
            return {
                "target": target,
                "type": "ip",
                "results": {
                    "abuseipdb": results[0],
                    "virustotal": results[1]
                }
            }
        else:
            result = await check_virustotal_url(target)
            return {
                "target": target,
                "type": "url",
                "results": {
                    "virustotal": result
                }
            }
    except Exception:
        raise HTTPException(status_code=400, detail="Target must be a valid IP address or URL")
