import what3words
import os


def convert_w3w(long: float, lat: float):

    geocoder = what3words.Geocoder(os.environ.get('w3w_api_key'))
    
    try:
        return geocoder.convert_to_3wa(what3words.Coordinates(long, lat))['words']
    except Exception as error:
        print(error)
        print('Error occured')
        return None


# print(convert_w3w(long=51.484463, lat=-0.195405))