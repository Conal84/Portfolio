from os import path
from bson.objectid import ObjectId
import os
from flask import Flask, render_template, redirect, request, url_for, session
from flask_pymongo import PyMongo
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, DecimalField, TextAreaField
from wtforms.validators import InputRequired, ValidationError, NumberRange, Length
if path.exists("env.py"):
    import env


# App configuration
app = Flask(__name__)
app.config['MONGO_DBNAME'] = 'Portfolio'
app.config['MONGO_URI'] = os.environ.get('MONGO_URI')
app.secret_key = os.environ.get('SECRET_KEY')
mongo = PyMongo(app)


# Form class to be used on Login page
class LoginForm(FlaskForm):
    # Form field definitions
    username = StringField('Username', [InputRequired()])
    password = PasswordField('Password', [InputRequired()])
    submit = SubmitField('Sign In')

    # A method to obtain username and passowrd from the database
    def find_details(self, users):
        for user in users:
            self.req_username = user['username']
            self.req_password = user['password']

    # Custom username validation
    def validate_username(self, field):
        if field.data != self.req_username:
            raise ValidationError('Incorrect username')

    # Custom password validation
    def validate_password(self, field):
        if field.data != self.req_password:
            raise ValidationError('Incorrect password')


# Form class to be used on add-skill and edit-skill pages
class SkillForm(FlaskForm):
    # Form field definitions
    skill_name = StringField('Skill Name', [InputRequired()])
    percent = DecimalField('Skill Percentage', [
                           InputRequired(), NumberRange(min=0.01, max=1.0)])
    skill_icon = StringField('Skill Icon', [InputRequired()])
    submit = SubmitField('Submit')


# Form class to be used on add-project and edit-project pages
class ProjectForm(FlaskForm):
    # Form field definitions
    project_name = StringField('Project Name', [InputRequired()])
    short_text = StringField('Short text', [InputRequired(), Length(max=50)])
    long_text = TextAreaField('Long Text', [InputRequired(), Length(max=400)])
    image1 = StringField(
        'Portfolio image & Carousel image 1', [InputRequired()])
    image2 = StringField('Carousel image 2', [InputRequired()])
    image3 = StringField('Carousel image 3')
    image4 = StringField('Carousel image 4')
    website_link = StringField('Website link', [InputRequired()])
    git_link = StringField('Github link', [InputRequired()])
    submit = SubmitField('Submit')


# Route to main page
@app.route('/')
@app.route('/index')
def index():
    return render_template("pages/index.html",
                           skills=mongo.db.Skills.find(),
                           projects=mongo.db.Projects.find())


# Route to individual project page
@app.route('/project/<project_id>')
def project(project_id):
    the_project = mongo.db.Projects.find_one({"_id": ObjectId(project_id)})
    return render_template("pages/project.html",
                           project=the_project, images=the_project["images"])


# Route to admin login page
@app.route('/login', methods=['GET', 'POST'])
def login():
    users = mongo.db.Users.find()
    form = LoginForm()
    form.find_details(users)

    # If login form is validated set the username as session variable
    if form.validate_on_submit():
        session['username'] = request.form['username']
        return redirect(url_for('index'))
    return render_template('pages/login.html', title='Log In', form=form)


# Route to remove session variable and redirect to index page
@app.route('/logout')
def logout():
    session.pop('username', None)
    return redirect(url_for('index'))


# Route to delete a skill from database and redirect to index page
@app.route('/delete_skill/<skill_id>')
def delete_skill(skill_id):
    mongo.db.Skills.remove({'_id': ObjectId(skill_id)})
    return redirect(url_for('index'))


# Route to edit skill in database and redirect to index page
@app.route('/edit_skill/<skill_id>', methods=['GET', 'POST'])
def edit_skill(skill_id):
    skills = mongo.db.Skills
    the_skill = mongo.db.Skills.find_one({'_id': ObjectId(skill_id)})
    form = SkillForm()
    form.skill_name.data = the_skill['skill_name']
    form.skill_icon.data = the_skill['skill_icon']

    # If skill form is validated update the database with form data
    if form.validate_on_submit():
        skills.update({'_id': ObjectId(skill_id)},
                      {
            'skill_name': request.form.get('skill_name'),
            'percent': float(request.form.get('percent')),
            'skill_icon': request.form.get('skill_icon')
        })
        return redirect(url_for('index'))
    return render_template('pages/edit-skill.html', skill=the_skill, form=form)


# Route to add skill to database and redirect to index page
@app.route('/add_skill', methods=['GET', 'POST'])
def add_skill():
    skills = mongo.db.Skills
    form = SkillForm()

    # If skill form is validated add form data to database
    if form.validate_on_submit():
        skills.insert(
            {
                'skill_name': request.form.get('skill_name'),
                'percent': float(request.form.get('percent')),
                'skill_icon': request.form.get('skill_icon')
            })
        return redirect(url_for('index'))
    return render_template('pages/add-skill.html', form=form)


# Route to delete a project from the database and redirect to index page
@app.route('/delete_project/<project_id>')
def delete_project(project_id):
    mongo.db.Projects.remove({'_id': ObjectId(project_id)})
    return redirect(url_for('index'))


# Route to edit a project in the database and redirect to index page
@app.route('/edit_project/<project_id>', methods=['GET', 'POST'])
def edit_project(project_id):
    projects = mongo.db.Projects
    the_project = mongo.db.Projects.find_one({'_id': ObjectId(project_id)})
    form = ProjectForm()
    form.project_name.data = the_project['project_name']
    form.short_text.data = the_project['short_text']
    form.long_text.data = the_project['long_text']

    # If project form is validated update the database with form data
    if form.validate_on_submit():
        projects.update({'_id': ObjectId(project_id)},
                        {
            'project_name': request.form.get('project_name'),
            'short_text': request.form.get('short_text'),
            'long_text': request.form.get('long_text'),
            'images[0]': request.form.get('image1'),
            'images[1]': request.form.get('image2'),
            'images[2]': request.form.get('image3'),
            'images[3]': request.form.get('image4'),
            'website_link': request.form.get('website_link'),
            'git_link': request.form.get('git_link')
        })
        return redirect(url_for('index'))
    return render_template('pages/edit-project.html', project=the_project, form=form)


# Route to add a project to the database and redirect to index page
@app.route('/add_project', methods=['GET', 'POST'])
def add_project():
    projects = mongo.db.Projects
    form = ProjectForm()

    # If project form is validated add form data to the database
    if form.validate_on_submit():
        projects.insert(
            {
                'project_name': request.form.get('project_name'),
                'short_text': request.form.get('short_text'),
                'long_text': request.form.get('long_text'),
                'images[0]': request.form.get('image1'),
                'images[1]': request.form.get('image2'),
                'images[2]': request.form.get('image3'),
                'images[3]': request.form.get('image4'),
                'website_link': request.form.get('website_link'),
                'git_link': request.form.get('git_link')
            })
        return redirect(url_for('index'))
    return render_template('pages/add-project.html', form=form)


if __name__ == '__main__':
    app.run(host=os.environ.get('IP'),
            port=int(os.environ.get('PORT')),
            debug=True)
