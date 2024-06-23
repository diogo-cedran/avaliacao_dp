# Avaliação Desafio Profissional - 2 Bimestre

# Alunos e RA:
* Diogo Tizolim Cedran - RA: 22014212-2
* Eduardo Voltatone - RA: 22207439-2
* Hudson Uccelli Matias dos Santos - RA: 22045746-2
* Pedro Henrique Magalhães Gomes - RA: 22087525-2


# Introdução
Este trabalho tem como objetivo desenvolver uma aplicação utilizando NestJS para gerenciar usuários e pokémons, integrando autenticação JWT e operações CRUD. O projeto foi elaborado para cumprir os requisitos propostos, utilizando a API pública PokeAPI(https://pokeapi.co/) para obtenção de dados sobre pokémons. A aplicação foi desenvolvida utilizando as seguintes ferramentas:
* Node.js: Plataforma de desenvolvimento em JavaScript para back-end.
* NestJS: Framework para construção de aplicações Node.js escaláveis e eficientes.
* MongoDB: Banco de dados NoSQL utilizado para armazenar dados dos usuários e pokémons.
* Postman: Ferramenta para testes de APIs RESTful.


# Requisitos do Trabalho
Utilizando a API que escolheu, desenvolva uma aplicação utilizando NestJS com as seguintes funcionalidades:
1 - Crie uma entidade e uma rota para "baixar" pelo menos 50 itens para sua base de dados da API escolhida pelo time.
2 - Crie todas as operações de CRUD para a entidade anterior, para que os dados sejam cadastrados, atualizados, listados e removidos via métodos HTTP.
3 - Crie uma entidade de usuário, e crie um sistema de cadastro e autenticação via JWT (crie todos os métodos de CRUD para o usuário, a senha do usuário deve ser criptografada).
4 - Adicione um Auth Guard para as rotas da entidade principal da sua aplicação, somente usuários autenticados poderão chamar essas rotas.
5 - Crie uma entidade para logar o tempo de resposta das rotas de sua API. Registre pelo menos o nome da rota chamada, o método utilizado e quanto tempo demorou para a solicitação terminar.
6 - Adicione Exceções a todos os métodos de sua controller, sendo que pelo menos uma delas deve ser de uma classe personalizada.
7 - Adicione validações de dados via class-validator.
8 - Crie um arquivo docker-compose para sua aplicação, onde pelo menos o banco de dados seja levantado para utilizar a aplicação.
9 - Exporte as requisições da sua aplicação para um arquivo .json e anexe a sua entrega.


# Instalação de Dependências
Para instalar todas as dependências necessárias, execute os seguintes comandos:
npm install @nestjs/common @nestjs/core @nestjs/mongoose @nestjs/jwt @nestjs/passport @nestjs/config mongoose passport passport-jwt passport-local bcrypt @nestjs/axios rxjs

npm install --save-dev @types/passport-local @types/bcrypt


# Estrutura do Projeto
O projeto está organizado da seguinte maneira:

* src/: Diretório principal contendo todos os arquivos fonte do projeto.
  * auth/: Contém arquivos relacionados à autenticação, incluindo controlador, serviço, estratégias de autenticação (local e JWT) e guardas de autenticação.
  * common/: Inclui exceções e outras funcionalidades comuns.
  * logs/: Contém arquivos para o módulo de logs, incluindo middleware, serviço e esquema de logs.
  * pokemon/: Contém arquivos para o módulo de pokémons, incluindo DTOs, controlador, serviço e esquema de pokémon.
  * users/: Contém arquivos para o módulo de usuários, incluindo DTOs, controlador, serviço e esquema de usuário.
  * app.module.ts: Módulo raiz da aplicação.
  * main.ts: Arquivo de entrada da aplicação.

 
# Configuração do Projeto

Arquivo .env
O projeto utiliza um arquivo .env para armazenar variáveis de ambiente sensíveis e configurações, como chaves secretas para JWT e outras configurações importantes. Este arquivo é essencial para garantir que informações confidenciais não sejam expostas diretamente no código fonte. O arquivo .env deve estar localizado na raiz do projeto.

Módulo de Autenticação (auth.module.ts)
Certifique-se de que o AuthModule esteja configurado corretamente para importar o módulo de configuração, desativar sessões no Passport e registrar o módulo JWT usando a chave secreta do arquivo .env.

Módulo Principal (app.module.ts)
Certifique-se de que o AppModule esteja configurado corretamente para importar o módulo de configuração, conectar-se ao MongoDB e incluir os módulos de autenticação, usuários e pokémons.

Docker Compose
O projeto inclui um arquivo docker-compose.yml que facilita a configuração e execução do ambiente de desenvolvimento. Este arquivo define serviços para o banco de dados MongoDB e para a aplicação Node.js.

Conteúdo do docker-compose.yml
O arquivo docker-compose.yml deve incluir a configuração para levantar o banco de dados e a aplicação. A aplicação deve ser iniciada com o comando: npm install && npm run start:dev

Para executar o ambiente Docker, use o comando: docker-compose up

# Execução
Iniciar o Servidor
Para iniciar o servidor, execute o seguinte comando: npm run start

Ou, se estiver usando Docker: docker-compose up

# Funcionalidades Implementadas
Autenticação e Autorização
Registro de Usuário: POST /auth/register
* Cria um novo usuário com os dados fornecidos (username, email e senha).
* A senha é criptografada antes de ser armazenada no banco de dados.
* Retorna um token JWT para autenticação subsequente.
  
Login de Usuário: POST /auth/login
* Autentica um usuário com base no username e senha fornecidos.
* Retorna um token JWT se as credenciais forem válidas.
  
# Operações CRUD para Usuários
Criar Usuário: POST /users
* Cria um novo usuário com os dados fornecidos (username, email e senha).
* A senha é criptografada antes de ser armazenada no banco de dados.

Listar Usuários: GET /users
* Retorna uma lista de todos os usuários.

Obter Usuário por ID: GET /users/
* Retorna os detalhes de um usuário específico com base no ID fornecido.

Atualizar Usuário: PUT /users/
* Atualiza os dados de um usuário específico com base no ID fornecido.
* A senha é recriptografada se for atualizada.

Remover Usuário: DELETE /users/
* Remove um usuário específico com base no ID fornecido.

# Operações CRUD para Pokémons
Buscar e Salvar Pokémons da API Externa: POST /pokemon/fetch
* Busca uma lista de pokémons de uma API externa e salva no banco de dados.

Criar Pokémon: POST /pokemon
* Cria um novo pokémon com os dados fornecidos (name e url).

Listar Pokémons: GET /pokemon
* Retorna uma lista de todos os pokémons.

Obter Pokémon por ID: GET /pokemon/
* Retorna os detalhes de um pokémon específico com base no ID fornecido.

Atualizar Pokémon: PUT /pokemon/
* Atualiza os dados de um pokémon específico com base no ID fornecido.

Remover Pokémon: DELETE /pokemon/
* Remove um pokémon específico com base no ID fornecido.

# Monitoramento de Logs
Registro de Logs
* O sistema registra logs de tempo de resposta das rotas da API, incluindo o nome da rota chamada, o método HTTP utilizado e o tempo de resposta.

Validações e Exceções
Validações de Dados
* Utilizando class-validator para garantir que os dados de entrada estejam corretos.
  
Exceções Personalizadas
* Implementação de exceções para garantir o tratamento adequado de erros, incluindo pelo menos uma exceção personalizada.

# Testes
Testes de Integração
* Os testes de integração são projetados para verificar se diferentes módulos da aplicação funcionam bem juntos.
Testes End-to-End (E2E)
* Os testes E2E simulam a experiência do usuário final, verificando se o sistema completo funciona corretamente.
Testes de Carga
* Os testes de carga são utilizados para avaliar o desempenho da aplicação sob condições de carga realistas.

# Execução dos Testes
Para executar os testes, use os seguintes comandos:

Testes de integração: 
npm run test:integration

Testes E2E: 
npm run test:e2e

Testes de carga: 
npm run test:load

# Fluxo de Autenticação
Registro
1 - Usuário envia uma solicitação POST /auth/register com os dados de registro.
2 - A senha é criptografada e o usuário é salvo no banco de dados.
3 - Um token JWT é gerado e retornado ao usuário.

Login
1 - Usuário envia uma solicitação POST /auth/login com suas credenciais.
2 - As credenciais são validadas e, se corretas, um token JWT é gerado e retornado ao usuário.

Acesso a Rotas Protegidas
1 - Para acessar rotas protegidas, o usuário deve incluir o token JWT no cabeçalho da solicitação como Authorization: Bearer <token>.
2 - O servidor valida o token e concede acesso se o token for válido.

# Considerações Finais
* Segurança: As senhas dos usuários são criptografadas usando bcrypt antes de serem armazenadas no banco de dados.
* Autenticação: A autenticação é gerenciada usando JWT, eliminando a necessidade de manter sessões no servidor.
* Modularidade: A aplicação é estruturada de maneira modular, facilitando a manutenção e expansão futura.
* Logs: O sistema de logs monitora o tempo de resposta das rotas para auxiliar no desempenho e depuração.
* Testes: Foram implementados testes de integração, E2E e de carga para garantir a robustez e confiabilidade da aplicação.
Este documento abrange a configuração, execução e funcionalidades principais do projeto. Para mais detalhes, consulte a documentação oficial do NestJS e as especificações da API utilizada.
