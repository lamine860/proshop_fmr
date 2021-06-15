""" Application entry point """
from flask import Flask
from flask_mongoengine import MongoEngine
from flask_bcrypt import Bcrypt

from .config import DevelopmentConfig as Config
from .views.products import product_bp
from .views.user import user_bp

app = Flask(__name__)
app.config.from_object(Config)
MongoEngine(app)

app.register_blueprint(product_bp)
app.register_blueprint(user_bp)

if __name__ == '__main__':
    app.run()
