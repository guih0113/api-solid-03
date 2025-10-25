@echo off
echo 🚀 Iniciando processo de deploy...

echo 📦 Fazendo build da aplicação...
call npm run build

if %errorlevel% neq 0 (
    echo ❌ Erro no build. Corrija os erros antes de continuar.
    pause
    exit /b 1
)

echo ✅ Build concluído com sucesso!

echo 🔧 Verificando variáveis de ambiente...

if "%JWT_SECRET%"=="" (
    echo ⚠️  JWT_SECRET não configurado. Configure no Railway dashboard.
)

if "%DATABASE_URL%"=="" (
    echo ⚠️  DATABASE_URL não configurado. Configure no Railway dashboard.
)

echo ✅ Verificações concluídas!

echo.
echo 🎯 Próximos passos:
echo 1. Faça commit das alterações: git add . ^&^& git commit -m "Prepare for deploy"
echo 2. Faça push para o GitHub: git push origin main
echo 3. No Railway dashboard, conecte seu repositório
echo 4. Configure as variáveis de ambiente no Railway
echo 5. Execute as migrações: npx prisma migrate deploy
echo.
echo 🌐 Sua API estará disponível em: https://sua-app.railway.app
echo 📚 Documentação em: https://sua-app.railway.app/docs
echo ❤️  Health check em: https://sua-app.railway.app/health
echo.
pause
