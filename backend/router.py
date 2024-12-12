import pandas as pd
import flask

app = flask.Flask("")
db = pd.ExcelFile("BDD_Vehicules.xlsx")


@app.route("/database_voitures")
def database_voitures():
    return pd.read_excel(db, 'database_Voitures').to_json()

@app.route("/destinations_possibles")
def destination_possible():
    return pd.read_excel(db, 'destinations_possibles').to_json()

@app.route("/Releve_km")
def releve_km():
    return pd.read_excel(db, 'Releve_km').to_json()

@app.route("/type_defauts")
def type_defauts():
    return pd.read_excel(db, 'type_defauts').to_json()

@app.route("/Défauts_relevés")
def Défauts_relevés():
    return pd.read_excel(db, 'Défauts_relevés').to_json()

@app.route("/Planning_reservations")
def Planning_reservations():
    return pd.read_excel(db, 'Planning_reservations').to_json()


app.run()