# analizador_grafos
Proyecto API-REST con frontend en [angular](https://angular.io/ "angular")  y backend en [mongoDB-atlas](https://www.mongodb.com/ "mongoDB-atlas") con un servidor [flask](https://flask.palletsprojects.com/en/2.1.x/ "flask") programado en python. Se hace uso de una libreria de [gojs](https://gojs.net/latest/index.html "gojs") para la graficacion de   los grafos.
El analizador de los grafos se realiza en python con su estructura principal. Como primera parte descargue el repositorio y descomprimalo o puede clonarlo.
###### Requerimientos
Debe tener instalado estas dependencias para la ejecucion del proyecto
- [Angular](https://angular.io/ "Angular")
- [Python](https://www.python.org/downloads/ "Python")

Despues de ello siga las indicaciones de abajo para ejecutar el backend y frontend para su correcto funcionamiento.

![](https://scontent.feoh4-3.fna.fbcdn.net/v/t39.30808-6/281739851_5314133481980684_248468699038476265_n.jpg?_nc_cat=102&ccb=1-6&_nc_sid=0debeb&_nc_eui2=AeEx3nXmMdqLkunP3ZZArSJAAD8pmbppUDwAPymZumlQPCJpllsbYbprPyZYH-k-SxE-jVWpzyc0hKELgSWMhMYo&_nc_ohc=1CYUyoHOo38AX9B7BEk&_nc_ht=scontent.feoh4-3.fna&oh=00_AT_K6Pbmrvva2j4r1UiOzxfTvVteJVZZtAz1VyytMV7L_w&oe=6287B3C3)

------------


### Backend
Backend implementado con flask como servidor y mongoDB-atlas como base de datos.
![](https://scontent.feoh4-3.fna.fbcdn.net/v/t39.30808-6/281903886_5314145638646135_2276786267673613151_n.jpg?_nc_cat=102&ccb=1-6&_nc_sid=0debeb&_nc_eui2=AeECw7m6meRoUTPnxUK5sIfg_xWN_8Vy-Ln_FY3_xXL4uXc7zkC__xKussiQ12UKzfVF1lgWqlFTXkOxqYPF3NHu&_nc_ohc=FT0JeT5s5OEAX9xV7c4&_nc_ht=scontent.feoh4-3.fna&oh=00_AT9CjXcYLjIWlrDzGyWB6HZ2TLESrs2RJr6kakZ1hBZLHw&oe=628767C7)
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
![](https://scontent.feoh4-3.fna.fbcdn.net/v/t39.30808-6/281858921_5314154861978546_6167332467487085534_n.jpg?_nc_cat=100&ccb=1-6&_nc_sid=0debeb&_nc_eui2=AeHOXfYaNxdq99gUnFVbDUk-Z9QxlsJc9rtn1DGWwlz2uyaAaQY5tOAbFkAWLVem-NRR-nlRe6G_9Iv7GsK5TfkC&_nc_ohc=6sQXjcSxrzAAX_dbxgu&_nc_oc=AQkpYTE1gs1nFIh_CO9fcydxh_GAmu_Iv8SixJBWhNvr-uomSdUkl9G0jmQznL8uWQw&_nc_ht=scontent.feoh4-3.fna&oh=00_AT-DkkkrMCV2tcDr40UWuL6xux7YdEnFk-wmzrTsWxlmSw&oe=6287D39A)
###### Pasos para la instalacion:
- Al ubicarse en la carpeta raiz, ingrese en las subcarpetas en la siguiente direccion 			"frontend\analizadorGrafos"
- Ejecutar el comando *npm install* para instalacion de las librerias
- Ejecutar el comando *ng serve *
- Dirigase a su navegador y escriba la url http://localhost:4200 

![](https://scontent.feoh4-3.fna.fbcdn.net/v/t39.30808-6/281501904_5314154845311881_5209382441929272854_n.jpg?_nc_cat=100&ccb=1-6&_nc_sid=0debeb&_nc_eui2=AeFdbdOcEC0QZwRyfyp_oCPPg--1WZ6Q-fGD77VZnpD58Yi1YZ65eyidXMWDbvtIexZ0G8ZAYU5K0MB3NgqT2Snu&_nc_ohc=OwkcE6meNDQAX8Hd0dK&_nc_oc=AQk9jiJtzVgnWAS0N7LeezcdLbG5nAiD0ULnhMi-Z7uhMUZFdcMo0bALEWausQhZv_s&_nc_ht=scontent.feoh4-3.fna&oh=00_AT8obt6id9oTpcTsm9wDD8qpbZzCzGLi9kYzwYzSFuYYqA&oe=6288D306)
