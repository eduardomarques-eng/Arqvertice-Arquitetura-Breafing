# Briefing Arquitetura

Plataforma profissional para coleta de dados de projetos de arquitetura residencial alto padrão.

## 🚀 Características

- ✅ Formulário multietapas com 6 abas temáticas
- ✅ Validações robustas em tempo real
- ✅ Salvamento automático em localStorage
- ✅ Design responsivo (mobile-first)
- ✅ Animações suaves e intuitivas
- ✅ Indicadores visuais de progresso
- ✅ Pronto para deploy em Vercel

## 🛠️ Stack Tecnológico

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui
- **Build Tool**: Vite
- **Deployment**: Vercel

## 📋 Pré-requisitos

- Node.js 18+
- pnpm (recomendado) ou npm

## 🔧 Instalação Local

```bash
# Clone o repositório
git clone https://github.com/eduardomarques-eng/briefing-arquitetura.git
cd briefing-arquitetura

# Instale as dependências
pnpm install

# Inicie o servidor de desenvolvimento
pnpm dev
```

O site estará disponível em `http://localhost:5173`

## 📦 Build para Produção

```bash
# Build otimizado
pnpm build

# Preview da build
pnpm preview
```

## 🚀 Deploy no Vercel

### Opção 1: Via GitHub (Recomendado)

1. **Faça push do repositório para GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Acesse [vercel.com](https://vercel.com)**
   - Faça login com sua conta GitHub
   - Clique em "New Project"
   - Selecione o repositório `briefing-arquitetura`
   - Clique em "Import"

3. **Configure o Projeto**
   - Framework: Vite (será detectado automaticamente)
   - Build Command: `pnpm build`
   - Output Directory: `dist`
   - Clique em "Deploy"

### Opção 2: Via CLI do Vercel

```bash
# Instale o CLI do Vercel
npm i -g vercel

# Faça deploy
vercel

# Para produção
vercel --prod
```

## 📝 Estrutura do Projeto

```
briefing-arquitetura/
├── client/
│   ├── src/
│   │   ├── components/      # Componentes reutilizáveis
│   │   ├── pages/           # Páginas da aplicação
│   │   ├── contexts/        # React contexts
│   │   ├── hooks/           # Custom hooks
│   │   ├── lib/             # Utilitários
│   │   ├── App.tsx          # Componente raiz
│   │   ├── main.tsx         # Entry point
│   │   └── index.css        # Estilos globais
│   ├── public/              # Arquivos estáticos
│   └── index.html           # HTML template
├── server/                  # Placeholder para compatibilidade
├── shared/                  # Tipos compartilhados
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.ts
├── vercel.json              # Configuração Vercel
└── README.md
```

## 🎯 Formulário - Etapas

1. **Qualificação** 📋
   - Objetivo do projeto
   - Fase atual
   - Timeline

2. **Contato** 👤
   - Nome completo
   - Telefone (WhatsApp)
   - Email
   - Cidade/Estado
   - Profissão

3. **Terreno** 🏗️
   - Possui terreno?
   - Área total
   - Topografia

4. **Família** 👨‍👩‍👧‍👦
   - Número de pessoas
   - Possui crianças?
   - Possui pets?

5. **Necessidades** 🏠
   - Dormitórios
   - Banheiros
   - Orçamento

6. **Expectativas** ✨
   - Descrição da casa ideal
   - Sensação desejada
   - Interesse em reunião

## 🔒 Segurança

- Senhas e chaves sensíveis nunca devem ser persistidas no repositório.
- Validações de entrada de dados em tempo real no formulário.

## 📧 Configurando o Envio de Emails (Gmail SMTP)

Para que o formulário envie os briefings preenchidos automaticamente para o seu email, o sistema utiliza o **Nodemailer** com uma conexão segura TLS (Gmail).

Para configurar:
1. Renomeie o arquivo `.env.example` para `.env` na raiz do projeto.
2. É necessário usar uma **Senha de App do Google**. *Nunca* use sua senha normal.
3. Acesse sua [Conta do Google](https://myaccount.google.com/).
4. No menu lateral, clique em **Segurança**.
5. Certifique-se de que a **Verificação em duas etapas** está *Ativada*.
6. Na barra de pesquisa da sua conta, digite **Senhas de app** (ou *App passwords*).
7. Gere uma nova senha com o nome "Briefing Site" (ou equivalente).
8. Copie os 16 caracteres gerados e cole-os na variável `SMTP_PASS` dentro do seu arquivo `.env`.

Variáveis necessárias no `.env`:
```env
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="eduardo.marques.arq@gmail.com"
SMTP_PASS="sua_senha_de_app_de_16_caracteres"
```

## 🚀 Próximos Passos

Para expandir a funcionalidade, considere:

1. **Integração WhatsApp**: Adicionar redirecionamento automático após envio
2. **Dashboard Admin**: Criar painel para gerenciar briefings recebidos
3. **Analytics**: Rastrear comportamento e conversões

## 📄 Licença

MIT

## 👤 Autor

Arq. Eduardo Marques  
ArqVértice  
[eduardo.marques.arq@gmail.com](mailto:eduardo.marques.arq@gmail.com)

## 🤝 Suporte

Para dúvidas ou sugestões, entre em contato através do email acima.
