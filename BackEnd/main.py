# """
# Install the Google AI Python SDK

# $ pip install google-generativeai

# See the getting started guide for more information:
# https://ai.google.dev/gemini-api/docs/get-started/python
# """

# import os

# import google.generativeai as genai

# genai.configure(api_key='Token_Api')

# # Create the model
# # See https://ai.google.dev/api/python/google/generativeai/GenerativeModel
# generation_config = {
#   "temperature": 1,
#   "top_p": 0.95,
#   "top_k": 64,
#   "max_output_tokens": 8192,
#   "response_mime_type": "text/plain",
# }

# model = genai.GenerativeModel(
#   model_name="gemini-1.5-pro",
#   generation_config=generation_config,
#   # safety_settings = Adjust safety settings
#   # See https://ai.google.dev/gemini-api/docs/safety-settings
# )

# chat_session = model.start_chat(
#   history=[
#   ]
# )

# response = chat_session.send_message("hello rosy-AI")

# print(response.text)

# while True:
#     user_input = input("You: ")
#     response = chat_session.send_message(user_input)
#     print("Rosy-Ai:", response.text)

#     # Exit condition (replace with your desired exit criteria)
#     if user_input.lower() == "quit" or user_input.lower() == "exit":
#         break


from flask_cors import CORS

from flask import Flask, request, jsonify
import google.generativeai as genai

app = Flask(__name__)
CORS(app)

# Konfigurasi model
genai.configure(api_key='Token_Api')
model = genai.GenerativeModel(
    model_name="gemini-1.5-pro",
    generation_config={
        "temperature": 1,
        "top_p": 0.95,
        "top_k": 64,
        "max_output_tokens": 8192,
        "response_mime_type": "text/plain",
    }
)
chat_session = model.start_chat(history=[])

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/api/send-message', methods=['POST'])
def send_message():
    user_message = request.json.get('message')
    response = chat_session.send_message(user_message)
    return jsonify(text=response.text)

if __name__ == '__main__':
    app.run(port=5000)
