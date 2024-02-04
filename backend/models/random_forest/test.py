import pickle
from sklearn.preprocessing import MinMaxScaler

scaler = MinMaxScaler()


with open('/Users/zhenglongwu/Documents/GitHub/ic-hack/backend/models/random_forest/model.pkl', 'rb') as file:
    model = pickle.load(file)

import numpy as np

data1 = scaler.fit_transform(np.array([[31.023123, -0.313]]))
data2 = scaler.fit_transform(np.array([[51.023123, -41.313]]))

predictions_1 = model.predict(data1)
print(predictions_1)

# Later in the same session, another prediction
predictions_2 = model.predict(data2)
print(predictions_2)