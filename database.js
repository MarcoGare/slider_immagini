const fs = require('fs');
const mysql = require("mysql2");
const conf = JSON.parse(fs.readFileSync('conf.json'));

const connection = mysql.createConnection(conf);

const executeQuery = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        connection.query(sql, params, (err, result) => {
            if (err) {
                console.error(err);
                reject(err);
            }
            resolve(result);
        });
    });
};

const database = {
    createTable: () => {
        return executeQuery(`
            CREATE TABLE IF NOT EXISTS images (
                id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(255) NOT NULL
            )
        `);
    },
    insert: (name) => {
        let sql=
       `INSERT INTO images (name) VALUES ('$NAME')`;
       sql = sql.replace('$NAME',name);
       return executeQuery(sql);
    },
    select: () => {
        const sql =
         `SELECT id, name FROM images`;
         return executeQuery(sql);
    },
    delete: (id) => {
        let sql=
       `DELETE FROM images
       WHERE ID=$ID`
       ;
       sql = sql.replace('$id',id);
       return executeQuery(sql);
    }
};

module.exports = database;