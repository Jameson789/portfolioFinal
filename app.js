const express = require('express');
const mariadb = require('mariadb')

const app = express();
const PORT = 3000;

const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    database: 'guestBook',
    password: '1234'
});

async function connect() {
    try {
        const conn = await pool.getConnection();
        console.log("Connected to mariaDB");
        return conn;
    } catch (err) {
        console.log('Error connecting to MariaDB: ' + err);
    }
};
//connect(); //for testing

app.use(express.urlencoded({ extended: false }));
app.use(express.static('views'));


app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('home');
}); 

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});