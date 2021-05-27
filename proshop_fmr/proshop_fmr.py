""" Application factory """

from flask import Flask
from flask_mongoengine import MongoEngine
from flask_jsonschema_validator import JSONSchemaValidator
from flask_bcrypt import Bcrypt
from .config import DevelopmentConfig as Config

from .views.products import product_bp
from .views.user import user_bp



def create_app():
    """ Create flask app and return it """
    app = Flask(__name__)
    app.config.from_object(Config)
    MongoEngine(app)
    Bcrypt(app)
    app.register_blueprint(product_bp)
    app.register_blueprint(user_bp)

    return app
