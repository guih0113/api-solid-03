# 🚀 Deploy Gratuito - API Solid 03

## ✅ Arquivos Preparados

Todos os arquivos necessários para o deploy foram criados:

- ✅ `Dockerfile` - Configuração Docker
- ✅ `.dockerignore` - Arquivos ignorados no Docker
- ✅ `railway.json` - Configuração específica do Railway
- ✅ `env.example` - Exemplo de variáveis de ambiente
- ✅ `deploy.bat` - Script de deploy para Windows
- ✅ `deploy.sh` - Script de deploy para Linux/Mac
- ✅ `package.json` - Atualizado com scripts de produção
- ✅ `src/app.ts` - Adicionado health check endpoint

## 🎯 Deploy no Railway (Recomendado)

### Passo 1: Preparar o Repositório

```bash
# Adicionar todos os arquivos
git add .

# Fazer commit
git commit -m "Prepare for production deploy"

# Fazer push para o GitHub
git push origin main
```

### Passo 2: Configurar Railway

1. Acesse <https://railway.app>
2. Faça login com sua conta GitHub
3. Clique em "New Project"
4. Selecione "Deploy from GitHub repo"
5. Escolha seu repositório
6. Clique em "Deploy Now"

### Passo 3: Configurar Banco de Dados

1. No dashboard do Railway, clique em "New"
2. Selecione "Database" → "PostgreSQL"
3. Railway criará automaticamente um banco PostgreSQL
4. Anote as credenciais (aparecerão na aba "Variables")

### Passo 4: Configurar Variáveis de Ambiente

No Railway dashboard, vá para a aba "Variables" e adicione:

```
NODE_ENV=production
JWT_SECRET=sua-chave-secreta-super-segura-aqui
PORT=3333
DATABASE_URL=postgresql://postgres:senha@host:port/railway
```

**Para gerar JWT_SECRET seguro:**

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Passo 5: Executar Migrações

1. No Railway, vá para a aba "Deployments"
2. Clique no deployment mais recente
3. Vá para "Logs"
4. Execute: `npx prisma migrate deploy`

### Passo 6: Testar a Aplicação

- **API**: `https://sua-app.railway.app`
- **Documentação**: `https://sua-app.railway.app/docs`
- **Health Check**: `https://sua-app.railway.app/health`

## 🔄 Deploy Automático

Após configurar, o Railway fará deploy automático a cada push para o repositório principal.

## 📊 Monitoramento

- **Logs**: Railway dashboard → Deployments → Logs
- **Métricas**: Railway dashboard → Metrics
- **Banco de Dados**: Railway dashboard → Database

## 🆘 Troubleshooting

### Erro de Build

- Verifique se todas as dependências estão no `package.json`
- Execute `npm run build` localmente para testar

### Erro de Banco de Dados

- Verifique se a `DATABASE_URL` está correta
- Execute `npx prisma migrate deploy` nos logs do Railway

### Swagger não carrega

- Verifique se o arquivo `docs/openapi.yaml` existe
- Acesse `/docs/json` para verificar se a especificação está correta

## 🎉 Resultado Final

Após seguir todos os passos, você terá:

- ✅ API rodando em produção
- ✅ Banco PostgreSQL configurado
- ✅ Swagger UI acessível publicamente
- ✅ Deploy automático
- ✅ Monitoramento básico
- ✅ Tudo gratuito!

## 📱 Compartilhar sua API

Agora você pode compartilhar:

- **URL da API**: `https://sua-app.railway.app`
- **Documentação**: `https://sua-app.railway.app/docs`

Outros desenvolvedores podem acessar a documentação e testar todas as rotas diretamente no navegador!
