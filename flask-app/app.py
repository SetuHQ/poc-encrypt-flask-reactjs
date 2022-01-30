from crypt import methods
from email import header
import imp
import json
from flask import Flask, request
import uuid
from ecies import PrivateKey, decrypt
import codecs
import base64



def create_app():
    app = Flask(__name__)

    @app.route("/hello")
    def hello():
        return {'message': 'Hello Stranger!'}

    @app.route("/pubkey")
    def pub_key():
        p_key_b64 = ''
        with open("./keys/private.ec.key", "rb") as f:
            s_key = PrivateKey.from_pem(bytearray(f.read()))
            p_key_hex = ''.join('{:02x}'.format(x) for x in s_key.public_key.format(True))
            p_key_b64 = codecs.encode(codecs.decode(p_key_hex, 'hex'), 'base64').decode()
        return p_key_b64


    @app.route('/data', methods=['POST'])
    def post_data():
        req = request.json
        print(f"data: {req['data']}")
        with open("./keys/private.ec.key", "rb") as f:
            key = PrivateKey.from_pem(bytearray(f.read()))
            data = base64.b64decode(req['data'].encode('ascii'))
            req_str = decrypt(key.secret, data).decode('utf-8')
            req = json.loads(req_str)
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