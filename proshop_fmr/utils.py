from proshop_fmr.models import User
import jwt
import datetime
from flask import current_app, make_response, jsonify, request, g
from functools import wraps


def encode_auth_token(sub):
    payload = {
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1),
        'iat': datetime.datetime.utcnow(),
        'sub': sub
    }
    try:
        return jwt.encode(payload,
                          current_app.config.get('SECRET_KEY'),
                          algorithm='HS256').decode()
    except Exception as e:
        return e


def decode_auth_token(auth_token):
    """
    Decodes the auth token
    :param auth_token:
    :return: integer|string
    """
    try:
        payload = jwt.decode(auth_token, current_app.config.get('SECRET_KEY'))
        return payload['sub']
    except jwt.ExpiredSignatureError:
        return 'Signature expired. Please log in again.'
    except jwt.InvalidTokenError:
        return 'Invalid token. please log in again.'


def authentication_required(view):
    @wraps(view)
    def wrap(*args, **kwargs):
        auth_header = request.headers.get('Authorization')
        if auth_header:
            auth_token = auth_header.split(" ")[1]
        else:
            auth_token = ''
        if auth_token:
            user_name = decode_auth_token(auth_token)
            if user_name:
                user = User.objects.filter(name=user_name).first()
                g.user = user
                return view(*args, **kwargs)
        else:
            json_response = jsonify({
                'status':
                'fail',
                'message':
                'Your are not authorized to access this resource'
            })
            return make_response(json_response), 401

    return wrap

def admin_required(view):
    @wraps(view)
    def wrap(*args, **kwargs):
        if hasattr(g, 'user') and g.user.is_admin is True:
            return view(*args, **kwargs)
        else:
             json_response = jsonify({
                'status':
                'fail',
                'message':
                'Is admin only'
            })
        return make_response(json_response), 401

    return wrap