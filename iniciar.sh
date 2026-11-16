#!/usr/bin/env bash
# ETAPA 3 (Linux): só liga o banco (se precisar) e o servidor PHP em http://localhost:8000
cd "$(dirname "$0")"

export DB_USER="${DB_USER:-euna3d}"
export DB_PASS="${DB_PASS:-euna3d123}"
PORTA="${PORTA:-8000}"

if ! command -v php >/dev/null 2>&1; then
  echo "PHP não encontrado. Rode primeiro:  ./instalar-dependencias.sh"; exit 1
fi

if ! systemctl is-active --quiet mariadb; then
  echo ">> Ligando o MariaDB (pode pedir a senha do sudo)..."
  sudo systemctl start mariadb
fi

echo "Abra http://localhost:$PORTA   (teste: http://localhost:$PORTA/teste-conexao.php)"
echo "Ctrl+C para parar."
exec php -S "localhost:$PORTA" -t .
