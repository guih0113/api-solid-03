# 🚀 Guia Completo de Deploy Gratuito - API Solid 03

## 📋 Opções de Deploy Gratuito

### 1. **Railway** (Recomendado) ⭐

- **Banco**: PostgreSQL gratuito incluído
- **App**: Node.js com build automático
- **Limite**: 500 horas/mês (suficiente para desenvolvimento)
- **URL**: <https://railway.app>

### 2. **Render**

- **Banco**: PostgreSQL gratuito (1GB)
- **App**: Node.js com build automático
- **Limite**: 750 horas/mês
- **URL**: <https://render.com>

### 3. **Fly.io**

- **Banco**: PostgreSQL gratuito (3GB)
- **App**: Docker containers
- **Limite**: 3 apps gratuitos
- **URL**: <https://fly.io>

## 🎯 Opção Escolhida: Railway (Mais Simples)

Vou te guiar pelo Railway por ser a opção mais simples e ter PostgreSQL incluído.

## 📝 Passo a Passo Completo

### Passo 1: Preparar o Projeto

#### 1.1 Criar arquivo Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar dependências
RUN npm ci --only=production

# Copiar código fonte
COPY . .

# Build da aplicação
RUN npm run build

# Expor porta
EXPOSE 3333

# Comando para iniciar
CMD ["npm", "start"]
```

#### 1.2 Atualizar package.json

Adicionar script de start para produção:

```json
{
  "scripts": {
    "start": "node build/server.js",
    "start:prod": "NODE_ENV=production node build/server.js"
  }
}
```

#### 1.3 Criar arquivo .env.example

```env
NODE_ENV=production
JWT_SECRET=your-super-secret-jwt-key-here
PORT=3333
DATABASE_URL=postgresql://username:password@host:port/database
```

### Passo 2: Configurar Railway

#### 2.1 Criar conta no Railway

1. Acesse <https://railway.app>
2. Clique em "Login" e faça login com GitHub
3. Autorize o Railway a acessar seus repositórios

#### 2.2 Criar novo projeto

1. Clique em "New Project"
2. Selecione "Deploy from GitHub repo"
3. Escolha seu repositório da API
4. Clique em "Deploy Now"

#### 2.3 Configurar banco de dados

1. No dashboard do projeto, clique em "New"
2. Selecione "Database" → "PostgreSQL"
3. Railway criará automaticamente um banco PostgreSQL
4. Anote as credenciais do banco (aparecerão na aba "Variables")

### Passo 3: Configurar Variáveis de Ambiente

#### 3.1 No Railway Dashboard

1. Vá para a aba "Variables"
2. Adicione as seguintes variáveis:

```
NODE_ENV=production
JWT_SECRET=sua-chave-secreta-super-segura-aqui
PORT=3333
DATABASE_URL=postgresql://postgres:senha@host:port/railway
```

#### 3.2 Gerar JWT_SECRET seguro

```bash
# No terminal, execute:
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Passo 4: Configurar Deploy Automático

#### 4.1 Railway detectará automaticamente

- Node.js como runtime
- package.json como gerenciador de dependências
- Comando `npm start` para iniciar

#### 4.2 Railway executará automaticamente

```bash
npm install
npm run build
npm start
```

### Passo 5: Executar Migrações do Banco

#### 5.1 Adicionar script de migração

No package.json, adicione:

```json
{
  "scripts": {
    "db:migrate": "npx prisma migrate deploy",
    "db:generate": "npx prisma generate"
  }
}
```

#### 5.2 Executar migrações

1. No Railway, vá para a aba "Deployments"
2. Clique no deployment mais recente
3. Vá para "Logs"
4. Execute o comando:

```bash
npx prisma migrate deploy
```

### Passo 6: Testar a Aplicação

#### 6.1 Acessar a aplicação

1. No Railway, vá para a aba "Settings"
2. Copie a URL do domínio (ex: <https://api-solid-03-production.up.railway.app>)
3. Acesse: `https://sua-url/docs`

#### 6.2 Testar rotas

1. Acesse a documentação Swagger
2. Teste o registro de usuário
3. Teste a autenticação
4. Teste as demais rotas

## 🔧 Configurações Adicionais

### Configurar CORS (se necessário)

No arquivo `src/app.ts`, adicione:

```typescript
import fastifyCors from '@fastify/cors'

app.register(fastifyCors, {
  origin: true, // Em produção, especifique os domínios permitidos
  credentials: true
})
```

### Configurar Health Check

Adicione uma rota de health check:

```typescript
app.get('/health', async (request, reply) => {
  return { status: 'ok', timestamp: new Date().toISOString() }
})
```

## 🚨 Troubleshooting

### Problema: Erro de conexão com banco

**Solução**: Verifique se a DATABASE_URL está correta e se o banco está ativo

### Problema: Build falha

**Solução**: Verifique se todas as dependências estão no package.json

### Problema: Swagger não carrega

**Solução**: Verifique se o arquivo openapi.yaml está no diretório docs/

## 📊 Monitoramento

### Railway Dashboard

- Logs em tempo real
- Métricas de uso
- Status do banco de dados
- Uptime da aplicação

### Logs importantes para monitorar

- Erros de conexão com banco
- Erros de autenticação
- Performance da API

## 🎉 Resultado Final

Após seguir todos os passos, você terá:

- ✅ API rodando em produção
- ✅ Banco PostgreSQL configurado
- ✅ Swagger UI acessível publicamente
- ✅ Deploy automático a cada push
- ✅ Monitoramento básico
- ✅ Tudo gratuito!

## 🔗 URLs Finais

- **API**: `https://sua-app.railway.app`
- **Documentação**: `https://sua-app.railway.app/docs`
- **Health Check**: `https://sua-app.railway.app/health`

---

**Próximos passos**: Após o deploy, você pode compartilhar a URL da documentação com outros desenvolvedores para que testem sua API!
