from flask import Flask, request, render_template
from load import *
import numpy as np
import keras.models
import re
import sys
import os
import json
import tensorflow as tf
# from model.load import init
# Tell app where our saved model is
sys.path.append(os.path.abspath('./model/assets'))

# global model
# model = init()

# Method 1
app = Flask(__name__, static_folder='../build', static_url_path='/')
@app.route('/')
def index():
    print('Welcome to Dementia Finder API!!!')
    return app.send_static_file('index.html')
    # return render_template('index.html')

@app.route('/predict', methods=['GET', 'POST'])
def predict():
		request_data = request.get_data()
		# Converts stringify data to json
		sample = json.loads(request_data)
		# Convert strings to int & float
		sample['age'] = int(sample['age'])
		sample['mean_lhv'] = float(sample['mean_lhv'])
		sample['mean_rhv'] = float(sample['mean_rhv'])
		# Load trained model
		trained_model1 = tf.keras.models.load_model(os.path.abspath('./model/assets'))
		input_dict = {
		    name: tf.convert_to_tensor([value]) for name, value in sample.items()
		}
		predictions = trained_model1.predict(input_dict)
        # print('lllll', predictions)
        # if predictions[0][0] >= 60:
        #     status = 'Demented'
        #     pass
        # elif 45 <= predictions[0][0] and predictions[0][0] < 60:
        #     status = 'Undetermined'
        #     pass
        # else:
        #     status = 'Non-demented'
        #     pass

        # data = {
        #     'evals': {
        #         'precision': predictions[0][0],
        #         'accuracy': predictions[0][0],
        #         'recall': predictions[0][0]
        #     },
        #     'status': status,
        # }
		# Send response in str format
		response = str(predictions[0][0])
		return response

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
