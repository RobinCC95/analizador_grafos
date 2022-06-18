from particion_modular import ParticionModular
from particion_aproximada import ParticionAproximada

class Analisis_Algoritmo:
    def __init__(self, grafo, particion):
        """Se encarga de hacer un analisis de particion de un grafo
        de acuerdo a una particion dada.	

        Args:
            grafo (_type_): grafo a analizar
            particion (_type_): tipo de particion a utilizar
        """
        self.grafo = grafo
        self.particion = particion
        self.grafo_particion = None
        
        self.particionar()

    def particionar(self):
        if self.particion == "aproximado":
            grafo_part_aprox = ParticionAproximada(self.grafo)
            self.grafo_particion = grafo_part_aprox.get_grafo_particion()
        elif self.particion == "modular":
            grafo_part_modul = ParticionModular(self.grafo)
            self.grafo_particion = grafo_part_modul.get_grafo_particion()
        else:
            raise Exception("Particion no reconocida")

    def get_grafo_particion(self):
        if self.grafo_particion is None:
            raise Exception("No se ha particionado el grafo")
        else:
            return self.grafo_particion

