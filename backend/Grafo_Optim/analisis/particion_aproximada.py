
class ParticionAproximada:
    def __init__(self, grafo):
        """Se encarga de hacer un analisis de particion de un grafo
        de acuerdo a una particion. Utiliza el algoritmo de aproximacion
        para particionar el grafo.

        Args:
            grafo (_type_): grafo a analizar
            grafo_particion (_type_): grafo particionado
        """
        self.grafo = grafo
        self.grafo_particion = None
        self.algoritmo_aproximado() 

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

    def algoritmo_aproximado(self):
        """Algoritmo modular para particionar un grafo.
        """
        # TODO: quitar valor del grafo tiene que ir evaluar el aproximado
        grafo_aproximado = self.grafo

        #TODO: implementar algoritmo modular

        self.grafo_particion = grafo_aproximado