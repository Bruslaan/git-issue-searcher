export interface Issue {
    title: string
    body: String
    id: number
    state: String
}

export enum SearchLocation {
    title = "title",
    body = "body",
    both = ""
}

export enum IssueState {
    open = "open",
    closed = "closed",
    both = "both"
}
