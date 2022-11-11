var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var carrerasRouter = require('./routes/carreras');
var materiasRouter = require('./routes/materias');
var alumnoRouter = require('./routes/alumno');
var cursaRouter = require('./routes/cursa');
var app = express();
// Token
const jwt = require('jsonwebtoken');
const keys = require('./keys');

app.set('key', keys.key);
app.use(express.json());

// Autenticación de credenciales de usuario y obtencion del token
app.get('/', (req, res)=> {
  res.send('HOLA MUNDO');
});

// Autenticación de credenciales de usuario y obtencion del token
app.post('/login', (req, res)=> {
  if(req.body.usuario == 'admin' && req.body.pass == '12345'){
      const payload = {
          check:true
      };
      const token = jwt.sign(payload, app.get('key'), {
          expiresIn: '7d'
      });
      res.json({
          message: '¡AUTENTICACIÓN EXITOSA!',
          token
      });
  }else{
      res.json({
          message:'Usuario y/o contraseña son inconrrectos'
      });
  }
});


// Verificación del token JWT
const verificacion = express.Router();

verificacion.use((req, res, next) =>{
    // Se guarda el tipo de token
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    //console.log(token);

    if(!token){
        // Verificacion del tipo de token
        res.status(401).send({
            error: 'Es necesario ingresar un token de autenticación'
        })
        return
    }
    if(token.startsWith('Bearer ')){
        // Quito el incio 'Bearer '
        token = token.slice(7, token.length);
        console.log(token);
    }
    if(token){
        // Verifico el token , y con next continua la peticion
        jwt.verify(token, app.get('key'), (error, decoded)=>{
            if(error){
                return res.json({
                    message: 'El token no es válido'
                });
            }else{
                req.decoded = decoded; 
                next();
            }
        })
    }
});


app.get('/info', verificacion, (req, res)=>{
    res.json('INFORMACION IMPORTANTE ENTREGADA');
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/car', carrerasRouter);
app.use('/mat',materiasRouter);
app.use('/alu',alumnoRouter);
app.use('/cur',cursaRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});




module.exports = app;
