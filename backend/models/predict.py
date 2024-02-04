import tensorflow as tf
from sklearn.preprocessing import MinMaxScaler
import numpy as np


def create_model():

    model = tf.keras.Sequential([
        tf.keras.layers.Conv1D(filters=112, 
                               kernel_size=3, 
                               activation='relu', 
                               input_shape=(2, 1), 
                               padding='same'),

        tf.keras.layers.MaxPooling1D(pool_size=1),

        tf.keras.layers.Dense(2),
        tf.keras.layers.Dense(2),

        tf.keras.layers.Dense(1)
    ])

    return model


def predict(long: float, lat: float):

    scaler = MinMaxScaler()

    model = create_model()
    model.load_weights("backend/model/training_1/cp1.ckpt")
    model.compile(optimizer='adam', loss='mse') 

    data = scaler.fit_transform([[long, lat]]).reshape(1, 2, 1)
    return model.predict(data, len(data))


def predict_batch(data):
    
    return


print(predict(long=51.514086, lat=-10.129774))