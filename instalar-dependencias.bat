@echo off
REM ETAPA 1 (Windows): instala so as dependencias - XAMPP (PHP + MariaDB).
REM Rode uma vez. Depois: configurar-banco.bat  e  iniciar.bat
cd /d "%~dp0"

if exist "C:\xampp\php\php.exe" (
  echo XAMPP ja esta instalado em C:\xampp.
  goto fim
)

where winget >nul 2>&1
if errorlevel 1 goto manual

echo Instalando o XAMPP 8.2 com o winget (pode abrir um aviso de administrador)...
winget install -e --id ApacheFriends.Xampp.8.2 --accept-package-agreements --accept-source-agreements
if not exist "C:\xampp\php\php.exe" goto manual

:fim
echo.
echo Dependencias OK. Proximo passo: configurar-banco.bat
pause
exit /b 0

:manual
echo.
echo Nao consegui instalar sozinho. Baixe e instale o XAMPP em C:\xampp:
echo https://www.apachefriends.org/
pause
exit /b 1
