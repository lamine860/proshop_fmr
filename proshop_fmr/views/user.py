""" Api views for users """
from os import name
import bcrypt
from flask import Blueprint, jsonify, request
import flask_jwt
from jsonschema import validate
from mongoengine.errors import ValidationError
from flask_bcrypt import Bcrypt
from .schemas import register_schema
from proshop_fmr.models import User

user_bp = Blueprint('users', __name__, url_prefix='/api/users')
bcrypt = Bcrypt()

@user_bp.route('/register', methods=['POST'])
def register():
    User.objects.delete()
    user_data = request.json
    validate(user_data, register_schema)
    user_exist = User.objects.filter(name=user_data.get('name')).first() or User.objects.filter(email=user_data.get('email')).first()
    if not user_exist:
        hashed_password = bcrypt.generate_password_hash(password=user_data.get('password'))
        user = User.objects.create(name=user_data.get('name'), email=user_data.get('email'), password=hashed_password )
        return user.to_json(), 201
    else:
        raise ValidationError('User already exists')