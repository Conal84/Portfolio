import os
from flask import Flask, render_template, redirect, request, url_for, session
from flask_pymongo import PyMongo
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import InputRequired, EqualTo
from bson.objectid import ObjectId
from os import path
if path.exists("env.py"):
    import env

app = Flask(__name__)

app.config['MONGO_DBNAME'] = 'Portfolio'
app.config['MONGO_URI'] = os.environ.get('MONGO_URI')
app.secret_key = os.environ.get('SECRET_KEY')

mongo = PyMongo(app)


class LoginForm(FlaskForm):
    username = StringField('Username', validators=[
        InputRequired(), EqualTo('user', message='Username is incorrect')])
    password = PasswordField('Password', validators=[
        InputRequired(), EqualTo('pswrd', message='Password is incorrect')])
    submit = SubmitField('Sign In')
    user = os.environ.get('USER')
    pswrd = os.environ.get('PASSWORD')


@app.route('/')
@app.route('/index')
def index():
    return render_template("pages/index.html",
                           skills=mongo.db.Skills.find(),
                           projects=mongo.db.Projects.find())


@app.route('/project/<project_id>')
def project(project_id):
    the_project = mongo.db.Projects.find_one({"_id": ObjectId(project_id)})
    return render_template("pages/project.html",
                           project=the_project, images=the_project["images"])


@app.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        session['username'] = request.form['username']
        return redirect('/index')
    return render_template('pages/login.html', title='Log In', form=form)


if __name__ == '__main__':
    app.run(host=os.environ.get('IP'),
            port=int(os.environ.get('PORT')),
            debug=True)
