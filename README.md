<h1 align="center">
  <img alt="Fastfeet" title="Fastfeet" src="https://raw.githubusercontent.com/Rocketseat/bootcamp-gostack-desafio-02/master/.github/logo.png" width="300px" />
</h1>

### :memo: Sobre a aplicação

Esta é uma API REST construída para uma transportadora fictícia, A FastFeet. Toda a API é escrita em NodeJs usando MVC, banco de dados PostgreSQL e integrado com o Sentry. Continue lendo para saber mais sobre as ferramentas utilizadas, funcionalidades e etc.

### :bookmark_tabs: **Funcionalidades de administrador**

- **Autenticação:** se autenticar no sistema para exercer restritas a usuarios autenticados.
- **Gestão de destinatários:** cadastrar, atualizar e listar destinatários cadastrados.
- **Gestão de entregadores:** cadastrar, atualizar e listar entregadores cadastrados.
- **Gestão de encomendas:** cadastrar, atualizar, listar e cancelar encomendas cadastradas.

Toda vez que uma encomenda é cadastrado para um entregador, o mesmo recebe um alerta no seu email com as informações, assim como acontece no cancelamento de uma entrega.

### :bookmark_tabs: **Funcionalidades do entregador**

- **Visualizar encomendas:** informando o seu ID de cadastro, o entregador consegue visualizar todas suas encomendas.
- **Alterar status de encomendas:** o entregador pode definir uma data de retirada e de entrega para a encomenda, durante o periodo de 8:00 às 18:00 horas.
- **Cadastrar problemas nas entregas:** o entregador pode cadastrar problemas que ocorreram durante a entrega. Assim os problemas ficam registrados e o administrador pode decidir se a entrega deve ser cancelada ou não.

### :hammer: **Ferramentas utilizadas**
- <a target="_blank" href="https://www.npmjs.com/package/express" alt="Express">Express</a>
- <a target="_blank" href="https://www.npmjs.com/package/sucrase" alt="Sucrase">Sucrase</a>
- <a target="_blank" href="https://www.npmjs.com/package/nodemon" alt="Nodemon">Nodemon</a>
- <a target="_blank" href="https://www.npmjs.com/package/eslint" alt="ESLint">ESLint</a>
- <a target="_blank" href="https://www.npmjs.com/package/prettier" alt="Prettier">Prettier</a>
- <a target="_blank" href="https://editorconfig.org/" alt="EditorConfig">EditorConfig</a>
- <a target="_blank" href="https://www.npmjs.com/package/sequelize" alt="Sequelize">Sequelize</a>
- <a target="_blank" href="https://sentry.io/" alt="Sentry">Sentry</a>
- <a target="_blank" href="https://www.npmjs.com/package/bcryptjs" alt="bcryptjs">BCryptjs</a>
- <a target="_blank" href="https://www.npmjs.com/package/bee-queue" alt="bee-queue">Bee Queue</a>
- <a target="_blank" href="https://www.npmjs.com/package/date-fns" alt="date-fns">Date FNS</a>
- <a target="_blank" href="https://www.npmjs.com/package/dotenv" alt="dotenv">Dotenv</a>
- <a target="_blank" href="https://www.npmjs.com/package/express-async-errors" alt="express-async-errors">Express Async Errors</a>
- <a target="_blank" href="https://www.npmjs.com/package/express-handlebars" alt="express-handlebars">Express Handlebars</a>
- <a target="_blank" href="https://www.npmjs.com/package/jsonwebtoken" alt="jsonwebtoken">Jsonwebtoken (JWT)</a>
- <a target="_blank" href="https://www.npmjs.com/package/multer" alt="multer">Multer</a>
- <a target="_blank" href="https://www.npmjs.com/package/nodemailer" alt="nodemailer">Nodemailer</a>
- <a target="_blank" href="https://www.npmjs.com/package/nodemailer-express-handlebars" alt="nodemailer-express-handlebars">Nodemailer Express Handlebars</a>
- <a target="_blank" href="https://www.npmjs.com/package/pg" alt="pg">PG</a>
- <a target="_blank" href="https://www.npmjs.com/package/pg-hstore" alt="pg-hstore">PG Hstore</a>
- <a target="_blank" href="https://www.npmjs.com/package/youch" alt="youch">Youch</a>
- <a target="_blank" href="https://www.npmjs.com/package/Yup" alt="Yup">Yup</a>

### :camera: **Registro de funcionamento**

<h1 align="center">
  <img alt="Insomnia" title="Insomnia" src="https://raw.githubusercontent.com/GustavoBlaze/fastfeet/master/demo/api.png" />
</h1>

<h1 align="center">
  <img alt="Mailtrap" title="Mailtrap" src="https://raw.githubusercontent.com/GustavoBlaze/fastfeet/master/demo/mail.png" />
</h1>

<h1 align="center">
  <img alt="Sentry" title="Sentry" src="https://raw.githubusercontent.com/GustavoBlaze/fastfeet/master/demo/sentry.png" />
</h1>
