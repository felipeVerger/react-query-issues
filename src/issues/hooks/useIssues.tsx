import { useQuery } from "react-query";
import { githubApi } from "../../api/githubApi";
import { Issue } from "../../types";


const getIssues = async ():Promise<Issue[]> => {
    const { data } = await githubApi<Issue[]>('/issues');
    return data;
}

export const useIssues = () => {
    const issueQuery = useQuery(['issues'], getIssues, {
        refetchOnWindowFocus: false
    })

    return {
        issueQuery
    }
}