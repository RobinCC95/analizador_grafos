#Api REST con almacenamiento en MongoDB y conexion con Flask
#instalar:
#pip install flask
#pip install pip install pymongo
#user: admin
#contraseña: 0000


import requests
#from pymongo import MongoClient
from flask import Flask, jsonify, request, render_template
import json 
import datetime
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
#from flask_cors import CORS

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
app.json_encoder = JSONEncoder
mongo = PyMongo(app)






@app.before_request
def before_request():
	print("Antes de la peticion...")

@app.after_request
def after_request(response):
	print("Despues de la peticion...")
	return response


@app.route('/')
def index():
	return "servidor cliente REST"


if __name__ == '__main__':
	app.run(debug=True,host="localhost" ,port=7000)





""" server_url = "https://protoapinode.herokuapp.com"

# Token que identifica los grafos determinados por usuario
user_id = ""

# Consultar todos los grafos almacenados
sourceDb = f"{server_url}/api/graphs/{user_id}"
data = requests.get(sourceDb,timeout=3)
for i in data.json()["data"]:
	print(i)
input()

# Almacenar un grafo
sourceDb = f"{server_url}/api/graph"
data = requests.post(sourceDb,json = {
	"_id": {
        "$oid": "6265ed5d478ab5ca7549b336"
    },
	"user": {
		"userId": 123,
		"name": "Robin"
	},
	"nodes": [
		{ "id": "Alpha", "text": "Alpha", "color": "lightblue" },
        { "id": "Beta", "text": "Beta", "color": "orange" },
        { "id": "Omega", "text": "Omega", "color": "red" }
		],
	"edges": [
		{ "key": -1, "from": "Alpha", "to": "Beta" },
        { "key": 2, "from": "Alpha", "to": "Omega" }
		],
	"adjacencies": []
})
print(data.json())
input()


# Actualizar un grafo determinado
sourceDb = f"{server_url}/api/graph/623cbf28ce1717e1571f0729"
data = requests.put(sourceDb,json = {
	"userId": user_id,
	"nodes": [
		{
			"id": 1,
			"dato": 15
		},
		{
			"id": 2,
			"dato": 30
		}
		],
	"edges": [
		{
			"id": 1,
			"peso": 100
		}
		],
	"adjacencies": [
		{
			"inicio": 1,
			"destino": 2,
			"arista": 1
		}
	]
})
print(data.json())

# Eliminación de un grafo determinado
sourceDb = f"{server_url}/api/graph/623cbf28ce1717e1571f0729"
data = requests.delete(sourceDb,timeout=3)
print(data.json()) """