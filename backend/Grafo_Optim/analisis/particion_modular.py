from __future__ import division
import numpy as np
import numpy.linalg as la
import copy

class ParticionModular:
    def __init__(self, grafo):
        """Se encarga de hacer un analisis de particion de un grafo
        de acuerdo a una particion. Utiliza el algoritmo de Queyranne, 1998
        para particionar el grafo.

        Args:
            grafo (_type_): grafo a analizar
            grafo_particion (_type_): grafo particionado
        """
        self.grafo = grafo
        self.grafo_particion = None
        self.algoritmo_modular()
        
    def mat_adjacencies(self):
        N = len(self.grafo["nodes"])
        print(N)
        mat = np.zeros((N,N),dtype=np.int64)
        for edge in self.grafo["edges"]:
            print(edge)
            mat[int(edge["from"])][int(edge["to"])] = 1
          
        return mat

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

    def algoritmo_modular(self):
        """Algoritmo modular para particionar un grafo.
        """
        #TODO: quitar valor del grafo tiene que ir evaluar el modular
        grafoModular = self.grafo 
        grafoModular['name'] = "analisis grafo modular" + grafoModular['_id']
        

        #TODO: implementar algoritmo modular

        mat = self.mat_adjacencies()
        (subset_opt, partition_value, cluster_max) = self.QUEYRANNE(mat, lambda a,b : .1)
        print(subset_opt, partition_value, cluster_max,"Funciona hasta cierto punto")
        self.grafo_particion = self.organizar_grafo(grafoModular, subset_opt)
    
    def organizar_grafo(self, grafo, particion):
        grafo_particion = grafo.copy()
        #grafo_particion.pop("_id")
        for i in particion:
            for item in grafo_particion["nodes"]:
                if str(i) == item["id"]:
                    item["color"] = "red"
                    break
            for item in grafo_particion["edges"]:
                if str(i) == item["from"] or str(i) == item["to"]:
                    item["progress"] = "true"
        return grafo_particion

    # -*- Some useful preliminary functions -*-
    def trinv(self, matrix):
        tri = np.trace(la.inv(matrix))
        return tri

    def permutation_matrix(self, n):
        rr = range(n)
        np.random.shuffle(rr)
        P = np.take(np.eye(n), rr, axis=0)
        return  P

    def select_mat(self, matrix, index_row, index_column):
        # sort the row/cols lists
        index_row.sort()
        index_column.sort()
        index_row = list(set(index_row))
        index_column = list(set(index_column))
        S = np.transpose(np.transpose(matrix[index_row])[index_column])
        return S

    def diff(self, first, second):
            second = set(second)
            return [item for item in first if item not in second]

    def ismember(self, a, B):
        response = False
        index = 0
        while response == False and index < len(B):
            b = B[index]
            if b == a:
                return True
            else:
                index = index+1

        return response

    def partition(self, collection):
        if len(collection) == 1:
            yield [ collection ]
            return
        first = collection[0]
        for smaller in self.partition(collection[1:]):
            # insert `first` in each of the subpartition's subsets
            for n, subset in enumerate(smaller):
                yield smaller[:n] + [[ first ] + subset]  + smaller[n+1:]
            # put `first` in its own subset
            yield [ [ first ] ] + smaller

    def select_from_list(list, indices):
        list_select = [list[i] for i in indices]
        return list_select


    # Finding a pendent-pair of a supermodular system(V,f):
    # For a given sets W and Q, find the most far element
    # in Q to W
    # W and Q should be list of lists to account for fused elements

    def  Find_Far_Element(self, SS, F, WW, QQ):

        # Find the most far element to WW in QQ

        u = QQ[0]  # a list not an index
        W_cp = copy.copy(WW)
        W_cp.append(u)
        dist_max = F(SS, W_cp) - F(SS, u)
        elt_far = u
        Q_ = copy.copy(QQ)
        Q_.remove(u)
        for elt in Q_:
            W_cp = copy.copy(WW)
            W_cp.append(elt)
            dist_elt = F(SS, W_cp) - F(SS, elt)
            if dist_elt > dist_max:
                dist_max = dist_elt
                elt_far = elt

        return elt_far

    # ----- Finding a pendent pair is a fundamental step in Queyranne's algorithm ----- #
    def PENDENT_PAIR(self, SS, VV, F):

        # V is the set of all points including fused pairs
        # The size of V goes from n to 2
        # Start with a random element in V

        V_ = copy.copy(VV)
        rnd_pattern = np.random.permutation(len(V_))
        #x = V_[rnd_pattern[0]]
        x = V_[0]
        if type(x) == list:
            W = x
        else:
            W = [x]
        Q = copy.copy(V_)
        Q.remove(x)
        V_.remove(x)
        for i in range(len(V_)):
            elt_far = self.Find_Far_Element(SS, F, W, Q)
            W.append(elt_far)
            Q.remove(elt_far)

        return W[-2], W[-1]

    def tr_inv(self, SS, set):
        """
        :rtype: float
        """
        if type(set) == int:
            LIST = [set]
        else:
            LIST = []
            for i in range(len(set)):
                if type(set[i]) == list:
                    LIST.extend(set[i])
                else:
                    LIST.append(set[i])

        return self.trinv(self.select_mat(SS, LIST, LIST))

    def log_det(self, SS, set):
        """
        :rtype: float
        """
        if type(set) == int:
            LIST = [set]
        else:
            LIST = []
            for i in range(len(set)):
                if type(set[i]) == list:
                    LIST.extend(set[i])
                else:
                    LIST.append(set[i])

        return -np.log(la.det(self.select_mat(SS, LIST, LIST)))

    def fuse(self, A, B):
        if type(A) == int and type(B) == int:
            f = [A, B]
        elif type(A) == int and type(B) == list:
            f = [A] + B
        elif type(A) == list and type(B) == int:
            f = A + [B]
        elif type(A) == list and type(B) == list:
            f = A + B

        return f

    #-*- Full implementation of Queyranne's algorithm -*-

    def QUEYRANNE(self, SS, F):
        """type: (matrix, function) -> (list, float, list)"""

        dim, _ = SS.shape
        V = [i for i in range(dim)]  # is the space of points which is updated at each step we find a pendent pair
        C = []  # set of candidates updated at each step
        while len(V) >= 3:
            W = copy.deepcopy(V)
            a, b = self.PENDENT_PAIR(SS, W, F)  # find a pendent pair in (V,F)
            if type(b) == int:
                C.append([b])
            else:
                C.append(b)

            fus = self.fuse(a, b)  # fuse this pair as a list
            V.append(fus)
            if self.ismember(a, V) is True and self.ismember(b, V) is True:
                V.remove(a)
                V.remove(b)

        for subset in V:
            if type(subset) == int:
                C.append([subset])
            else:
                C.append(subset)


        #  Once we have the list of candidates, we return the best one
        max_value = -np.Inf
        subset_opt = []
        cluster_max = 0
        partition_value = 0
        for subset in C:
            cluster_value = F(SS, subset)
            subset_value = cluster_value + F(SS, self.diff(range(dim), subset))
            if subset_value > max_value:
                subset_opt = subset
                partition_value = subset_value
                cluster_max = cluster_value
                max_value = subset_value

        return subset_opt, partition_value, cluster_max