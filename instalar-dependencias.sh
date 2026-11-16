#!/usr/bin/env bash
# ETAPA 1 (Linux Mint / Ubuntu / Debian): instala só as dependências — PHP e MariaDB.
# Rode uma vez. Depois: ./configurar-banco.sh  e  ./iniciar.sh
set -e

echo ">> Instalando PHP e MariaDB (vai pedir a senha do sudo)..."
sudo apt update
sudo apt install -y php-cli php-mysql mariadb-server
sudo systemctl enable --now mariadb

echo
php -v | head -1
echo "Dependências instaladas. Próximo passo:  ./configurar-banco.sh"
