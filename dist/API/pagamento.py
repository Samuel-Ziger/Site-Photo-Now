"""*/from flask import Flask, request, jsonify
import requests
import json

app = Flask(__name__)

@app.route('/checkout', methods=['POST'])
def checkout():
    request_data = request.get_json()  # Obtém os dados da requisição JSON enviados pelo formulário

    if request_data.get('method') == 'pix':
        # Requisição de Token
        request_body = "client_id=<clientId de sua aplicação>&client_secret=<clientSecret de sua aplicação>&scope=cob.write&grant_type=client_credentials"
        response = requests.post("https://cdpj.partners.bancointer.com.br/oauth/v2/token",
          headers={"Content-Type": "application/x-www-form-urlencoded"},
          cert=('<nome arquivo certificado>.crt','<nome arquivo chave privada>.key'),
          data=request_body)

        response.raise_for_status()  # Verifica se a requisição de token foi bem-sucedida
        token = response.json().get("access_token")  # Extrai o token de acesso da resposta JSON

        # Configurar Cabeçalhos
        cabecalhos = {"Authorization": "Bearer " + token, 
          "x-conta-corrente": "<conta corrente selecionada>", 
          "Content-Type": "Application/json"}

        # Criar Corpo da Requisição de Emissão de Cobrança
        emitir_body = json.dumps({
            "calendario": request_data['calendario'],  # Dados do calendário (expiração)
            "devedor": request_data['devedor'],  # Dados do devedor (CNPJ, nome)
            "valor": request_data['valor'],  # Dados do valor da cobrança (valor original, modalidade de alteração)
            "chave": request_data['chave'],  # Chave PIX
            "solicitacaoPagador": request_data['solicitacaoPagador'],  # Solicitação do pagador
            "infoAdicionais": request_data['infoAdicionais']  # Informações adicionais
        })

        # Enviar Requisição de Emissão de Cobrança
        response = requests.post("https://cdpj.partners.bancointer.com.br/pix/v2/cob", 
          headers=cabecalhos, 
          cert=('<nome arquivo certificado>.crt','<nome arquivo chave privada>.key'),
          data=emitir_body)

        response.raise_for_status()  # Verifica se a requisição de emissão de cobrança foi bem-sucedida
        return jsonify({"status": "Pagamento realizado com sucesso!"})  # Retorna uma resposta de sucesso

    else:
        # Lógica para processamento de pagamento com cartão (GetNet, por exemplo)
        # Aqui você adicionaria a integração com a API de pagamento do provedor de cartão
        return jsonify({"status": "Pagamento realizado com sucesso via GetNet"})  # Retorna uma resposta de sucesso para pagamento com cartão

if __name__ == '__main__':
    app.run(debug=True)  # Inicia o servidor Flask em modo debug
    codigo forneco pelo banco inter
"""
from flask import Flask, request, jsonify
import requests
import json

app = Flask(__name__)

@app.route('/checkout', methods=['POST'])
def checkout():
    request_data = request.get_json()

    if request_data.get('method') == 'pix':
        # Requisição de Token para Banco Inter
        request_body = "client_id=SEU_CLIENT_ID&client_secret=SEU_CLIENT_SECRET&scope=cob.write&grant_type=client_credentials"
        response = requests.post(
            "https://cdpj.partners.bancointer.com.br/oauth/v2/token",
            headers={"Content-Type": "application/x-www-form-urlencoded"},
            cert=('seu_certificado.crt', 'sua_chave_privada.key'),
            data=request_body
        )
        response.raise_for_status()
        token = response.json().get("access_token")

        # Criar cobrança PIX
        headers = {"Authorization": f"Bearer {token}", "x-conta-corrente": "SUA_CONTA", "Content-Type": "Application/json"}
        emitir_body = json.dumps({
            "calendario": request_data['calendario'],
            "devedor": request_data['devedor'],
            "valor": request_data['valor'],
            "chave": request_data['chave'],
            "solicitacaoPagador": request_data['solicitacaoPagador']
        })

        response = requests.post(
            "https://cdpj.partners.bancointer.com.br/pix/v2/cob",
            headers=headers,
            cert=('seu_certificado.crt', 'sua_chave_privada.key'),
            data=emitir_body
        )
        response.raise_for_status()

        return jsonify({"status": "Pagamento realizado com sucesso!"})

    else:
        # Processamento de pagamento via GetNet (Exemplo Simples)
        return jsonify({"status": "Pagamento realizado com sucesso via GetNet"})

if __name__ == '__main__':
    app.run(debug=True)
