import time

from analisis import graph_mapper
from analisis.algorithms import Queyranne, Voraz
from analisis.submodular_functions import SubmodularFunctions


class Analisis_Algoritmo:
    def __init__(self, grafo, particion):
        self.grafo = grafo
        self.particion = particion
        self.grafo_particion = None
        self.particionar()

    def particionar(self):
        mat = graph_mapper.graph_to_adjacencies_mat(self.grafo)
        if self.particion == "aproximado":
            pass
        elif self.particion == "modular":
            self.set_grafo_particion(mat, Queyranne.algorithm, SubmodularFunctions.cut_funct)
        elif self.particion == "dinamico":
            pass
        elif self.particion == "voraz":
            self.set_grafo_particion(mat, Voraz.algorithm, SubmodularFunctions.cut_funct)
        else:
            raise Exception("Particion no reconocida")

    def get_grafo_particion(self):
        if self.grafo_particion is None:
            raise Exception("No se ha particionado el grafo")
        else:
            return self.grafo_particion

    def set_grafo_particion(self, mat, algorithm, submodular_func):
        begin_time = time.time()
        subset_opt = algorithm(mat, submodular_func)
        end_time = time.time()
        self.grafo_particion = graph_mapper.format_graph(
            self.grafo, subset_opt, end_time - begin_time)
