import tensorflow as tf
from sklearn.preprocessing import MinMaxScaler
import numpy as np


def predict(long: float, lat: float):

    scaler = MinMaxScaler()

    model = tf.saved_model.load('backend/model/model')
    data = scaler.fit_transform(np.array([[long, lat]])).reshape(1, 2, 1)
    prediction = model.signatures['serving_default'](tf.constant(data, dtype=tf.float32))
    output_key = list(prediction.keys())[0]  
    
    return prediction[output_key].numpy()[:, 0, 0][0]