class Adjacencie:
    def __init__(self,begin, finish,edge):
        self.begin = begin
        self.finish = finish
        self.edge = edge

    def get_begin(self):
        return self.begin   
    def get_finish(self):
        return self.finish
    def get_edge(self):
        return self.edge
    def set_begin(self,begin):  
        self.begin = begin
    def set_finish(self,finish):
        self.finish = finish
    def set_edge(self,edge):
        self.edge = edge
    def string_adjacencie(self):
        return f"{self.begin}->{self.finish}:{self.edge}"
    def __str__(self):
        return self.string_adjacencie()
        