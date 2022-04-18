from modelo.grafo import Grafo
from gui.graficar_grafo import Graficar_grafo

def main():
    
    diccion = {
        "A":["B","D"],
        "B":["C","E"],
        "C":["E"],
        "D":["A"],
        "E":["D"]
    }
    graf_dicc = Graficar_grafo(diccion)
    graf_dicc.draw_grafo()
    print('hola')



if __name__ == '__main__':
    main()