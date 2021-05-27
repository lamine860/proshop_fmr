""" Application entry point """

from .proshop_fmr import create_app
import jsonschema
from mongoengine.errors import ValidationError

app = create_app()


@app.errorhandler( jsonschema.ValidationError )
def onValidationError( e ):
    return {'message': e.message }, 400 

@app.errorhandler( ValidationError )
def onValidationError( e ):
    return {'message': e.message }, 400 




if __name__ == '__main__':
    app.run()
