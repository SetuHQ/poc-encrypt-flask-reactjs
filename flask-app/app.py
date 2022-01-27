from crypt import methods
from email import header
import imp
from flask import Flask, request, send_from_directory
import uuid
from Crypto.PublicKey import ECC



def create_app():
    app = Flask(__name__)

    @app.route("/hello")
    def hello():
        return {'message': 'Hello Stranger!'}

    @app.route("/pubkey")
    def pub_key():
        with open('keys/public.pem') as f:
            keys = ECC.import_key(f.read())
        return keys.export_key(
            format='PEM'            
        )

    @app.route('/data', methods=['POST'])
    def get_data():
        req = request.json
        print(f"response: {req}")
        return {
            'id': uuid.uuid4(),
            'name': 'John Doe',
            'age': req['age'],
            'msg': req['message']
        }

    @app.after_request
    def enable_cors(response):
        header = response.headers
        header['Access-Control-Allow-Origin'] = '*'
        header['Access-Control-Allow-Headers'] = '*'        
        return response

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(host='0.0.0.0')