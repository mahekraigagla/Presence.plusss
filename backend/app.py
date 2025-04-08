from flask import Flask, request, jsonify
from pymongo import MongoClient
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)

# MongoDB connection
client = MongoClient(os.getenv("MONGO_URI"))
db = client['presence']

# Middleware to validate API keys
@app.before_request
def validate_api_key():
    if request.endpoint != 'generate_api_key':
        api_key = request.headers.get('x-api-key')
        if not api_key or not db.api_keys.find_one({"key": api_key}):
            return jsonify({"error": "Invalid or missing API key"}), 401

# Route to generate API keys
@app.route('/generate-api-key', methods=['POST'])
def generate_api_key():
    key = os.urandom(24).hex()
    db.api_keys.insert_one({"key": key})
    return jsonify({"api_key": key})

# Example protected route
@app.route('/protected', methods=['GET'])
def protected():
    return jsonify({"message": "You have access to this route!"})

if __name__ == '__main__':
    app.run(port=int(os.getenv("PORT", 5000)), debug=True)
