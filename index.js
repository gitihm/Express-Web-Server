var express = require('express')
var app = express()
var session = require('express-session')
var BodyParser = require('body-parser')

app.set('views', './views')
app.set('view engine', 'ejs')

app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 },
   resave : false, saveUninitialized: false }))
app.use(BodyParser())
var status = true
app.get('/', (req, res)=>{
        res.render('form',{status})
    
    
    
 })
app.get('/admin',(req,res)=>{
    if(req.session.email||req.session.password){
        res.render('admin')
    }else{
        res.render('loginAgain')
        status =true
    }
})
app.post('/admin', (req, res)=>{
    if(req.body.password!=='240311'){
        status = false
        res.redirect('/')
    }else{
        status =true
        data= {
            email : req.body.email,
            password : req.body.password
        }
        req.session.email = req.body.email
        req.session.password = req.body.password
        res.render('admin',{data})
    }
 })
 app.get('/logout',(req,res)=>{
     req.session.destroy((err)=>{
        if(err) console.log(err)
        else{
            res.redirect('/')
            status = true
        } 
     })
 })
app.listen(8080,()=>{
    console.log("running : 8080")
});