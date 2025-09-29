# Band FM - Aplicação Web de Rádio

Uma aplicação web completa para rádio online construída com Next.js, TypeScript, Prisma e Tailwind CSS.

## 🚀 Funcionalidades

### Área Pública
- **Página Inicial**: Interface moderna e responsiva com navegação em português
- **Notícias**: Exibição das últimas notícias da rádio
- **Programação**: Grade de programação da rádio com horários e apresentadores
- **Promoções**: Promoções ativas da rádio
- **Seções**: Início, Notícias, Programação, Equipe, Sobre, Clube Ouvintes, Promoções

### Área Administrativa
- **Login Seguro**: Sistema de autenticação para administradores
- **Dashboard**: Painel principal com estatísticas e ações rápidas
- **Gestão de Empresas**: CRUD completo (criar, editar, excluir empresas)
- **Gestão de Notícias**: Publicar, editar e excluir notícias
- **Gestão de Promoções**: Criar, editar e excluir promoções
- **Gestão de Programação**: Configurar programação da rádio

## 🛠️ Tecnologias Utilizadas

- **Next.js 15**: Framework React com App Router
- **TypeScript**: Tipagem estática
- **Prisma**: ORM para banco de dados
- **SQLite**: Banco de dados (pode ser alterado facilmente)
- **Tailwind CSS**: Framework CSS utilitário
- **bcryptjs**: Criptografia de senhas

## 📁 Estrutura do Projeto (MVC)

```
src/
├── app/                    # App Router (Next.js 13+)
│   ├── api/               # API Routes
│   ├── admin/             # Páginas administrativas
│   ├── login/             # Página de login
│   └── page.tsx           # Página inicial pública
├── components/            # Componentes reutilizáveis
├── controllers/           # Lógica de negócio (Controllers)
├── models/               # (Prisma schemas servem como models)
├── views/                # (Components servem como views)
├── lib/                  # Utilitários e configurações
└── types/                # Definições de tipos TypeScript
```

## 🚀 Como Executar

### 1. Instalação das Dependências
```bash
npm install
```

### 2. Configuração do Banco de Dados
```bash
# Gerar cliente Prisma
npx prisma generate

# Criar banco de dados e tabelas
npx prisma db push

# Criar administrador inicial
node scripts/create-admin.js
```

### 3. Executar o Projeto
```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`

## 👤 Login Administrativo

**Credenciais padrão:**
- **Email**: admin@bandfm.com
- **Senha**: admin123

⚠️ **Importante**: Altere essas credenciais após o primeiro login!

## 📝 Como Usar

### Acessar a Área Pública
1. Visite `http://localhost:3000`
2. Navegue pelas seções: Início, Notícias, Programação, etc.

### Acessar a Área Administrativa
1. Clique em "Admin" no menu ou visite `http://localhost:3000/login`
2. Faça login com as credenciais administrativas
3. Use o painel para gerenciar conteúdo

### Gerenciar Empresas
1. No painel admin, clique em "Empresas"
2. Adicione empresas com: nome, foto, email, senha, descrição, categoria
3. Edite ou exclua empresas existentes

### Gerenciar Notícias
1. Vá para "Notícias" no painel admin
2. Publique notícias com: título, imagem, descrição, fonte (link)
3. Edite ou exclua notícias publicadas

### Gerenciar Promoções
1. Acesse "Promoções" no painel admin
2. Crie promoções com: título, descrição, imagem (opcional)
3. Edite ou exclua promoções ativas

### Gerenciar Programação
1. Entre em "Programação" no painel admin
2. Configure programas com: dias da semana, horários, nome do programa, apresentador
3. Edite ou exclua programações existentes

## 🗄️ Estrutura do Banco de Dados

### Tabelas Principais:
- **Admin**: Usuários administrativos
- **Empresa**: Empresas cadastradas
- **Noticia**: Notícias da rádio
- **Promocao**: Promoções ativas
- **ProgramacaoRadio**: Grade de programação

## 🔒 Segurança

- Senhas criptografadas com bcrypt
- Autenticação baseada em sessão
- Validação de dados no frontend e backend
- Sanitização de entradas

## 🎨 Interface

- Design responsivo para desktop e mobile
- Interface em português brasileiro
- Cores temáticas da rádio (azul/roxo/amarelo/verde)
- Componentes reutilizáveis com Tailwind CSS

## 📱 Responsividade

A aplicação é totalmente responsiva e funciona em:
- Desktop
- Tablet
- Mobile

## 🔧 Comandos Úteis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar produção
npm start

# Visualizar banco de dados
npx prisma studio

# Reset do banco de dados
npx prisma db push --force-reset
```

## 🚀 Deploy

Para fazer deploy em produção:

1. Configure as variáveis de ambiente adequadas
2. Altere o banco de dados de SQLite para PostgreSQL/MySQL se necessário
3. Execute `npm run build`
4. Configure o servidor web (Vercel, Netlify, etc.)

## 📞 Suporte

Para dúvidas ou problemas, consulte a documentação das tecnologias utilizadas:
- [Next.js](https://nextjs.org/docs)
- [Prisma](https://www.prisma.io/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

**Band FM** - Sua rádio online com a melhor programação! 🎵



