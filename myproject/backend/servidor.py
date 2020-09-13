from config import *
from modelo import Carro

@app.route("/")
def inicio():
    return 'Sistema de cadastro de carros. '+\
        '<a href="/listar_carros">Listar Carros</a>'

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

app.run(debug=True)