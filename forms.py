from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, DecimalField, TextAreaField
from wtforms.validators import InputRequired, ValidationError, NumberRange, Length


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