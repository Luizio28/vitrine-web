@echo off
REM ETAPA 2 (Windows): cria o banco "euna3d" com os produtos (XAMPP). Rode uma vez; pode rodar de novo para resetar os produtos.
cd /d "%~dp0"
set MYSQL=C:\xampp\mysql\bin

if not exist "%MYSQL%\mysql.exe" goto semxampp

netstat -ano | findstr ":3306 " | findstr LISTENING >nul
if errorlevel 1 (
  echo Ligando o MySQL...
  start "" /B "%MYSQL%\mysqld.exe" --defaults-file=%MYSQL%\my.ini --standalone
  timeout /t 6 >nul
)

"%MYSQL%\mysql.exe" -u root --default-character-set=utf8mb4 < database\schema.sql || goto erro
"%MYSQL%\mysql.exe" -u root --default-character-set=utf8mb4 < database\seed.sql || goto erro
echo.
echo Banco euna3d criado com os produtos. Agora rode iniciar.bat
pause
exit /b 0

:semxampp
echo XAMPP nao encontrado em C:\xampp. Instale em https://www.apachefriends.org/
pause
exit /b 1

:erro
echo Falhou ao importar o banco.
pause
exit /b 1
