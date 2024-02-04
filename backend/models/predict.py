import tensorflow as tf
from sklearn.preprocessing import MinMaxScaler
import numpy as np
import random
import pickle


# def create_model():

#     model = tf.keras.Sequential([
#         tf.keras.layers.Conv1D(filters=112, 
#                                kernel_size=3, 
#                                activation='relu', 
#                                input_shape=(2, 1), 
#                                padding='same'),

#         tf.keras.layers.MaxPooling1D(pool_size=1),

#         tf.keras.layers.Dense(2),
#         tf.keras.layers.Dense(2),

#         tf.keras.layers.Dense(1)
#     ])

#     return model


def scale_coordinate(longitude, latitude, long_range=(-180, 180), lat_range=(-90, 90)):

    long_scaled = (longitude - long_range[0]) / (long_range[1] - long_range[0])
    lat_scaled = (latitude - lat_range[0]) / (lat_range[1] - lat_range[0])
    
    return long_scaled, lat_scaled


def predict(long: float, lat: float):

    with open('/Users/zhenglongwu/Documents/GitHub/ic-hack/backend/models/model.pkl', 'rb') as file:
        model = pickle.load(file)

    scaled = scale_coordinate(longitude=long, latitude=lat)

    print(scaled[0], scaled[1])

    return model.predict([[scaled[0], scaled[1]]]) + random.uniform(-0.13, 0.18)


    # scaler = MinMaxScaler()

    # model = create_model()
    # model.load_weights("backend/models/cnn_model/training_1/cp1.ckpt")
    # model.compile(optimizer=tf.keras.optimizers.legacy.Adam(
    #     learning_rate=0.001), loss='mse') 

    # data = scaler.fit_transform([[long, lat]]).reshape(1, 2, 1)
    # return model.predict(data, len(data))


def predict_batch(data):
    
    return


print(predict(long=51.514086, lat=-10.129774))