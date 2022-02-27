const express = require('express');
const mysql = require('mysql');
const multer = require('multer')();
const dbconfig = require('./dbconfig.js')

const app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connection = mysql.createConnection(dbconfig)

connection.connect();

async function getUser(login, password) {
    return new Promise(resolve => {
        connection.query('SELECT * FROM users WHERE login = ? AND password = ? LIMIT 1', [login, password], (error, result) => resolve(result[0]))
    })
}

function validateRegister(user) {
    const {name = '', surname = '', email = '', phone = '', login = '', password = '', passwordRepeat = '', agreement = false} = user;
    const errors = [];

    if (!name.match(/^[A-ZĆŻŹŚŁa-zćżźłś]+[a-ząćężźłóńś]{3,16}$/)) errors.push('Niepoprawne imie');
    if (!surname.match(/^[A-ZĆŻŹŚŁa-zćżźłś]+[a-ząćężźłóńś]{3,24}$/)) errors.push('Niepoprawne nazwisko');
    if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) errors.push('Niepoprawny format maila');
    if (!phone.match(/^[0-9\-\+]{9,15}$/)) errors.push('Niepoprawny format telefonu');
    if (!login.match(/^\w{3,16}$/)) errors.push('Login za krótki lub za długi');
    if (!password.match(/^\w{5,24}$/)) errors.push('Hasło za krótkie lub za długie');
    if (password !== passwordRepeat) errors.push('Hasła nie są identyczne');
    if (!agreement) errors.push('Zgoda jest wymagana')

    return errors
}

async function checkIfUserAlreadyExists(user) {
    return new Promise(resolve => {
        connection.query('SELECT * FROM users WHERE login = ? OR email = ? OR phone = ? LIMIT 1', [user.login, user.email, user.phone], (error, result) => resolve(result[0]))
    })
}

function registerUser(user) {
    connection.query('INSERT INTO users (name, surname, email, phone, login, password) VALUES (?, ?, ?, ?, ?, ?)', [user.name, user.surname, user.email, user.phone, user.login, user.password])
}

async function handleLogin(req, res) {
    const { login, password } = req.body;

    const user = await getUser(login, password);

    if (user) {
        res.json({
            isOk: true
        })
    } else {
        res.json({
            isOk: false,
            errors: ['Niepoprawne hasło lub login']
        })
    }

    res.end();
}

async function handleRegistration(req, res) {
    const user = req.body;
    const validationErrors = validateRegister(user);
    const isAlreadyRegistered = await checkIfUserAlreadyExists(user);
    
    if (validationErrors.length) {
        res.json({
            isOk: false,
            errors: validationErrors
        })
    } else if (isAlreadyRegistered) {
        res.json({
            isOk: false,
            errors: ["Użytkownik istnieje już w bazie"]
        })
    } else {
        registerUser(user);
        res.json({
            isOk: true
        })
    }

    res.end()
}

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
})

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/logowanie.html')
})

app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/public/rejestracja.html')
})

app.get('/main', (req, res) => {
    res.sendFile(__dirname + '/public/menu_rzeczy.html')
})

app.post('/login', multer.none(), handleLogin)

app.post('/register', multer.none(), handleRegistration)

app.listen(80)