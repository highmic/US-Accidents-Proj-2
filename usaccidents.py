from pymongo import MongoClient
from flask import Flask, jsonify

app = Flask(__name__)

def get_db():
    
    client = MongoClient('mongodb://localhost:27017')
    return client.us_accidents_db

# @app.route('/accidents')
def read_accidents():
    db = get_db()
    accidents = [accident for accident in db.accidents_2019.find({})]
    return accidents

def read_accidents_severity(min_severity):
    db = get_db()
    accidents_severity = [accident for accident in db.accidents_2019.find({'Severity': {'$gte': min_severity}})]
    return accidents_severity

@app.route('/accidents')
def get_accidents():
    accidents = read_accidents()
    return jsonify(accidents)

@app.route('/accidents/<min_severity>')
def get_accidents_severity(min_severity):
    accidents = read_accidents_severity(min_severity)
    return jsonify(accidents)


if __name__ == '__main__':
    app.run(debug=True)
    # print(read_accidents())
    # print(read_accidents_severity(2))
    