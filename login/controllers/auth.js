const mysql = require("mysql");
const jwt =require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "",
    database: 'node_sql_login'   

});

exports.login = async function(req,res){
    try{
         const{email,password}=req.body;
         if(!email || !password){
             return res.status(400).render('login',{
                massage:'Please provide an email and password' 
             })
         }

         db.query('SELECT * FROM users WHERE email = ?',[email],async function(error, results){
             if(!results || !(await bcrypt.compare(password,results[0].password))){
                res.status(401).render('login',{
                    massage:'Email or Password is Incorrect'
                })
             }
             else{
                // const id= results[0].id;
                res.redirect("/")
                 
                 


                 //const token= jwt.sign({id})
             }
         })


    }catch(error){
        console.log(error);
    }
}

exports.register=function(req,res){
console.log(req.body);
//const name=req.body.name;
//const email= req.body.email;
//const password= req.body.password;
//const passwordConform= req.body.passwordConform;
const { name,email,password,passwordConform}=req.body;

db.query('SELECT email FROM users WHERE email= ?',[email],async function(error,results){
    if(error){
        console.log(error);
    }
    if(results.length>0){
        return res.render('register',{
            massage: 'That email is already in use'
        })
    }
   // else if(password !== passwordConform){
        //return res.render('register',{
          //  massage: 'password not match'
      //  });
   // }

    let hashedPassword = await bcrypt.hash(password, 8);
    console.log(hashedPassword);

    db.query('INSERT INTO users SET ?',{name: name,email: email,password:hashedPassword},function(error,results){
        if(error){
            console.log(error);
        }
        else{
            console.log(results);
            return res.render('register',{
                massage:'user registered'
            });
        }
    })
})

//res.send("Form submitted");
}