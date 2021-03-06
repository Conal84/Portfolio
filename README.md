<h1 align="center">Conal Walsh - Portfolio Website</h1>

This website will allow users to see my portfolio with information about me, my skills and my projects.
The website will provide a simple to use facility where users can click on any project to be taken to a project page with a higher level of detail.
Users will also have links to view a specific web page and the associated GitHub page for that project.
Skills and project information will be stored in a NoSQL database.
The Portfolio webpage will contain an admin login section which will allow the admin user access to the project and skills information stored in the database.
The admin user will be able to perform CRUD (Create, Read, Update, Delete) operations on the data to easily change the data presented in the Portfolio website.

## UX
### User Stories
As a visitor I want to easily search through the portfolio website to get a concise overview of the background, skills and projects completed by the portfolio administrator.

As a visitor I want to be presented with introductory project information without being overwhelmed with details.

As a visitor once I find a perticular project of interest I want to be able to click on that project link to be taken to a webpage with more detailed information.

As a visitor I would like to have easy access to project webpage links and specific project GitHub links.

As an admin user I should be able to login to gain access to and to modify the backend database information.

Once logged in the admin user should be able to easily add, edit and delete both skills information and project information.

Forms used to submit data to the database should contain validation to ensure that the data entered is correct.

### Strategy
The Portfolio website will provide users with an easy to access skills and project information about the site adminstrator.

Users will be presented with a strong hero section which will showcase skills in web design and javascript.

Users will also be presented with an animated skills section with eye catching progress bars.

Users will find projects displayed in tiles with an image of each particular webpage. Each tile will contain a link to another webpage with greater project detail.

This portfolio website will be aimed at a range of demographics from the field of web development and potential clients interested in working on new projects. 
As a result of this wide range of users the site must be simple to use and laid out in a concise manner.

### Scope
Website key features include the following;

* Hero section - provides users with an eye catching introduction to the portfolio wewbsite
    * An animated image to grab the attention of the user
    * Inaugural text to give the user an initial idea of who I admin
    * Navigation bar to allow simple website exploration

* Skills Section - provides the user with a more detailed explanation of my skills with progress bars
    * Text section with detail regarding my skills
    * Skills progress circles with progress bars and percentages representing my competencies in each field
    * Admin users can Add, Edit or Delete a skill

* Projects Section - provides the user with a brief overview of my projects
    * Tiled project images with brief project introductions
    * Links to more detailed project webpages
    * Admin users can Add, Edit or Delete a project

* Detailed Project Webpages - provides the user with detailed overview of my projects
    * Project images in carousel format
    * Detailed explanation of the project
    * Links to the specific project webpage and GitHub page

* Login Section - provides the admin user with log in functionality
    * Admin user can enter username and password

* Edit Skill Section - provides the admin user with read and update functionality
    * Admin user can modify a specific skill and update

* Add Skill Section - provides the admin user with create functionality
    * Admin user can add a new skill

* Edit Project Section - provides the admin user with read and update functionality
    * Admin user can modify a specific project and update

* Add Project Section - provides the admin user with create functionality
    * Admin user can add a new project

* Contact Section - provides the user with the ability to email me about a project
    * Users can complete the contact form to send me an email
    * Form is validated to ensure correct entries

* Footer Section - provides links to Linkedin and GitHub pages

### Structure
I want to keep the site as minimalist and clutter free as possible so that it is easy to use for the wide ranging demographic and so users are not overwhelmed with information.
Information will be provided to users in a concise, straight forward manner.

The mobile first design will arrange information in single full width columns to allow content to be read easily.
On larger tablet and desktop display information will be arranged in additional columns using Bootstraps responsive grid design.

Information will be grouped in 4 key areas;
* Hero - provides an eye catching background image with introductory information about me
* Skills - provides key skills information via progress bars
* Projects - provides initial, concise project information with links to more detailed views
* Contact - provides an easy method to send me a direct email

### Surface
I want the colors used on the site to grab the users attention without being too acute.

The primary colours for the website are black #0b0a07, yellow #ffcd24 used to grab the attention of visitors.
Contrasting white #fff and grey #eaecec are used to display text information and to provide background segregation between key areas.
A secondary softer blue highlight color #1478a3 has then been used to make key elements stand out on the page and to grab the attention of the user without overwhelming.

