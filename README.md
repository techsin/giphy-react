# giphy-react
React with Giphy on any website wohoooo

A chrome extension that works in tendom with Firebase to let you leave giphy comments on any url.

Url could be changed with javascript using history api as is the case with SPA frameworks like React, and it still detects url changes.

UI is very non intrusive. 

Watch a video to get an idea.

It works, but it isn't production ready. 

 - limit of max 100 simultaneous users, (firebase free tier limit)
 - no rooms (if 10k users could connect they would be all in one room)
 - content script's css gets affected by page's own css, need to use unset: initial property
 
# Youtube Video

https://www.youtube.com/watch?v=Jn9BtDHHaM0
