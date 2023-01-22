import { serve } from 'https://deno.land/std/http/mod.ts'

const proxyURL = Deno.env.get('proxy')
const secret = Deno.env.get('secret')

if (!proxyURL || !secret) {
  throw 'Set "proxy" and "secret" environment variables'
}

function headers(requestHeaders, newHeaders) {
  const headers = new Headers()

  for (const [name, value] of requestHeaders) {
    headers.append(name, value)
  }

  for (const name in newHeaders) {
    headers.append(name, newHeaders[name])
  }

  return headers
}

serve(async (request, connection) => {
  const { pathname, search } = new URL(request.url)
  const url = proxyURL + pathname + search
  const proxyRespose = await fetch(new Request(url, {
    method: request.method,
    body: request.body,
    headers: headers(request.headers, {
      ip: connection.remoteAddr.hostname,
      secret: secret,
    }),
  }))
  return new Response(proxyRespose.body, {
    status: proxyRespose.status,
    headers: proxyRespose.headers,
  })
})
