code .
pkill flask
source venv/bin/activate
export FLASK_APP=proshop_fmr FLASK_ENV=developement
flask run & (cd frontend && yarn start)
