
class Manejo_archivo:
    def __init__(self,path) -> None:
        self.path = path
        self.file_content = None

    
    def leer(self,caracter):
        """metodo encargado de pasar los valores de un .txt a un diccionario
        separando los keys de los values por un caracter por defecto (-)
        Arguments:
            caracter {string} -- separador que limita los keys de los values
        Return:
            retorna el diccionario almacenado de valores del txt

        """
        with open(self.path,'r') as file1:
            i=0
            for line in file1:
                print('val: ', str(i),':',line)
                i=i+1

    def escribir(self):
        file1 = open(self.path,'w')
    def copiar(self):
        pass
    
    