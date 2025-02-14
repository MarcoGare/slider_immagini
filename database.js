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
                url VARCHAR(255) NOT NULL
            )
        `);
    },
    insert: (url) => {
        return executeQuery(`INSERT INTO images (url) VALUES (?)`, [url]);
    },
    select: () => {
        return executeQuery(`SELECT id, url FROM images`);
    },
    delete: (id) => {
        return executeQuery(`DELETE FROM images WHERE id = ?`, [id]);
    }
};

module.exports = database;