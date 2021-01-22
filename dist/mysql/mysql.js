"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql");
class MySQL {
    constructor() {
        this.conectado = false;
        console.log('initialized class');
        this.cnn = mysql.createConnection({
            host: 'localhost',
            user: 'node_user',
            password: '123456',
            database: 'node_db'
        });
        this.concetarBD();
    }
    static get instance() {
        return this._instance || (this._instance = new this()); //Evita que cuando se llame muchas veces el metodo
        //Haya varias cadenas de conexion
    }
    static ejecutarQuery(query, callback) {
        this.instance.cnn.query(query, (err, results, fields) => {
            if (err) {
                console.log('err in query');
                console.log(err);
                return callback(err);
            }
            results.length === 0 ? callback('El registro solicitado no existe') : callback(null, results);
        });
    }
    concetarBD() {
        this.cnn.connect((err) => {
            if (err) {
                console.log(err.message);
                return;
            }
            this.conectado = true;
            console.log('DATABASE ONLINE');
        });
    }
}
exports.default = MySQL;
