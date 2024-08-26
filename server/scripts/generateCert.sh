mkdir -p /app/cert

openssl req -nodes -new -x509 \
    -keyout /app/cert/server.key \
    -out /app/cert/server.cert \
    -subj "/C=IN/ST=State/L=City/O=company/OU=Com/CN=www.telavergecommunication.com"
