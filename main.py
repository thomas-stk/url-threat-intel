from fastapi import FastAPI
from fastapi.responses import JSONResponse
from slowapi import Limiter
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from routers.checks import router
import logging

logging.basicConfig(level=logging.INFO)

limiter = Limiter(key_func=get_remote_address)

app = FastAPI(title="Threat Intel API", version="1.0.0")
app.state.limiter = limiter

@app.exception_handler(RateLimitExceeded)
async def rate_limit_handler(request, exc):
    return JSONResponse(
        status_code=429,
        content={"error": "Rate limit exceeded. Please try again later."}
    )

@app.get("/")
async def root():
    return {"message": "Threat Intel API is running"}

@app.get("/health")
async def health():
    return {"status": "ok"}

app.include_router(router)