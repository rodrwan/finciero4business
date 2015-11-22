# Finciero Admin Panel

In order to build this repository you previously need to install:

- [NodeJS](https://nodejs.org/)
- [sass](http://sass-lang.com/])

Then run:
```sh
$ npm install
```

This command install all Node.js dependencies and after that a bash script will run `bower install` in order to install all dependencies, then will run `sequelize migrates` to initialize the database and finally run `grunt`, this final task will build the entire site (by default this task will run `grunt dev`).

# Local build

When `npm install` run in local environment if `NODEJS_ENV` is not set to `production` will run sequelize migrate using `sqlite` and run grunt dev.

Also you can run:

```sh
$ npm run build
```

Which build the entire application, installing all dependencies, set environment variables, create a local database, and run some migration with dummy data.

The dev username and password are:

```
username: dev@finciero.com
password: development
```

# Heroku deploy

To deploy into heroku you need add the following BUILDPACK:

```sh
heroku config:add BUILDPACK_URL=https://github.com/ddollar/heroku-buildpack-multi.git
```

This buildpack allow us to run multiple buildpacks, this builds are set in `.buildpacks`.
In this case we set two buildpacks, one for ruby and other for nodejs and grunt.

`npm install` will run `bower install`, sequelize in production and `grunt build`.

# Directory app structure

And this is an example about how is the directory structure.

```
app/
├── assets/
├── styles/
└── scripts/
    ├── components/
    |   └── example/
    |       ├── example.mdl.js
    |       └── example.drv.js
    ├── configurations/
    |   └── enviroment.cfg.js
    ├── filters/
    |   └── example/
    |       ├── example.mdl.js
    |       └── example.flt.js
    ├── routes/
    |   └── example/
    |       ├── _directive-example/
    |       |   ├── directive-example.drv.js
    |       |   ├── directive-example.mdl.js
    |       |   └── directive-example.html
    |       ├── example.mdl.js
    |       ├── example.ctl.js
    |       ├── example.html
    |       └── example.scss
    ├── services/
    |   └── example/
    |       ├── example.mdl.js
    |       └── example.svc.js
    └── validations/
        └── example/
            ├── example.mdl.js
            └── example.drv.js
```
# develop new sections

To add a new section
