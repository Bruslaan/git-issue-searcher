import React from 'react'
import { useQuery } from '@apollo/client';
import { GET_COMMENTS_OF_ISSUE } from '../queries'

interface Props {
    issueNumber?: number,

}

const FetchComments: React.FC<Props> = ({ issueNumber }) => {


    const number = issueNumber
    const { loading, error, data } = useQuery(GET_COMMENTS_OF_ISSUE, {
        variables: { number },
    });


    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error!</p>;
    const comments = data.repository.issue.comments.edges
    if (data.repository.issue.comments.edges.length === 0) return <p>No Data</p>
    return (<div>

        {comments.map((item: any) => {
            return <div key={item.node.id}>

                <p> Comment: {item.node.body}</p>

            </div>
        })}

    </div>)


}

export default FetchComments

