
#from pymongo import MongoClient
from flask import Flask, jsonify, request, render_template
import json 
import datetime
from flask_pymongo import PyMongo
from bson.objectid import ObjectId

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


@app.route('/users', methods=['POST'])
def create_user():
	#receiving data
	mongo.db.users.insert_one(request.json)
	print(request.json)
	return {'message':'received'}


@app.route('/grafo/listar-grafo', methods=['GET'])
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