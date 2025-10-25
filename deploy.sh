#!/bin/bash

echo "🚀 Iniciando processo de deploy..."

# Verificar se o build funciona
echo "📦 Fazendo build da aplicação..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Erro no build. Corrija os erros antes de continuar."
    exit 1
fi

echo "✅ Build concluído com sucesso!"

# Verificar se as variáveis de ambiente estão configuradas
echo "🔧 Verificando variáveis de ambiente..."

if [ -z "$JWT_SECRET" ]; then
    echo "⚠️  JWT_SECRET não configurado. Gerando uma chave temporária..."
    export JWT_SECRET=$(node -e "console.log(require('crypto').randomBytes(64).toString('hex'))")
    echo "JWT_SECRET gerado: $JWT_SECRET"
fi

if [ -z "$DATABASE_URL" ]; then
    echo "⚠️  DATABASE_URL não configurado. Configure no Railway dashboard."
fi

echo "✅ Verificações concluídas!"

echo ""
echo "🎯 Próximos passos:"
echo "1. Faça commit das alterações: git add . && git commit -m 'Prepare for deploy'"
echo "2. Faça push para o GitHub: git push origin main"
echo "3. No Railway dashboard, conecte seu repositório"
echo "4. Configure as variáveis de ambiente no Railway"
echo "5. Execute as migrações: npx prisma migrate deploy"
echo ""
echo "🌐 Sua API estará disponível em: https://sua-app.railway.app"
echo "📚 Documentação em: https://sua-app.railway.app/docs"
echo "❤️  Health check em: https://sua-app.railway.app/health"
