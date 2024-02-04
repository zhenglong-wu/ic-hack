import pickle
from sklearn.preprocessing import MinMaxScaler

scaler = MinMaxScaler()

with open('backend/models/random_forest/model.pkl', 'rb') as file:
    model = pickle.load(file)

import numpy as np

data = scaler.fit_transform(np.array([[51.513029, -0.137259]]))

predictions_1 = model.predict(data)
print(predictions_1)

# # Later in the same session, another prediction
# predictions_2 = model.predict(data2)
# print(predictions_2)