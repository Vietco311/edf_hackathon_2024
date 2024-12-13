from flask_cors import CORS
import pandas as pd
import flask
from flask import request, jsonify
from append_to_table import append_to_table
import easyocr
import re

app = flask.Flask(__name__)  # Changed from "" to __name__
CORS(app)

db = pd.ExcelFile("BDD_Vehicules.xlsx")
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024

@app.route("/database_voitures")
def database_voitures():
    return pd.read_excel(db, 'database_Voitures').to_json(orient='records')


@app.route("/destinations_possibles")
def destination_possible():
    return pd.read_excel(db, 'destinations_possibles').to_json(orient='records')


@app.route("/Releve_km")
def releve_km():
    return pd.read_excel(db, 'Releve_km').to_json(orient='records')


@app.route("/type_defauts")
def type_defauts():
    return pd.read_excel(db, 'type_defauts').to_json(orient='records')


@app.route("/Défauts_relevés")
def Défauts_relevés():
    return pd.read_excel(db, 'Défauts_relevés').to_json(orient='records')


@app.route("/Planning_reservations")
def Planning_reservations():
    return pd.read_excel(db, 'Planning_reservations').to_json(orient='records')


@app.route("/vehicule/<int:id>")
def get_vehicule_by_id(id):
    print(f"Received request for vehicle ID: {id}")  # Debug log
    df = pd.read_excel(db, 'database_Voitures')
    vehicule = df[df['id_vehicule'] == id]
    if vehicule.empty:
        return {"error": "Véhicule non trouvé"}, 404
    # Convert to dict for proper JSON serialization
    return vehicule.iloc[0].to_json()

@app.route("/vehicule/immat/<string:immat>")
def get_vehicule_by_immat(immat):
    print(f"Received request for vehicle immat: {immat}")  # Debug log
    df = pd.read_excel(db, 'database_Voitures')
    vehicule = df[df['immat'] == immat.upper()]
    if vehicule.empty:
        return {"error": "Véhicule non trouvé"}, 404
    return vehicule.iloc[0].to_json()

@app.route("/append_to_table", methods=['POST'])
def append_data():
    try:
        data = request.get_json()

        if not all(key in data for key in ['filename', 'table', 'data']):
            return jsonify({'error': 'Missing required fields'}), 400

        append_to_table(
            filename=data['filename'],
            table=data['table'],
            data=data['data']
        )

        return jsonify({'message': 'Data appended successfully'}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route("/upload_file", methods=['POST'])
def upload_file():

    try:
        patern = re.compile(r'[A-Z]{2}(-|\s)\d{3}(-|\s)[A-Z]{2}')
        file = request.files['file[assets][0][file]']
        
        # Read file in chunks to handle large files
        reader = easyocr.Reader(['fr'])
        chunk_size = 8192
        file_content = b''
        
        for chunk in iter(lambda: file.stream.read(chunk_size), b''):
            file_content += chunk
        
        # Print file size in bytes
        print(f"File size: {len(file_content)} bytes")
            
        result = reader.readtext(file_content)
    

        for (bbox, text, prob) in result:
            (top_left, top_right, bottom_right, bottom_left) = bbox
            print(text)

            match_patrn = patern.search(text)
            if match_patrn:
                plate = match_patrn.group()
                plate = plate.replace(' ', '').replace('-', '')
                response = jsonify({'message': 'File uploaded successfully', 'text': plate})
                response.headers.add('Access-Control-Allow-Origin', '*')
                return response

        return jsonify({'message': 'Plate unreadable'}), 400
    except Exception as e:
        print(f"Error processing file: {str(e)}")
        return jsonify({'error': str(e)}), 500


    # response = jsonify({'message': 'Data appended successfully'})
    # response.headers.add('Access-Control-Allow-Origin', '*')
    # return response, 200


if __name__ == '__main__':
    app.run(debug=True, port=8080)