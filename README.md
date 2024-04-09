## Product APP
Um app para listagem e edição de produtos, com funcionamento online e offline.


### Implementações:
- Banco de dados local para armazenamento de produtos.
- Funcionalidade para leitura de códigos de barras.
- Indicador informando se o aplicativo está operando no modo offline.
- Autenticação, incluindo validação de formulários.
- Lista de produtos disponíveis.
- Formulários para edição de informações de produtos.
- Leitura de códigos de barras através da câmera do dispositivo, possibilitando a atualização da quantidade do item.
- Sincronização de produtos, caso haja alterações na quantidade enquanto o aplicativo estiver offline.
- Testes de componentes, utilitarios e telas.

### Rodando a aplicação

Para clonar essa aplicação, irá precisar do [Git](https://git-scm.com) e [Node.js](https://nodejs.org/) no seu computador. Prossiga usando os seguintes comandos:

```bash
# Clone esse repositório
$ git clone https://github.com/eugustavo/product-app

# Entre no repositótio
$ cd product-app

# Instale as dependências
$ npm install

# Rode o projeto
$ npx expo start
```

### Rodando os testes

```bash
$ npm run test
```

