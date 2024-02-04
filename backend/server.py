from flask import Flask, jsonify, request
from main import main
from graph_hopper_manager import get_route
app = Flask(__name__)

@app.route('/')
def home():
    return "Welcome to the Flask API Server!"

@app.route('/api/post/', methods=['POST'])
def post():
    print("POST")
    try:
        # handling a POST request with JSON data
        data = request.json
        print("Data in is: " + data)
        if data is None:
            return jsonify({"error": "Bad Request", "message": "Missing or invalid data"}), 400
        print("Returning:")
        dat = main(data['from'], data['to'])
        print(dat)
        return dat

    except Exception as e:
        # Log the exception for debugging
        app.logger.error(f"Error: {e}")
        return jsonify({"error": "Internal Server Error", "message": str(e)}), 500

@app.route('/api/get/', methods=['GET'])
def get():
    print("GET")
    try:
        # handling a GET request with query parameters
        from_param = [float(request.args.get('fromLong')), float(request.args.get('fromLat'))]
        to_param = [float(request.args.get('toLong')), float(request.args.get('toLat'))]

        print(f"Data in is: from={from_param}, to={to_param}")

        if not from_param or not to_param:
            return jsonify({"error": "Bad Request", "message": "Missing or invalid parameters"}), 400

        print("Returning:")
        dat = main(from_param, to_param)
        print(dat)
        return dat

    except Exception as e:
        # Log the exception for debugging
        app.logger.error(f"Error: {e}")
        return jsonify({"error": "Internal Server Error", "message": str(e)}), 500
    
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)