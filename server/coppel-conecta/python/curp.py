# app_curp.py
from flask import Flask, request, jsonify
import cv2
import pytesseract
import re
import numpy as np
from werkzeug.utils import secure_filename
import os

# Inicialización de Flask
app = Flask(__name__)

# Configuración de Tesseract OCR (ajusta la ruta si es necesario)
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

# Carpeta temporal para imágenes subidas
UPLOAD_FOLDER = 'temp_uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Patrón regex para validar CURP
CURP_REGEX = re.compile(r'^[A-Z]{4}\d{6}[HM][A-Z]{5}\d{2}$')

# Clase para procesar imágenes y extraer CURP usando OCR
class CURPProcessor:
    def __init__(self):
        self.config_tesseract = '--psm 6 --oem 3 -c tessedit_char_whitelist=ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

    def preprocesar_imagen(self, ruta_imagen):
        """Preprocesa la imagen para mejorar el reconocimiento OCR."""
        try:
            imagen = cv2.imread(ruta_imagen)
            if imagen is None:
                raise ValueError("No se pudo cargar la imagen")
            
            gris = cv2.cvtColor(imagen, cv2.COLOR_BGR2GRAY)
            umbral = cv2.adaptiveThreshold(gris, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
                                           cv2.THRESH_BINARY, 11, 2)
            return umbral
        except Exception as e:
            raise RuntimeError(f"Error al procesar imagen: {str(e)}")

    def extraer_curp(self, ruta_imagen):
        """Extrae texto de la imagen y busca una CURP válida."""
        try:
            imagen_procesada = self.preprocesar_imagen(ruta_imagen)
            if imagen_procesada is None:
                return None
            
            texto = pytesseract.image_to_string(imagen_procesada, config=self.config_tesseract)
            lineas = [linea.strip() for linea in texto.split('\n') if linea.strip()]
            
            for linea in lineas:
                candidato = ''.join(c for c in linea if c.isalnum()).upper()
                if CURP_REGEX.match(candidato):
                    return candidato
            
            return None
        except Exception as e:
            raise RuntimeError(f"Error al extraer CURP: {str(e)}")

# Crear instancia del procesador
processor = CURPProcessor()

# Ruta para detección de CURP desde imagen
@app.route('/detect-curp', methods=['POST'])
def detect_curp():
    if 'image' not in request.files:
        return jsonify({"error": "No image provided"}), 400

    file = request.files['image']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    try:
        filename = secure_filename(file.filename)
        temp_path = os.path.join(UPLOAD_FOLDER, filename)
        file.save(temp_path)

        curp = processor.extraer_curp(temp_path)
        os.remove(temp_path)  # Eliminar imagen temporal

        if curp:
            return jsonify({"curp": curp})
        else:
            return jsonify({"error": "No valid CURP found"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Ejecutar servidor Flask
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
