from ecies import PrivateKey

class Keys:
    def __init__(self, key_file):
        self.private_key =  self.__read_private_key(key_file)

    def __read_private_key(self, key_path):
        with open("./keys/private.ec.key", "rb") as f:
            key = PrivateKey.from_pem(bytearray(f.read()))
        return key

keys = Keys('./keys/private.ec.key')
