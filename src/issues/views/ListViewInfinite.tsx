import { useState } from 'react';
import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import Loader from '../../shared/Loader';
import { State } from '../../types';
import { useIssuesInfinite } from '../hooks';


export const ListViewInfinite = () => {
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [state, setState] = useState<State>();

  const { issuesQuery } = useIssuesInfinite({ state, labels: selectedLabels });

  const onLabelChange = (labelName:string) => {
    if(selectedLabels.includes(labelName)) {
      setSelectedLabels(selectedLabels.filter(label => label !== labelName));
    } else {
      setSelectedLabels([...selectedLabels, labelName]);
    }
  }

  return (
    <div className="row mt-5">
      
      <div className="col-8">
        {
          issuesQuery.isLoading ? <Loader/> : (
            <IssueList 
              issues={issuesQuery.data?.pages.flat() || []}
              state={state}
              onStateChange={(newState) => setState(newState)}
            />
          )
        }
        <button 
          className='btn btn-outline-primary mt-2'
          onClick={() => issuesQuery.fetchNextPage()}
          disabled={!issuesQuery.hasNextPage}
        >Load more</button>
      </div>
      
      <div className="col-4">
        <LabelPicker 
          selectedLabels={selectedLabels}
          onChange={(labelName) => onLabelChange(labelName)}
        />
      </div>
    </div>
  )
}
