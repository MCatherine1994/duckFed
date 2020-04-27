## **Duck Fed Statistic Website**
A Node.js application developed using Meteor Framework with React UI pattern and mongo database. This application stores the duck fed information the user provides from the input form into the mongo database, and display those information on the web page.

[Screenshot of the page](public/img/pageDemo.png)   

### **Design Ideas and Functionalities** 
* First start with a simple layout of the website page which contains three main components, date picker, data table and input form
* Date picker allows the user to pick a date to view or upload the data
* Data table displays all the existing data record for the selected date
* Input form allows user to add new data record for a selected date or for the whole month
* Meteor web framework integrates with Node.js, React and mongodb, which is very convenient for developers to build a web application
* Uikit is used for style the user interface, so the page is styled and responsive
* Data table contains 6 attributes: location, duckNum, time, food, foodType, foodAmount, which corresponds to those 6 questions (could be more sepcific if works in real)

### **Further Improvement**
The current functionality has some constranins due to the limit of working time, will list them here and discuss the improvement possibility  
* The input form could define which question are required to answer, and should ask the user to enter all required(*) information before click submit
* The input form and the data strcture could be defined more sepecific. For example, specify the location to be country, province, city; specify the time as well etc.
* The data table should support sort filter to sort the data entry
* Should have unit, integration and functional test for the components (for example, assertion test, snapshot test etc.)
* Ask the user's authentication like let them login in before view the page, submit the data, or modify the existing data (from security perspective)
* Allow the scientist to download the data table (different type of users should have different authority)

### **Work Log**
* Created a Node.js application using the Meteor web framework
* Created the page layout with placeholders for main contents
* Added date picker
* Added data table which updates with the date change
* Connected with the mongodb and added some test record into the databse
* Added a input form and connected with the mongodb
* Added more record through the inpur form to test the functionality
* Added the feature to allow the user submit data for month
* Write Documentation

### **Ref Reading**
* [Getting Started on Heroku with Node.js](https://devcenter.heroku.com/articles/getting-started-with-nodejs)  
* [How to Run a Meteor.js Application on Heroku in 10 Steps](https://medium.com/@leonardykris/how-to-run-a-meteor-js-application-on-heroku-in-10-steps-7aceb12de234)