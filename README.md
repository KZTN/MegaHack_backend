# MegaHack_backend

Este é o backend da plataforma Origin, marketplace de venda de produtos alimentícios para pequenos estabelecimentos. O repositório do front-end se encontra em https://github.com/KZTN/MegaHack_frontend (acesse para mais detalhes)



## Começando...
Essas instruções fornecerão uma cópia do projeto em execução na sua máquina local para fins de desenvolvimento e teste.

### Pré-requisitos
O que você precisa para instalar o software:

```
node v12.x
yarn 1.22.4
git
```
> Para uma melhor experiência no ambiente de testes com o servidor API REST, recomenda-se o uso do [insomnia](https://insomnia.rest/)

### Instalando o projeto 🚀
Clonando o projeto:

```
git clone https://github.com/KZTN/MegaHack_backend.git
```

Navegando até a pasta do projeto:

```
cd MegaHack_backend
```

Baixando as dependências do projeto:

```bash
yarn install
```

Rodando o projeto:

```bash
yarn start
```


Visite http://localhost:3000 com o seu navegador para ver o resultado. 🎉


# 🧪 Tenologias utilizadas: 

 - [NodeJS](https://nodejs.org/en/docs/) - Plataforma da aplicação
 - [Javascript](https://devdocs.io/javascript/) - Linguagem de programação
 - [multer-s3](https://github.com/badunk/multer-s3#readme) - Recurso de envio de imagens para a CDN da AWS S3
 - [Mongoose](https://mongoosejs.com/docs/api.html) - ORM de Banco de dados do mongodb utilizado na aplicação
 - [Express](https://expressjs.com/en/api.html) - Endpoint de chamadas e requisições HTTP
 - [Yup](https://github.com/jquense/yup) - Validator de compor de requisições a API


## Como contribuir

- Faça um fork desse repositório;
- Cria uma branch com a sua feature: `git checkout -b minha-feature`;
- Faça commit das suas alterações: `git commit -m 'feat: Minha nova feature'`;
- Faça push para a sua branch: `git push origin minha-feature`.

Depois que o merge da sua pull request for feito, você pode deletar a sua branch.
