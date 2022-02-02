from ecies.utils import generate_key

if __name__ == '__main__':
    private_key = generate_key()
    with open('./keys/private.ec.key', 'wb') as f:
        print(f"Creating new private key...")
        f.write(private_key.to_pem())
