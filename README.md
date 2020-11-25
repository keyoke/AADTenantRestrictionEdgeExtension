# AADTenantRestrictionEdgeExtension
Enforce Azure Active Directory Tenant Restrictions Leveraging Edge Extensions

Generate Private Key
openssl genrsa 2048 | openssl pkcs8 -topk8 -nocrypt -out key.pem

Generate Public Key
openssl rsa -in key.pem -pubout -outform DER | openssl base64 -A

Get the Mirosoft Edge(Chromium) Extension ID:
openssl rsa -in key.pem -pubout -outform DER | shasum -a 256 | head -c32 | tr 0-9a-f a-p
