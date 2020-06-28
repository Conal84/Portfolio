import os
from flask import Flask, render_template, redirect, request, url_for, session
from flask_pymongo import PyMongo
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, DecimalField, TextAreaField
from wtforms.validators import InputRequired, ValidationError, NumberRange
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
    percent = DecimalField('Skill Percentage', [
                           InputRequired(), NumberRange(min=0.01, max=1.0)])
    skill_icon = StringField('Skill Icon', [InputRequired()])
    submit = SubmitField('Submit')


class ProjectForm(FlaskForm):
    project_name = StringField('Project Name', [InputRequired()])
    short_text = StringField('Short text', [InputRequired()])
    long_text = TextAreaField('Long Text', [InputRequired()])
    index_image = StringField('Index image', [InputRequired()])
    carousel_image1 = StringField('Carousel image 1', [InputRequired()])
    carousel_image2 = StringField('Carousel image 2', [InputRequired()])
    carousel_image3 = StringField('Carousel image 3', [InputRequired()])
    website_link = StringField('Website link', [InputRequired()])
    git_link = StringField('Github link', [InputRequired()])


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
    form.skill_name.data = the_skill['skill_name']
    # form.percent.data = the_skill['percent']
    form.skill_icon.data = the_skill['skill_icon']

    if form.validate_on_submit():
        skills.update({'_id': ObjectId(skill_id)},
                      {
            'skill_name': request.form.get('skill_name'),
            'percent': float(request.form.get('percent')),
            'skill_icon': request.form.get('skill_icon')
        })
        return redirect(url_for('index'))
    return render_template('pages/show-skill.html', skill=the_skill, form=form)


@app.route('/add_skill', methods=['GET', 'POST'])
def add_skill():
    skills = mongo.db.Skills
    form = EditForm()

    if form.validate_on_submit():
        skills.insert(
            {
                'skill_name': request.form.get('skill_name'),
                'percent': float(request.form.get('percent')),
                'skill_icon': request.form.get('skill_icon')
            })
        return redirect(url_for('index'))
    return render_template('pages/add-skill.html', form=form)


@app.route('/delete_project/<project_id>')
def delete_project(project_id):
    mongo.db.Projects.remove({'_id': ObjectId(project_id)})
    return redirect(url_for('index'))


@app.route('/edit_project/<project_id>', methods=['GET', 'POST'])
def edit_project(project_id):
    projects = mongo.db.Projects
    the_project = mongo.db.Projects.find_one({'_id': ObjectId(project_id)})
    form = ProjectForm()
    form.project_name.data = the_project['project_name']
    form.short_text.data = the_project['short_text']
    form.long_text.data = the_project['long_text']

    if form.validate_on_submit():
        projects.update({'_id': ObjectId(project_id)},
                        {
            'project_name': request.form.get('project_name'),
            'short_text': request.form.get('short_text'),
            'long_text': request.form.get('long_text'),
            'index_image': request.form.get('index_image'),
            'website_link': request.form.get('website_link'),
            'git_link': request.form.get('git_link')
        })
        return redirect(url_for('index'))
    return render_template('pages/edit-project.html', project=the_project, form=form)


if __name__ == '__main__':
    app.run(host=os.environ.get('IP'),
            port=int(os.environ.get('PORT')),
            debug=True)
