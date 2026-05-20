from fastapi import FastAPI

app = FastAPI(title="Threat Intel API", version="1.0.0")

@app.get("/")
async def root():
    return {"message": "Threat Intel APi is running"}

@app.get("/heath")
async def health():
    return {"status": "ok"}