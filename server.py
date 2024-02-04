from flask import Flask, jsonify, request
from lambda_function import lambda_handler
app = Flask(__name__)

@app.route('/')
def home():
    return "Welcome to the Flask API Server!"

@app.route('/api/post/', methods=['POST'])
def post():
    print("some shjit")
    try:
        # handling a POST request with JSON data
        data = request.json
        if data is None:
            return jsonify({"error": "Bad Request", "message": "Missing or invalid data"}), 400
        return lambda_handler(data['d'], None)
    except Exception as e:
        # Log the exception for debugging
        app.logger.error(f"Error: {e}")
        return jsonify({"error": "Internal Server Error", "message": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)