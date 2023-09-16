docker run --name db-notes --env MYSQL_RANDOM_ROOT_PASSWORD=true \
--env MYSQL_USER=notes --env MYSQL_PASSWORD=notes123 \
--env MYSQL_DATABASE=notes \
--volume `pwd`/my.cnf:/etc/my.cnf \
--volume `pwd`/../notes-data:/var/lib/mysql \
--network frontnet mysql/mysql-server:5.7
