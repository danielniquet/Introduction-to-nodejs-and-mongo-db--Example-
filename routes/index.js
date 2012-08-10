var SU = require('../models/subscriptors') 

module.exports = function(app){
	
	app.get('/', function(req, res){
		SU.list(function(e, subs){
			res.render('index', { title: 'Lista de suscriptores',error:'', subscriptors: subs });
		})
		
	})
	
	app.post('/', function(req, res){
		SU.new({name: req.param('name'), email: req.param('email')}, function(o){
			SU.list(function(e, subs){
				res.render('index', { title: 'Lista de suscriptores', error:o, subscriptors: subs });
			})
		})
	})
	
	app.post('/save', function(req,res){
		SU.edit({name: req.param('name'), email:req.param('email'), id:req.param('id')}, function(o){
			if(o){
				res.redirect('/');
			}else{
				resp.send('Error al actualiza registro',400)
			}
		})
	})
	
	app.post('/delete', function(req, res){
		SU.delete(req.body.id, function(e,obj){
			if(!e){
				res.send('ok',200)
			}else{
				res.send('El subscriptor a eliminar no existe', 400)
			}
			
		})
	})
	
}