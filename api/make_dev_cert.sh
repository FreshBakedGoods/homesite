#!/bin/bash

openssl genrsa -out key.pem
openssl req -new -key key.pem -out csr.pem -subj "/C=CA/ST=Solid/L=HERE/O=None/CN=localhost"
openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem
