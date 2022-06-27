import uuid
import numpy as np
def format_graph(grafo, particion, tiempo):
        grafo_particion = grafo.copy()
        grafo_particion["_id"] = uuid.uuid4()
        grafo_particion["tiempo"] = tiempo
        for i in particion:
            for item in grafo_particion["nodes"]:
                if str(i) == item["id"]:
                    item["color"] = "red"
                    break
            for item in grafo_particion["edges"]:
                if str(i) == item["from"] or str(i) == item["to"]:
                    item["progress"] = "true"
        return grafo_particion
    
def graph_to_adjacencies_mat(grafo):
        N = len(grafo["nodes"])
        mat = np.zeros((N,N),dtype=np.int64)
        for edge in grafo["edges"]:
            mat[int(edge["from"])][int(edge["to"])] = 1
          
        return mat
