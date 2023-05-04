import { useState } from 'react';
import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import { useIssues } from '../hooks';
import Loader from '../../shared/Loader';


export const ListView = () => {
  const [selectedLabels, setSelectedLabels] = useState<string[]>([])
  const { issueQuery } = useIssues();
  const { data, isLoading } = issueQuery;

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
            <IssueList issues={data || []}/>
          )
        }
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
