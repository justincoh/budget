from flask import (
  Flask,
  render_template,
  request,
  jsonify
)
app = Flask(__name__)

@app.route('/')
def index():
  return render_template('index.html')

@app.route('/data/<filename>')
def get_json_data(filename):
  # grab json file
  with open(filename, 'r') as infile:
    data = infile.read()

  return jsonify(data)