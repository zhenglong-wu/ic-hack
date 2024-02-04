from backend.model.predict import predict
import backend.routing.graph_hopper_manager as graph_hopper_manager
import json

def lambda_handler(event, context):

    # try:
    #     route = graph_hopper_manager.get_route(dept=event['dept'], dest=['dest'])
    #     scores = [predict(long=x[0], lat=x[1]) for x in route['data']['paths'][0]['points']['coordinates']]
    #     route['safety_score'] = sum(scores)/len(scores)

    #     return json.dumps(route)
    
    # except Exception as error:
    #     print(error)
    #     return
    return json.dumps("Jack it works!")


# with open('new.json', 'w') as f:
#     json.dump(main([51.515273, -0.132233], [51.511425, -0.120112]), f)
    

# print(lambda_handler([51.515273, -0.132233], [51.511425, -0.120112]))