#import dependencies
from flask import Flask
from flask import render_template 
from flask import jsonify


# Import the functions we need from SQL Alchemy
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

#############################################################
#                      DATABASE SETUP                       #
#############################################################




connection_string = f'postgresql://{username}:{password}@localhost:5432/{database_name}'

# Connect to the database
engine = create_engine(connection_string)
base = automap_base()
base.prepare(engine, reflect=True)

# Choose the table we wish to use
# Need to update the database name once determine
table = base.classes.{database_name}

#############################################################
#                       FLASK SETUP                        #
#############################################################

#create an app
app = Flask(__name__)

# Effectively disables page caching
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0 

#Define what to do when a user hits the index route
@app.route("/")
def home():

    webpage = render_template("index.html")
    return webpage

#Define route
@app.route("")
def to_be_named():




#run the app
if __name__ == "__main__":
    app.run(debug=True)
