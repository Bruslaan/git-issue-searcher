import React from 'react'
import { useQuery } from '@apollo/client';
import { GET_COMMENTS_OF_ISSUE } from '../queries'

import './index.css'


interface Props {
    issueNumber: number,
    repoOwner: String,
    repoName: String,
}

const FetchComments: React.FC<Props> = ({ issueNumber, repoName, repoOwner }) => {


    const number = issueNumber
    const { loading, error, data, fetchMore } = useQuery(GET_COMMENTS_OF_ISSUE, {
        variables: { number, repoOwner, repoName },
    });


    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error!</p>;

    const comments = data.repository.issue.comments.edges


    if (data.repository.issue.comments.edges.length === 0) return <p>No Comments</p>


    // paginate through comments
    const loadMoreComments = async () => {
        const endCursor = data.repository.issue.comments.pageInfo.endCursor
        const newComments = await fetchMore({
            variables: {
                cursor: endCursor as String
            },
        })
        console.log(newComments)
    }


    return (<div>

        {comments.map((item: any) => {
            return <div className="issue__comment" key={item.node.id}>
                <p> Comment: {item.node.body}</p>
            </div>
        })}
        <button onClick={loadMoreComments}>Load more Comments</button>
    </div>)


}

export default FetchComments

