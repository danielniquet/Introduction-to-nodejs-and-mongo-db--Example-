var Db = require('mongodb').Db;
var Server = require('mongodb').Server;

var dPort = 27017;
var dHost = "localhost";
var dName = "video5";

var SUS = {};

SUS.db = new Db(dName, new Server(dHost, dPort, {auto_reconnect: true},{}));
SUS.db.open(function(e,d){
	if(e){
		console.log(e)
	}else{
		console.log("Conectado a la base de datos: "+dName);
	}
});

SUS.subscriptors = SUS.db.collection('subscriptors');

module.exports = SUS;

SUS.new = function(newData, callback){
	SUS.subscriptors.findOne({email: newData.email}, function(e,obj){
		if(obj){
			callback('Ese email ya existe.');
		}else{
			SUS.subscriptors.insert(newData, callback(null))
		}
	})
}

SUS.list = function(callback){
	SUS.subscriptors.find().toArray(function(e,res){
		if(e){
			callback(e)
		}else{
			callback(null, res)
		}
	})
}

SUS.edit = function(newData, callback){
	SUS.subscriptors.findOne({_id: this.getObjectId(newData.id)}, function(e,o){
		o.name = newData.name;
		o.email = newData.email;
		SUS.subscriptors.save(o);
		callback(o);
	})
}

SUS.delete = function(id, callback){
	SUS.subscriptors.remove({_id: this.getObjectId(id)},callback)
}


SUS.getObjectId = function(id){
	return SUS.subscriptors.db.bson_serializer.ObjectID.createFromHexString(id)
}




