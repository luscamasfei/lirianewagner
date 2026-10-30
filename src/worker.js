// Porta de entrada do site no Cloudflare: redireciona www e http para o endereço oficial
// e entrega os arquivos estáticos de dist/ (binding ASSETS).
const CANONICAL_HOST = "lirianewagner.com.br";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const isProduction = url.hostname === CANONICAL_HOST || url.hostname === `www.${CANONICAL_HOST}`;

    if (isProduction && (url.hostname !== CANONICAL_HOST || url.protocol === "http:")) {
      url.hostname = CANONICAL_HOST;
      url.protocol = "https:";
      return Response.redirect(url.toString(), 301);
    }

    return env.ASSETS.fetch(request);
  },
};
