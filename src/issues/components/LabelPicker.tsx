import { FC } from 'react';
import Loader from "../../shared/Loader";
import { useLabels } from "../hooks/useLabels"

interface Props {
  selectedLabels: string[];
  onChange: (labelName: string) => void
}

export const LabelPicker:FC<Props> = ({ selectedLabels, onChange }) => {
  const { data, isLoading } = useLabels();
  

  if (isLoading) {
    return <Loader/>
  }
  return (
    <div>
      {
        data?.map((label) => (
          <span 
            key={label.id}
            className={`badge rounded-pill m-1 label-picker ${selectedLabels.includes(label.name) ? "label-active" : ""}`}
            style={{ border: `1px solid #${label.color}`, color: `#${label.color}` }}
            onClick={() => onChange(label.name)}
          >
            {label.name}
          </span>
        ))
      }        
    </div>
  )
}
