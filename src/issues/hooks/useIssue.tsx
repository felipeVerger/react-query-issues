import { useQuery } from "react-query"
import { Issue } from "../../types";
import { githubApi } from "../../api/githubApi";
import { sleep } from "../../helpers/sleep";

const getIssueByNumber = async (issueNumber:number):Promise<Issue> => {
    await sleep(2);
    const { data } = await githubApi.get<Issue>(`/issues/${issueNumber}`);
    return data;
}   

const getIssueComments = async (issueNumber:number):Promise<Issue[]> => {
    await sleep(2);
    const { data } = await githubApi.get<Issue[]>(`/issues/${issueNumber}/comments`);
    return data;
}   

export const useIssue = (issueNumber: number) => {

    const issueQuery = useQuery(
        ['issue', issueNumber],
        () => getIssueByNumber(issueNumber)
    );

    const commentsQuery = useQuery(
        ['issue', issueNumber, 'comments'],
        () => getIssueComments(issueQuery.data!.number),
        {
            enabled: issueQuery.data !== undefined,
        }
    );

    return {
        issueQuery,
        commentsQuery
    }
}