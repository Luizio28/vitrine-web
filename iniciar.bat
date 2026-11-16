@echo off
REM ETAPA 3 (Windows): so liga o MySQL do XAMPP (se precisar) e o servidor PHP em http://localhost:8000
cd /d "%~dp0"

if not exist "C:\xampp\php\php.exe" (
  echo XAMPP nao encontrado em C:\xampp. Instale em https://www.apachefriends.org/
  pause
  exit /b 1
)

netstat -ano | findstr ":3306 " | findstr LISTENING >nul
if errorlevel 1 (
  echo Ligando o MySQL...
  start "" /B "C:\xampp\mysql\bin\mysqld.exe" --defaults-file=C:\xampp\mysql\bin\my.ini --standalone
  timeout /t 5 >nul
)

echo.
echo Abra http://localhost:8000   (teste: http://localhost:8000/teste-conexao.php)
echo Deixe esta janela aberta. Feche para parar o servidor.
"C:\xampp\php\php.exe" -S localhost:8000 -t .
