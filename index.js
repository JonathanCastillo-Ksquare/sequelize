const { Sequelize, DataTypes, Model } = require('sequelize');
const dotenv = require("dotenv");

dotenv.config();

//  URL:: https://www.google.com
// URI:: postgres://testSecure:root@localhost:5432/testdb2

const DB_PASS = process.env.DB_PASS;
const DB_USER = process.env.DB_USER;
const DB_NAME = process.env.DB_NAME;

// 1ra forma (mas eficiente)
// const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASS}@localhost:5432/${DB_NAME}`);

// 2da forma
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres'
})

// 1er metodo sin usar typescript
// const Person = sequelize.define('Person', {
//     firstName: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     lastName: {
//         type: DataTypes.STRING,
//     }
// })

// 2do metodo se presta mas para usar typescript

class Person extends Model { }

Person.init({
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
    }
}, {
    name: 'Person',
    sequelize
})

try {
    sequelize.authenticate().then((value) => {
        console.log(value);
    });
    console.log("DB connection is ok");
} catch (error) {
    console.log("Unable to reach DB", error);
}

Person.sync();
// Person.sync( {alter: true, force: true});