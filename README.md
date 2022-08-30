<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">Blog Using NestJs and Mysql</p>



## Installation

```bash
$ git clone https://github.com/MahmoudNaguib/nest-blog.git
$ cd nest-blog

// Update your environment variables 
$ cp .env.example .env  

$ npm install

// Give write access to public/uploads
$ sudo chmod -R 777 public/uploads 
```

## Running the app

```bash
# Run database migration
$ npm run migration

# Run database seeders
$ npm run seed

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod

URL: localhost:8000
```

## Features

```bash
- Users: Register/Login

- Authentication: Using token based return after successfull login. This token will send in header (Authorization:'Bearer {token}')

- Token will be changes if user Logout/Edit Profile/Change password

- Edit Profile/Change password/Logout

- Posts Sections: List

- Posts : List / Details / Filter 

- My Posts: List/Details/Create/Edit/View/Delete

- Comments: List post comments / Create comments
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
```bash
Add the following variables
url=localhost:8000
email=user1@demo.com
password=demo@12345 
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