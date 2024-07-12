from flask import Flask
from flask_sslify import SSLify
import os

app = Flask(__name__)

# Use SSLify to enforce HTTPS
print(os.urandom(24).hex())
sslify = SSLify(app)

if __name__ == "__main__":
    app.run(ssl_context=("cert.pem", "key.pem"))
