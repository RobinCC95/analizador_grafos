from abc import abstractmethod
import copy
import numpy as np
import re

class Algorithm():
    @abstractmethod
    @staticmethod
    def algorithm(Mat, Funct):
        pass
    
class Aproximado(Algorithm):
    def algorithm():
        pass

class Queyranne(Algorithm):
    
    def algorithm(SS, F):
        """type: (matrix, function) -> (list, float, list)"""

        dim, _ = SS.shape
        V = [i for i in range(dim)]  # is the space of points which is updated at each step we find a pendent pair
        C = []  # set of candidates updated at each step
        while len(V) >= 3:
            W = copy.deepcopy(V)
            a, b = Queyranne.__pendant_pair(SS, W, F)  # find a pendent pair in (V,F)
            if type(b) == int:
                C.append([b])
            else:
                C.append(b)

            fus = Queyranne.__fuse(a, b)  # fuse this pair as a list
            V.append(fus)
            if Queyranne.__is_member(a, V) is True and Queyranne.__is_member(b, V) is True:
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
            subset_value = cluster_value + F(SS, diff(range(dim), subset))
            if subset_value > max_value:
                subset_opt = subset
                partition_value = subset_value
                cluster_max = cluster_value
                max_value = subset_value

        return subset_opt, partition_value, cluster_max
    
    def __fuse(A, B):
        if type(A) == int and type(B) == int:
            f = [A, B]
        elif type(A) == int and type(B) == list:
            f = [A] + B
        elif type(A) == list and type(B) == int:
            f = A + [B]
        elif type(A) == list and type(B) == list:
            f = A + B

        return f
    
    @staticmethod
    def __pendant_pair(SS, VV, F):

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
            elt_far = Queyranne.__find_far_elems(SS, F, W, Q)
            W.append(elt_far)
            Q.remove(elt_far)

        return W[-2], W[-1]

    @staticmethod
    def  __find_far_elems(SS, F, WW, QQ):

        # Find the most far element to WW in QQ

        u = QQ[0]  # a list not an index
        W_cp = copy.copy(WW)
        W_cp.append(u)
        dist_max = F(SS, W_cp) - F(SS, [u])
        elt_far = u
        Q_ = copy.copy(QQ)
        Q_.remove(u)
        for elt in Q_:
            W_cp = copy.copy(WW)
            W_cp.append(elt)
            dist_elt = F(SS, W_cp) - F(SS, [elt])
            if dist_elt > dist_max:
                dist_max = dist_elt
                elt_far = elt

        return elt_far
    
    
    @staticmethod
    def __is_member(a, B):
        response = False
        index = 0
        while response == False and index < len(B):
            b = B[index]
            if b == a:
                return True
            else:
                index = index+1

        return response
    
class Voraz(Algorithm):
    def algorithm(mat, funct):
        return set(re.sub("[\{\},\s]", "", Voraz.__combinatory_alg(mat, funct(mat, funct))))
    
    @staticmethod
    def __combinatory_alg(mat, funct):
        n = len(mat[0])
        keys = {}
        Voraz.__combinatory_algorithm(n, mat, -1, set(), keys, funct)
        return min(keys, default=keys.get)

    @staticmethod
    def __combinatory_algorithm(n, mat, k, opt_set, table, func):
        if k < n:
            k += 1
            for i in range(n):
                aux_set = opt_set.copy()
                aux_set.add(i)
                set_str = f"{aux_set}"
                if set_str not in table.keys():
                    table[set_str] = func(mat, aux_set)
                    Voraz.__combinatory_algorithm(n,mat, k, aux_set, table, func)
                    
def is_list(V):
    aux_list = []
    for item in V:
        if type(item) != list:
            aux_list.append(item)  
        else:
            for item_w in item:
                aux_list.append(item_w)
            
    return aux_list

def diff(first, second):
    aux = is_list(second) if type(second) == list else [second]
    second = set(aux)
    return [item for item in first if item not in second]