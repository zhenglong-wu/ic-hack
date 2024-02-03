import requests
import pandas as pd

def construct_sparql_query(longitude, latitude):
    # Replace this with the actual SPARQL query
    query = """
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    ... (SPARQL query here) ...
    """
    return query

def getRecentPriceChanges(longitude, latitude):
    query = construct_sparql_query(longitude, latitude)
    endpoint = "https://landregistry.data.gov.uk/app/qonsole"
    headers = {
        "Accept": "application/sparql-results+json",
        "Content-Type": "application/x-www-form-urlencoded"
    }
    response = requests.post(endpoint, data={"query": query}, headers=headers)

    if response.status_code == 200:
        results = response.json()
        # Process the results, calculate percentage change
        # This will depend on the format of the data
        # For example, you might convert results to a pandas DataFrame and then perform calculations
        df = pd.DataFrame(results)
        # Calculate percentage change here
        return df
    else:
        return "Error: " + str(response.status_code)

# Example usage
longitude = -0.1278
latitude = 51.5074
print(getRecentPriceChanges(longitude, latitude))
