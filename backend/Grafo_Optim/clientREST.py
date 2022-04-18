#Api REST controladora de base de datos mongoDB alojada en Heroku y Atlas

import requests

server_url = "https://protoapinode.herokuapp.com"

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
print(data.json())