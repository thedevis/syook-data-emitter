# syook-data-emitter

Run Emitter Service Using Docker

> docker build . -t syook/emitter

> docker run -it -p 3009:3009 --env-file=.test.env syook/emitter

open url 
http://localhost:3001/ping to check service is working


Run Without Docker
> cp .test.env .env

> npm install

> npm start


