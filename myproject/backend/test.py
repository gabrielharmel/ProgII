from modelo import *
import os

if __name__ == "__main__":

    if os.path.exists(arquivobd):
        os.remove(arquivobd)

    db.create_all()
    montadora1 = Montadora(nome = "Ford", pais_origem = "Estados Unidos")
    montadora2 = Montadora(nome = "Nissan", pais_origem =  "Japão")
    montadora3 = Montadora(nome = "Volkswagen", pais_origem = "Alemanha")
    montadora4 = Montadora(nome = "Dodge", pais_origem ="Estados Unidos")
    montadora5 = Montadora(nome = "Chevrolet", pais_origem = "Estados Unidos")
    montadora6 = Montadora(nome = "Plymouth", pais_origem = "Estados Unidos")
    
    carro1 = Carro(nome = "Focus", cor = "Prata", 
        ano = "2004", montadora_id = 1)
    carro2 = Carro(nome = "Pampa", cor = "Verde", 
        ano = "1997", montadora_id = 1)
    carro3 = Carro(nome = "Versa", cor = "Marrom", 
        ano = "2016", montadora_id = 2)
    carro4 = Carro(nome = "Gol", cor = "Branco", 
        ano = "2017", montadora_id = 3)
    carro5 = Carro(nome = "Charger", cor = "Laranja", 
        ano = "1975", montadora_id = 4)
    carro6 = Carro(nome = "Chevelle", cor = "Vermelho", 
        ano = "1970", montadora_id = 5)
    carro7 = Carro(nome = "Roadrunner", cor = "Prata", 
        ano = "1970", montadora_id = 6)

    cliente1 = Cliente(nome = "Claudionei", estado_civil = "Casado",
    idade = "43", carro_id = "7")
    cliente2 = Cliente(nome = "Babilônio",  estado_civil = "Casado",
    idade = "67", carro_id = "1")
    cliente3 = Cliente(nome = "Brad",  estado_civil = "Solteiro",
    idade = "18", carro_id = "6")
    cliente4 = Cliente(nome = "Lara",  estado_civil = "Solteira",
    idade = "21", carro_id = "2")
    cliente5 = Cliente(nome = "Francielle",  estado_civil = "Solteira",
    idade = "30", carro_id = "5")
    cliente6 = Cliente(nome = "Luana",  estado_civil = "Casada",
    idade = "27", carro_id = "3")
    cliente7 = Cliente(nome = "Michael",  estado_civil = "Casado",
    idade = "73", carro_id = "4")

    # persistir
    db.session.add(montadora1)
    db.session.add(montadora2)
    db.session.add(montadora3)
    db.session.add(montadora4)
    db.session.add(montadora5)
    db.session.add(montadora6)
    
    db.session.add(carro1)
    db.session.add(carro2)
    db.session.add(carro3)
    db.session.add(carro4)
    db.session.add(carro5)
    db.session.add(carro6)
    db.session.add(carro7)

    db.session.add(cliente1)
    db.session.add(cliente2)
    db.session.add(cliente3)
    db.session.add(cliente4)
    db.session.add(cliente5)
    db.session.add(cliente6)
    db.session.add(cliente7)

    db.session.commit()

    print(montadora1.json()) 
    print(montadora2.json())
    print(montadora3.json())
    print(montadora4.json())
    print(montadora5.json())
    print(montadora6.json())

    print(carro1.json())
    print(carro2.json())
    print(carro3.json())
    print(carro4.json())
    print(carro5.json())
    print(carro6.json())
    print(carro7.json())

    print(cliente1.json())
    print(cliente2.json())
    print(cliente3.json())
    print(cliente4.json())
    print(cliente5.json())
    print(cliente6.json())
    print(cliente7.json())
    