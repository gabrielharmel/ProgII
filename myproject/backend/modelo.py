from config import *

class Carro(db.Model):
    # atributos do carro
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(254))
    cor = db.Column(db.String(254))
    ano = db.Column(db.String(254))

    # método para expressar o carro em forma de texto
    def __str__(self):
        return str(self.id)+") "+ self.nome + ", " +\
            self.cor + ", " + self.ano
    # expressao no formato json 
    def json(self): 
        return { 
            "id": self.id, 
            "nome": self.nome, 
            "cor": self.cor, 
            "ano": self.ano 
        }
