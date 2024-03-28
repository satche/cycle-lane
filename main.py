import csv
import overpy
from geopy.distance import geodesic
import pandas as pd
import folium

# Define the region
region = "Vaud"

# Query to search for cycle lanes in the specified region
query = f"""
    area["name"="{region}"]->.searchArea;
    way["cycleway"](area.searchArea);
    (._;>;);
    out body;
    """


# Function to fetch cycle lane data
def fetch_cycle_lane_data(query):
    try:
        api = overpy.Overpass()
        result = api.query(query)
        return result
    except overpy.OverpassException as e:
        print(f"Error occurred: {e}")
        return None


# Function to calculate distance between two nodes
def calculate_distance(node1, node2):
    coords1 = (node1.lat, node1.lon)
    coords2 = (node2.lat, node2.lon)
    return geodesic(coords1, coords2).meters


cycle_lanes = []

# Main function to fetch and process data


def main():

    result = fetch_cycle_lane_data(query)
    if result:

        # Process the result
        for way in result.ways:
            cycleway = way.tags.get("cycleway", "unknown")
            nodes = way.get_nodes(resolve_missing=True)
            length = sum(calculate_distance(
                nodes[i], nodes[i+1]) for i in range(len(nodes)-1))

            # Update cycle_lanes array
            cycle_lanes.append({
                'wayId': way.id,
                'cycleway': cycleway,
                'length': length,
                'coordinates': [(float(node.lat), float(node.lon)) for node in nodes]
            })

        else:
            print("No cycle lanes found.")

    # Specify the field names (column names) for the CSV file
    fieldnames = ['wayId', 'cycleway', 'length', 'coordinates']

    # Open (or create) a CSV file in write mode
    with open('cycle_lanes.csv', 'w', newline='') as file:
        writer = csv.DictWriter(file, fieldnames=fieldnames)

        # Write the header row
        writer.writeheader()

        # Write the data rows
        for lane in cycle_lanes:
            writer.writerow(lane)

    # Read the CSV file
    df = pd.read_csv('cycle_lanes.csv')

    # Convert the 'coordinates' column from string to list
    df['coordinates'] = df['coordinates'].apply(eval)

    # Create a map centered around the coordinates of the first cycle lane
    m = folium.Map(location=df['coordinates'][0][0], zoom_start=13)

    # Add a line for each cycle lane
    for _, row in df.iterrows():
        folium.PolyLine(row['coordinates'], color="red",
                        weight=2.5, opacity=1).add_to(m)

    # Display the map
    m.save('map.html')


if __name__ == "__main__":
    main()
