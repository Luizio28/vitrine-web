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

## Rodando (PHP + MySQL)

Os produtos vêm do banco `euna3d` através de `api/produtos.php`. Se a API não responder, o site
usa o catálogo do `products.js` como reserva (dá até para abrir o `index.html` direto no navegador).

São 3 etapas, cada uma num script separado. As etapas 1 e 2 só precisam ser feitas uma vez.

| Etapa | O que faz | Windows (dois cliques) | Linux Mint / Ubuntu |
| --- | --- | --- | --- |
| 1. Dependências | Instala PHP + MariaDB | `instalar-dependencias.bat` (XAMPP via winget) | `./instalar-dependencias.sh` |
| 2. Banco | Cria o banco `euna3d` com os produtos | `configurar-banco.bat` | `./configurar-banco.sh` |
| 3. Iniciar | Liga o banco e o servidor PHP | `iniciar.bat` | `./iniciar.sh` |

Depois da etapa 3, abra <http://localhost:8000>.

- **Windows:** o XAMPP fica em `C:\xampp`; o banco usa `root` sem senha (padrão do XAMPP).
- **Linux:** o banco usa o usuário `euna3d` (senha de exemplo `euna3d123`, editável no topo do `configurar-banco.sh`).
  Se o `./` der "permissão negada", rode `chmod +x *.sh` (ou `bash nome-do-script.sh`).
- A etapa 2 pode ser repetida para resetar os produtos (ex.: depois de editar o `products.js`).

### Testar a conexão

Abra <http://localhost:8000/teste-conexao.php>: deve aparecer `CONEXAO OK` e 44 produtos.

Para usar outro banco/usuário, defina as variáveis de ambiente `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER` e
`DB_PASS` (lidas em `conexao.php`). No Linux, o `iniciar.sh` já define `DB_USER`/`DB_PASS`.

Depois de editar `products.js`, regenere o seed com `node database/gerar-seed.js` e importe de novo.
