from pymongo import MongoClient
from secrets import credentials
import pymongo

#define mongoatlas usee credentials from secrets 
user = credentials.get('user')
password = credentials.get('password')


def get_db():

    # client = MongoClient('mongodb://localhost:27017')
    connection = f'mongodb+srv://{user}:{password}@cluster0.7akn2.mongodb.net/us_accidents_db?retryWrites=true&w=majority'
    client = pymongo.MongoClient(connection)
    return client.us_accidents_db


def read_accidents_all():
    db = get_db()
    # No limit, return all data
    accidents = [accident for accident in db.accidents2020.find({})]
    return accidents


def read_accidents():
    db = get_db()
    limit = 10  # limit the output to specified number 
    accidents = [accident for accident in db.accidents2020.
                 find({}).limit(limit)]
    return accidents


def read_accidents_severity(min_severity):
    db = get_db()
    limit = 5000
    accidents_severity = [accident for accident in db.accidents2020.
                          find({'Severity': {'$gte': int(min_severity)}}).limit(limit)]
    return accidents_severity


def read_accidents_state(state):
    db = get_db()
    limit = 5000
    accidents_state = [accident for accident in db.accidents2020.
                       find({'State': {'$eq': str(state)}}).limit(limit)]
    return accidents_state


def read_accidents_zipcode(zipcode):
    db = get_db()
    limit = 5000
    accidents_zipcode = [accident for accident in db.accidents2020.
                         find({'Zipcode': {'$eq': str(zipcode)}}).limit(limit)]
    return accidents_zipcode


if __name__ == '__main__':
    print(read_accidents())
  
