// Projetos e textos baseados no Portfólio 2025 de Liriane Wagner (Behance).
// "context" deixa explícito se o projeto é profissional ou acadêmico.
// Imagens: nomes gerados por scripts/images.mjs (ver src/data/images.json).
// kind: "render" (imagem realista) | "desenho" (desenho técnico, exibido sobre fundo claro)
// span: "full" | "wide" | "half" | "tall" | "third" — define a composição da galeria.

export const projects = [
  {
    slug: "apartamento-caju",
    title: "Apartamento Caju",
    category: "Interiores",
    kicker: "Interiores residenciais",
    context: "Projeto profissional",
    contextDetail: "Desenvolvido para a Oblíqua Construtora",
    client: "Oblíqua Construtora",
    year: 2025,
    location: "Passo Fundo, RS",
    tools: ["SketchUp", "V-Ray", "Layout", "Photoshop"],
    theme: "ivory",
    cover: "caju-panorama",
    hero: "caju-panorama",
    homeImages: ["caju-panorama", "caju-vertical", "caju-estar"],
    summary:
      "Estar, jantar e cozinha integrados por painéis de madeira, marcenaria sob medida e iluminação linear.",
    concept:
      "O projeto de interiores do Apartamento Caju integra os espaços de forma fluida. Revestimentos neutros, painéis em madeira e móveis sob medida constroem uma base serena, enquanto a iluminação destaca os pontos-chave do apartamento.",
    challenge:
      "Criar um ambiente moderno, funcional e acolhedor em uma planta integrada, onde estar, jantar e cozinha dividem a mesma luz e precisam conversar entre si.",
    solutions: [
      "Integração fluida entre estar, jantar e cozinha, com continuidade de materiais.",
      "Móveis sob medida que organizam o armazenamento e definem cada área sem paredes.",
      "Forro e painéis em madeira para aquecer a paleta neutra.",
      "Iluminação estratégica, com perfis lineares e pendentes sobre a mesa de jantar.",
      "Imagens realistas para representar o conceito com precisão e orientar a execução.",
    ],
    materials: ["Painéis e forro em madeira", "Revestimentos em tons neutros", "Marcenaria sob medida", "Pedra escura na lareira", "Perfis de LED lineares"],
    gallery: [
      { img: "caju-panorama", span: "full", kind: "render", alt: "Estar e jantar integrados do Apartamento Caju, com painéis de madeira, mesa escura e cozinha ao fundo", caption: "Estar, jantar e cozinha integrados" },
      { img: "caju-cozinha", span: "half", kind: "render", alt: "Mesa de jantar com cadeiras estofadas em frente à cozinha com ilha e janelas para a cidade", caption: "Jantar e cozinha voltados para a vista" },
      { img: "caju-estar", span: "half", kind: "render", alt: "Sala de estar com sofá claro, forro em madeira, quadros em linha e painel de madeira", caption: "Estar com forro e painel em madeira" },
      { img: "caju-vertical", span: "tall", kind: "render", alt: "Vista vertical da sala de jantar com pendentes pretos sob forro de madeira e grandes janelas", caption: "Pendentes e forro em madeira sobre o jantar" },
    ],
    drawings: [],
  },
  {
    slug: "a-casa",
    title: "A Casa",
    category: "Arquitetura",
    kicker: "Residência unifamiliar",
    context: "Projeto acadêmico",
    contextDetail: "Ateliê de Projeto II: A Casa",
    advisors: "Arq. Me. Júnior Américo Dal'Conte Júnior e Arq. Dr. Dirceu Piccinato Júnior",
    year: 2020,
    location: "Bairro Annes, Passo Fundo, RS",
    area: "Terreno de 600 m²",
    tools: ["AutoCAD", "SketchUp", "Lumion", "Photoshop"],
    theme: "sand",
    cover: "casa-fachada",
    hero: "casa-fachada",
    homeImages: ["casa-fachada", "casa-plantas", "casa-vertical"],
    summary:
      "Uma casa de esquina com dois pavimentos: brises de madeira protegem os ambientes, e as áreas sociais se abrem para a piscina.",
    concept:
      "Implantada em um terreno de esquina entre a Rua Eduardo de Britto e a Rua Saldanha Marinho, a casa combina funcionalidade e elegância. Volumes horizontais em concreto, brises de madeira e muros de pedra compõem uma arquitetura contemporânea e acolhedora.",
    challenge:
      "Atender às necessidades de uma família contemporânea (home office, espaços versáteis, lazer) em um lote urbano de 600 m², garantindo privacidade em relação às duas ruas.",
    solutions: [
      "Amplos espaços integrados no térreo, abertos para a área externa e a piscina.",
      "Home office funcional e áreas versáteis, adaptáveis às mudanças na rotina dos moradores.",
      "Brises em madeira no pavimento superior para controlar a insolação e a privacidade.",
      "Iluminação planejada para valorizar volumes e criar uma atmosfera acolhedora.",
      "Cortes humanizados que facilitam a compreensão do espaço.",
    ],
    materials: ["Concreto armado", "Brises em madeira", "Muro em pedra natural", "Esquadrias em vidro", "Iluminação embutida em LED"],
    gallery: [
      { img: "casa-fachada", span: "full", kind: "render", alt: "Fachada da residência de dois pavimentos com brises de madeira, muros de pedra e garagem iluminada", caption: "Fachada principal" },
      { img: "casa-vertical", span: "tall", kind: "render", alt: "Recorte vertical da fachada com volume superior em balanço e garagem com iluminação linear", caption: "Volume superior em balanço" },
    ],
    drawings: [
      { img: "casa-plantas", span: "half", kind: "desenho", alt: "Plantas baixas do térreo e do pavimento superior com piscina, áreas sociais e suítes", caption: "Plantas baixas: térreo e pavimento superior" },
      { img: "casa-cortes", span: "full", kind: "desenho", alt: "Cortes humanizados da residência mostrando os dois pavimentos e a piscina", caption: "Cortes humanizados" },
    ],
  },
  {
    slug: "residencial-onix",
    title: "Residencial Ônix",
    category: "Interiores · Empreendimento",
    kicker: "Áreas sociais de empreendimento",
    context: "Participação em projeto profissional",
    contextDetail: "Oblíqua Construtora",
    client: "Oblíqua Construtora",
    role: "Interiores das áreas sociais, imagens realistas, plantas humanizadas, projeto executivo e projeto legal",
    year: 2025,
    location: "Passo Fundo, RS",
    tools: ["SketchUp", "V-Ray", "Layout", "Photoshop"],
    theme: "graphite",
    cover: "onix-fachada",
    hero: "onix-brinquedoteca",
    homeImages: ["onix-fachada", "onix-brinquedoteca", "onix-coworking"],
    summary:
      "Interiores de brinquedoteca, academia e coworking, com imagens realistas, plantas humanizadas e documentação do empreendimento.",
    concept:
      "No Residencial Ônix, Liriane desenvolveu os ambientes internos da área social com foco em sofisticação e funcionalidade: espaços integrados e acolhedores, com materiais modernos e acabamentos de alta qualidade.",
    challenge:
      "Transformar áreas comuns em espaços que os futuros moradores desejem usar, e representar o projeto com fidelidade para o material de vendas e para a obra.",
    solutions: [
      "Brinquedoteca lúdica, coworking e academia com identidades próprias dentro de uma linguagem comum.",
      "Imagens realistas utilizadas como material de venda do empreendimento.",
      "Plantas humanizadas para a compreensão do layout e da distribuição dos ambientes.",
      "Projeto executivo com especificações de materiais, acabamentos e soluções construtivas.",
      "Projeto legal em conformidade com as normas e regulamentações exigidas.",
    ],
    materials: ["Painéis em madeira", "Iluminação linear embutida", "Piso amadeirado", "Marcenaria sob medida", "Pintura e papéis de parede lúdicos"],
    gallery: [
      { img: "onix-fachada", span: "full", kind: "render", alt: "Fachada do Residencial Ônix com sacadas, jardins suspensos e muro em tijolo vazado", caption: "Residencial Ônix: imagem do empreendimento" },
      { img: "onix-brinquedoteca", span: "wide", kind: "render", alt: "Brinquedoteca com parede amarela, árvore em madeira, cabana, escorregador e piscina de bolinhas", caption: "Brinquedoteca" },
      { img: "onix-coworking", span: "third", kind: "render", alt: "Coworking com bancadas em madeira, cadeiras ergonômicas e prateleiras iluminadas", caption: "Coworking" },
      { img: "onix-academia", span: "full", kind: "render", alt: "Academia com esteiras, equipamentos de musculação, piso amadeirado e iluminação linear no teto", caption: "Academia" },
    ],
    drawings: [
      { img: "onix-plantas", span: "full", kind: "desenho", alt: "Plantas humanizadas do pavimento de áreas sociais e do pavimento tipo do Residencial Ônix", caption: "Plantas humanizadas: área social e pavimento tipo" },
      { img: "onix-executivo", span: "full", kind: "desenho", alt: "Pranchas do projeto executivo com plantas, cortes e fachadas do edifício", caption: "Projeto executivo e legal: plantas, cortes e fachadas" },
    ],
  },
  {
    slug: "consultorio-de-pediatria",
    title: "Consultório de Pediatria",
    category: "Interiores",
    kicker: "Interiores comerciais · Saúde",
    context: "Projeto acadêmico",
    contextDetail: "Ateliê de Arquitetura de Interiores",
    advisors: "Arq. Esp. Camila Ricci",
    year: 2021,
    location: "Passo Fundo, RS",
    area: "43,7 m² de ambientes",
    tools: ["SketchUp", "V-Ray", "Layout", "Photoshop"],
    theme: "mist",
    cover: "pediatria-render",
    hero: "pediatria-render",
    homeImages: ["pediatria-vertical", "pediatria-render", "pediatria-planta-humanizada"],
    summary:
      "Em 43,7 m², recepção, atendimento e exames ganham uma organização compacta, com espaço infantil e marcenaria detalhada.",
    concept:
      "A partir das necessidades específicas de um consultório pediátrico, o projeto prioriza conforto e segurança. O moodboard reuniu tons suaves e elementos lúdicos para criar um ambiente tranquilo e alegre, sem abrir mão da praticidade exigida pela rotina médica.",
    challenge:
      "Conciliar o rigor funcional de um espaço de saúde com uma atmosfera que acolha crianças e reduza a tensão das consultas, em uma área compacta.",
    solutions: [
      "Recepção acolhedora com espaço de espera infantil e mobiliário ergonômico.",
      "Sala de atendimento e sala de exames organizadas segundo as necessidades médicas.",
      "Marcenaria em MDF cinza-cristal e carvalho, com nichos para livros e brinquedos.",
      "Iluminação planejada para uma atmosfera agradável sem comprometer a funcionalidade.",
      "Plantas, cortes, elevações e detalhamentos de mobiliário no SketchUp Layout.",
    ],
    materials: ["MDF Cinza Cristal (Berneck)", "MDF Carvalho Malva (Duratex)", "MDF azul-céu (Berneck)", "Tinta acrílica Frescor de Chuva (Suvinil)", "Papel de parede Cidade Mágica"],
    gallery: [
      { img: "pediatria-render", span: "full", kind: "render", alt: "Sala de atendimento com mesa branca, estante com brinquedos, prateleiras iluminadas e trocador", caption: "Sala de atendimento" },
      { img: "pediatria-vertical", span: "tall", kind: "render", alt: "Espaço de espera infantil com papel de parede delicado, mesa redonda e bancos em formato de nuvem", caption: "Espaço de espera infantil" },
    ],
    drawings: [
      { img: "pediatria-planta-humanizada", span: "half", kind: "desenho", alt: "Planta humanizada do consultório com recepção, sala de atendimento, exames, lavabo e copa", caption: "Planta baixa humanizada: layout" },
      { img: "pediatria-planta-tecnica", span: "half", kind: "desenho", alt: "Planta baixa técnica do consultório com cotas e indicação do mobiliário", caption: "Planta baixa técnica: layout" },
      { img: "pediatria-mobiliario", span: "wide", kind: "desenho", alt: "Planta técnica da sala de atendimento com marcenaria cotada e legenda de materiais", caption: "Planta técnica: mobiliário" },
      { img: "pediatria-vista", span: "wide", kind: "desenho", alt: "Vista frontal da marcenaria da sala de atendimento com prateleiras e armários cotados", caption: "Vista A: marcenaria" },
      { img: "pediatria-marcenaria", span: "full", kind: "desenho", alt: "Detalhamento da mesa de atendimento: isométrica, vistas superior, frontal e lateral e detalhe do perfil de LED", caption: "Detalhamento da mesa de atendimento" },
      { img: "pediatria-materiais", span: "half", kind: "desenho", alt: "Quadro de materiais e revestimentos com amostras de MDF, tinta e papel de parede", caption: "Materiais e revestimentos" },
    ],
  },
  {
    slug: "centro-de-economia-criativa",
    title: "Centro de Economia Criativa",
    category: "Arquitetura · Requalificação",
    kicker: "Requalificação de patrimônio industrial",
    context: "Projeto acadêmico",
    contextDetail: "Ateliê de Projeto VIII: Construir no Construído",
    advisors: "Arq. Dr. Laércio Maculan",
    year: 2024,
    location: "Passo Fundo, RS",
    tools: ["Revit", "SketchUp", "Enscape", "Photoshop"],
    theme: "graphite-soft",
    cover: "centro-fachada",
    hero: "centro-fachada",
    homeImages: ["centro-fachada", "centro-axonometria", "centro-corte"],
    summary:
      "Proposta para um antigo frigorífico: preservar a estrutura e inserir espaços de trabalho compartilhado, convivência e cultura.",
    concept:
      "O projeto preserva o valor histórico de um antigo frigorífico e o converte em um Centro de Economia Criativa: um hub que reúne pessoas, empresas e recursos para estimular a colaboração e a inovação. O conceito se apoia em três palavras: preservação, reabilitação e versatilidade.",
    challenge:
      "Adaptar uma edificação industrial às demandas atuais sem comprometer sua estrutura original, reforçando as alvenarias antigas para atender às normas de segurança e resistência.",
    solutions: [
      "Manutenção da estrutura original do frigorífico como protagonista do conjunto.",
      "Inserções em vidro, estruturas metálicas e divisórias leves, facilmente removíveis.",
      "Novo volume de acesso em telha zipada, com praça de entrada, café e restaurante.",
      "Reforço estrutural das alvenarias originais e reparação de danos causados pelo tempo.",
      "Espaços flexíveis (coworking, convivência, salas de reunião) adaptáveis ao longo do tempo.",
    ],
    materials: ["Alvenaria original preservada", "Telha zipada standard", "Malha metálica perfurada em aço inox", "Esquadrias em alumínio preto", "Vidro e estrutura metálica"],
    gallery: [
      { img: "centro-fachada", span: "full", kind: "render", alt: "Hub Planaltina: novo volume de acesso em telha metálica escura com fachada em vidro, ao lado da edificação original em tijolos", caption: "Novo acesso e praça de entrada" },
    ],
    drawings: [
      { img: "centro-axonometria", span: "tall", kind: "desenho", alt: "Axonometria explodida em três camadas: preexistência, permanência e proposta, com café, coworking e praça de entrada", caption: "Preexistência, permanência e proposta" },
      { img: "centro-fachada-sul", span: "full", kind: "desenho", alt: "Fachada sul com o volume de acesso em vidro e a malha metálica perfurada", caption: "Fachada sul, esc. 1:200" },
      { img: "centro-fachada-norte", span: "full", kind: "desenho", alt: "Fachada norte com a alvenaria original da edificação e as novas esquadrias", caption: "Fachada norte, esc. 1:200" },
      { img: "centro-corte", span: "full", kind: "desenho", alt: "Corte longitudinal AA mostrando estacionamento no subsolo, térreo, mezanino e primeiro pavimento", caption: "Corte AA, esc. 1:200" },
    ],
  },
];
