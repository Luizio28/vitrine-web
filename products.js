// CATÁLOGO DA EUNA3D (projeto escolar)
// Produtos, preços e fotos baseados em https://printcontrol.netlify.app/loja/3dim (44 produtos, coletado em 20/10/2026)
// status: 'pronta' = pronta entrega | 'encomenda' = produzido sob encomenda

const STORE = {
	name: 'Euna3D',
	tagline: 'Sua ideia, camada por camada',
	whatsapp: '5573998024266',
	whatsappLabel: '(73) 99802-4266',
	instagram: '', // preencha com o @ da Euna3D para exibir no rodapé
	sourceUrl: 'https://printcontrol.netlify.app/loja/3dim'
};

const CATEGORIES = {
	'Chaveiro': '🔑',
	'Decoração': '🏠',
	'Feirinha': '🛍️',
	'Magic': '🪄',
	'Pokémon': '⚡',
	'Religioso': '✝️',
	'Setup': '🎮',
	'Outros': '✨'
};

const PRODUCTS = [
	{ id: 'squirtle', title: 'Squirtle', price: 50, status: 'encomenda', categories: ['Pokémon'], image: 'img/produtos/squirtle.jpg' },
	{ id: 'luminaria-personalizada-com-fotos', title: 'Luminária Personalizada com Fotos', price: 150, status: 'encomenda', categories: ['Decoração'], image: 'img/produtos/luminaria-personalizada-com-fotos.jpg' },
	{ id: 'chaveiro-potter', title: 'Chaveiro Potter', price: 18, status: 'pronta', categories: ['Chaveiro'], image: 'img/produtos/chaveiro-potter.jpg' },
	{ id: 'suporte-tier-4', title: 'Suporte Tier 4', price: 120, status: 'encomenda', categories: ['Feirinha'], image: 'img/produtos/suporte-tier-4.jpg' },
	{ id: 'gardevoir-20cm', title: 'Gardevoir 20cm', price: 80, status: 'encomenda', categories: ['Pokémon'], image: 'img/produtos/gardevoir-20cm.jpg' },
	{ id: 'charizard-decorativo', title: 'Charizard Decorativo', price: 48, status: 'encomenda', categories: ['Pokémon', 'Decoração'], image: 'img/produtos/charizard-decorativo.jpg' },
	{ id: 'deck-box', title: 'Deck Box', price: 90, status: 'encomenda', categories: ['Magic', 'Pokémon'], image: 'img/produtos/deck-box.jpg' },
	{ id: 'furia-da-luz', title: 'Chaveiro Fúria da Luz', price: 15, status: 'pronta', categories: ['Chaveiro'], image: 'img/produtos/furia-da-luz.jpg' },
	{ id: 'porta-alianca', title: 'Porta Aliança', price: 10, status: 'encomenda', categories: ['Chaveiro'], image: 'img/produtos/porta-alianca.jpg' },
	{ id: 'hello-kitty-x-godzilla-9cm', title: 'Hello Kitty x Godzilla 9cm', price: 60, status: 'pronta', categories: ['Outros'], image: 'img/produtos/hello-kitty-x-godzilla-9cm.webp' },
	{ id: 'marca-pagina-gothic-raven', title: 'Marca-Página Gothic Raven Skull & Roses', price: 15, status: 'encomenda', categories: ['Outros'], image: 'img/produtos/marca-pagina-gothic-raven-skull-roses.webp' },
	{ id: 'chaveiro-chapeu-seletor', title: 'Chaveiro Chapéu Seletor', price: 10, status: 'pronta', categories: ['Chaveiro'], image: 'img/produtos/chaveiro-chapeu-seletor.jpg' },
	{ id: 'jesus-sentado-5cm', title: 'Jesus Sentado – Faixa Vermelha 5cm', price: 12, status: 'pronta', categories: ['Religioso'], image: 'img/produtos/jesus-sentado-faixa-vermelha-5cm.jpg' },
	{ id: 'suporte-gta-vi', title: 'Suporte GTA VI', price: 160, status: 'pronta', categories: ['Setup'], image: 'img/produtos/suporte-gta-vi.jpg' },
	{ id: 'pikachu-10cm', title: 'Pikachu 10cm', price: 50, status: 'encomenda', categories: ['Pokémon'], image: 'img/produtos/pikachu-10-cm.jpg' },
	{ id: 'macca-the-gator', title: 'Macca the Gator', price: 210, status: 'encomenda', categories: ['Decoração'], image: 'img/produtos/macca-the-gator.jpg' },
	{ id: 'le-boudoir-caixa-de-joias', title: 'Le Boudoir – Playset Caixa de Joias', price: 130, status: 'encomenda', categories: ['Decoração'], image: 'img/produtos/le-boudoir-playset-caixa-de-joias.jpg' },
	{ id: 'deck-box-gride', title: 'Deck Box Gride', price: 50, status: 'encomenda', categories: ['Pokémon'], image: 'img/produtos/deck-box-gride.jpg' },
	{ id: 'charmander-fofo', title: 'Charmander Fofo', price: 50, status: 'encomenda', categories: ['Pokémon'], image: 'img/produtos/charmander-fofo.jpg' },
	{ id: 'flor-minecraft-10cm', title: 'Flor Minecraft 10cm', price: 25, status: 'encomenda', categories: ['Setup'], image: 'img/produtos/flor-minecraft-10cm.webp' },
	{ id: 'chaveiro-furia-da-noite', title: 'Chaveiro Fúria da Noite', price: 15, status: 'pronta', categories: ['Chaveiro'], image: 'img/produtos/chaveiro-furia-da-noite.webp' },
	{ id: 'chaveiro-flexivel-homem-aranha', title: 'Chaveiro Flexível Homem-Aranha', price: 12, status: 'encomenda', categories: ['Chaveiro'], image: 'img/produtos/chaveiro-flexivel-homem-aranha.jpg' },
	{ id: 'pokemon-janela-grande', title: 'Pokémon Janela Grande', price: 100, status: 'encomenda', categories: ['Pokémon'], image: 'img/produtos/pokemon-janela-grande.jpg' },
	{ id: 'chaveiro-articulado-homem-de-ferro', title: 'Chaveiro Articulado Homem de Ferro', price: 12, status: 'pronta', categories: ['Chaveiro'], image: 'img/produtos/chaveiro-articulado-homem-de-ferro.jpg' },
	{ id: 'suporte-2-controles-gta-vi', title: 'Suporte para 2 Controles GTA VI', price: 180, status: 'encomenda', categories: ['Setup'], image: 'img/produtos/suporte-controle-para-2-controles-gta-vi.webp' },
	{ id: 'suporte-bulbassaur', title: 'Suporte Bulbasaur', price: 150, status: 'encomenda', categories: ['Pokémon', 'Setup'], image: 'img/produtos/suporte-bulbassaur.jpg' },
	{ id: 'bulbassauro-16cm', title: 'Bulbasaur 16cm', price: 80, status: 'encomenda', categories: ['Pokémon'], image: 'img/produtos/bulbassauro-16-cm.jpg' },
	{ id: 'morte-com-gatinho', title: 'Morte com Gatinho', price: 20, status: 'encomenda', categories: ['Decoração'], image: 'img/produtos/morte-com-gatinho.webp' },
	{ id: 'chaveiro-miranha-articulado', title: 'Chaveiro Miranha Articulado', price: 15, status: 'encomenda', categories: ['Chaveiro'], image: 'img/produtos/chaveiro-miranha-articulado.jpg' },
	{ id: 'kit-monster', title: 'Kit Monster', price: 70, status: 'encomenda', categories: ['Outros'], image: 'img/produtos/kit-monster.jpg' },
	{ id: 'deckbox-magic-com-trava', title: 'Deck Box Magic com Trava', price: 125, status: 'encomenda', categories: ['Magic'], image: 'img/produtos/deckbox-magic-com-trava.jpg' },
	{ id: 'deck-box-quatro-decks', title: 'Deck Box para Quatro Decks', price: 170, status: 'encomenda', categories: ['Magic', 'Pokémon'], image: 'img/produtos/deck-box-para-quatro-decks.jpg' },
	{ id: 'suporte-ghost-face', title: 'Suporte Ghost Face Fone + Controle', price: 110, status: 'encomenda', categories: ['Setup'], image: 'img/produtos/suporte-ghost-face-fone-controle.jpg' },
	{ id: 'expositor-pokemon-simples', title: 'Expositor Pokémon Simples', price: 10, status: 'pronta', categories: ['Pokémon'], image: 'img/produtos/expositor-pokemon-simples.jpg' },
	{ id: 'deckbox-magic-simples', title: 'Deck Box Magic Simples', price: 40, status: 'encomenda', categories: ['Magic'], image: 'img/produtos/deckbox-magic-simples.jpg' },
	{ id: 'chaveiro-capitao-america', title: 'Chaveiro Capitão América', price: 8, status: 'encomenda', categories: ['Chaveiro'], image: 'img/produtos/chaveiro-capitao-america.webp' },
	{ id: 'ultra-ball-gigante', title: 'Ultra Ball Gigante (Bulking)', price: 230, status: 'encomenda', categories: ['Pokémon'], image: 'img/produtos/bulking-gigante-ultra-ball.jpg' },
	{ id: 'clickers-fofos', title: 'Clickers Fofos', price: 15, status: 'pronta', categories: ['Chaveiro'], image: 'img/produtos/clickers-fofos.jpg' },
	{ id: 'chaveiro-doutor-destino', title: 'Chaveiro Doutor Destino', price: 12, status: 'encomenda', categories: ['Chaveiro'], image: 'img/produtos/chaveiro-doutor-destino.jpg' },
	{ id: 'suporte-controle-gta-vi', title: 'Suporte Controle GTA VI', price: 50, status: 'encomenda', categories: ['Setup'], image: 'img/produtos/suporte-controle-gtavi.jpg' },
	{ id: 'suporte-broca-nail', title: 'Suporte Broca Nail', price: 100, status: 'encomenda', categories: ['Outros'], image: 'img/produtos/suporte-broca-nail.jpg' },
	{ id: 'deckbox-pokemon', title: 'Deck Box Pokémon', price: 60, status: 'encomenda', categories: ['Pokémon'], image: 'img/produtos/deckbox-pokemon.jpg' },
	{ id: 'hello-kitty-x-godzilla-16cm', title: 'Hello Kitty x Godzilla 16cm', price: 120, status: 'encomenda', categories: ['Outros'], image: 'img/produtos/hello-kitty-x-godzilla-16cm.webp' },
	{ id: 'suporte-headfone', title: 'Suporte Headfone', price: 35, status: 'encomenda', categories: ['Setup'], image: 'img/produtos/suporte-headfone.jpg' }
];

// Cores de filamento oferecidas para peças sob encomenda (FDM)
const FILAMENT_COLORS = [
	{ name: 'Cores originais', hex: 'conic-gradient(#ef4444, #f59e0b, #22c55e, #3b82f6, #a855f7, #ef4444)' },
	{ name: 'Preto', hex: '#111827' },
	{ name: 'Branco', hex: '#f8fafc' },
	{ name: 'Roxo', hex: '#7c3aed' },
	{ name: 'Laranja', hex: '#f97316' },
	{ name: 'Vermelho', hex: '#dc2626' },
	{ name: 'Azul', hex: '#2563eb' },
	{ name: 'Verde', hex: '#16a34a' },
	{ name: 'Amarelo', hex: '#facc15' },
	{ name: 'Rosa', hex: '#ec4899' }
];
