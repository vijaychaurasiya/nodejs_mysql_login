const express =require("express");
const path = require("path");
const mysql = require("mysql");

//const dotenv =require("dotenv");

//dotenv.config({path: '.env'});

const app = express();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "",
    database: 'node_sql_login'   

})

const publicDirectory = path.join(__dirname,'./public')
app.use(express.static(publicDirectory))
 
app.use(express.urlencoded({extended:false}));

app.use(express.json());

app.set('view engine','hbs');

db.connect(function(error){
    if(error){
        console.log(error) 
    }
    else{
        console.log("mysql connected")
    }
})

app.use('/',require('./routes/pages'));
 
app.use('/auth',require('./routes/auth'));

app.listen(1000,function(){
    console.log("server started at 1000");  
})