const fs = require('fs');
const mysql = require('mysql12');
const conf = JSON.parse(fs.readFileSync('conf.json'));
const ssl={
    ca: fs.readFileSync(__dirname + '/ca.pem')
}
const connection = mysql.createConnection(conf);


const executeQuery = (sql) => {
    return new Promise((resolve, reject) => {
        connection.query(sql, function (err, result){
        if(err){
            console.error(err);
            reject();
        }
        console.log('corretto');
        resolve(result);
        });
    })
}

const database = {
    createTable: () => {
        return executeQuery(
        `CREATE TABLE IF NOT EXISTS images
        ( id INT PRIMARY KEY AUTO_INCREMENT,
            url VARCHAR(255) NOT NULL)`
        );
    },
    insert: (url) => {
        let sql = `INSERT INTO images (url) VALUES ('$URL')`;
        sql = sql.replace("$URL", url);
        return executeQuery(sql); 
    },
    select: () => {
        const sql = `SELECT id, url FROM images`;
        return executeQuery(sql);
    },
    delete: (id) => {
        let sql = `DELETE FROM images WHERE id=$ID`;
        sql = sql.replace('$ID', id);
        return executeQuery(sql);
    },
};


module.exports = database;