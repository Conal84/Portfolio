<h1 align="center">Conal Walsh - Portfolio Website</h1>

This website will allow users to see my portfolio with information about me, my skills and my projects.
The website will provide a simple to use facility where users can click on any project to be taken to a project page with a higher level of detail.
Users will also have links to view a specific web page and the associated GitHub page for that project.
Skills and project information will be stored in a NoSQL database.
The Portfolio webpage will contain an admin login section which will allow the admin user access to the project and skills information stored in the database.
The admin user will be able to perform CRUD (Create, Read, Update, Delete) operations on the data to easily change the data presented in the Portfolio website.

## UX
### User Stories
As a user I want to easily search through the portfolio website to get a concise overview of the background, skills and projects completed by the portfolio administrator.

As a user I want to be presented with introductory project information without being overwhelmed with details.

As a user once I find a perticular project of interest I want to be able to click on that project link to be taken to a webpage with more detailed information.

As a user I would like to have easy access to project webpage links and specific project GitHub links.

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
* Hero - provides an eye catching background image with a introductory information about me
* Skills - provides key skills information via progress bars
* Projects - provides initial, concise project information with links to more detailed views
* Contact - provides an easy method to send me a direct email

### Surface
I want the colors used on the site to mimic the colors of the gig background image and to provide the user with the feel of being at a gig venue.
The perspective of the image provides the user with the sense of being in the crowd at a gig.
An opaque overlay has been used on the full background image to add to the venue feeling.

The primary colours for the website are black and a contrasting white to dispay information in the results section.
A secondary blue highlight color #0066cc has then been used to make key elements stand out on the page and to grab the attention of the user.
These primary and secondary colors mirror the colors of the gig full background image.

I have used Lato font throughout the website as it has a simplistic style.
I have used Roboto font for the main page heading as this font makes the heading stand out and grabs the users attention.

### Wireframes

### Features to implement
Future features will include a sign up and log in section where a user could then add their favourite bands to track in their local city.
Once the band has scheduled a gig in that city the user could then receive an email or text notification.

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
10. [Google API](https://developers.google.com/)
11. [YouTube API](https://developers.google.com/youtube/v3)
12. [Songkick API](https://www.songkick.com/developer)
13. [Bootstrap datepicker](https://github.com/uxsolutions/bootstrap-datepicker)
14. [Bootstrap table](https://bootstrap-table.com/)
15. [Google Fonts](https://fonts.google.com/)

## Testing
Please see the TEST.md file at this link [TEST.md](TEST.md) to understand how the **Go2Gigs** website was tested.

## Deployment
This project was developed using the GitPod IDE, version controlled by committing to git and pushing to GitHub via the GitPod IDE.
To deploy this page to GitHub pages from its specific [GitHub repository](https://github.com/Conal84/Go2gigs) the steps followed were;

1. Scroll to the top of this GitHub page
2. In the Repositories list select **Go2gigs**
3. From the menu select **Settings**
4. Scroll down to the **GitHub Pages** section
5. Under Source select **Master branch**
6. On selecting Master branch the page is automatically refreshed, the website is now deployed
7. The link to the webpage can be found at the top of the GitHub Pages section

### How to run this project locally
To clone this project from GitHub:

1. Follow this link to the Project [GitHub repository](https://github.com/Conal84/Go2gigs)
2. Under the repository name, click **Clone or download**
3. In the Clone with HTTPs section, copy the clone URL for the repository
4. In your local IDE open the terminal
5. Change the current working directory to the location where you want the cloned directory to be made
6. Type git clone, and then paste the URL you copied in Step 3
7. Press **Enter** your local clone will be created

## Acknowledgements
I would like to thank my mentor Simen for his valuable advice and guidance throughout the project.

**This is for educational use**
