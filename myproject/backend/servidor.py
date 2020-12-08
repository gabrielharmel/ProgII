from config import *
from modelo import Montadora, Carro, Cliente

@app.route("/")
def inicio():
    return 'Sistema de cadastro de carros. '+\
        '<a href="/listar/Carro">Listar Carros</a>'
#ROTA PARA LISTAR CARROS
@app.route("/listar/<string:classe>")
def listar(classe):
    dados = None
    if classe == "Montadora":
        dados = db.session.query(Montadora).all()
    elif classe == "Carro":
        dados = db.session.query(Carro).all()
    elif classe == "Cliente":
        dados = db.session.query(Cliente).all()
    lista_jsons = [x.json() for x in dados]
    resposta = jsonify(lista_jsons)
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta 

#ROTA PARA INCLUIR CARROS
@app.route("/incluir_carro", methods=['post'])
def incluir_carro():
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
    dados = request.get_json()
    try:
        novo = Carro(**dados)
        db.session.add(novo)
        db.session.commit()
    except Exception as e: 
        resposta = jsonify({"resultado":"erro", "detalhes":str(e)})
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta

#ROTA PARA EXCLUIR CARROS (AV4)
@app.route("/excluir_carro/<int:carro_id>", methods=["delete"])
def excluir_carro(carro_id):
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
    try:
        Carro.query.filter(Carro.id == carro_id).delete()
        db.session.commit()
    except Exception as e:
        resposta = jsonify({"resultado": "erro", "detalhes": str(e)})
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta

app.run(debug=True)