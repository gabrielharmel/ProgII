from modelo import *
import os

if __name__ == "__main__":

    if os.path.exists(arquivobd):
        os.remove(arquivobd)

    db.create_all()

    # teste da classe Carro
    carro1 = Carro(nome = "Ford Focus", cor = "Prata", 
        ano = "2004")
    carro2 = Carro(nome = "Ford Pampa", cor = "Verde", 
        ano = "1997")
    carro3 = Carro(nome = "Nissan Versa", cor = "Marrom", 
        ano = "2016")
    carro4 = Carro(nome = "Volkswagen Gol", cor = "Branco", 
        ano = "2017")
    carro5 = Carro(nome = "Dodge Charger", cor = "Laranja", 
        ano = "1975")
    carro6 = Carro(nome = "Chevrolet Chevelle", cor = "Vermelho", 
        ano = "1970")
    carro7 = Carro(nome = "Plymouth Roadrunner", cor = "Prata", 
        ano = "1970")
    # persistir
    db.session.add(carro1)
    db.session.add(carro2)
    db.session.add(carro3)
    db.session.add(carro4)
    db.session.add(carro5)
    db.session.add(carro6)
    db.session.add(carro7)
    db.session.commit()

    print(carro1.json())
    print(carro2.json())
    print(carro3.json())
    print(carro4.json())
    print(carro5.json())
    print(carro6.json())
    print(carro7.json())
