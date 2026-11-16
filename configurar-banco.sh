#!/usr/bin/env bash
# ETAPA 2 (Linux): cria o banco "euna3d" com os produtos e o usuário do site.
# Precisa das dependências (./instalar-dependencias.sh). Pode rodar de novo para resetar os produtos.
set -e
cd "$(dirname "$0")"

DB_USER="${DB_USER:-euna3d}"
DB_PASS="${DB_PASS:-euna3d123}"   # se mudar aqui, use a mesma senha ao iniciar (iniciar.sh lê DB_PASS)

command -v mysql >/dev/null 2>&1 || { echo "MariaDB não encontrado. Rode primeiro:  ./instalar-dependencias.sh"; exit 1; }
systemctl is-active --quiet mariadb || sudo systemctl start mariadb

echo ">> Criando o banco e importando os produtos..."
sudo mysql --default-character-set=utf8mb4 < database/schema.sql
sudo mysql --default-character-set=utf8mb4 < database/seed.sql

echo ">> Criando o usuário '$DB_USER'..."
sudo mysql -e "CREATE USER IF NOT EXISTS '$DB_USER'@'localhost' IDENTIFIED BY '$DB_PASS';
               ALTER USER '$DB_USER'@'localhost' IDENTIFIED BY '$DB_PASS';
               GRANT ALL PRIVILEGES ON euna3d.* TO '$DB_USER'@'localhost';
               FLUSH PRIVILEGES;"

echo
echo "Banco pronto. Agora rode:  ./iniciar.sh"
