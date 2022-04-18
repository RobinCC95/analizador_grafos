
from PIL import ImageTk, Image
from graphviz import Digraph


class Graficar_grafo:
    """Clase encargada de graficar el grafo 
    """
    def __init__(self, matriz_ady):
        self.dat_grafo = Digraph('G',filename='grafo',format='png')
        self.matriz_ady = matriz_ady
        self.__paramet_grafo()

        #self.dat_grafo.view()



    def __crear_nodos(self):
        for k in self.matriz_ady.keys():
            self.dat_grafo.node(str(k), label=str(k), color='black',fontcolor='black',fillcolor='white',style='filled',fontname = "consolas",fontsize = "16")
			
 
    def __crear_adyacencias(self):
        for key, item in self.matriz_ady.items():
            for dat in item:
                self.dat_grafo.edge(str(key), str(dat), label="" ,color='#01c952',penwidth='3')




    def __paramet_grafo(self):
        """adiciona parametros al grafico y el nodo
        """
        self.dat_grafo.attr(rankdir ='LR', size = '80')
        self.dat_grafo.attr('node', shape= 'box3d')
        self.dat_grafo.attr(bgcolor='#abdbe3',fontcolor='white')
        self.__crear_nodos()
        self.__crear_adyacencias()

    def draw_grafo(self):
        self.dat_grafo.view()






