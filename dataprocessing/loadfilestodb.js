const sqlite = require('sqlite');
const {promisify} = require('util');
const fs = require('fs');
const readFileAsync = promisify(fs.readFile);

function range(start, count) {
    return Array.apply(0, Array(count))
        .map((element, index) => index + start);
}

let initDbScript = './migrations/001-init.sql';
async function loadFilesToDB() {
    try {
        const db = await sqlite.open('../database.sqlite');

        let createdb = await readFileAsync(initDbScript, {encoding: 'utf8'});
        console.log(createdb);
        await db.exec(createdb);

        let numbers = range(100,72);
        for (const r of numbers) {
            let filename =`./migrations/${r}-out.sql`;
            console.log(filename);
            let inserts = await readFileAsync(filename, {encoding: 'utf8'});
            await db.exec(inserts);
        }
    } catch (e) {
        console.log(e);
    }
}

//loadFilesToDB()
//    .then(() =>console.log("Done"));

module.exports = loadFilesToDB;