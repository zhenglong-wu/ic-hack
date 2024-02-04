import requests
import os


def get_route(dept: list[float, float], dest: list[float, float]):

    query = {
        "profile": "foot",
        "point": [','.join(map(str, dept)), ','.join(map(str, dest))],
        "point_hint": None,
        "snap_prevention": None,
        "curbside": None,
        "locale": "en",
        "elevation": "false",
        "details": None,
        "optimize": "false",
        "instructions": "true",
        "calc_points": "true",
        "debug": "false",
        "points_encoded": "false",
        "ch.disable": "false",
        "heading": None,
        "heading_penalty": None,
        "pass_through": "false",
        "algorithm": "alternative_route",
        "round_trip.distance": "10000",
        "round_trip.seed": "0",
        "alternative_route.max_paths": "3",
        # adjust in future
        "alternative_route.max_weight_factor": "1.5",
        # adjust in future
        "alternative_route.max_share_factor": "0.5",
        "key": os.environ.get('graph_hopper_api_key')
        }
    
    try:
        response = requests.get(os.environ.get('ghm_url'), params=query)

        data = {'code': response.status_code, 'data': None}

        if response.status_code == 200:
            data['data'] = response.json()
            return data
        else:
            return data
        
    except Exception as error:
        print(error)
        print('Error occurred')
        return 
    

# print(get_route(dept=[51.500388, -0.179831], dest=[51.486048, -0.184102]))