# TODO

## Master list  
1. ~~search input~~
    1. ~~action creation + tests~~
    2. ~~reducer + tests~~
    3. ~~url composition + tests~~
    4. ~~support $count~~
2. ~~api verions~~
    1. ~~action creation + tests~~
    2. ~~reducer + tests~~
    3. ~~url composition + tests~~
3. ~~search parameters~~
    1. ~~create generic action for all params~~
    2. ~~reducer + tests~~
    3. ~~url composition + tests~~
4. ~~paging~~
5. ~~load more~~
5. ~~refactor actions~~
4. ~~facets~~
    1. ~~add facets~~
    2. ~~build URLS~~
    3. ~~tests~~
    4. ~~set facet values/ update facet clauses~~
    5. ~~enforce typecheck for toggle/setrange~~
    5. ~~tests~~
    6. ~~set facet values when issuing query | set/update~~
        1. ~~set reducers/actions & tests~~
        2. ~~expose set as async action, e2e tests~~
        3. ~~update reducers/actions & tests~~
        4. ~~expose update as async action, e2e tests~~
    7. ~~clear facets~~
5. ~~filtering~~
    1. ~~simple filter url building~~
    2. advanced filter url building -- DEFERRED
    3. ~~behavior for search vs load more~~
    4. ~~tests~~
5. ~~suggestions~~
    1. ~~Refactor parameters into searchParams and suggestion params, add tests~~
    2. ~~state tree + actions/params to hold suggestion results~~
    3. ~~URI building e2e tests~~
    4. ~~async action tests~~
7. ~~refactor facets reducer~~
6. ~~extensibility~~
    1. ~~Migrate to use POST for requests, will make it easier for extensibility as well as remove limitations.~~
        1. ~~suggestions~~
        2. ~~search~~
    1. ~~accept js callbacks for search, suggestions~~
    2. ~~accept js callbacks for processResult, processSuggestion, to change the result layout or do any additional user specified processing. Should also map @search.text->searchText~~
7. Reliability
    1. more error handling for network requests
    2. retries
