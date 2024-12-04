const express = require('express');
const mariadb = require('mariadb')

const app = express();
const PORT = 3000;

const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    database: 'portfolio',
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
connect(); //for testing

app.use(express.urlencoded({ extended: false }));
app.use(express.static('views'));


app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('home');
}); 

app.get('/project', (req, res) => {
    res.render('addproject', {data: [], errors: []});
});

app.get('/addjob', (req, res) => {
    res.render('addjob', {data: [], errors: []});
}); 
app.post('/submitProject', (req, res) => {
    let newproject = {
        project: req.body.project, 
        timeWorked: req.body.timeWorked,
        skills: req.body.skills,
        desc: req.body.desc
    };
    console.log(newproject);
    let isValid = true;
    let errors = [];

    if (newproject.project.trim() === ''){
        isValid = false;
        errors.push("Add project title");
    } 
    if (newproject.timeWorked.trim() === ''){
        isValid = false;
        errors.push("Add Time Worked");
    } 
    if (newproject.skills.trim() === ''){
        isValid = false;
        errors.push("Add skills");
    } 
    if (newproject.desc.trim() === ''){
        isValid = false;
        errors.push("Add project description");
    } 
    if(!isValid) {
        res.render('addproject', {data: newproject, errors: errors});
        return;
    } 
    res.render('confirmation');
}); 

app.post('/submitJob', (req, res) => {
    let newjob = {
        company: req.body.company,
        timeWorked: req.body.timeWorked,
        position: req.body.position,
        skills: req.body.skills
    }; 
    let isValid = true;
    let errors = [];

    if (newjob.company.trim() === ''){
        isValid = false;
        errors.push("Add a company");
    } 
    if (newjob.timeWorked.trim() === ''){
        isValid = false;
        errors.push("Add time worked");
    }
    if (newjob.position.trim() === ''){
        isValid = false;
        errors.push("Add a position");
    }
    if (newjob.skills.trim() === ''){
        isValid = false;
        errors.push("Add skills");
    }

    if(!isValid) {
        res.render('addjob', {data: newjob, errors: errors});
        return;
    } 
    console.log(newjob.company);
    res.render('confirmation');
})

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});