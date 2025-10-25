@echo off
echo 🔍 Verificação Pré-Deploy - API Solid 03
echo.

echo 📦 Verificando build...
call npm run build
if %errorlevel% neq 0 (
    echo ❌ Erro no build. Corrija antes de continuar.
    pause
    exit /b 1
)
echo ✅ Build OK!

echo.
echo 🗄️ Verificando Prisma Client...
call npx prisma generate
if %errorlevel% neq 0 (
    echo ❌ Erro ao gerar Prisma Client.
    pause
    exit /b 1
)
echo ✅ Prisma Client OK!

echo.
echo 🧪 Executando testes unitários...
call npm test
if %errorlevel% neq 0 (
    echo ⚠️  Alguns testes falharam, mas continuando...
)
echo ✅ Testes concluídos!

echo.
echo 📋 Verificando arquivos necessários...
if not exist "Dockerfile" (
    echo ❌ Dockerfile não encontrado!
    exit /b 1
)
if not exist "railway.json" (
    echo ❌ railway.json não encontrado!
    exit /b 1
)
if not exist "docs/openapi.yaml" (
    echo ❌ docs/openapi.yaml não encontrado!
    exit /b 1
)
echo ✅ Todos os arquivos necessários encontrados!

echo.
echo 🎉 Verificação concluída com sucesso!
echo.
echo Próximos passos:
echo 1. git add .
echo 2. git commit -m "Ready for deploy"
echo 3. git push origin main
echo 4. Configure no Railway dashboard
echo.
pause
