import httpx
import base64
import logging
from fastapi import HTTPException
from core.config import VT_KEY

logger = logging.getLogger(__name__)

# Encodes the URL in base64 format as required by VirusTotal API
def encode_url(target_url: str) -> str:
    return base64.urlsafe_b64encode(target_url.encode()).decode().strip("=")

async def check_virustotal_url(target_url: str) -> dict:
    url_id = encode_url(target_url)
    endpoint = f"https://www.virustotal.com/api/v3/urls/{url_id}"
    headers = {
        "x-apikey": VT_KEY,
        "Accept": "application/json"
    }
    try: 
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.get(endpoint, headers=headers)
            response.raise_for_status()
            logger.info(f"VirusTotal response for {target_url}: {response.status_code}")
            return response.json()
    except httpx.TimeoutException:
        raise HTTPException(status_code=504, detail="VirusTotal API request timed out")
    except httpx.HTTPStatusError as e:
        raise HTTPException(status_code=502, detail=f"VirusTotal error: {e.response.status_code} - {e.response.text}")