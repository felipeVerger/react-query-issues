import { useState } from 'react';
import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import { useIssues } from '../hooks';
import Loader from '../../shared/Loader';
import { State } from '../../types';


export const ListView = () => {
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [state, setState] = useState<State>();

  const { issueQuery, page, nextPage, prevPage } = useIssues({ state, labels: selectedLabels });
  const { data, isLoading, isFetching } = issueQuery;

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
          isLoading ? <Loader/> : (
            <IssueList 
              issues={data || []}
              state={state}
              onStateChange={(newState) => setState(newState)}
            />
          )
        }
        <div className='d-flex mt-2 justify-content-between align-items-center'>
          <button 
            className='btn btn-outline-primary' 
            onClick={prevPage}
            disabled={isFetching}
          >Prev</button>
          <span>{page}</span>
          <button 
            className='btn btn-outline-primary' 
            onClick={nextPage}
            disabled={isFetching}
          >Next</button>
        </div>
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
