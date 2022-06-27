

class ParticionVoraz:
    def __init__(self, grafo):
        """Se encarga de hacer un analisis de particion de un grafo
        de acuerdo a una particion. Utiliza el algoritmo voraz
        para particionar el grafo.

        Args:
            grafo (_type_): grafo a analizar
            grafo_particion (_type_): grafo particionado
        """
        self.grafo = grafo
        self.grafo_particion = None
        self.algoritmo_voraz()
    
    def get_grafo_particion(self):
        """Retorna el grafo particionado.
        Raises:
            Exception: si el grafo no ha sido particionado, devuelve una excepcion

        Returns:
            _type_: retorna el grafo particionado
        """
        if self.grafo_particion is None:
            raise Exception("No se ha particionado el grafo")
        else:
            return self.grafo_particion
    def algoritmo_voraz(self):
        """Algoritmo voraz para particionar un grafo.
        """
        #TODO: implementar algoritmo voraz
        pass