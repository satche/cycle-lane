import overpy
from geopy.distance import geodesic

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
            print(f"Way ID: {way.id}, Cycleway: {cycleway}, Length: {length:.2f} meters")
    else:
        print("No cycle lanes found.")


if __name__ == "__main__":
    main()
