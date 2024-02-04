from flask import Flask, request
import main   
from w3w_manager import convert_w3w

app = Flask(__name__)    

@app.route('/api/v1/sample', methods=['GET'])
def get_data():
    dept = request.args.get('param1')
    dest = request.args.get('param2')   
    return main(dept, dest)


@app.route('api/v1/w3w', method=['GET'])
def get_w3w():
    long = request.args.get('param1')
    lat = request.get('param2')
    return convert_w3w(long=long, lat=lat)


if __name__ == '__main__':
    app.run(debug=True, port=5000) 