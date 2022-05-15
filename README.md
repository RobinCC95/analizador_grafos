# analizador_grafos
  Proyecto API-REST con frontend en angular  y backend en mongoDB con un servidor Flask programado en python. Se hace uso de una libreria de GOJS para la graficacion de   los grafos.
  El analizador de los grafos se realiza en python con su estructura principal.
  Como primera parte descargue el repositorio y descomprimalo o puede clonarlo. Despues de ello siga las indicaciones de abajo para ejecutar el backend y frontend para su correcto funcionamiento.

- Backend.
  Backend implementado con flask como servidor y mongoDB-atlas como base de datos.
  - Pasos para la instalacion:
  - Ubicarse en la carpeta raiz, ingrese en las subcarpetas en la siguiente direccion "backend\Grafo_Optim".
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

- Frontend
   Toda la parte grafica de la aplicacion desarrollada en angular que consume los recursos de una API en flask conectada a una BD de MongoDB.
   - pasos para la instalacion:
        - Al ubicarse en la carpeta raiz, ingrese en las subcarpetas en la siguiente direccion "frontend\analizadorGrafos"
        - Ejecutar el comando "npm install" para instalacion de las librerias
        - Ejecutar el comando "ng serve" 
        - Dirigase a su navegador y escriba la url http://localhost:4200 
