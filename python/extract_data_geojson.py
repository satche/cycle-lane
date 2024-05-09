import json
import csv
import requests

def get_entity_info(wikidata_id, villages_data):
    url = f"https://www.wikidata.org/wiki/Special:EntityData/{wikidata_id}.json"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        entity_data = data.get("entities", {}).get(wikidata_id, {})
        
        labels = entity_data.get("labels", {})
        name = labels.get("en", {}).get("value") if "en" in labels else None
        
        descriptions = entity_data.get("descriptions", {})
        description = descriptions.get("en", {}).get("value") if "en" in descriptions else None
        
        coordinates = entity_data.get("claims", {}).get("P625", [])
        latitude = coordinates[0]["mainsnak"]["datavalue"]["value"]["latitude"] if coordinates else None
        longitude = coordinates[0]["mainsnak"]["datavalue"]["value"]["longitude"] if coordinates else None
        
        population = None
        population_claim = entity_data.get("claims", {}).get("P1082", [])
        if population_claim:
            population = population_claim[0]["mainsnak"]["datavalue"]["value"]["amount"]
        
        replaced_by = None
        if "P1366" in entity_data.get("claims", {}):
            replaced_by_id = entity_data["claims"]["P1366"][0]["mainsnak"]["datavalue"]["value"]["id"]
            replaced_by_name = get_entity_info(replaced_by_id, villages_data)[0]
            replaced_by = replaced_by_name if replaced_by_name else replaced_by_id
        
        village_info = villages_data.get(wikidata_id, {})
        latitude_village = village_info.get("Latitude")
        longitude_village = village_info.get("Longitude")
        population_village = village_info.get("Population")
        
        latitude = latitude if latitude_village is None else latitude_village
        longitude = longitude if longitude_village is None else longitude_village
        population = population if population_village is None else population_village
        
        return name, description, latitude, longitude, population, replaced_by
    else:
        print("Erreur lors de la requête à l'API Wikidata")
        return None, None, None, None, None, None

def process_geojson(file_path):
    with open(file_path, "r") as file:
        data = json.load(file)
        wikidata_info, villages_without_wikidata = {}, {}
        for feature in data["features"]:
            properties = feature["properties"]
            if "wikidata" in properties:
                wikidata_id = properties["wikidata"]
                latitude, longitude = feature["geometry"]["coordinates"]
                population = properties.get("population")
                wikidata_info[wikidata_id] = {"Latitude": latitude, "Longitude": longitude, "Population": population}
            else :
                name = properties.get("name")
                if not properties.get("wikidata"):
                    latitude, longitude = feature["geometry"]["coordinates"]
                    population = properties.get("population")
                    if name:
                        villages_without_wikidata[name] = {"Latitude": latitude, "Longitude": longitude, "Population": population}

        return wikidata_info, villages_without_wikidata

geojson_file_path = "export.geojson"
wikidata_info, villages_without_wikidata = process_geojson(geojson_file_path)

with open("output_nowikidata.csv", "w", newline="", encoding="utf-8") as csvfile:
    headers = ["Nom", "Latitude", "Longitude", "Population", "Commune"]
    writer = csv.DictWriter(csvfile, fieldnames=headers)

    writer.writeheader()

    for village, info in villages_without_wikidata.items():
        row = {
            "Nom": village,
            "Latitude": info.get("Latitude", ""),
            "Longitude": info.get("Longitude", ""),
            "Population": info.get("Population", ""),
            "Commune": info.get("Commune", "")
        }
        writer.writerow(row)

csv_headers = ['ID Wikidata', 'Nom', 'Description', 'Latitude', 'Longitude', 'Population', 'Remplacé par']
with open("output_wikidata.csv", mode='w', newline="", encoding='utf-8') as file:
    writer = csv.writer(file)
    writer.writerow(csv_headers)
    for wikidata_id, info in wikidata_info.items():
        name, description, latitude, longitude, population, replaced_by = get_entity_info(wikidata_id, wikidata_info)
        writer.writerow([wikidata_id, name, description, latitude, longitude, population, replaced_by])

print("CSV files generated: output_nowikidata.csv and output_wikidata.csv")