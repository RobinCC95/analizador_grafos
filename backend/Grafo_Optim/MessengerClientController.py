
from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
from modelo.grafo import Grafo
#https://stackabuse.com/serving-static-files-with-flask
#https://python-adv-web-apps.readthedocs.io/en/latest/flask3.html
#https://stackoverflow.com/questions/20646822/how-to-serve-static-files-in-flask
#python3 -m http.server 5500 --bind 192.168.1.104

app = Flask(__name__)
CORS(app)
data = "fsdfdf"



@app.route('/enviar', methods=['POST'])
def enviar():
	msg = request.json['command']+"\n"
	print(msg)
	'''
	diccion = {
        "A":["B","D"],
        "B":["C","E"],
        "C":["E"],
        "D":["A"],
        "E":["D"]
    }
	obj = Grafo(diccion)
	return obj.string_grafo()
	'''
	return msg

@app.route('/escanear', methods=['GET'])
def escanear():
	global data
	return data


if __name__ == '__main__':
	app.run(debug=True, host="localhost", port=7000)

	
'''
input()
print("----")
msg = "register prueba\n"
clientsocket.send(msg.encode('utf-8'))
dataFromServer = clientsocket.recv(1024);
'''

