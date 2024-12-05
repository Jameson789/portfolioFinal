const express = require('express');
const mariadb = require('mariadb');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.static('views'));

app.set('view engine', 'ejs');

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
connect();

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/project', (req, res) => {
    res.render('addproject', { data: [], errors: [] });
});

app.get('/addjob', (req, res) => {
    res.render('addjob', { data: [], errors: [] });
});

app.post('/submitProject', async (req, res) => {
    let newproject = {
        project: req.body.project,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        skills: req.body.skills,
        desc: req.body.desc,
    };

    let isValid = true;
    let errors = [];

    if (newproject.project.trim() === '') {
        isValid = false;
        errors.push("Add project title");
    }
    if (newproject.startDate.trim() === '') {
        isValid = false;
        errors.push("Add a start date");
    }
    if (newproject.endDate.trim() === '') {
        isValid = false;
        errors.push("Add an end date");
    }
    if (newproject.skills.trim() === '') {
        isValid = false;
        errors.push("Add skills");
    }
    if (newproject.desc.trim() === '') {
        isValid = false;
        errors.push("Add project description");
    }

    if (!isValid) {
        res.render('addproject', { data: newproject, errors: errors });
        return;
    }
    const conn = await connect();
    conn.query(`INSERT INTO project (project, startDate, endDate, skills, description) 
        VALUES ('${newproject.project}', '${newproject.startDate}', '${newproject.endDate}', '${newproject.skills}', '${newproject.desc}' );`);
    res.render('confirmation');

});

app.post('/submitJob', async (req, res) => {
    let newjob = {
        company: req.body.company,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        position: req.body.position,
        skills: req.body.skills,
    };

    let isValid = true;
    let errors = [];
    const conn = await connect();

    if (newjob.company.trim() === '') {
        isValid = false;
        errors.push("Add a company");
    }
    if (newjob.startDate.trim() === '') {
        isValid = false;
        errors.push("Add a start date");
    }
    if (newjob.endDate.trim() === '') {
        isValid = false;
        errors.push("Add an end date");
    }
    if (newjob.position.trim() === '') {
        isValid = false;
        errors.push("Add a position");
    }
    if (newjob.skills.trim() === '') {
        isValid = false;
        errors.push("Add skills");
    }

    if (!isValid) {
        res.render('addjob', { data: newjob, errors: errors });
        return;
    } 

    conn.query(`INSERT INTO job (company, startDate, endDate, position, skills) 
        VALUES ('${newjob.company}', '${newjob.startDate}', '${newjob.endDate}', '${newjob.position}', '${newjob.skills}' );`);
    res.render('confirmation');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
