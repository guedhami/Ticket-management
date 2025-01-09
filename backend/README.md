this is my first backend application using node ( version : 16.4 ) with ( express , cors , mongoose , slugify and nodemon )
to run this project all you need to have is node 16.4 at least and mongobd
in some laptops there's a problem starting the connection in mongodb compass ( connect ECONNREFUSED 127.0.0.1:27017 )
all you need to do in this case is to open your laptop research view and search for services 
select in the services the mongodb server , start it and you're good to go 
open the project in your code editor (exp : vs code ) , open the terminal and run this line : nodemon index.js
when you open your mongodb compass you'll find a new table created named blogd 
so to test this application : open your postman and do the following :
POST : localhost:3000/api/posts/
whrite in the body (raw -> JSON ) the following :
  {
    "title" : "......" ,
    "content" : "......" ,
    "author" : "......" ,
    "slugs" : "......" ,
    "tags" : [ "..." , "..." ]
  }
then send this query 
when you open blogs in the mongodb compass you'll find a new item is added 
GET :  localhost:3000/api/posts/{id}
put the id of the element you want to get and send the query 
GET :  localhost:3000/api/posts/
this will give you all the elements in blogs
DELETE :  localhost:3000/api/posts/{id}
this will delete the element 
UPDATE :  localhost:3000/api/posts/{id}
put the id of the element you want to modify and fill the body like the post methode and then send it 

if there's any suggestions i'm always open to it !
