# OrganizedHoarders
Technologies Used:
------------------
* HTML
* CSS
* Javascript
* Express
* MongoDB
* Mongoose
* Bcrypt
* Heroku
* GitHub

Approach Taken:
---------------
I knew that I wanted to build an app to help me track the items in my personal collection. I started off building my 7 RESTful routes. I wanted to knock out the MVP functionality first before going onto anything else. As I was building and testing the routes, I would stop and do a rough style for each page as I got to them. Once I got the app's functions working properly, I went back and really honed in on my css, moving things around and tweaking the overall look and feel.

After I knocked out the MVP, I moved onto adding users and sessions. Once I got that working, I decided on adding more seed routes to help me have a better presentation. Getting all my different seed data to look good on the page was a little tricky. I had to tighten up my flexboxes to get them to look the same when a lot of information was being added to the divs.

Issues Along The Way:
---------------------
**App wasn't working after deployment with user/sessions added** - After I successfully added the users and sessions code, I tested locally and then committed my work. When I deployed to Heroku and tried to open my app, I got aa `Internal Server Error`. My app wasn't loading at all on Heroku. My initial thought was maybe something was wrong with Heroku. Maybe heroku was down? After checking with some classmates, that wasn't the case. My local code didn't have an error and was working fine so I didn't know what was going on with Heroku since this was my first time using Heroku. Luckily I posted in the SOS channel and **Moses** had previously encountered this issue and knew that I was missing my SECRET=FeedMeSeymour inside my Config Vars section in my Heroku settings.

**Items being unique to the user** - After I got my users and sessions working, I quickly realized that the items I was adding to the index page for each user was **NOT** unqiue to each user. The items were all being added to the main database so if my app has a bunch of users, they would all be seeing each others stuff. This would make my app completely useless. I needed the app to only track and display items for that specific user and not any other user. I realized I needed a way to tie each item that was being made to the specific user, but I didn't know how. Big thanks to **Chaz** for helping me solve this problem. In my index and post routes I needed to make `user` =  `req.session.currentUser` so that the code would know that whatever items are being added and displayed, are only to be added and displayed for that specific user only.

Unsolved Problems:
------------------
**Auto Expanding Textbox** - In my Edit and New pages, the description line is the same length and width as the title, url and value lines. I would for the description line to auto expand if users have stuff with a longer description. I was able to make the textarea an expandable box, but I don't want the user to have to drag to expand the box. It should auto expand as the user is typing within the textbox. I found a way using a span tag to make a textbox that auto expanded but then the text wouldn't get saved into the description portion of the schema.

Future Improvements:
-------------------
1. Add folders to organize different collections
2. Add a move stuff function so users can move their stuff from one folder to another if needed
3. Individual folder value totals


 Link to my live site:
 ---------------------
 https://organizedhoarders.herokuapp.com/
