import { useQuery } from 'react-query';
import { githubApi } from '../../api/githubApi';
import { Label } from '../../types/label';
import { sleep } from '../../helpers/sleep';

const getLabels = async ():Promise<Label[]> => {
    await sleep(2);
    const { data } = await githubApi.get<Label[]>('/labels?per_page=100');
    return data;
}

export const useLabels = () => {
  const labelsQuery = useQuery(["labels"], getLabels, {
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60,
    placeholderData: [
      {
        id: 791921801,
        node_id: "MDU6TGFiZWw3OTE5MjE4MDE=",
        url: "https://api.github.com/repos/facebook/react/labels/%E2%9D%A4%EF%B8%8F",
        name: "❤️",
        color: "ffffff",
        default: false,
      },
      {
        id: 725156255,
        node_id: "MDU6TGFiZWw3MjUxNTYyNTU=",
        url: "https://api.github.com/repos/facebook/react/labels/good%20first%20issue%20(taken)",
        name: "good first issue (taken)",
        color: "b60205",
        default: false
      }
    ]
  });

  return labelsQuery;
};