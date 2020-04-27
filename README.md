## **Duck Fed Statistic Website**
A Node.js application developed using Meteor Framework with React UI pattern and mongo database. This application stores the duck fed information the user provides from the input form into the mongo database, and display those information on the web page.

[Screenshot of the page](public/img/pageDemo.png)   

### **Design Ideas and Functionalities** 
* A simple layout to allow the user selects a date to view or submit the data record for
* Allow user to add new data record for a selected date or for the whole month

### **Further Improvement**
The current functionality has some constranins due to the limit of working time, will list them here and discuss the improvement possibility  
* The input form could define which question are required to answer, and should ask the user to enter all required(*) information before click submit
* The input form and the data strcture could be defined more sepecific. For example, specify the location to be country, province, city; specify the time as well etc.
* The data table should support sort filter to sort the data entry
* Ask the user to login in before view the page, submit the data, or modify the existing data

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

