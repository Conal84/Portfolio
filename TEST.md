## Testing
Testing involved viewing the website myself on a range of devices both in Chrome Dev tools and on physical Iphone, tablet and desktop devices.
As part of the testing procedure my peers reviewed the website and provided constructive comments.

In each of the main sections; Home, About, Portfolio and Contact the required information has been provided and is accessible to the end user.
The layout of different sections expands into side by side columns on larger devices.
The position of fake code text sections and scroll down prompt font also changes slightly depending on screen size.
The functionality of these media queries has been tested across all devices using Chrome Devtools.

The CRUD functionality of the skills percentage progress bars has been tested by inputting a range of percent values, skill names and skill icons.
Back end form validation has been used to ensure input values are entered where required and that the skill percent value is in the correct range.
New skills have been added and deleted using the add and delete buttons and the results have been examined on the Home page.

The CRUD functionality of the projects section has been tested by updating the information in a project.
The delete and add functionality has been tested by deleting projects and adding them again via the add button and add form.
Back end validation has been used to ensure that inout values are entered where required and that their lengths are correct.

The functionality of the contact form has been tested by completing the contact form and sending an email to my email address.
The front end form validation has also been tested by attempting to enter incorrect information.

The functionality of navigation links has been tested to ensure the user is taken to the correct page or location on the Home page.

The functionality of the Login page has been tested with incorrect login details to ensure the correct response is produced.

The responsiveness of the website has been tested across a range of devices (Galaxy S5, Iphone 5/6/7/8/X, IPad, IPad Pro and Desktop PC) using Chrome Dev tools.
The responsive design was also physically tested on personal Iphone, IPad, desktop and widescreen monitor devices.

W3C CSS & HTML Validators and ICI accessibilty checker were used to check the validity and formatting of code.

### Responsiveness
* **Plan:** The website needed to respond to different device sizes and to device orientation.
* **Implementation:** Bootstrap was employed to undertake a mobile first design with grid elements which change orientation based on screen width. I also created media queries to change the position of text at different screen sizes.
* **Result:** On small devices and medium to large devices the website responds well and the images and text can be easily viewed.
* **Verdict:** This test has passed and the site is responsive.

### Design
* **Plan:** The design of the site needs to be eye catching with simple to navigate sections and information.
* **Implementation:** The canvas is bold and a minimal line animation catches the eye aswell as fake code which fades into view.
* **Result:** The website catches the eye without overwhelming the user and provides a simple to use navigation with key skill and project information.
* **Verdict:** This test has passed.

### Skills
* **Plan:** I wanted to user to be presented with a skills section which grabs attention
* **Implementation:** The skiils section presents information in an animated progress bar format using javascript to change the skill percentage only when this section comes into view
* **Result:** The user is presented with the information in an interesting way without being overwhelmed.
* **Verdict:** This test has passed.

### Portfolio
* **Plan:** To include a portfolio section which presents an initial minimal view of the projects with basic intorductory information but when a see more button is clicked detailed information can be seen.
* **Implementation:** Initially an image of the project can be seen, when hovered a brief description of the project can be seen. When clicked the see more button brings the user to a detailed project view page.
* **Result:** The website displays the required information by revealing extra information when the user clicks through the project. Links to the complete website and GitHub page are provided for additonal information.
* **Verdict:** The test has passed.

### Login
* **Plan:** Provide the user with a simple way to login using admin details and then to access the backend information for CRUD functionality
* **Implementation:** Add a login view with a login form
* **Result:** When entered the user is taken to the form, validation ensures the correct information is added
* **Verdict:** This section has passed the test.

### CRUD (Create, Read, Update, Delete) Functionality
* **Plan:** Provide the visitor with the backend information (Read) and provide the admin user with a means to Create, Update and Delete the information.
* **Implementation:** Present (Read) information on the standard visitor accessed pages. Once logged in present the user with forms to interact with the backend information.
* **Result:** The admin, skills and project information is available on the home pages and project pages. The admin user can use forms to Create, Update and Delete the information as required.
* **Verdict:** This section has passed the test.

### Contact Me
* **Plan:** Include a contact me section which allows visitors to send an email to me
* **Implementation:** A contact me section which stands out and which displays a simple to use form to send me a mail
* **Result:** A contact me form is available, is easy to use and sends an email to my personal email address.
* **Verdict:** This element of the website has passed this test.

## Bugs
Bug: On contact form submission the modal closed directly after clicking send leaving the user unclear if the email has been sent.
Fix: I included a javascript delay to keep the modal open for 3 seconds after submit and after submit the user is shown a font awesome icon and text to confirm the email has been sent.
Verdict: This bug has been fixed.

Bug: 
Fix: I have included a javascript event handler to close the **Youtube** player when modal is closed
Verdict: This solution works

Bug: The Bootstrap data table last row was overflowing the table but only when the first search is performed
Fix: In style.css I have overloaded the data table properties to overcome these display issues
Verdict: The table data now display properly when first search is performed.

Bug: If a user searches for gigs in their area some smaller, relatively unknown artists can sometimes be diplayed in the list.
If the user then clicks on the Play button for this smaller artist **Youtube** does not always have a playlist for this artist and instead can display
another artist or track with a similar name.
Fix: I have investigated the **YouTube** playlist object returned by the API fetch call to see if there is a popularity rating for the playlist or some other
way of filtering the playlist to ensure that the correct playlist is found but this data does not exist in the playlist object.
Verdict: This bug still exists.

Bug: When the user performs an artist search the autocomplete city is not required. A clear instance listener is included in the script file to diable this autocomplete functionality
when searching by artist. This clear instance throws an error to the console.
Verdict: THis bug still exists.