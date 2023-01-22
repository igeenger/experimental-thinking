# Experimental thinking
Research project (psychology)
https://experimental-thinking.deno.dev/

## Get started

Note for Windows users: you must have "PowerShell" installed.

### Install Node.js (16.x)
https://nodejs.org/

### Create copy of google sheet
https://docs.google.com/spreadsheets/d/1EKvg5yBy6wPRcPd5WbhioC7MSPSeF__QUiqpqfx4x2c

Example:
https://www.youtube.com/watch?v=jrONswo9yPE?t=45s
0:45 - 1:15

### Get google api credentials for your spreadsheet
Example:
https://www.youtube.com/watch?v=PFJNJQCU_lo&t=30s
0:30 - 4:30

### Create "config.json" file in the "server" folder (or copy json in the "config" env value)
Format:
```typescript
type Config = {
  secret: string // your any password
  spreadsheet: {
    id: string // your spreadsheet (document) id

    // your spreadsheet credentials
    credentials: {
      type: string
      project_id: string
      private_key_id: string
      private_key: string
      client_email: string
      client_id: string
      auth_uri: string
      token_uri: string
      auth_provider_x509_cert_url: string
      client_x509_cert_url: string
    }
  }
  proxy?: boolean // if you use proxy, set true
}
```
Example:
```json
{
  "secret": "qwerty;)",
  "spreadsheet": {
    "id": "1EKvg5yBy6wPRcPd5WbhioC7MSPSeF__QUiqpqfx4x2c",
    "credentials": {
      "type": "service_account", 
      "project_id": "...",
      "private_key_id": "...",
      "private_key": "...",
      "client_email": "...",
      "client_id": "...",
      "auth_uri": "...",
      "token_uri": "...",
      "auth_provider_x509_cert_url": "...",
      "client_x509_cert_url": "..."
    }
  }
}
```

### Deploy app on your server
Clone:
```bash
git clone https://github.com/wizard-today/experimental-thinking
cd ./experimental-thinking
```
Build:
```bash
./build.bash
```
Start:
```bash
./start.bash
```
