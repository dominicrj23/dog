Application is made to be run in repl mode by launching  ``` node```
 and then using ```.load app.js```  to load usable scripts.  
 Use  
  - ```fn.<functionName>(<param>)``` to use the functions.  
  - ```fn``` would print the list of all the functions.

This modules uses Docker compose to make Elasticsearch-fluentD-Kibana available for the project.  
[docker-efk](https://github.com/dominicrj23/docker-efk.git) has been added as submodule for you to use in case you don't have the infrastructure set up on your machine.  
Use ```git clone --recursive ``` to fetch submodule while cloning.  
Run:  
  - ```npm run start:docker``` to start up your infrastructure silently.  run ```npm run start:docker:loud``` to have all the outputs
  - ```npm run stop:docker``` to stop containers.  
  - ```npm run clean:docker``` to cleanup images and containers.  
