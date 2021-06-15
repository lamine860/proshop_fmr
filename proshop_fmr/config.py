import os


class Config(object):
    DEBUG = True
    TESTING = False
    SECRET_KEY = "secret"
    MONGODB_SETTINGS = {
        'db': os.environ.get('DB_NAME', 'proshop_fmr'),
        'host': os.environ.get('DB_HOST', 'localhost'),
        'port': os.environ.get('DB_PORT'),
    }


class ProductionConfig(Config):
    DEBUG = False
    SECRET_KEY = os.environ.get(
        'SECRET_KEY', "9asdf8980as8df9809sf6a6ds4f3435fa64ˆGggd76HSD57hsˆSDnb")
    MONGODB_SETTINGS = {
        'db': os.environ.get('DB_NAME', 'proshop_fmr'),
        'host': os.environ.get('DB_HOST'),
        'port': os.environ.get('DB_PORT'),
    }


class DevelopmentConfig(Config):
    DEBUG = True


class TestingConfig(Config):
    DEBUG = True
    TESTING = True
    MONGODB_SETTINGS = {
        'db': os.environ.get('DB_NAME', 'proshop_fmr_test'),
        'host': os.environ.get('DB_HOST', 'localhost'),
        'port': os.environ.get('DB_PORT'),
    }
