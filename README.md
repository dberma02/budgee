# Budgee
## A personal finance web application

### Installation + Setup:

Please make sure you have installed Angular Cli, Ruby on Rails 5, and MySQL on your computer. Run the rails command `rake db:create` from the `budgee` directory
to create the development and test databases. From the same directory, run the rails command `rake db:migrate` to
run database migrations. Run `rails s` to launch the Rails server. You will need ther server to be running in the next
few steps, when we will populate your local database with sample data via budgee's api endpoint.

From the`client` directiory, and run `npm install` to install all Angular2 dependencies.
Move to the `budgee/setup` directory, and run `sh ./import_all` to load the sample data to your local database
and to import bootstrap stylesheets. For the stylesheets to import, you will need wget installed on your 
computer. After you've run `import_all.xs` the web app should be ready to launch!

### Usage:

From the budgee directory, run `rails s` to launch the rails server on port 3000. From the 
`budgee/client` directory, run `ng serve` to launch the Angular2 server on port 4200. Open up `localhost:4200`
on your web browser. 

##### Rails API

The Rails API takes input in the following format. This format follows the convention of transaction information from
an actual bank.

{"data": {"attributes":[{"debit": 9.62,"credit": null,"balance": 1000,"date": "3/15/17","description": "DUANE READE             POS     NEW YORK      NY US        000075","category": "PHARMACY"}]}}


### About the project:

This project was inspired by this past summer that I spent in New York. Within my first week living in the city,
it became clear how quickly my spending could balloon if I did not keep a careful watch on my balance. 
Looking through my bank statements, it was difficult to parse all of the information provided, make useful comparisons, and get a full picture of my spending.
I wanted a place where I could quickly get a breakdown of my recent spending, and compare it to previous trends. I soon realized this
problem presented an interesting opportunity for a project through which I could work on my web development skills and practice
creating useful data visualizations.


This project is still in progress, and only some of it's features have been implemented at this point. The website uses Angular2 views
which interact with a Ruby Rails API that sends and retrieves transaction data. When sent transaction data (formatted like a
 transaction csv downloaded from an actual bank), the API cleans and extracts relevant
transaction information, and saves it to the database (I have been runnung the app with a local MySQL). The views  recieve
all data displayed in the transactions table and in all graphs from calls to the API. 


I am planning for the project to have three main components: A transactions table where one can view and categorize each of his/her transactions,
a graphs page where one can see different breakdowns of his/her spending through multiple graphs, and a forecasts page where one can adjust
his/her average monthly spending levels across spending categories, and view the impact of these spending changes on his/her future balance.


So far, I have implemented most of the functionality necessary from the API. I have successfully implemented an early stage version of the table
and graphs pages, each of which pull data from the API. At the moment, the data is staged with sample transaction information. I plan to implement
an uploader, so that one can upload hes/her own transaction data via csv. I plan to implement in-cell editing of the category column of the 
table where the user can categorize his/her spending data. I have currently implemented one graph of the spending data. I have not yet 
implemented any of the forecasts component.


