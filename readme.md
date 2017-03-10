#AzSearch.js

A UI state management library to build js apps against Azure Serach. Built with redux and typescript. Provides simple apis for searching, suggestions, and faceted navigation. Built in extensibility endpoints allow you to call your own controllers rather than the search service directly, allowing for custom authentication or server side processing of results.

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
5. Install demos
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

## Basic Usage

Minimum configuration is needed to get started, just a service, index, and queryKey. By default AzSearchStore makes all requests directly to the service. This means you'll likely need to configure CORS for your index. If developing locally you can set CORS to '*' for your index through the portal.azure.com. 

### Setup:

```js
// create an instance
var store = new AzSearchStore();
// basic service configuration
store.setConfig(
    { 
        index: "yourIndex", 
        // can be found in azure portal
        queryKey: "xxxxxxxYOUR-QUERY-KEY-HERExxxxxx", 
        // yourServiceName.search.windows.net
        service: "yourServiceName" 
    });
```

If you've used redux, some of the following may look familiar. AzSearchStore is built as a redux store. The raw redux store can be accessed via store.store. AzSearchStore can be tought of as two parts. First, as data representing the state of a search application including search results, suggestions, and facets. Second, as a set of APIs to manipulate search state, these correspond with common actions performed by search UI elements such as autocomplete, or faceted search.

### Reading data

```js
// read the current state
var state = store.getState();

// create a callback function
var callback = function(){
    // read the changed state
    var state = store.getState();
    // do something with updated state...
}

// subscribe the callback to changes on the store
// callback will get called after every change to the state tree
store.subscribe(callback)
```

### Basic APIs

AzSearchStore has high level APIs that abstract the guts of searching, faceting, and managing search application state. Something missing from your scenario (for example, date faceting support)? Please file an request to help us prioritize. 

In the following example we issue set some search parameters and issue a query:

```js
// update a parameter used for searching, in this instance $count
store.updateSearchParameters({ count: true });
// set the search text as "*"
store.setInput("*");
// make an http request to fetch search results
store.search();
// simulate a user loading an additional page of results
store.incrementPage();
// make an http request to fetch and append results to existing results
store.loadMore();
```

Basic facet usage:

```js
// create an checkbox facet, updates internal application state
store.addCheckboxFacet("campusType", false);
// issue a search request that will populate facets for that field
// note search() returns a promise 
store.search().then(...)
// simulates a user selecting a facet checkbox for the value "urban"
// will produce the filter $filte="campusType eq 'urban'"
store.toggleCheckboxFacet("campusType", "urban");
// make the request to retrieve results, applying the recently generated filter
store.searchFromFacetAction();
```

## Configuration

## Search & Suggest

## Faceting & Filtering

## Extensibility
