// Gera database/seed.sql a partir do products.js. Uso: node database/gerar-seed.js
const fs = require('fs'), path = require('path'), vm = require('vm');
const src = fs.readFileSync(path.join(__dirname, '..', 'products.js'), 'utf8');
const ctx = {}; vm.createContext(ctx);
vm.runInContext(src + ';this.PRODUCTS = PRODUCTS;', ctx);
const q = s => "'" + String(s).split('\\').join('\\\\').split("'").join("''") + "'";
let out = 'USE euna3d;\nSET NAMES utf8mb4;\nDELETE FROM produto_categorias;\nDELETE FROM produtos;\n';
for (const [i, p] of ctx.PRODUCTS.entries()) {
  out += `INSERT INTO produtos (id,titulo,preco,status,imagem,ordem) VALUES (${q(p.id)},${q(p.title)},${p.price},${q(p.status)},${q(p.image)},${i});\n`;
  for (const c of p.categories) out += `INSERT INTO produto_categorias (produto_id,categoria) VALUES (${q(p.id)},${q(c)});\n`;
}
fs.writeFileSync(path.join(__dirname, 'seed.sql'), out);
console.log(ctx.PRODUCTS.length + ' produtos gerados em database/seed.sql');
