import { FC } from 'react';
import { FiInfo, FiMessageSquare, FiCheckCircle } from 'react-icons/fi';
import { Issue, State } from '../../types';
import { useNavigate } from 'react-router';
import { useQueryClient } from 'react-query';
import { getIssueByNumber, getIssueComments } from '../hooks/useIssue';
import { timeSince } from '../../helpers/time-since';

interface Props {
    issue: Issue
}

export const IssueItem:FC<Props> = ({ issue }) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    /**
     * The function prefetches data for an issue and its comments when the mouse enters a certain area.
     */
    const prefetchData = () => {
        queryClient.prefetchQuery(
            ['issue', issue.number],
            () => getIssueByNumber(issue.number)
        );
        queryClient.prefetchQuery(
            ['issue', issue.number, 'comments'],
            () => getIssueComments(issue.number)
        );
    }

    /**
     * The function sets query data for an issue with a specified number and updates the timestamp.
     */
    const presetData = () => {
        queryClient.setQueryData(
            ['issue', issue.number],
            issue,
            {
                updatedAt: new Date().getTime() + 10000
            }
        )
    }

    return (
        <div 
            className="card mb-2 issue" 
            onClick={() =>  navigate(`/issues/issue/${issue.number}`)}
            onMouseEnter={prefetchData}
        >
            <div className="card-body d-flex align-items-center">
                {issue.state === State.Open 
                ? <FiInfo size={30} color="red" />
                : <FiCheckCircle size={30} color="green" />
                }

                <div className="d-flex flex-column flex-fill px-2">
                    <span>{issue.title}</span>
                    <span className="issue-subinfo">#{issue.number} opened {timeSince(issue.created_at)} ago by <span className='fw-bold'>{issue.user.login}</span></span>
                    <div>
                        {issue.labels.map((label) => (
                            <span
                                key={label.id}
                                className='badge rounded-pill m-1'
                                style={{ backgroundColor: `#${label.color}`, color: 'black' }}
                            >
                                {label.name}
                            </span>
                        ))}
                    </div>
                </div>

                <div className='d-flex align-items-center'>
                    <img src={issue.user.avatar_url} alt="User Avatar" className="avatar" />
                    <span className='px-2'>{issue.comments}</span>
                    <FiMessageSquare />
                </div>

            </div>
        </div>
    )
}
