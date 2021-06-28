# RealWorld API

This is an RealWorld API made with Node.js and PostgreSQL. I hope you enjoy it!

## Technologies

- JavaScript
- Node.js
- Express
- PostgreSQL
- Sequelize ORM

## Tips

Pay atention to the .env.example and docker-compose.yml files. There's some tips inside this files that will help you to run the project.
If you already have a configured database, then you just need to configure the .env file.
If you are starting a new database, you will need to run the migrations. To do that, just follow these steps:

- Make sure you are inside the 'api' folder:
  `./realworld/api`
- Run the migrates:
  `npx sequelize db:migrate`

That's it!
