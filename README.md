# vitrine-web

Vitrine da **Euna3D · Impressão 3D** — "Sua ideia, camada por camada".

Projeto escolar (IFBA · Desenvolvimento Web · Mini PI). O catálogo usa 44 produtos com preço, categoria,
disponibilidade e foto baseados em [printcontrol.netlify.app/loja/3dim](https://printcontrol.netlify.app/loja/3dim).

## Funcionalidades

- Busca por nome ou categoria (ignora acentos)
- Filtros por categoria, disponibilidade (pronta entrega / sob encomenda) e preço máximo
- Ordenação por relevância, preço e nome
- Detalhe do produto com escolha de cor (peças sob encomenda) e quantidade
- Carrinho salvo no navegador (`localStorage`)
- Finalização do pedido pelo WhatsApp, com a mensagem já montada

## Estrutura

| Arquivo | Conteúdo |
| --- | --- |
| `index.html` | Estrutura da página |
| `style.css` | Estilos (paleta roxo → laranja) |
| `products.js` | Dados da loja (`STORE`), categorias, produtos e cores de filamento |
| `script.js` | Filtros, catálogo, carrinho e pedido |
| `img/` | Logo (`logo-euna3d.svg`) e fotos dos produtos |

## Como atualizar o catálogo

Edite o array `PRODUCTS` em `products.js`. Cada produto tem:

```js
{ id: 'squirtle', title: 'Squirtle', price: 50, status: 'encomenda', categories: ['Pokémon'], image: 'img/produtos/squirtle.jpg' }
```

`status` é `'pronta'` (pronta entrega) ou `'encomenda'` (sob encomenda).

Nome, slogan, WhatsApp e Instagram da loja ficam no objeto `STORE`, no mesmo arquivo.

## Rodando

É um site estático: basta abrir o `index.html` no navegador.
