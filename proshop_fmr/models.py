from inspect import currentframe
from flask_mongoengine import MongoEngine
from flask_jwt import jwt
from flask import current_app

db = MongoEngine()


class Product(db.Document):
    name = db.StringField(max_length=60, required=True, unique=True)
    price = db.DecimalField(required=True)
    countInStock = db.IntField(required=True, default=1)
    image = db.StringField(required=True)
    description = db.StringField()
    quantity = db.IntField(required=True, default=1)
    rating = db.IntField(required=True, default=0)
    category = db.StringField(required=True)
    brand = db.StringField(required=True)
    numReviews = db.IntField(required=True, default=0)

    def toJson(self):
        return {}


class User(db.Document):
    name = db.StringField(max_length=20, min_length=2, require=True, unique=True)
    email = db.EmailField()
    password = db.StringField(max_length=255, min_length=2, require=True)
    is_admin = db.BooleanField(default=False)

    def to_json(self):
        return {
            'name': self.name,
            'email': self.email,
            'is_admin': self.is_admin,
            'access_token': str(jwt.encode({'id': self.name}, current_app.config['SECRET_KEY']))
        }


class Order(db.Document):
    def toJson(self):
        pass
