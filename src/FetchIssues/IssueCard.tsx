import React from 'react'
import { Issue } from '../interfaces'
import './index.css'


interface Props {
    issue: Issue
}


const IssueCard: React.FC<Props> = ({ issue, children }) => {
    return (
        <div className="issue__card">
            <h3> {issue.title}</h3>
            <p>{issue.body}</p>
            {children}
        </div>
    )
}

export default IssueCard
