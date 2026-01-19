# Contribuindo para o RavenFlow
Obrigado por considerar contribuir para o RavenFlow! A comunidade do RavenFlow utiliza o GitHub para receber contribuições através de issues e pull requests.
Para reportar bugs ou sugerir melhorias, utilize as [Issues do GitHub](https://github.com/juliareboucasleite/RavenFlow/issues). Verifique se já existe uma issue similar antes de criar uma nova. Para bugs, inclua título descritivo, descrição detalhada, passos para reproduzir, comportamento esperado vs. atual, screenshots (se aplicável) e informações do ambiente.
Para contribuir com código, faça fork do repositório, clone o seu fork, instale as dependências (npm install para backend e frontend), configure as variáveis de ambiente e o banco de dados. Crie uma branch para sua feature ou correção, siga os padrões de código do projeto (JavaScript/Node.js com ESLint, HTML/CSS com indentação consistente), teste suas mudanças e abra um Pull Request com descrição clara das mudanças.
Se encontrar um bug, verifique se já foi reportado nas [Issues do GitHub](https://github.com/juliareboucasleite/RavenFlow/issues). Se não foi reportado, crie uma nova issue com um título claro, descrição detalhada do problema, passos para reproduzir, comportamento esperado vs. atual, screenshots (se aplicável) e detalhes do ambiente (SO, versão do Node.js, etc.).
Sugestões são sempre bem-vindas! Verifique se já existe uma sugestão similar nas Issues. Crie uma issue com a tag `enhancement` ou `feature request`, descrevendo claramente o problema que a melhoria resolve, como você imagina que funcionaria e os benefícios para os usuários.

## Contribuir com Código
**Configuração do Ambiente de Desenvolvimento**: Faça fork do repositório, clone o seu fork, instale as dependências (npm install para backend e frontend), configure as variáveis de ambiente (copie .env.example para .env se existir) e configure o banco de dados (execute os scripts SQL em sql/).

**Processo de Desenvolvimento**: Crie uma branch para sua feature/correção (feature/nome-da-feature ou fix/nome-do-bug), siga os padrões de código (JavaScript/Node.js com ESLint, HTML/CSS com indentação consistente), escreva código limpo (funções pequenas e focadas, nomes descritivos, comentários quando necessário, evite duplicidade), teste suas mudanças manualmente e verifique se não quebrou funcionalidades existentes. Faça commit seguindo a convenção (feat, fix, docs, style, refactor, test, chore), faça push para seu fork e abra um Pull Request com descrição clara das mudanças, issues relacionadas (se houver), screenshots (se aplicável) e checklist de verificação.
Para entender melhor como o projeto RavenFlow é gerido e como colaborar, recomendamos revisar o [README.md](README.md) e as diretrizes de submissão.

## Padrões de Código
**JavaScript/Node.js**: Use const por padrão, let quando necessário, evite var. Use arrow functions quando apropriado. Prefira async/await. Variáveis e funções em camelCase; classes em PascalCase. Ponto e vírgula ao final das linhas. Indentação: 2 espaços.

**HTML/CSS**: Indentação consistente (2 espaços). Use atributos semânticos. Comente seções complexas. Use classes descritivas (BEM quando apropriado).

**React/Vue (se aplicável)**: Siga as convenções do framework escolhido. Componentes em PascalCase. Props tipadas quando possível. Hooks customizados em camelCase começando com "use".

## Estrutura do Projeto

```text
RavenFlow/
├── backend/                    # API Node.js/Express
│   ├── config/                 # Configurações (banco de dados, JWT, etc.)
│   ├── controllers/            # Controladores (funcionários, salários, etc.)
│   │   ├── employeeController.js
│   │   ├── salaryController.js
│   │   ├── reportController.js
│   │   └── ...
│   ├── database/               # Banco de dados
│   │   ├── migrations/         # Migrações SQL
│   │   ├── models/             # Modelos de dados
│   │   │   ├── Employee.js
│   │   │   ├── Salary.js
│   │   │   ├── User.js
│   │   │   └── ...
│   │   ├── db.js               # Conexão com DB
│   │   └── seeders/            # Seeders para dados iniciais
│   ├── middleware/             # Middlewares
│   │   ├── auth.js             # Autenticação JWT
│   │   ├── validation.js       # Validação de dados
│   │   └── errorHandler.js     # Tratamento de erros
│   ├── routes/                 # Rotas da API
│   │   ├── auth.js             # Autenticação
│   │   ├── employees.js        # Funcionários
│   │   ├── salaries.js         # Salários
│   │   ├── reports.js           # Relatórios
│   │   ├── admin.js            # Rotas administrativas
│   │   └── ...
│   ├── services/               # Serviços de negócio
│   │   ├── salaryService.js    # Lógica de cálculo salarial
│   │   ├── reportService.js    # Geração de relatórios
│   │   ├── notificationService.js
│   │   └── ...
│   ├── utils/                  # Utilitários
│   │   ├── exportExcel.js      # Exportação Excel
│   │   ├── exportPDF.js        # Exportação PDF
│   │   ├── validators.js       # Validadores
│   │   └── ...
│   ├── tests/                  # Testes
│   │   ├── unit/               # Testes unitários
│   │   └── integration/       # Testes de integração
│   └── server.js               # Servidor principal
├── frontend/                   # Interface web
│   ├── src/                    # Código fonte
│   │   ├── components/         # Componentes React/Vue/etc
│   │   ├── pages/              # Páginas
│   │   │   ├── Dashboard/
│   │   │   ├── Employees/
│   │   │   ├── Salaries/
│   │   │   ├── Reports/
│   │   │   └── ...
│   │   ├── services/           # Serviços API
│   │   ├── utils/              # Utilitários
│   │   ├── hooks/              # Custom hooks (se React)
│   │   └── assets/             # Recursos estáticos
│   ├── public/                 # Arquivos públicos
│   └── build/                  # Build de produção
├── admin/                      # Painel administrativo
│   ├── pages/                  # Páginas HTML do admin
│   ├── scripts/                # Scripts JavaScript
│   ├── styles/                 # Estilos CSS
│   └── assets/                 # Recursos (imagens, etc.)
├── scripts/                    # Scripts de setup e manutenção
│   ├── setup.js                # Setup inicial
│   ├── migrate-db.js           # Migração de banco
│   ├── create-admin-user.js    # Criar usuário admin
│   └── seed-database.js        # Popular banco com dados iniciais
├── config/                     # Arquivos de configuração
│   ├── database.config.js      # Config do banco de dados
│   ├── ecosystem.config.js    # PM2 config
│   └── nginx.conf              # Config Nginx
├── docker/                     # Configuração Docker
│   ├── Dockerfile              # Dockerfile produção
│   ├── Dockerfile.dev          # Dockerfile desenvolvimento
│   └── docker-compose.yml      # Docker Compose
├── sql/                        # Scripts SQL
│   ├── schema.sql              # Schema do banco
│   └── migrations/             # Migrações SQL
├── docs/                       # Documentação adicional
│   ├── api/                    # Documentação da API
│   └── guides/                 # Guias de uso
├── tests/                      # Testes end-to-end
├── .env.example                # Exemplo de variáveis de ambiente
├── package.json                # Dependências Node.js
└── README.md                   # Documentação principal
```

## Checklist para Pull Requests
Antes de submeter um PR, verifique: código segue os padrões do projeto, funcionalidade testada manualmente, não há erros de lint/console, documentação atualizada (se necessário), commits seguem a convenção, branch está atualizada com main/master, PR tem descrição clara e screenshots (se aplicável).

## Processo de Revisão
Mantenedores revisarão seu PR verificando se o código segue os padrões, testando as mudanças e sugerindo melhorias se necessário. Responda aos comentários, faça as alterações solicitadas e atualize o PR conforme necessário. Após aprovação, o PR será mergeado e você será creditado como contribuidor.

## Mantenedores
O projeto RavenFlow é mantido por:
- [J.R leite](https://github.com/juliareboucasleite)
- [Lucas Castro](https://github.com/LuquinhasCTR)

Para questões relacionadas ao projeto, você pode entrar em contato com os mantenedores através das issues do GitHub ou pelo email: [corporation.ravenflow@gmail.com](mailto:corporation.ravenflow@gmail.com)

## Perguntas?
Se tiver dúvidas sobre como contribuir, abra uma issue com a tag `question` ou entre em contato através de [corporation.ravenflow@gmail.com](mailto:corporation.ravenflow@gmail.com)

Sua simpática comunidade RavenFlow!
Obrigado por contribuir para tornar o RavenFlow melhor!
