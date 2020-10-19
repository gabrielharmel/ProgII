from config import *
from modelo import Carro

@app.route("/")
def inicio():
    return 'Sistema de cadastro de carros. '+\
        '<a href="/listar_carros">Listar Carros</a>'
#ROTA PARA LISTAR CARROS
@app.route("/listar_carros")
def listar_carros():
    # obter os carros do cadastro
    carros = db.session.query(Carro).all()
    # método json para cada elemento da lista
    carros_json = [ x.json() for x in carros ]
    # fornecer a lista de carros para a página que exibe os carros
    return jsonify(carros_json)
    # permitir resposta para outras pedidos oriundos de outras tecnologias
    resposta = jsonify(carros_json)
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