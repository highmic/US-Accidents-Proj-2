# import dependencies
from flask import Flask, jsonify, render_template
from accidentsdata import read_accidents, read_accidents_severity,\
read_accidents_severity,read_accidents_state, read_accidents_zipcode,read_accidents_all


app = Flask(__name__)

#Define flask routes 

@app.route('/')  ##route to render index.html in heroku
def home():
    return render_template('index.html')

@app.route('/api/info')  #all available APIs
def available_apis():
    return(
        f'<h4>Available API Routes:</h4>'
        f'<a href="/allaccidents">/allaccidents</a><br/>'
        f'<a href="/accidents" target="_blank">/accidents</a><br/>'
        f'<a href="/accidents/4" target="_blank">/accidents/min_severity</a><br/>'
        f'<a href="/states/TX" target="_blank">/states/state</a><br/>'
        f'<a href="/zipcode/77071" target="_blank">/zipcode/zipcode</a><br/>'
    )

@app.route('/allaccidents') #not a good idea to call the all accidents api, 540K documents 
def get_all_ccidents():
    accidents = read_accidents_all()
    return jsonify(accidents)

@app.route('/accidents') # return all accidents, but limited to 5000k documents 
def get_accidents():
    accidents = read_accidents()
    return jsonify(accidents)


@app.route('/accidents/<min_severity>') #return accidents severity on a scale of 1-4
def get_accidents_severity(min_severity):
    accidents = read_accidents_severity(min_severity)
    return jsonify(accidents)


@app.route('/states/<state>') #filter to specific state 
def get_accidents_state(state):
    accidents = read_accidents_state(state)
    return jsonify(accidents)


@app.route('/zipcode/<zipcode>') #filter to specific zipcode 
def get_accidents_zipcode(zipcode):
    accidents = read_accidents_zipcode(zipcode)
    return jsonify(accidents)


if __name__ == '__main__':
    app.run(debug=True)
    # print(read_accidents())
    # print(read_accidents_severity(2))