I have used Open Sans font throughout the website as it has a simplistic style.
I have used Raleway font for the headings as this font makes the heading stand out and grabs the users attention.
I have also used an Inconsolata font as it mimics a faux coding style font in the hero section.

I have used Inkscape to design an svg image which I used for my portfolio logo and favicon.

### Wireframes
![Home Desktop](/wireframes/Home.png)
![Home Tablet](/wireframes/Home-tablet.png)
![Home Mobile](/wireframes/Home-mobile.png)
![Contact Desktop](/wireframes/Contact.png)
![Contact Tablet](/wireframes/Contact-tablet.png)
![Contact Mobile](/wireframes/Contact-mobile.png)
![Admin Desktop](/wireframes/Admin.png)
![Admin Tablet](/wireframes/Admin-tablet.png)
![Admin Mobile](/wireframes/Admin-mobile.png)
![Logged in Desktop](/wireframes/Logged-in.png)
![Logged in Tablet](/wireframes/Logged-in-tablet.png)
![Logged in Mobile](/wireframes/Logged-in-mobile.png)
![Skills delete Desktop](/wireframes/Skills-delete.png)
![Skills delete Tablet](/wireframes/Skills-delete-tablet.png)
![Skills delete Mobile](/wireframes/Skills-delete-mobile.png)
![Skills edit Desktop](/wireframes/Skills-edit.png)
![Skills edit Tablet](/wireframes/Skills-edit-tablet.png)
![Skills edit Mobile](/wireframes/Skills-edit-mobile.png)
![Skills add Desktop](/wireframes/Skills-add.png)
![Skills add Tablet](/wireframes/Skills-add-tablet.png)
![Skills add Mobile](/wireframes/Skills-add-mobile.png)
![Portfolio delete Desktop](/wireframes/Portfolio-delete.png)
![Portfolio delete Tablet](/wireframes/Portfolio-delete-tablet.png)
![Portfolio delete Mobile](/wireframes/Portfolio-delete-mobile.png)
![Portfolio edit Desktop](/wireframes/Portfolio-edit.png)
![Portfolio edit Tablet](/wireframes/Portfolio-edit-tablet.png)
![Portfolio edit Mobile](/wireframes/Portfolio-edit-mobile.png)
![Portfolio add Desktop](/wireframes/Portfolio-add.png)
![Portfolio add Tablet](/wireframes/Portfolio-add-tablet.png)
![Portfolio add Mobile](/wireframes/Portfolio-add-mobile.png)
![Portfolio see more Desktop](/wireframes/Portfolio-see-more.png)
![Portfolio see more Tablet](/wireframes/Portfolio-see-more-tablet.png)
![Portfolio see more Mobile](/wireframes/Portfolio-see-more-mobile.png)

