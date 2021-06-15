""" Api views for users """
from os import name

from flask.helpers import make_response
from flask_jwt import encode_token
import jsonschema
from flask import Blueprint, jsonify, request, current_app, g
from jsonschema import validate
from mongoengine.errors import ValidationError
from flask_bcrypt import generate_password_hash, check_password_hash

from proshop_fmr.utils import admin_required, authentication_required, encode_auth_token
from .schemas import register_schema
from proshop_fmr.models import User

user_bp = Blueprint('users', __name__, url_prefix='/api/users')


@user_bp.route('/login', methods=['POST'])
def login():
    user_input = request.json
    try:
        user = User.objects.filter(email=user_input.get('email')).first()
        if user and check_password_hash(user.password,
                                        user_input.get('password')):
            auth_token = encode_auth_token(user.name)
            if auth_token:
                json_response = jsonify({
                    'auth_token': auth_token,
                    'status': 'success',
                    'user': user.to_json(),
                    'message': 'Successfully logged in.'
                })
                return make_response(json_response), 200

        else:
            json_response = jsonify({
                'status': 'fail',
                'message': 'User does not exist.'
            })
            return make_response(json_response), 404
    except Exception as e:
        print(e)
        json_response = jsonify({'status': 'fail', 'message': 'Try again'})
        return make_response(json_response), 500


@user_bp.route('/register', methods=['POST'])
def register():
    user_input = request.json
    try:
        validate(user_input, register_schema)
    except jsonschema.ValidationError as e:
        response_json = jsonify({'status': 'fail', 'message': e.message})
        return make_response(response_json), 400

    user = User.objects.filter(
        name=user_input.get('name')).first() or User.objects.filter(
            email=user_input.get('email')).first()
    if not user:
        try:
            hashed_password = generate_password_hash(
                user_input.get('password'))
            user = User.objects.create(name=user_input.get('name'),
                                       email=user_input.get('email'),
                                       password=hashed_password)
            response_json = jsonify({
                'status':
                'success',
                'message':
                'Successfully registred',
                'user':
                user.to_json(),
                'access_token':
                encode_auth_token(user.name)
            })
            return make_response(response_json), 201
        except Exception as e:
            response_json = {
                'status': 'fail',
                'message': 'Some error occurred, please try again .'
            }
            return make_response(response_json), 500

    else:
        response_json = jsonify({
            'status':
            'fail',
            'message':
            'User already exist. Please log in again',
        })
        return make_response(response_json), 202


@user_bp.route('/<user_name>')
@authentication_required
@admin_required
def get_user_detail(user_name):
    user = User.objects.filter(name=user_name).first()
    if user:
        return user.to_json()
    else:
        json_response = jsonify({
            'status': 'fail',
            'message': 'User does not exist.'
        })
        return make_response(json_response), 404