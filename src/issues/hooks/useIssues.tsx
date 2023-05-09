import { useState, useEffect } from 'react';
import { useQuery } from "react-query";
import { githubApi } from "../../api/githubApi";
import { Issue, State } from "../../types";

interface Props {
    state?: State;
    labels: string[];
    page?: number
}

const getIssues = async ({labels, page=1, state}:Props):Promise<Issue[]> => {
    
    const params = new URLSearchParams();

    if (state) params.append('state', state);
    if (labels.length > 0) {
        const labelString = labels.join(',');
        params.append('labels', labelString);
    }

    params.append('page', page?.toString());
    params.append('per_page', '5');
    
    const { data } = await githubApi<Issue[]>('/issues', { params });
    return data;
}

export const useIssues = ({ state, labels }: Props) => {
    const [page, setPage] = useState<number>(1);

    useEffect(() => {
        setPage(1)
    }, [state, labels])

    const issueQuery = useQuery(
        ['issues', { state, labels, page }], 
        () => getIssues({labels, page, state}), {
        refetchOnWindowFocus: false
    })

    const nextPage = () => {
        if (issueQuery.data?.length === 0) return;
        setPage(page + 1);
    }

    const prevPage = () => {
        if(page > 1) setPage(page - 1);
    }

    return {
        // Properties
        issueQuery,
        // Getter
        page: issueQuery.isFetching ? 'Loading...' : page,
        // Methods
        nextPage,
        prevPage
    }
}