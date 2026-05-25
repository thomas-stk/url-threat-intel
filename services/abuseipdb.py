import httpx
import logging
from fastapi import HTTPException
from core.config import ABUSE_KEY

logger = logging.getLogger(__name__)

async def check_abuseipdb(ip: str) -> dict:
    url = "https://api.abuseipdb.com/api/v2/check"
    headers = {
        "Key": ABUSE_KEY,
        "Accept": "application/json"
    }
    params = {"ipAddress": ip, "maxAgeInDays": 90}
    try: 
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.get(url, headers=headers, params=params)
            # Raise an exception for HTTP errors
            response.raise_for_status()  
            logger.info(f"AbuseIPDB response for {ip}: {response.status_code}")
            return response.json()
            
    except httpx.TimeoutException:
        raise HTTPException(status_code=504, detail="AbuseIPDB API request timed out")
    except httpx.HTTPStatusError as e:
        raise HTTPException(status_code=502, detail=f"AbuseIPDB error: {e.response.status_code} - {e.response.text}")    
    