import pandas as pd

# Append a row to an excel file
# filename: the file name
# table: the sheet name
# data: row(s) to be added
def append_to_table(filename:str, table:str, data:dict):
    writer = pd.ExcelWriter(filename, engine='openpyxl', mode="a", if_sheet_exists = 'replace')
    try:
        xls = pd.ExcelFile(filename, engine=None)
        
        old_data = pd.DataFrame(xls.parse(sheet_name=table))
        new_data = pd.DataFrame(data)
        
        combined_data = pd.concat([old_data, new_data])
        combined_data.reset_index(drop=False)
        combined_data.to_excel(writer, sheet_name=table, index=False)
    finally:
        writer.close()
        

if (__name__ == "__main__"):
    DEBUG = True
    if (DEBUG):
        append_to_table("BDD_Vehicules copy 2.xlsx", "database_Voitures", 
                        {
                            'id_vehicule': [65535],
                            'immat': ['immat'], 
                            'modele': ['VOITURE'], 
                            'propulsion': ['PROPULSION'], 
                            'nb_places': [65535], 
                            'autonomie_theorique': [65535], 
                            'Taille_batterie': ['TAILLE_BATTERIE'], 
                            'Conso_kwh_100km': [65535], 
                            'Conso_lt_100km': [65535], 
                            'Site_rattachement': ['SITE_RATTACHEMENT'],
                            })
    
    pass