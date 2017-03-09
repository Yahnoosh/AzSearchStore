export type SuggestionsAction =
    {
        type: "INITIATE_SUGGEST",
    } |
    {
        type: "RECEIVE_SUGGESTIONS",
        suggestions: {}[],
        receivedAt: number,
    } |
    {
        type: "HANDLE_ERROR",
        error: string
    };

export const initiateSuggest = (): SuggestionsAction => ({
    type: "INITIATE_SUGGEST"
});

export const recieveSuggestions = (suggestions: {}[], receivedAt: number): SuggestionsAction => ({
    type: "RECEIVE_SUGGESTIONS",
    suggestions,
    receivedAt,
});

export const handleSuggestError = (error: string): SuggestionsAction => ({
    type: "HANDLE_ERROR",
    error
});