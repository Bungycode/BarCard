# BarCard

![badge](https://img.shields.io/badge/license-mit-blue)

## Table-of-Contents

- [BarCard](#barcard)
  - [Table-of-Contents](#table-of-contents)
  - [Description](#description)
  - [Project Process](#project-process)
  - [Installation](#installation)
  - [License](#license)
  - [Contributing](#contributing)
  - [Tests](#tests)
  - [Questions](#questions)

## [Description](#table-of-contents)

BarCard is a web application that allows users to view, create, and share drink recipes in a user-created account. For the professional bartender or mixologist, BarCard is a clean, user friendly platform for building an easily modifiable drink personal profile. 

![Title screen](public/images/Screen%20Shot%202022-06-16%20at%205.55.04%20PM.png)

## Project Process

For this project, Project 2, group 13 made use of the full range of packages that we have developed over the last 2-3 months. The project technologies listed below enabled our group to create a Full-Stack web application that is tailored to the needs of the user.
The associated technologies include, but are not limited to:

- Node.js and Express.js used to create a RESTful API.

- Handlebars.js as a template engine for dynamic HTML content.

- Programs such as MySQL and the Sequelize ORM used for backend development and the creation of databases.

- Custom API routes (GET, POST, PUT, and DELETE) built for sending and retrieving data.

- Heroku for deploying the fully-functional, data-seeded application that meets best practices.
  
 Beyond using the aforementioned technologies to simply meet the acceptance criteria, our team took careful consideration to build
 a technology that meets the needs of the user. With the initial idea being to create a user-centered drink database, we prioritized the building of functions that would enhance the user experience as a whole. Concretely, this process took the form of building databases that allow the user to search recipes by drink and ingredient. This feature required successfully creating many-to-one and many-to-many relationships due to different drinks containing multiple liquids and vice versa. 
 

 Upon being presented with the title page, the user is prompted to log in or create an account in the absence of an existing one. User session gets saved as a cookie.
![Login Screen](public/images/Screen%20Shot%202022-06-16%20at%205.48.13%20PM.png)

Once logged in, the user is presented with the recipe library and given the options All Recipes, New Recipe, New Ingredient, Logout.
![Recipe Library Screen and Open Tab](public/images/Screen%20Shot%202022-06-16%20at%205.50.05%20PM.png)


When a recipe is viewed, the user is presented with the option to leave a review and a rating. Each review saves for each drink so that the user can keep track of their favorite drinks. Star ratings are appended to each comment as well.
![Recipe Review Page](public/images/Screen%20Shot%202022-06-16%20at%205.51.30%20PM.png).


There is an option for the user to add another ingredient in the database that was not previously existing.
![Add Ingredient](public/images/Screen%20Shot%202022-06-16%20at%206.07.52%20PM.png).

In addition to UI/UX prioritization, the MVC paradigm and file structure follows best practices.

## [Installation](#table-of-contents)

- To run the site, you can clone this repo down, run the command 'npm install' to install all of the necessary node pacakages, and run it locally by running the command 'npm run start'.
- In the case that does not work please refer to the Github page repo for this project: https://github.com/heatherknoyes/BarCard

## [License](#table-of-contents)

The application is covered under the following license: [mit](https://choosealicense.com/licenses/mit)

## [Contributing](#table-of-contents)

Contributions by team 13 and others:

- Heather Noyes
- Andrew Bungcayao
- Malik Henry
- Oscar Salgado

## [Questions](#table-of-contents)

Please contact us using the following links:

[GitHub](https://github.com/heatherknoyes)
