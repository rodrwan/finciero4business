#!/bin/bash
./node_modules/.bin/bower install

# if [ "$NODEJS_ENV" = "production" ]; then
#   # ./node_modules/.bin/sequelize --env production db:migrate
# else
#   echo "Setting .env"
#   node setup.js
#   echo "done!"
#   ./node_modules/.bin/sequelize db:migrate
#   ./node_modules/.bin/grunt dev
# fi;
