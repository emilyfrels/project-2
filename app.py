#import dependencies
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

import datetime as dt


#import flask and jsonify
from flask import Flask, jsonify

#############################################################
#                      DATABASE SETUP                       #
#############################################################

# engine TBD
engine = create_engine("")

#reflect an existing database into a new model
Base = automap_base()

#reflect tables
Base.prepare(engine, reflect=True)

#save references to tables

#############################################################
#                       FLASK SETUP                        #
#############################################################

#create an app
app = Flask(__name__)

#Define what to do when a user hits the index route
@app.route("/")
def home():
    print("Server received request for 'Home' page. ")
    """List all available api routes."""
    return (
        # routes TBD
        f"Available Routes:<br/>"
    )

#Define route
@app.route("")
def to_be_named():

    #create session link
    session = Session(engine)

    

    #close session
    session.close()



#run the app
if __name__ == "__main__":
    app.run(debug=True)
