# Liriane Wagner · Arquitetura e Interiores

Portfólio digital da **arquiteta e urbanista Liriane Wagner**, de **Passo Fundo (RS)**.

**Site no ar:** [lirianewagner.com.br](https://lirianewagner.com.br)

O site apresenta os projetos de arquitetura e interiores da arquiteta e leva o visitante a pedir orçamento pelo WhatsApp. A proposta foi trocar uma página de links por um portfólio com cara de estúdio de arquitetura, com abertura em tela cheia, projetos contados como capítulos e plantas ao lado dos renders.

## O que tem no site

- **Página inicial:** abertura em tela cheia, projetos selecionados, serviços, apresentação da arquiteta, processo de trabalho e contato.
- **Uma página por projeto,** com ficha técnica, conceito, desafio, soluções, materiais, galeria e desenhos técnicos. Cada página tem endereço próprio, para compartilhar e aparecer no Google.
- **Contato pelo WhatsApp** com mensagens prontas para cada situação. Um formulário opcional de pré-orçamento organiza as respostas em uma mensagem, sem guardar dados no site.
- **Galeria ampliada** navegável por teclado e por toque.
- **Projetos identificados com honestidade:** cada um informa se é acadêmico ou profissional.
- **Acessibilidade:** navegação por teclado, foco visível, contraste revisado e respeito à preferência do sistema por menos animação.
- **Desempenho:** imagens responsivas em WebP e JPEG, carregamento sob demanda e fontes hospedadas no próprio site.
- **SEO:** títulos e descrições por página, dados estruturados (schema.org), sitemap, robots.txt e imagens de compartilhamento.

## Como funciona

É um site estático, **sem framework e sem dependências** instaladas via npm. Scripts em Node.js geram o HTML a partir de arquivos de dados:

```
src/data/site.mjs        contato, redes sociais, mensagens do WhatsApp e navegação
src/data/projects.mjs    projetos: textos, ficha técnica, galeria e desenhos
src/data/services.mjs    serviços e etapas do processo
src/data/images.json     dimensões das imagens (gerado por scripts/images.mjs)
src/templates/           layout, página inicial e página de projeto
src/assets/              CSS, JavaScript, fontes, logo e favicon
src/img/                 imagens dos projetos em vários tamanhos
src/worker.js            redirecionamentos (www e http → https) no Cloudflare
scripts/build.mjs        gera o site em dist/, com sitemap e robots.txt
scripts/check.mjs        verifica links, imagens, textos alternativos e links do WhatsApp
scripts/images.mjs       gera os recortes das imagens a partir dos originais
scripts/serve.mjs        servidor local para visualizar o site
```

## Rodando localmente

Requer **Node.js 18 ou mais recente**.

```bash
npm run dev      # gera o site e abre em http://localhost:4173
npm run check    # gera o site e roda as verificações
```

Para usar outra porta: `PORT=4391 npm run dev`.

As imagens prontas já estão em `src/img/`. O script `npm run images` só é necessário para gerar recortes novos: ele precisa do [libvips](https://www.libvips.org/) e dos arquivos originais em alta resolução, que não estão no repositório.

## Publicação

O site está hospedado no **Cloudflare** (Workers Static Assets), com o domínio `lirianewagner.com.br`.

```bash
npm run deploy   # gera o site, roda as verificações e publica (wrangler deploy)
```

O domínio e a pasta publicada ficam em `wrangler.toml`. O `vercel.json` mantém o endereço antigo de aprovação (`lirianewagner.vercel.app`) redirecionando para o domínio definitivo.

Para um build sem domínio, por exemplo em outra hospedagem de teste, use `SITE_URL= npm run build`. Isso omite o sitemap e as URLs canônicas.

## Adicionar um projeto

1. Adicione os recortes das imagens em `CROPS` (`scripts/images.mjs`) e rode `npm run images`.
2. Cadastre o projeto em `src/data/projects.mjs`.
3. Inclua o projeto na seleção da página inicial em `projectsSection()` (`src/templates/home.mjs`).
4. Rode `npm run check` antes de publicar.

## Uso de inteligência artificial

O projeto foi desenvolvido com o apoio do **Claude Opus 5.5**, modelo de IA da Anthropic. Ele foi usado na escrita do código, na direção visual, no tratamento das imagens e nas revisões de design e acessibilidade. A curadoria do conteúdo, as decisões de projeto e a validação das informações com a cliente foram feitas pelo autor do site.

## Conteúdo e direitos

O **código** deste repositório pode servir de referência.

O **conteúdo** é de **Liriane Wagner** e **não está licenciado para reutilização**:
- logo;
- imagens, renders e desenhos técnicos dos projetos;
- textos e retrato.

Os projetos acadêmicos foram desenvolvidos na Atitus Educação e estão identificados como tal no site. As imagens de empreendimentos da Oblíqua Construtora aparecem com a participação da arquiteta descrita em cada projeto.
