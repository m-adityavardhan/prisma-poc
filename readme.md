1 .npm i prisma typescript ts-node @types/node nodemon --save-dev . explain why ts-node and nodemon and why save-dev
2. create tsconfig.json. explain what and why. with few common config and why in single line explain
3. initialize prisma with npx prisma init 
npm i @prisma/client
4. setup local db like postgres and give the db url in .env
DATABASE_URL="postgresql://[name]:[pass]@localhost:5432/[db]" - general url fill with your db
run migrate deploy to sync the local db with the current.

if any changes in schema.oprisma you need to run migrate dev to sync the db and generate new synced up client.

few explanation points on what is migrate and on dev,reset,deploy
generate explanation
different field types avalaible with example
different  relation ships with examples
diffrent attributs with examples
enum with example
different types of create commands with examples
create, include , select , createMany
different types of read with examples
findunique, findfirst, findmany, with simple examples
distinct, take, skip ,orderby in single example 
example of update and updateMany
delete and deleteMany
what is seeding with example and explanation of process like adding in package.json and 
running npx prisma db seed
explain prisma db command, push, pull and seed

