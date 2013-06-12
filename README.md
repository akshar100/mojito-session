mojito-session-addon
=======================

From your app directory use `npm install mojito-session-addon` to install the addon. 

This is a simple session management library that uses Y.Cache underneath. 
Add "mojito-session-addon" to the `requires:[]` array of a mojit controller and the session will be available in following fashion. 

In the controller use as `actionContext.session.get("key");` and `actionContext.session.set("key","value");`. 

For example check the gist: https://gist.github.com/akshar100/5763632 