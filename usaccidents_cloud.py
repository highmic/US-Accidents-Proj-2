from pymongo import MongoClient
from flask import Flask, jsonify
from secrets import credentials 
import pymongo

app = Flask(__name__)

def get_db():
    
    # client = MongoClient('mongodb://localhost:27017')
    connection = 'mongodb+srv://dbUser:rice2020@cluster0.7akn2.mongodb.net/us_accidents_db?retryWrites=true&w=majority'
    client = pymongo.MongoClient(connection)
    return client.us_accidents_db

# @app.route('/accidents')
def read_accidents():
    db = get_db()
    limit =1000  #limit the output for fixed to a fixed dataset 
    accidents = [accident for accident in db.accidents2020.\
        find({}).limit(limit)]
    # del accidents['_id']
    return accidents

def read_accidents_severity(min_severity):
    db = get_db()
    limit = 200
    accidents_severity = [accident for accident in db.accidents2020.\
        find({'Severity': {'$gte': int(min_severity)}}).limit(limit)]
    return accidents_severity

def read_accidents_state(state):
    db = get_db()
    limit = 200
    accidents_state= [accident for accident in db.accidents2020.\
        find({'State': {'$eq': str(state)}}).limit(limit)]
    return accidents_state

def read_accidents_zipcode(zipcode):
    db = get_db()
    limit = 200
    accidents_zipcode= [accident for accident in db.accidents2020.\
        find({'Zipcode': {'$eq': str(zipcode)}}).limit(limit)]
    return accidents_zipcode

def read_zipcode_severity(zipcode, min_severity):
    db = get_db()
    limit = 200
    accidents = [accident for accident in db.accidents2020.\
        find({'Zipcode': {'$eq': str(zipcode)}}).limit(limit)]
    return accidents_zipcode

@app.route('/accidents')
def get_accidents():
    accidents = read_accidents()
    return jsonify(accidents)

@app.route('/accidents/<min_severity>')
def get_accidents_severity(min_severity):
    accidents = read_accidents_severity(min_severity)
    return jsonify(accidents)

@app.route('/states/<state>')
def get_accidents_state(state):
    accidents = read_accidents_state(state)
    return jsonify(accidents)

@app.route('/zipcode/<zipcode>')
def get_accidents_zipcode(zipcode):
    accidents = read_accidents_zipcode(zipcode)
    return jsonify(accidents)



if __name__ == '__main__':
    app.run(debug=True)
    # print(read_accidents())
    # print(read_accidents_severity(2))
    