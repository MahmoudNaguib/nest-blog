<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>


## Description

Blog API using NestJS with the following features
```bash
Users: Register/Login
Authentication: Using token based return after successfull login. This token will send in header (Authorization:'Bearer {token}')
Token will be changes if user Logout/Edit Profile/Change password
Edit Profile/Change password/Logout
Posts Sections: List
Posts : List / Details / Filter 
My Posts: List/Details/Create/Edit/View/Delete
Comments: List post comments / Create comments
```


## Installation

```bash
$ git clone https://github.com/MahmoudNaguib/nest-blog.git
$ cd nest-blog
$ cp .env.example .env  // then update the database configuation 
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod

# Run database migration
$ npm run migration

# Run database seeders
$ npm run seed
```

## Default user
```bash
Email: user1@demo.com
Password: demo@12345
```





## POSTMAN API
```bash
https://documenter.getpostman.com/view/375068/UVRAJSzK
```

## Serving uploaded 
```bash
{baseURL}/uploads/small/{imageName}
{baseURL}/uploads/large/{imageName}
```

## Serving assets
```bash
{baseURL}/assets/{.....}
```