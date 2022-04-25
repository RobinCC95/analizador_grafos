
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
app.json_encoder = JSONEncoder
mongo = PyMongo(app)

from app.controladores import *