## Website Optimization
---
###Initiating Website:

Open index.html found in the first folder in your prefered browser (Though the prefered for the website is Google Chrome). 

### Description:

This is the Udacity project focusing on optimizing given code using diagnostic tools inside Chrome as well as online resources in the form of web pages and other resources. I used GitHub pages to host my site. As it stands now, PageSpeed Insights gave me a 95/100 for mobile and 91/100 for desktop in the "Speed" Category.  

### Optimizations:

##### Index.html, project-2048, project-mobile.html, project-webperf.html:

1- Optimized Google Fonts by using an asyncronous request with javascript.

2- Inlined CSS style and print sheets and added a media query for print.

3- Added async and defer tags to scripts in the head to avoid blocking the page.
Both tags were added to ensure browser support was present for browsers that didn't support async
4- Changed link in index.html to pizzeria image to smaller and compressed image.
5- Edited meta data where " FILL ME IN " appeared to Lee4Gitr for the "author" and the appropriate description of the site for the "description".

##### pizza.html

1- linked to optimized image of the pizzeria rather than the large original version.

##### main.js

1- Line 452: I used the solution provided by Cameron on the Udacity course for Browser Rendering Optimization. I changed changePizzaSizes(size) to include a switch-case statement and optimized the for-loop by removing unnecessary variable declarations inside the loop.

2- Line 467: I used the solution provided by Cameron on the Udacity course for Browser Rendering Optimization as well here. I factored out "document.qyerySelectorAll(".randomPizzaContainer");" so that it wouldn't recalculate every iteration of the for-loop.

3- Line 486: Similarly to the last issue, I placed a variable in the global scope instead of having it declared at every iteration of the for loop.

4- Line 519: I reimplemented the sliding pizzas after I had previously removed them. I found a solution online, cited him in the code accordingly, and implemented the solution. Much like the previous two issues, I factored out those things that didn't need to be recomputed at each cycle of the for-loop. From there, I used an array to store the information that would be used to calculate the phase of the background pizzas. I was intrigued to see two for-loops functioning with the same i variable simultaneously. 

### License
---
This project was hosted by Udacity and all cited material belongs soley to those people cited. I had a lot of help from GitHub user Tefi's project as well as forum board and help from other sources on the web, including MDN and the linked resources throughout the course.
---