#AzSearch.js

A UI state management library to build js apps against Azure Serach. Built with redux. Provides simple apis for searching, suggestions, and faceted navigation. Built in extensibility endpoints allow you to call your own controllers rather than the search service directly, allowing for custom authentication or server side processing of results.

##Getting Started
1. Clone the repo
2. Install dependencies 
   ``` 
   npm install 
   ```
3. (optional) Install a web server to run the demos. I use http-server:
   ```
   npm install -g http-server
   ```
4. Build the project:
    ```
    tsc
    ```
    ```
    webpack
    ```
5. Install emos
    1. react
        1. cd examples/react_ts
        2. npm install
        3. webpack
    2. knockout
        1. no configuration required
5. Launch http-server
   ```
   npm run start_server
   ```
6. Navigate to 127.0.0.1:8080/examples/react_ts/index.html or 127.0.0.1:8080/examples/knockout/index.html

