# AzSearch.js

A UI state management library to build js apps against Azure Serach. Built with redux and typescript. Provides simple apis for searching, suggestions, and faceted navigation. Built in extensibility endpoints allow you to call your own controllers rather than the search service directly, allowing for custom authentication or server side processing of results.

## Getting Started
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
// checkbox facets are used for discrete value filtering
// a common scenario is ratings on ecommerce sites 
// a website might display checkboxes to filter by 1* 2* 3* 4* 5* rated products
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

Suggestions:

```js
// set input for suggestions
store.setInput("enginee");
// set the suggester we will make requests against
store.updateSuggestionsParameters({ suggesterName: "titleSuggester" });
// send http request to get suggestions
store.suggest();
```

## Configuration

### searchParameters

searchParameters control different aspects of search such as paging, field selection, and sorting. These map directly to the api: https://docs.microsoft.com/en-us/rest/api/searchservice/search-documents 

### searchParameters

* `count`: boolean. When set to true, will request count of total matches to be returned with search results
* `top`: number. Determines number of results to load, default 50 max 1000.
* `skip`: number. Used for paging results. 
* `orderby`: string. Used for sorting,
* `searchMode`: string, either "any" or "all". See api docs for details
* `scoringProfile`: string. Used to alter result scoring, see api reference.
* `select`: string. Limits the fields retrieved with search request
* `searchFields`: string. controls which fields to search on a given query
* `minimumCoverage`: number. Advanced, the percentage of the index that must be covered by a search query
* `apiVersion`: string. Either: "2016-09-01" or "2015-02-28-Preview"
* `queryType`: string. Either "simple" or "full". Defaults to simple. Standard keyword search scenarios use simple.

### searchParameters APIs

```js
// set api version for search
setSearchApiVersion(apiVersion);
// overwrite all parameters
setSearchParameters(searchParameters);
// merge in a subset of parameters
updateSearchParameters({ searchMode: "all" });
// convenient apis for manipulating $skip in the context of paging
incrementSkip();
decrementSkip();
```

#### suggestionsParameters

* `top`: number. Determines number of results to load, default 50 max 1000.
* `filter`: string. Expression that limits documents considered for suggestions
* `orderby`: string. Used for sorting,
* `fuzzy`: boolean. Defaults to false. Enables fuzzy matching for suggestions.
* `highlightPreTag`: string. Opening HTML tag that is applied to matched text ex: <b>
* `highlightPostTag`: string. Closing HTML tag that is applied to matched text ex: </b>
* `select`: string. Limits the fields retrieved with search request
* `searchFields`: string. controls which fields to search on a given query
* `minimumCoverage`: number. Advanced, the percentage of the index that must be covered by a search query
* `apiVersion`: string. Either: "2016-09-01" or "2015-02-28-Preview"
* `suggesterName`: string. Name of suggester associated with index that will be called for suggest()

#### suggestionsParameters APIs

```js
// set api version for suggest
setSuggestionsApiVersion(apiVersion);
// overwrite all parameters for suggest
setSuggestionsParameters(suggestionsParameters);
// update a subset of parameters for suggest
updateSuggestionsParameters({ suggesterName: "sg" });

```

## Search & Suggest

## Faceting & Filtering

## Extensibility
