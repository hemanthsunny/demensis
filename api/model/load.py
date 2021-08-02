import numpy as np
import keras.models
import tensorflow as tf

from keras.models import model_from_json

def init():
    json_file = open('model/assets/model.json', 'r')
    loaded_model_json = json_file.read()
    json_file.close()

    # loaded_model = model_from_json(loaded_model_json)
    # loaded_model.load_weights('model/assets/model.h5')
    trained_model = tf.keras.models.load_model('model/assets')
    print('Loaded model...')

    # loaded_model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
    # return loaded_model
    return trained_model
