import os
from flask import Flask, render_template, redirect, request, url_for, session
from flask_pymongo import PyMongo
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, IntegerField
from wtforms.validators import InputRequired, ValidationError
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
    username = StringField('Username', [InputRequired()])
    password = PasswordField('Password', [InputRequired()])
    submit = SubmitField('Sign In')

    def find_details(self, users):
        for user in users:
            self.req_username = user['username']
            self.req_password = user['password']

    def validate_username(self, field):
        if field.data != self.req_username:
            raise ValidationError('Incorrect username')

    def validate_password(self, field):
        if field.data != self.req_password:
            raise ValidationError('Incorrect password')


class EditForm(FlaskForm):
    skill_name = StringField('Skill Name', [InputRequired()])
    percent = IntegerField('Skill Percentage', [InputRequired()])
    skill_icon = StringField('Skill Icon', [InputRequired()])
    submit = SubmitField('Submit')

    def validate_percent(self, field):
        if field.data < 0 or field.data > 100:
            raise ValidationError('Value must be between 0 and 100')


@app.route('/')
@app.route('/index')
def index():
    return render_template("pages/index.html",
                           skills=mongo.db.Skills.find(),
                           projects=mongo.db.Projects.find(),
                           form=EditForm())


@app.route('/project/<project_id>')
def project(project_id):
    the_project = mongo.db.Projects.find_one({"_id": ObjectId(project_id)})
    return render_template("pages/project.html",
                           project=the_project, images=the_project["images"])


@app.route('/login', methods=['GET', 'POST'])
def login():
    users = mongo.db.Users.find()
    form = LoginForm()
    form.find_details(users)

    if form.validate_on_submit():
        session['username'] = request.form['username']
        return redirect(url_for('index'))
    return render_template('pages/login.html', title='Log In', form=form)


@app.route('/logout')
def logout():
    session.pop('username', None)
    return redirect(url_for('index'))


@app.route('/delete_skill/<skill_id>')
def delete_skill(skill_id):
    mongo.db.Skills.remove({'_id': ObjectId(skill_id)})
    return redirect(url_for('index'))


@app.route('/show_skill/<skill_id>', methods=['GET', 'POST'])
def show_skill(skill_id):
    skills = mongo.db.Skills
    the_skill = mongo.db.Skills.find_one({'_id': ObjectId(skill_id)})
    form = EditForm()

    if form.validate_on_submit():
        skills.update({'_id': ObjectId(skill_id)},
                      {
            'skill_name': request.form.get('skill_name'),
            'percent': request.form.get('percent'),
            'skill_icon': request.form.get('skill_icon')
        })
        return redirect(url_for('index'))
    return render_template('pages/show-skill.html', skill=the_skill, form=form)


if __name__ == '__main__':
    app.run(host=os.environ.get('IP'),
            port=int(os.environ.get('PORT')),
            debug=True)
