import numpy as np
import numpy.linalg as la
import copy
import time

class ParticionDinamica:
    def __init__(self, grafo):
        """Se encarga de hacer un analisis de particion de un grafo con un
        enfoque dinamico.
        Args:
            grafo (_type_): grafo a analizar
            grafo_particion (_type_): grafo particionado
        """
        self.grafo = grafo
        self.grafo_particion = None
        self.algoritmo_dinamico()
    
    def get_grafo_particion(self):
        if self.grafo_particion is None:
            raise Exception("No se ha particionado el grafo")
        else:
            return self.grafo_particion
    def algoritmo_dinamico(self):
        pass

    
    def iniciar_partir_tdm(self):
        """_summary_:
            funcion que se encarga de iniciar algorimo de particion y la
            tabla de guardado de los resultados.
            Tambien inicializa la lista que contiene la suma de adyacencias de cada nodo
            del grafo.
        """
        matriz_adyacencias = self.mat_adjacencies()
        self.tabla_guardado = np.zeros((len(matriz_adyacencias), len(matriz_adyacencias)), dtype=np.int64)
    
    def partir_tdm(self):
        pass
    
    
    def solucion_partir_tdm(self):
        pass
    

    def mat_adjacencies(self):
        N = len(self.grafo["nodes"])
        print(N)
        mat = np.zeros((N,N),dtype=np.int64)
        for edge in self.grafo["edges"]:
            print(edge)
            mat[int(edge["from"])][int(edge["to"])] = 1

        return mat

    