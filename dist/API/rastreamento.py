from flask import Flask, jsonify, render_template
import requests

app = Flask(__name__, template_folder="\HTML\acompanharproduto.html")

@app.route('/')
def home():
    return render_template("acompanharproduto.html")  # Servindo o HTML

@app.route('/rastreio/<codigo>', methods=['GET'])
def rastrear_pedido(codigo):
    try:
        # API dos Correios (ou serviço intermediário como Linketrack)
        url = f"https://api.linketrack.com/track/json?user=SEU_USUARIO&token=SEU_TOKEN&codigo={codigo}"
        response = requests.get(url)

        if response.status_code == 200:
            data = response.json()
            if "eventos" in data and len(data["eventos"]) > 0:
                ultimo_evento = data["eventos"][0]  # Última atualização do rastreamento

                return jsonify({
                    "status": ultimo_evento.get("status", "Desconhecido"),
                    "data": ultimo_evento.get("data", "Sem data"),
                    "local": ultimo_evento.get("local", "Sem localização"),
                    "descricao": ultimo_evento.get("descricao", "Sem descrição")
                })
            else:
                return jsonify({"status": "erro", "mensagem": "Nenhum evento encontrado."})

        return jsonify({"status": "erro", "mensagem": "Erro ao consultar os Correios."})

    except Exception as e:
        return jsonify({"status": "erro", "mensagem": str(e)})

if __name__ == '__main__':
    app.run(debug=True)
