import Server from './server/server';
import router from './router/router';
import MySQL from './mysql/mysql';

const server = Server.init(3000);
server.app.use(router);

MySQL.instance; //llama la propiedad

server.start(()=>{
    console.log('server on port 3000');
});
