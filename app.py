from os import path
import os
from bson.objectid import ObjectId
from flask import Flask, render_template, redirect, request, url_for, session
from flask_pymongo import PyMongo
from forms import LoginForm, SkillForm, ProjectForm
if path.exists("env.py"):
    import env


app = Flask(__name__)
app.config['MONGO_DBNAME'] = os.environ.get('MONGO_DBNAME')
app.config['MONGO_URI'] = os.environ.get('MONGO_URI')
app.secret_key = os.environ.get('SECRET_KEY')
debug_string = os.environ.get('debug_string')
mongo = PyMongo(app)


@app.route('/')
def index():
    """Route to main page"""
    return render_template("pages/index.html",
                           skills=mongo.db.Skills.find(),
                           projects=mongo.db.Projects.find(),
                           canvas=True,
                           contact=True)


@app.route('/project/<project_id>')
def project(project_id):
    """Route to individual project page"""
    the_project = mongo.db.Projects.find_one({"_id": ObjectId(project_id)})
    return render_template("pages/project.html",
                           project=the_project,
                           images=the_project["images"])


@app.route('/login', methods=['GET', 'POST'])
def login():
    """Route to admin login page"""
    users = mongo.db.Users.find()
    form = LoginForm()
    form.find_details(users)

    if request.method == 'POST' and form.validate_on_submit():
        session['username'] = request.form['username']
        return redirect(url_for('index'))
    return render_template('pages/login.html', title='Log In', form=form)


@app.route('/logout')
def logout():
    """Route to remove session variable and redirect to index page"""
    session.pop('username', None)
    return redirect(url_for('index'))


@app.route('/deleteskill/<skill_id>')
def delete_skill(skill_id):
    """Route to delete a skill from database and redirect to index page"""
    mongo.db.Skills.remove({'_id': ObjectId(skill_id)})
    return redirect(url_for('index'))


@app.route('/editskill/<skill_id>', methods=['GET', 'POST'])
def edit_skill(skill_id):
    """Route to edit skill in database and redirect to index page"""
    skills = mongo.db.Skills
    the_skill = mongo.db.Skills.find_one({'_id': ObjectId(skill_id)})
    form = SkillForm()
    form.skill_name.data = the_skill['skill_name']
    form.percent.data = the_skill['percent']
    form.skill_icon.data = the_skill['skill_icon']

    if request.method == 'POST' and form.validate_on_submit():
        skills.update({'_id': ObjectId(skill_id)},
                      {
            'skill_name': request.form.get('skill_name'),
            'percent': int(request.form.get('percent')),
            'skill_icon': request.form.get('skill_icon')
        })
        return redirect(url_for('index'))
    return render_template('pages/edit/skill.html', skill=the_skill, form=form)


@app.route('/addskill', methods=['GET', 'POST'])
def add_skill():
    """Route to add skill to database and redirect to index page"""
    skills = mongo.db.Skills
    form = SkillForm()

    if request.method == 'POST' and form.validate_on_submit():
        skills.insert(
            {
                'skill_name': request.form.get('skill_name'),
                'percent': int(request.form.get('percent')),
                'skill_icon': request.form.get('skill_icon')
            })
        return redirect(url_for('index'))
    return render_template('pages/add/skill.html', form=form)


@app.route('/deleteproject/<project_id>')
def delete_project(project_id):
    """
    Route to delete a project from the database and redirect to index page
    """
    mongo.db.Projects.remove({'_id': ObjectId(project_id)})
    return redirect(url_for('index'))


@app.route('/editproject/<project_id>', methods=['GET', 'POST'])
def edit_project(project_id):
    """
    Route to edit a project in the database and redirect to index page
    """
    projects = mongo.db.Projects
    the_project = mongo.db.Projects.find_one({'_id': ObjectId(project_id)})
    form = ProjectForm()
    form.project_name.data = the_project['project_name']
    form.short_text.data = the_project['short_text']
    form.long_text.data = the_project['long_text']
    form.image1.data = the_project['images'][0]
    form.image2.data = the_project['images'][1]
    form.image3.data = the_project['images'][2]
    form.image4.data = the_project['images'][3]
    form.website_link.data = the_project['website_link']
    form.git_link.data = the_project["git_link"]

    if request.method == 'POST' and form.validate_on_submit():
        projects.update({'_id': ObjectId(project_id)},
                        {
            '$set':
                {
                    'project_name': request.form.get('project_name'),
                    'short_text': request.form.get('short_text'),
                    'long_text': request.form.get('long_text'),
                    'images': {
                                '0': request.form.get('image1'),
                                '1': request.form.get('image2'),
                                '2': request.form.get('image3'),
                                '3': request.form.get('image4')
                               },
                    'website_link': request.form.get('website_link'),
                    'git_link': request.form.get('git_link')
                }
        })
        return redirect(url_for('index'))
    return render_template('pages/edit/project.html',
                           project=the_project, form=form)


@app.route('/addproject', methods=['GET', 'POST'])
def add_project():
    """
    Route to add a project to the database and redirect to index page
    """
    projects = mongo.db.Projects
    form = ProjectForm()

    if request.method == 'POST' and form.validate_on_submit():
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
    return render_template('pages/add/project.html', form=form)


@app.errorhandler(404)
def not_found_error(error):
    """Route to error 404 page"""
    return render_template('pages/404.html'), 404


if __name__ == '__main__':
    app.run(host=os.environ.get('IP', "0.0.0.0"),
            port=int(os.environ.get('PORT', "5000")),
            debug=debug_string)