### Technologies used
1. HTML
2. CSS
3. Javascript
4. [Bootstrap](https://getbootstrap.com/)
5. [Googel Fonts](https://fonts.google.com/)
6. [Font Awesome](https://fontawesome.com/)
7. [Auto Prefixer](https://autoprefixer.github.io/)
8. [JQuery](https://jquery.com/)
9. [Popper.js](https://popper.js.org/)
10. [Python](https://www.python.org/)
11. [MongoDB](https://www.mongodb.com/)
12. [EmailJS](https://www.emailjs.com/)
13. [Inkscape](https://inkscape.org/)
14. [Imgbb](https://imgbb.com/)

## Features
### Existing features
* Home page with navbar, hero section, skills section, portfolio section, contact section and footer
    * Navbar has links with Home, About, Portfolio, Contact and a logo for my portfolio page made in inkscape with a link to the home page
    * Hero section is a animated canvas. The animation sweeps 2 colored lines across the page and contains colored polygons which are seperated by those lines. The hero section also contains faux code sections which detail some of my coding skills.
    * About/Skills section contains a paragraph with some of my background information and interests and an animated skills progress bar
    * Portfolio section contains websites introductory images with brief descriptions. Images are stored on the Imgbb.com website and linked to the MongoDB database.
    * Contact section contains a message and a Get in touch button which brings up a form modal, this form sends an email to my personal email address
    * Footer has links to my Github and a dummy Linkedin page

* Portfolio Section - See more
    * When a visitor clicks on a project see more button they are taken to a project specific page with a link to the Github and dedicated page for that website
    * The visitor can also see some further images of the project in a carousel

* Contact Section - Get in touch
    * A visitor can send me a personal email to discuss my work or future projects by completing this contact form and pressing the send button

* Admin page
    * A page where the admin user can submit username and password

* Home page - Logged in
    * At the page the admin user can perform CRUD operations on the skills section and portfolio section of the webpage
    * The admin user can Create, Update or Delete skills or projects from the webpage
    * Deleting skills or projects displays a modal which ask for user confirmation prior to deleting information

* Edit skill
    * Displays a form which is prepopulated with the skill data
    * Skill data can be updated and submitted
    * Upon submission the user is returned to the Home page where they can see the changes made

* Add skill
    * Displays a form which contains a placeholder for the skill icon so the user can see the format required for the skill icon
    * The skill name, skill percentage and skill icon can be added

* Edit project
    * Displays a form which is prepopulated with the project information
    * Project information can be updated and submitted
    * Upon submission the user is returned to the Home page where they can see the changes made

* Add project
    * Displays a form with empty fields where the user can add new project information and submit

* 404 page
    * An error 404 page with a link to the home page

### Information Architecture
This project uses the NoSQL database MongoDB with the following database design structure and variables

### Project collection
![Information architecture](/data/schemas/Database-design.png)

Prior to beginning work on the project the below file structure was laid out to understand how the various webpages would link together

### File structure
![File structure](/data/schemas/File-structure.png)

### Features to implement
Future features will include additonal skills and more showcase projects as I build more websites.

## Testing
Please see the TEST.md file at this link [TEST.md](TEST.md) to understand how the Portfolio website was tested.

## Deployment
This project was developed using the GitPod IDE, version controlled by committing to git and pushing to GitHub via the GitPod IDE.
The deployment instructions have been written for a macOS specifically, therefore the commands and installation may differ slightly for your machine.

### How to run this project locally
The following must be installed on your machine;
* PIP
* Python 3
* GitHub
* A [MongoDB](https://www.mongodb.com/) account or MongoDB running locally on your machine.
    * See how to signup for a MongoDB account [here](https://www.mongodb.com/cloud/atlas/signup)

#### instructions
1. Open the repository located at [https://github.com/Conal84/Portfolio](https://github.com/Conal84/Portfolio)
2. Click on **Clone or Download** and copy the URL
3. In your IDE enter the command `git clone https://github.com/Conal84/Portfolio`
4. A virtual environment is recommended for the Python interpreter, I recommend using Pythons built in virtual environment. To do this enter the command `python3 -m .venv venv`
5. Activate the virtual environment with the command `.venv\Scripts\Activate`
6. If required upgrade pip locally with the command `pip install --upgrade pip`
7. Install all required packages from the requirements file with the command `pip -r requirements.txt`
8. In your local IDE create a file called env.py
9. Inside this file create a SECRET_KEY variable, a MONGO DBNAME a MONGO_URI and an EMAILJS_KEY.
10. In MongoDB create a database called Portfolio, with 2 collections called Skills and Projects. You will find example JSON structures for these collections in the data/schemas folder
11. You can now run the application with the command `python3 app.py`
12. The project can be viewed at **Insert http link**

### Heroku Deployment
1. Create a new app on the [Heroku website](https://www.heroku.com/#)
2. Link your local git repo to the Heroku app
    * Go to the Heroku app settings , find the Heroku Git URL and copy it
    * In your IDE use command `git remote add heroku *paste heroku git url here*`
3. In your IDE create a requirements.txt file using the command `pip3 freeze --local > requirements.txt`
4. Create a Procfile the the command `echo web: python app.py > Procfile`
5. `git add` and `git commit` the new requirements and Procfile, then `git push` to GitHub
6. `git push -u heroku master` command then pushes code to the Heroku app
7. Set the config variables in the Heroku app by clicking Settings > Reveal Config Vars
8. Add the following config vars

KEY | VALUE
----|------
IP | 0.0.0.0
PORT | 5000
EMAILJS_KEY | <youe_emailjs_key>
MONGO DBNAME | <your_mongodb_name>
MONGO_URI | <mongo_uri>
SECRET_KEY | <your_secret_key>

9. Start a web process with the IDE command `heroku ps:scale web=1`
10. The site is now successfully deployed

## Note for the assessor
To test the CRUD functionality of this project

URL | Username | Password
----|----------|---------
https://conal-walsh-portfolio.herokuapp.com/ | Admin | Admin1234

## Acknowledgements
I would like to thank my mentor Simen for his valuable advice and guidance throughout the project.

**This is for educational use**
