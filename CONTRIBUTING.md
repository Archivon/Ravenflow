# Contribuindo para o RavenFlow
Obrigado por considerar contribuir para o RavenFlow! A comunidade do RavenFlow utiliza o GitHub para receber contribuições através de issues e pull requests.
Para reportar bugs ou sugerir melhorias, utilize as [Issues do GitHub](https://github.com/juliareboucasleite/RavenFlow/issues). Verifique se já existe uma issue similar antes de criar uma nova. Para bugs, inclua título descritivo, descrição detalhada, passos para reproduzir, comportamento esperado vs. atual, screenshots (se aplicável) e informações do ambiente.
Para contribuir com código, faça fork do repositório, clone o seu fork, instale as dependências (npm install para backend, pip install -r requirements.txt para Python scraper), configure as variáveis de ambiente e o banco de dados. Crie uma branch para sua feature ou correção, siga os padrões de código do projeto (JavaScript/Node.js com ESLint, Python seguindo PEP 8, HTML/CSS com indentação consistente), teste suas mudanças e abra um Pull Request com descrição clara das mudanças.
Se encontrar um bug, verifique se já foi reportado nas [Issues do GitHub](https://github.com/juliareboucasleite/RavenFlow/issues). Se não foi reportado, crie uma nova issue com um título claro, descrição detalhada do problema, passos para reproduzir, comportamento esperado vs. atual, screenshots (se aplicável) e detalhes do ambiente (SO, versão do Node.js, Python, etc.).
Sugestões são sempre bem-vindas! Verifique se já existe uma sugestão similar nas Issues. Crie uma issue com a tag `enhancement` ou `feature request`, descrevendo claramente o problema que a melhoria resolve, como você imagina que funcionaria e os benefícios para os usuários.

## Contribuir com Código
**Configuração do Ambiente de Desenvolvimento**: Faça fork do repositório, clone o seu fork, instale as dependências (npm install para backend, pip install -r requirements.txt para o scraper Python), configure as variáveis de ambiente (copie .env.example para .env se existir) e configure o banco de dados (execute os scripts SQL em sql/).

**Processo de Desenvolvimento**: Crie uma branch para sua feature/correção (feature/nome-da-feature ou fix/nome-do-bug), siga os padrões de código (JavaScript/Node.js com ESLint, Python seguindo PEP 8, HTML/CSS com indentação consistente), escreva código limpo (funções pequenas e focadas, nomes descritivos, comentários quando necessário, evite duplicidade), teste suas mudanças manualmente e verifique se não quebrou funcionalidades existentes. Faça commit seguindo a convenção (feat, fix, docs, style, refactor, test, chore), faça push para seu fork e abra um Pull Request com descrição clara das mudanças, issues relacionadas (se houver), screenshots (se aplicável) e checklist de verificação.
Para entender melhor como o projeto RavenFlow é gerido e como colaborar, recomendamos revisar o [README.md](README.md) e as diretrizes de submissão.

## Padrões de Código
**JavaScript/Node.js**: Use const por padrão, let quando necessário, evite var. Use arrow functions quando apropriado. Prefira async/await. Variáveis e funções em camelCase; classes em PascalCase. Ponto e vírgula ao final das linhas. Indentação: 2 espaços.
**Python**: Siga PEP 8. Use type hints quando possível. Docstrings para funções e classes. snake_case para funções/variáveis, PascalCase para classes. Indentação: 4 espaços.
**HTML/CSS**: Indentação consistente (2 espaços). Use atributos semânticos. Comente seções complexas. Use classes descritivas (BEM quando apropriado).

## Estrutura do Projeto

```text
RavenFlow/
├── backend/                    # API Node.js/Express
│   ├── config/                 # Configurações (Stripe, etc.)
│   ├── controllers/            # Controladores (exportação, etc.)
│   ├── database/               # Banco de dados
│   │   ├── migrations/         # Migrações SQL
│   │   ├── models/            # Modelos de dados
│   │   ├── db.js              # Conexão com DB
│   │   └── tableManager.js    # Gerenciador de tabelas
│   ├── discord-bot/            # Bot do Discord
│   │   ├── comandos/          # Comandos do bot
│   │   ├── bot.js             # Lógica principal do bot
│   │   └── run.js             # Script de execução
│   ├── middleware/             # Middlewares (auth, verificação de plano)
│   ├── routes/                 # Rotas da API
│   │   ├── admin.js           # Rotas administrativas
│   │   ├── auth.js            # Autenticação
│   │   ├── produtos.js        # Produtos
│   │   ├── user.js            # Usuários
│   │   └── ...
│   ├── scripts/                # Scripts utilitários
│   ├── services/               # Serviços de negócio
│   │   ├── autoSupport.js     # Suporte automático
│   │   ├── alerts.js          # Alertas
│   │   ├── notify.js          # Notificações
│   │   └── ...
│   ├── utils/                  # Utilitários
│   │   ├── gerarExcel.js      # Exportação Excel
│   │   ├── gerarPDF.js        # Exportação PDF
│   │   └── ...
│   └── server.js              # Servidor principal
├── admin.ravenflow/            # Painel administrativo
│   ├── pages/                  # Páginas HTML do admin
│   ├── script/                 # Scripts JavaScript do admin
│   ├── css/                    # Estilos CSS
│   └── assets/                 # Recursos (imagens, etc.)
├── frontend/                   # Interface web pública
│   └── pages/                  # Páginas HTML
│       ├── build/              # Build de produção
│       │   ├── dashboard/      # Dashboard do usuário
│       │   ├── About/          # Páginas sobre
│       │   ├── docs/            # Documentação
│       │   └── assets/         # Recursos (CSS, JS, imagens)
│       └── *.md                # Documentação Markdown
├── python-scraper/             # Scraper Python
│   ├── scraper.py              # Lógica principal de scraping
│   ├── scheduler.py            # Agendador de tarefas
│   ├── product_search.py       # Busca de produtos
│   ├── product_comparison.py    # Comparação de produtos
│   ├── notifications.py        # Notificações
│   └── start.py                # Script de inicialização
├── scripts/                    # Scripts de setup e manutenção
│   ├── setup.js                # Setup inicial
│   ├── migrate-db.js           # Migração de banco
│   ├── create-admin-user.js    # Criar usuário admin
│   └── ...
├── config-files/               # Arquivos de configuração
│   ├── discord-config.js       # Config do Discord
│   ├── ecosystem.config.js     # PM2 config
│   └── nginx-ravenflow.pt.conf # Config Nginx
├── deploy-files/               # Scripts de deploy
├── docker-files/               # Configuração Docker
│   ├── Dockerfile              # Dockerfile produção
│   ├── Dockerfile.dev          # Dockerfile desenvolvimento
│   └── docker-compose.yml      # Docker Compose
├── sql/                        # Scripts SQL
│   └── pap (1).sql            # Dump da base de dados
├── docs/                       # Documentação adicional
└── openapi.yaml                # Especificação OpenAPI
```

## Checklist para Pull Requests
Antes de submeter um PR, verifique: código segue os padrões do projeto, funcionalidade testada manualmente, não há erros de lint/console, documentação atualizada (se necessário), commits seguem a convenção, branch está atualizada com main/master, PR tem descrição clara e screenshots (se aplicável).

## Processo de Revisão
Mantenedores revisarão seu PR verificando se o código segue os padrões, testando as mudanças e sugerindo melhorias se necessário. Responda aos comentários, faça as alterações solicitadas e atualize o PR conforme necessário. Após aprovação, o PR será mergeado e você será creditado como contribuidor.

## Perguntas?
Se tiver dúvidas sobre como contribuir, abra uma issue com a tag `question` ou entre em contato através de <corporation.ravenflow@gmail.com>
Sua simpática comunidade RavenFlow!
Obrigado por contribuir para tornar o RavenFlow melhor!
