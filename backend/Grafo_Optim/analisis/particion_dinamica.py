

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