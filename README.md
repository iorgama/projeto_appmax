# projeto_appmax

O front-end foi desenvolvido com o Framework Vue.js2. A interface visual foi desenvolvida com o uso do bootstrap-vue (e suas dependências: popper.js, portal-vue e bootstrap).  Para a comunicação com a API foi utilizado axios. Para gerenciamento de estado foi utilizado o vuex e para a navegação o vue-router. 
Para o desenvolvimento do back-end foi utilizado o php 7.3, com o auxílio do framework laravel na versão 8. O banco de dados utilizados é o MYSQL 8 e o ORM é o eloquent do próprio laravel.
O servidor utilizado foi o Nginx e o sistema de autenticação foi o JWT integrado ao laravel pelo TymonJWT. Por fim, foram feitos alguns testes unitários com o phpunit.

## Configurações / Instruções

- Para rodar localmente precisa ser alterada no httpService.js localizado na pasta de mesmo nome a baseURL, que está com a seguinte configuração:
>baseURL: "http://laravel-web-service.local/api".
- Também atentar para os valores definidos no .env:
```
APP_DEBUG=false 
APP_URL=http://laravel-web-service.local/
```
- Para instalar as dependências do composer:
``` composer update --no-dev ```

- Para instalar as dependências do json:
``` npm install --only=prod ```

- Para compilar:
``` npm run prod ```

Por último, para este projeto inicial optei por não utilizar paginação no componente de relatório e de produtos.

