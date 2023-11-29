from flask import Flask, request, jsonify
import requests, json
from bs4 import BeautifulSoup
from urllib.parse import urljoin
from flask_cors import CORS
from summarizer import Summarizer
import requests
import json
import base64

app = Flask(__name__)
CORS(app)

@app.route('/')
def hello_world():
    return "Hello World!"

#################### Text Summarization ##################
@app.route('/text', methods=['POST'])
def text():
    try:
        data = request.json.get('text')
        size = int(request.json.get('size'))
        model = Summarizer()
        result = model(data, num_sentences=size, min_length=60)
        result = ''.join(result)
        return jsonify(result)
        
    except requests.exceptions.RequestException as e:
        return jsonify({'error': str(e)}), 500
    except json.decoder.JSONDecodeError:
        print('Error')
        return jsonify({'error': 'Invalid response from API.'}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
####################### OCR ############################
@app.route('/img', methods=['POST'])
def ocr_space_file():
    try:
        file = request.files['file']

        if file:
            if not file.filename or '.' not in file.filename:
                return jsonify({'error': 'Invalid file format'})

            ext = file.filename.split('.')[-1]
            pre = "data:image/" + ext + ";base64,"
            
            API_KEY = 'K82107326988957'
            
            image_base64 = base64.b64encode(file.read()).decode('utf-8')
            image_base64 = pre + image_base64

            payload = {
                'base64Image': image_base64,
                'isOverlayRequired': False,
                'apikey': API_KEY,
                'language': 'eng',
            }

            response = requests.post('https://api.ocr.space/parse/image', data=payload)
            response = str(response.content.decode())
            parsed_response = json.loads(response)
            parsed_text = parsed_response["ParsedResults"][0]["ParsedText"]
            return jsonify({'result': parsed_text})
        else:
            return jsonify({'error': 'No file received'})

    except Exception as e:
        return jsonify({'error': str(e)})

####################### Web Scraping ############################
@app.route('/webscrap', methods=['POST'])
def webscrap():
    try:
        url = request.json.get('url')
        response = requests.get(url)
        soup = BeautifulSoup(response.content, 'html.parser')
        paragraph_elements = soup.find_all(['p', 'h2', 'h3', 'h4', 'h5'])
        scraped_text = ' '.join(element.get_text() for element in paragraph_elements)
        text = ''
        for paragraph in paragraph_elements:
            text += paragraph.text
        return jsonify(scraped_text)
    except Exception as e:
        return jsonify({'error': str(e)}), 500
  

if __name__ == '__main__':
    app.run(debug=True)