import os
from flask import request, jsonify
from app import app, mongo


ROOT_PATH = os.environ.get('ROOT_PATH')

@app.route('/grafo/listar-grafo', methods=['GET'])
def listar_grafo():
    if request.method == 'GET':
        data = mongo.db.grafo.find({})
        listar_documentos = list(data)

        if data == None:
            data = []
        return jsonify({'transaccion': True, "data":listar_documentos})
