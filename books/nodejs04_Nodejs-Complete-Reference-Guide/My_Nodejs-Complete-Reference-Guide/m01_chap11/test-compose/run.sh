docker-compose stop
docker-compose build
docker-compose up --force-recreate -d

docker cp ../notes/test notes-test:/notesapp

docker exec -it --workdir /userauth userauth-test mkdir -p /userauth/test
docker cp ./userauth/test.js userauth-test:/userauth/test/test.js
docker cp ./userauth/package.json userauth-test:/userauth/test/package.json

docker ps
docker network ls

sleep 20
docker exec -it --workdir /userauth/test -e DEBUG= userauth-test npm install

docker exec -it --workdir /notesapp/test -e DEBUG= notes-test npm run test-notes-memory
sleep 3
docker exec -it --workdir /notesapp/test -e DEBUG= notes-test npm run test-notes-fs
sleep 3
docker exec -it --workdir /notesapp/test -e DEBUG= notes-test npm run test-notes-levelup
sleep 3
docker exec -it --workdir /notesapp/test -e DEBUG= notes-test npm run test-notes-sqlite3
sleep 3
docker exec -it --workdir /notesapp/test -e DEBUG= notes-test npm run test-notes-sequelize-sqlite
sleep 3
docker exec -it --workdir /notesapp/test -e DEBUG= notes-test npm run test-notes-sequelize-mysql
sleep 3
docker exec -it --workdir /notesapp/test -e DEBUG= notes-test npm run test-notes-mongodb

docker exec -it --workdir /userauth/test -e DEBUG= userauth-test npm install
#docker exec -it -e DEBUG= userauth-test URL_USERS_TEST=http://127.0.0.1:3333  ./node_modules/.bin/mocha test.js
#docker exec -it --workdir /userauth/test -e DEBUG= userauth-test npm run test-api
sleep 3
docker exec -it  --workdir /userauth/test -e DEBUG= -e URL_USERS_TEST=http://127.0.0.1:3333 userauth-test  ./node_modules/.bin/mocha test.js

docker exec -it --workdir /userauth userauth-test mkdir -p /userauth/test/notesui
docker cp notesui/package.json userauth-test:/userauth/test/notesui/.
docker cp notesui/uitest.js userauth-test:/userauth/test/notesui/.

docker exec -it --workdir /userauth userauth-test npm run setupuser
sleep 3
docker exec -it --workdir /userauth/test/notesui userauth-test npm install
sleep 3
docker exec -it --workdir /userauth/test/notesui -e DEBUG= userauth-test npm run uitest

#docker-compose stop