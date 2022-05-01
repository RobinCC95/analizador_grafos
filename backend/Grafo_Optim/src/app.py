
#from pymongo import MongoClient
from flask import Flask, jsonify, request
import json 
import datetime
from flask_pymongo import PyMongo
from bson.objectid import ObjectId

#estrutura de dados
grafo_struct = {
    "_id" : ObjectId("62695d1b4ed76546035e6555"),
    "user" : {
        "userId" : 123,
        "name" : "Robin"
    },
    "nodes" : [ 
        {
            "id" : "Alpha",
            "text" : "Alpha",
            "color" : "lightblue"
        }, 
        {
            "id" : "Beta",
            "text" : "Beta",
            "color" : "orange"
        }, 
        {
            "id" : "Omega",
            "text" : "Omega",
            "color" : "red"
        }
    ],
    "edges" : [ 
        {
            "key" : -1,
            "from" : "Alpha",
            "to" : "Beta"
        }, 
        {
            "key" : 2,
            "from" : "Alpha",
            "to" : "Omega"
        }
    ],
    "adjacencies" : []
}



#manejo de errores al traer la informacion

class JSONEncoder(json.JSONEncoder):
	def default(self, o):
		if(isinstance(o, ObjectId)):
			return str(o)
		if(isinstance(o, datetime.datetime)):
			return str(o)	
		return json.JSONEncoder.default(self, o)


app = Flask(__name__)

#conexion con MongoDB
#username = "admin"
#password = 0000
#name_bd = grafo_db
app.config['MONGO_URI'] = "mongodb+srv://admin:0000@cluster0.8fq1b.mongodb.net/grafo_db?retryWrites=true&w=majority"
app.config['MONGO_DBNAME'] = "grafo_db"
app.json_encoder = JSONEncoder
#app.config['MONGO_URI'] = "mongodb://localhost:27017/grafo_db"
mongo = PyMongo(app)

@app.before_request
def before_request():
	print("Antes de la peticion...")

@app.after_request
def after_request(response):
	print("Despues de la peticion...")
	return response

#***********************hacer validacion de la entrada de datos y generar id como ObjectId
@app.route('/grafos/add-grafo', methods=['POST'])
def create_grafo():
	if request.method == 'POST':
		#receiving data
		id = mongo.db.grafo_registro.insert_one(request.json)
		return jsonify({'transaccion': True, "data":str(id)})
#***********************hacer validacion de la entrada de datos y generar id como ObjectId
@app.route('/users/add-user', methods=['POST'])
def create_user():
	if request.method == 'POST':
		#receiving data
		id = mongo.db.user_registro.insert_one(request.json)
		return jsonify({'transaccion': True, "data":str(id)})

@app.route('/grafos/get-grafo/<id>', methods=['GET'])
def get_grafo(id):
	if request.method == 'GET':
		#receiving data
		grafo = mongo.db.grafo_registro.find_one({"_id": id})
		return jsonify({'transaccion': True, "data":grafo})

@app.route('/users/get-user/<id>', methods=['GET'])
def get_user(id):
	if request.method == 'GET':
		#receiving data
		user = mongo.db.user_registro.find_one({"_id": id})
		return jsonify({'transaccion': True, "data":user})

@app.route('/grafos/delete-grafo/<id>', methods=['DELETE'])
def delete_grafo(id):
	if request.method == 'DELETE':
		#receiving data
		mongo.db.grafo_registro.delete_one({"_id": id})
		return jsonify({'transaccion': True})

@app.route('/users/delete-user/<id>', methods=['DELETE'])
def delete_user(id):
	if request.method == 'DELETE':
		#receiving data
		mongo.db.user_registro.delete_one({"_id": id})
		return jsonify({'transaccion': True})

@app.errorhandler(404)
def not_found(error):
	return jsonify({'error': 'Not found','url': request.url}), 404

@app.route('/grafos/listar-grafo', methods=['GET'])
def listar_grafo():
    if request.method == 'GET':
        data = mongo.db.grafo_registro.find({})
        listar_documentos = list(data)
        if data == None:
            data = []
        return jsonify({'transaccion': True, "data":listar_documentos})

@app.route('/users/listar-user', methods=['GET'])
def listar_user():
    if request.method == 'GET':
        data = mongo.db.user_registro.find({})
        listar_documentos = list(data)
        if data == None:
            data = []
        return jsonify({'transaccion': True, "data":listar_documentos})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0',port=5000)




