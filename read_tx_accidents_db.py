from pymongo import MongoClient
from flask import Flask, jsonify

app = Flask(__name__)

def get_db():
    
    client = MongoClient('mongodb://localhost:27017')
    return client.us_accidents_db

@app.route('/txaccidents')
def read_accidents():
    db = get_db()
    tx_accidents = [accident for accident in db.cappedUS_accidents.find({})]
    return jsonify(tx_accidents)

@app.route('/txaccidents/<min_severity>')
def read_accidents_severity(min_severity):
    db = get_db()
    tx_accident_severity = [accident for accident in db.cappedUS_accidents.find({'Severity': {'$gte': 'min_severity'}})]
    return jsonify(tx_accident_severity)

if __name__ == '__main__':
    app.run(debug=True)