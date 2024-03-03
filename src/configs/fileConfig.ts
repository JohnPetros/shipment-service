import path from 'node:path'

export const fileConfig = {
  FOLDERS: {
    TMP: path.resolve(__dirname, '..', '..', '.tmp'),
    CERTIFICATES: path.resolve(__dirname, '..', '..', 'certificates'),
  },
  FILES: {
    SSL_KEY: 'ssl.key.pem',
    SSL_CRT: 'ssl.crt.pem',
    SSL_CSR: 'ssl.csr.pem',
  }
}
