import requests
from bs4 import BeautifulSoup
import numpy as np
from scipy.stats import linregress

def getPriceArray(postcode, window):
    url = 'https://housemetric.co.uk/results?str_input=' + postcode
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')

    # You would need to find the correct HTML elements that contain the data you need.
    # This is a generic example and will likely need to be adjusted.
    prices_per_sqm = []
    for entry in soup.find_all(class_='d-none d-sm-table-row'):
        children = entry.find_all(recursive=False)
        new_price_per_sqm = children[-1].string.replace('\n', '').strip()
        date = int(children[1].string.replace('\n', '').strip()[-4:])
        if new_price_per_sqm != '' and date >= 2024 - window:
            prices_per_sqm.append(new_price_per_sqm)
    
    return prices_per_sqm

print(getPriceArray(postcode='SW32DE', window=10))