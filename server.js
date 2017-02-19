//Server.js
var express = require('express');
var app = express();
var mongoose = require('mongoose');
//Conexion con la base de datos
mongoose.connect('mongodb://david7art:07011999@ds056979.mlab.com:56979/angulartodo');

app.configure(function(){
	//lOCALIZACION DE LOS FICHEROS ESTATICOS
	app.use(express.static(__dirname +  "/public"))
	//Muestra un log de todos los request en la consola
	app.use(express.logger("dev"));
	//Permite cambiar el HTML con el metodo POST
	app.use(express.bodyParser());
	//Simula DELEte y PUT
	app.use(express.methodOverride());
})
//Definicion de modelos
var Todo = mongoose.model('Todo',{
	text: String
});
//Rutas de el Api
app.get('/api/todos',function(req,res){
	Todo.find(function(err,todos){
		if(err){
			res.send(err)
		}
		res.json(todos);
	})
})
app.post('/api/todos',function(req,res){
	Todo.create({
		text: req.body.text,
		done: false
	}, function(err, todo){
		if(err){
			res.send(err);
		}
		Todo.find(function(err,todos){
			if(err){
			res.send(err)
		}
		res.json(todos);
	   });

	})
});
app.delete('/api/todos/:todo',function(req,res){
	Todo.remove({
		_id: req.params.todo
	},function(err,todo){
		if(err){
			res.send(err);
		}
		Todo.find(function(err,todos){
			if(err){
				res.send(err);
			}
			res.json(todos);
		});
	})
});

app.get('*',function(req,res){
	res.sendfile('/public/index.html');
})

app.listen(process.env.PORT || 8080,function(){
	console.log("App Escuchando en el puerto 8080")
})