import mysql = require('mysql');

export default class MySQL{
    private static _instance: MySQL;

    cnn: mysql.Connection;
    conectado: boolean =false;

    constructor(){
        console.log('initialized class');

        this.cnn = mysql.createConnection({
            host: 'localhost',
            user: 'node_user',
            password : '123456',
            database : 'node_db'
        });
        this.concetarBD();
    }

    public static get instance(){
        return this._instance || (this._instance = new this()); //Evita que cuando se llame muchas veces el metodo
                                                                //Haya varias cadenas de conexion
    }

    static ejecutarQuery(query: String, callback : Function){
        this.instance.cnn.query(query, (err, results: Object[], fields)=>{
            if(err){
                console.log('error in query');
                console.log(err);
                return callback(err);     
            }
            results.length === 0 ?  callback('El registro solicitado no existe') : callback(null, results);
        })
    }


    private concetarBD(){
        this.cnn.connect((err:mysql.MysqlError) =>{
            if(err) {
                console.log(err.message);
                return;
            }
            this.conectado = true;
            console.log('DATABASE ONLINE');
        })
    }
}