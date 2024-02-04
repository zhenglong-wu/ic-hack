from predict import predict
from graph_hopper_manager import get_route
import json

def main(dept, dest):

    try:
        
        route = get_route(dept=dept, dest=dest)

        print(route)
        for path in route['data']['paths']:
            print('in loop')
            scores = [predict(long=x[0], lat=x[1]) for x in path['points']['coordinates']]        
            print(scores)
            if 'safety_score' not in path:
                path['safety_score'] = [float(sum(scores)/len(scores))]
            else:
                path['safety_score'].append(float(sum(scores)/len(scores)))
            print('fin')
            
        return json.dumps(route)

    except Exception as error: 
        print(error)
        return


# with open('new.json', 'w') as f:
#     json.dump(main([51.515273, -0.132233], [51.511425, -0.120112]), f)
    
print(main([51.515273, -0.132233], [51.511425, -0.120112]))