from flask import Flask, request, jsonify
import nvidia.riva.client as riva  # SDK de NVIDIA

app = Flask(__name__)

# Configuración de NVIDIA Riva
riva_client = riva.SpeechSynthesisService("api.nvidia.com")

@app.route('/generate-speech', methods=['GET'])
def generate_speech():
    cobrador_id = request.args.get('cobradorId')
    tipo_negocio = request.args.get('tipoNegocio')
    
    # Generar speech con Riva
    response = riva_client.synthesize(
        text=f"Hola, soy {cobrador_id} de Coppel. Su negocio de {tipo_negocio} podría...",
        language="es-MX"
    )
    return jsonify({
        "speech": response.audio,
        "sugerencias": ["Oferta de crédito", "Capacitación"]
    })

@app.route('/recommend-courses', methods=['POST'])
def recommend_courses():
    tipo_negocio = request.json.get('tipo_negocio')
    cursos = {
        'abarrotes': ['Gestión de inventarios', 'Ventas al menudeo'],
        'restaurante': ['Higiene alimentaria', 'Costeo de platillos']
    }
    return jsonify({"cursos": cursos.get(tipo_negocio, ["Finanzas básicas"])})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)