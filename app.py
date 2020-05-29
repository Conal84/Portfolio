import os
from flask import Flask, render_template, redirect, request, url_for
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from os import path
if path.exists("env.py"):
    import env

app = Flask(__name__)

app.config['MONGO_DBNAME'] = 'Portfolio'
app.config['MONGO_URI'] = os.environ.get('MONGO_URI')

mongo = PyMongo(app)


@app.route('/')
@app.route('/index')
def index():
    return render_template("pages/index.html",
                           skills=mongo.db.Skills.find(),
                           projects=mongo.db.Projects.find())


@app.route('/project/<ObjectId>')
def project():
    return render_template("pages/project.html",
                           skills=mongo.db.Skills.find(),
                           projects=mongo.db.Projects.find())


if __name__ == '__main__':
    app.run(host=os.environ.get('IP'),
            port=int(os.environ.get('PORT')),
            debug=True)
