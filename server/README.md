# Comandos para rodar o Docker com PostgreSQL

docker run \
 --name postgres \
 -e POSTGRES_USER=joaotavares \
 -e POSTGRES_PASSWORD=senhaaleatoria \
 -e POSTGRES_DB=postgres \
 -p 5432:5432 \
 -d \
postgres \

docker ps \
 docker exec -it postgres /bin/bash

docker run \
--name adminer
-p 8080:8080 \
 --link postgres:postgres \
 -d \
 adminier

# Comandos para rodar o Docker com MongoDB

docker run \
 --name mongodb \
 -p 27017:27017 \
 -e MONGO_INITDB_ROOT_USERNAME=admin \
 -e MONGO_INITDB_ROOT_PASSWORD=admin \
 -d \
 mongo:4

docker run \
 --name mongoclient \
 -p 3000:3000 \
 -link mongodb:mongodb \
 -d \
 mongoclient/mongoclient

docker -exect -it mongodb \
 mongo --host localhost -u admin -p admin --authenticationDatabase admin \
 --eval "db.getSiblingDB('audio').createUser({user: 'joaotavares', pwd: 'senhaaleatoria', roles: [{role: 'readWrite', db: 'audio'}]})"
