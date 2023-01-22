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

const parseEnv = (): Config => {
  try {
    return JSON.parse(process.env.config!)
  } 
  catch {
    try {
      return require(require('path').resolve(process.cwd(), 'config.json'))
    } catch {
      throw 'Config not found!'
    }
  }
}

export const config = {
  env: parseEnv(),
  static: {
    errorsFile: 'errors.log',
    spreadsheets: {
      users: 'Участники',
      results: 'Результаты',
    }
  },
}
