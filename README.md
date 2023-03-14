# Liebre Market

Learning project to learn full stack fundamentals.

This is a simple replica inspired by Mercado Libre with non-commercial purpose.
Feel free to fork the repo and use it as you want.

---

## Technologies used

| Tecnology          |
|--------------------|
| Azure Web Apps     |
| Azure DB for MySQL |
| Express            |
| Sequelize          |
| Ejs                |
| Base JavaScript    |
| Plain CSS          |

---

## Try it for yourself

Currently, Liebre Market is deployed with Azure at: [Liebre Market](https://liebre-market.azurewebsites.net/)

Enter and try it out!!

---

## Installation and usage

### Initial setup

To follow these instructions you need `git`, `node`, and `npm`
installed in your computer

First, copy the repo in your local environment

```git
git clone git@github.com:tizor98/liebre-market.git
```

Then install all dependencies

```PowerShell
npm install
```

Execute `structure.sql` file in the base folder to define the database structure
and fundamental data (in categories and countries) in a MySQL service.

Define a `NODE_ENV` (for local usage a dev value is recommended) environment variable with the method of your choice.

This project use `custom-env` package. Thus you can add .env.[environment] files in the base folder and
the project will read an specific file according to the NODE_ENV value. 
To an initial setup I recommend to include an .env.dev file with the following ENV variables


```
PORT=[any port of your choice]
DB_USERNAME=[your user]
DB_PASSWORD=[your password]
DB_DATABASE=[database name for this project]
DB_HOST=[host ip]
DB_DIALECT='mysql'

For a prod environment only:
DB_SSL_CA=[your SSL ca certificate to connect to a database with SSL]
```

Now, you are ready to start Liebre Market

```PowerShell
mpm run dev
```

Now, you can make a get request from your browser to `http://127.0.0.1:[PORT]`

### Available scripts

This is for a prod env in a local environment.
Define a `NODE_ENV` value equals to prod
```PowerShell
npm start
```

This is for a prod env in a cloud environment. It only starts the app
```PowerShell
npm run deploy
```
Similar to `npm start`, but define `NODE_ENV=dev`, for a development environment.
Thus reading the ENV variables define in `.env.dev` file.
```PowerShell
npm run dev
```

---

## Author

[Alberto Ortiz](https://github.com/tizor98)

## End