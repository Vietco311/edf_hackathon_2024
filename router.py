from flask_cors import CORS
import pandas as pd
import flask
from flask import request, jsonify
from append_to_table import append_to_table

app = flask.Flask(__name__)  # Changed from "" to __name__
CORS(app)

db = pd.ExcelFile("BDD_Vehicules.xlsx")

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


if __name__ == '__main__':
    app.run(debug=True, port=5000)