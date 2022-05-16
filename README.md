# analizador_grafos
Proyecto API-REST con frontend en [angular](https://angular.io/ "angular")  y backend en [mongoDB-atlas](https://www.mongodb.com/ "mongoDB-atlas") con un servidor [flask](https://flask.palletsprojects.com/en/2.1.x/ "flask") programado en python. Se hace uso de una libreria de [gojs](https://gojs.net/latest/index.html "gojs") para la graficacion de   los grafos.
El analizador de los grafos se realiza en python con su estructura principal. Como primera parte descargue el repositorio y descomprimalo o puede clonarlo.
###### Requerimientos
Debe tener instalado estas dependencias para la ejecucion del proyecto
- [Angular](https://angular.io/ "Angular")
- [Python](https://www.python.org/downloads/ "Python")

Despues de ello siga las indicaciones de abajo para ejecutar el backend y frontend para su correcto funcionamiento.


------------


### Backend
Backend implementado con flask como servidor y mongoDB-atlas como base de datos.
######   Pasos para la instalacion:
Ubicarse en la carpeta raiz, ingrese en las subcarpetas en la siguiente direccion "backend\Grafo_Optim".
- Cree un ambiente virutal. Nesecita las siguientes librerias para hacerlo.
	- pip install virtualenv
	- python -m venv env

- Active el ambiente virtual con la siguiente linea. Debe estar en la subcarpeta mencionada al inicio de la instalacion:
	- venv/Scripts/activate
- Instale las siguientes librerias en el ambiente virtual: 
	- pip install flask
	- pip install Flask-PyMongo
	- pip install pymongo[srv]
	- pip install flask-cors

- Inicie su servidor con el siguiente comando:
	- python src/app.py

------------


### Frontend
Toda la parte grafica de la aplicacion desarrollada en angular que consume los recursos de una API en flask conectada a una BD en MongoDB.
###### Pasos para la instalacion:
- Al ubicarse en la carpeta raiz, ingrese en las subcarpetas en la siguiente direccion 			"frontend\analizadorGrafos"
- Ejecutar el comando *npm install* para instalacion de las librerias
- Ejecutar el comando *ng serve *
- Dirigase a su navegador y escriba la url http://localhost:4200 
