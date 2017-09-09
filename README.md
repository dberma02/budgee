# Budgee
## A personal finance web application

### Installation + Setup:

Please make sure you have installed Angular Cli, Ruby on Rails 5, and MySQL on your computer.    
Run the rails command `rake db:create` to create the development and test databases.    
Run the rails command `rake db:migrate` to run database migrations.    

cd into the `client` directiory and run `npm install` to make sure all Angular2 dependencies are installed.
To import the bootstrap stylesheets, make sure wget is installed on your computer, and simply run `sh ./import_bootstrap` from the client folder.   

### Usage:

From the budgee directory, run `rails s` to launch the rails server on port 3000. From the `budgee/client` directory, run
`ng serve` to launch the Angular2 server. Open up `localhost:4200` on your web browser. 

### About the project:

This project was inspired by this past summer that I spent in New York. Within my first week living in the city,
it became clear how quickly my spending could balloon if I did not keep a careful watch on my balance. 
Looking through my bank statements, it was difficult to parse all of the information provided, make useful comparisons, and get a full picture of my spending.
I wanted a place where I could quickly get a breakdown of my recent spending, and compare it to previous trends. I soon realized this
problem presented an interesting opportunity for a project through which I could work on my web development skills and practice
creating useful data visualizations.


This project is still in progress, and only some of it's features have been implemented at this point. The website uses Angular2 views
which interact with a Ruby Rails API that sends and retrieves transaction data. The API when sent transaction data (formatted like the 
example data, whose format is that of a transaction csv downloaded from an actual bank), the API cleans and extracts relevant
transaction information, and saves it to the database. The views call the API to recieve the data for the transactions table and for 
all graphs.


I am planning for the project to have three main components: A transactions table where one can view and categorize each of his/her transactions,
a graphs page where one can see different breakdowns of his/her spending through multiple graphs, and a forecasts page where one can adjust
his/her average monthly spending levels across spending categories, and view the impact of these spending changes on his future balance.


So far, I have implemented most of the functionality necessary from the API. I have successfully implemented an early stage version of the table
and graphs pages, each of which pull data from the API. At the moment, the data is staged with sample transaction information as I have not
implemented support for the upload of transaction data via csv. The table does not currently support functionality for user to edit the spending
category of each transaction item. I have currently implemented one graph of the spending data. I have not yet implemented any of the forecasts
component.

