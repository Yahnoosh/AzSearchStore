export type SuggestionsAction =
    {
        type: "INITIATE_SUGGEST",
    } |
    {
        type: "SET_SUGGESTIONS_PROCESSOR",
        suggestionsProcessor: (suggestions: {}[]) => {}[]
    } |
    {
        type: "RECEIVE_SUGGESTIONS",
        suggestions: {}[],
        receivedAt: number,
    } |
    {
        type: "CLEAR_SUGGESTIONS"
    } |
    {
        type: "HANDLE_ERROR",
        error: string
    };

export const initiateSuggest = (): SuggestionsAction => ({
    type: "INITIATE_SUGGEST"
});

export const setSuggestionsProcessor = (suggestionsProcessor: (suggestions: {}[]) => {}[]) => ({
    type: "SET_SUGGESTIONS_PROCESSOR",
    suggestionsProcessor
});

export const recieveSuggestions = (suggestions: {}[], receivedAt: number): SuggestionsAction => ({
    type: "RECEIVE_SUGGESTIONS",
    suggestions,
    receivedAt,
});

export const clearSuggestions = (): SuggestionsAction => ({
    type: "CLEAR_SUGGESTIONS",
});

export const handleSuggestError = (error: string): SuggestionsAction => ({
    type: "HANDLE_ERROR",
    error
});