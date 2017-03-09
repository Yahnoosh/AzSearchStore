export type ResultsAction =
    {
        type: "INITIATE_SEARCH",
    } |
    {
        type: "SET_RESULTS_PROCESSOR",
        resultsProcessor: (results: {}[]) => {}[]
    } |
    {
        type: "RECEIVE_RESULTS",
        results: {}[],
        receivedAt: number,
        count: number
    } |
    {
        type: "APPEND_RESULTS",
        results: {}[],
        receivedAt: number
    } |
    {
        type: "HANDLE_ERROR",
        error: string
    };

export const initiateSearch = (): ResultsAction => ({
    type: "INITIATE_SEARCH"
});

export const setResultsProcessor = (resultsProcessor: (results: {}[]) => {}[]) => ({
    type: "SET_RESULTS_PROCESSOR",
    resultsProcessor
});

export const recieveResults = (results: {}[], receivedAt: number, count: number): ResultsAction => ({
    type: "RECEIVE_RESULTS",
    results,
    receivedAt,
    count
});

export const appendResults = (results: {}[], receivedAt: number): ResultsAction => ({
    type: "APPEND_RESULTS",
    results,
    receivedAt
});

export const handleSearchError = (error: string): ResultsAction => ({
    type: "HANDLE_ERROR",
    error
});