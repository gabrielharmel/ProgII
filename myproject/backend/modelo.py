from config import *


class Montadora(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(254))
    pais_origem = db.Column(db.String(254))

    def __str__(self):
        return str(self.id)+", " + self.nome + ", " +\
            self.pais_origem

    def json(self):
        return ({
            "id": self.id,
            "nome": self.nome,
            "pais_origem": self.pais_origem,
        })


class Carro(db.Model):
    # atributos do carro
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(254))
    cor = db.Column(db.String(254))
    ano = db.Column(db.String(254))
    montadora_id = db.Column(db.Integer, db.ForeignKey(Montadora.id))
    montadora = db.relationship("Montadora")

    # método para expressar o carro em forma de texto
    def __str__(self):
        c = f"Carro {self.nome}"
        if self.montadora_id != None:
            c += f"produzido pela montadora {self.nome} localizada em {self.pais_origem}"
            return c
    
    # expressao no formato json 
    def json(self):
        if self.montadora_id is None:
            return ({
                "id": self.id,
                "nome": self.nome,
                "cor": self.cor,
                "ano": self.ano
            })
        else:
            return ({
                "id": self.id,
                "nome": self.nome,
                "cor": self.cor,
                "ano": self.ano,
                "montadora": self.montadora.json()
            })

class Cliente(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(254))
    estado_civil = db.Column(db.String(254))
    idade = db.Column(db.String(254))
    carro_id = db.Column(db.Integer, db.ForeignKey(Carro.id), nullable=False)
    carro = db.relationship("Carro")

    def __str__(self):
        return str(self.id)+", " + self.nome + ", " +\
            self.estado_civil+", " + self.idade

    def json(self):
        return ({
            "id": self.id,
            "nome": self.nome,
            "estado_civil": self.estado_civil,
            "idade": self.idade,
            "carro": self.carro.json()
        })