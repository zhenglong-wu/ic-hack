from flask import Flask, request
import main   

app = Flask(__name__)    

@app.route('/api/v1/sample', methods=['GET'])
def get_data():
    dept = request.args.get('param1')
    dest = request.args.get('param2')   
    return main(dept, dest)

if __name__ == '__main__':
    app.run(debug=True, port=5000) 