from pymongo import MongoClient
from flask import Flask, jsonify

app = Flask(__name__)

def get_db():
    
    client = MongoClient('mongodb://localhost:27017')
    return client.us_accidents_db

@app.route('/accidents')
def read_accidents():
    db = get_db()
    accidents = [accident for accident in db.accidents.find({})]
    return jsonify(accidents)

@app.route('/accidents/<min_severity>')
def read_accidents_severity(min_severity):
    db = get_db()
    accident_severity = [accident for accident in db.accidents.find({'Severity': {'$gte': 'min_severity'}})]
    return jsonify(accident_severity)

if __name__ == '__main__':
    app.run(debug=True)