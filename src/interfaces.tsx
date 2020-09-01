export interface Issue {
    title: string
    body: String
    id: number
    state: String
    endCursor: String
    hasNextPage: boolean
    number: number
}

export enum SearchLocation {
    title = "title",
    body = "body",
    both = "both"
}

export enum IssueState {
    open = "open",
    closed = "closed",
    both = "both"
}
