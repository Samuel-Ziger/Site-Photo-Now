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
    codigo feito por ia usando o codigo do inter
"""
from flask import Flask, request, jsonify
import requests
import json

app = Flask(__name__)

@app.route('/checkout', methods=['POST'])
def checkout():
    request_data = request.get_json()
    
    if request_data.get('method') == 'pix':
        return processar_pix(request_data)
    
    elif request_data.get('method') in ['credit', 'debit']:
        return processar_cartao(request_data)

    return jsonify({"status": "Erro: Método de pagamento inválido."}), 400


def processar_pix(request_data):
    try:
        # Solicita Token de Autenticação
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

        return jsonify({"status": "Pagamento PIX realizado com sucesso!"})

    except requests.exceptions.RequestException as e:
        return jsonify({"status": "Erro no pagamento PIX", "erro": str(e)}), 500


def processar_cartao(request_data):
    try:
        # Tokenização do cartão
        token_response = requests.post(
            "https://api.getnet.com.br/v1/tokens/card",
            headers={
                "Authorization": "Bearer SEU_TOKEN_GETNET",
                "Content-Type": "application/json"
            },
            json={
                "card_number": request_data['cardNumber'],
                "customer_id": "CUSTOMER_12345"
            }
        )
        token_response.raise_for_status()
        card_token = token_response.json().get("number_token")

        # Criar transação
        transaction_body = {
            "seller_id": "SEU_SELLER_ID",
            "amount": int(float(request_data['total']) * 100),  # GetNet espera o valor em centavos
            "currency": "BRL",
            "order": {
                "order_id": "PEDIDO_123",
                "sales_tax": 0
            },
            "customer": {
                "customer_id": "CUSTOMER_12345",
                "first_name": "Nome",
                "last_name": "Sobrenome",
                "email": "email@cliente.com"
            },
            "device": {
                "ip_address": "127.0.0.1"
            },
            "shippings": [{
                "first_name": "Nome",
                "last_name": "Sobrenome",
                "email": "email@cliente.com",
                "phone_number": "11999999999",
                "address": {
                    "street": "Rua Teste",
                    "number": "100",
                    "complement": "Apto 101",
                    "district": "Bairro",
                    "city": "Cidade",
                    "state": "SP",
                    "postal_code": "01001000"
                }
            }],
            "card": {
                "number_token": card_token,
                "cardholder_name": request_data['cardHolder'],
                "security_code": request_data['cardCVC'],
                "brand": "Mastercard",
                "expiration_month": request_data['cardExpiry'].split("/")[0],
                "expiration_year": "20" + request_data['cardExpiry'].split("/")[1]
            },
            "payment": {
                "soft_descriptor": "MEUSITE",
                "capture": True,
                "installments": 1,
                "authenticated": False
            }
        }

        payment_response = requests.post(
            "https://api.getnet.com.br/v1/payments/credit",
            headers={
                "Authorization": "Bearer SEU_TOKEN_GETNET",
                "Content-Type": "application/json"
            },
            json=transaction_body
        )
        payment_response.raise_for_status()

        return jsonify({"status": "Pagamento realizado com sucesso via GetNet!"})

    except requests.exceptions.RequestException as e:
        return jsonify({"status": "Erro no pagamento com cartão", "erro": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
