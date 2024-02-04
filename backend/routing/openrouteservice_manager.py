import os
import openrouteservice


def get_route(coords: tuple[tuple[float, float]]):

    client = openrouteservice.Client(os.environ.get('ors_api_key'))
    return client.directions(coords)


# print(get_route(coords=((51.496011, -0.183503),(51.494532, -0.167165))))
