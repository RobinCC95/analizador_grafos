import analisis.algorithms as alg

class SubmodularFunctions:
    @staticmethod
    def cut_funct(SS, A):
            aux = alg.is_list(A) if type(A) == list else [A]
            A = list(set(aux))
            n = len(SS[0])
            diff_A = alg.diff([i for i in range(n)], A)
            return SubmodularFunctions.__sum_diff(SS, A, diff_A)
            
    @staticmethod
    def __sum_diff(SS,A, A_prim):
        count = 0
        for i in A:
            for j in A_prim:
                count += SS[i][j]
        return count