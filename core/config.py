from dotenv import load_dotenv
import os

load_dotenv()

VT_KEY = os.getenv("VIRUSTOTAL_API_KEY")
ABUSE_KEY = os.getenv("ABUSEIPDB_API_KEY")