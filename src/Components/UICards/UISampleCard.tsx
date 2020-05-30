import * as React from 'react';

import './UICards.css';

interface ISampleCardObject {
  displayImage: string, 
  displayTitle: string,
  displayOwner: string,
  audioSource: string,
  className?: string
}

interface ISampleCardProps {
  objectIndex: number,
  object: ISampleCardObject,
  onClick: (event: ISampleCardObject, objectIndex?: number) => void
}

const UISampleCard: React.FC<ISampleCardProps> = (props)  => {
  const overrideClassName = props.object.className ?? ''
  const {displayOwner, displayTitle, displayImage } = props.object
  const index = props.objectIndex
  return (
    <div key={displayOwner + index} className={`SampleCardContainer ${overrideClassName}`} onClick={() => props.onClick(props.object, props.objectIndex)}>
      <div className="SampleCardBackgroundImage">
        <img src={displayImage} height="100%" width="100%" className="SampleCardBackgroundImage"></img>
        <div className="SampleCardOverlay"></div>
      </div>
      <h5 className="SampleCardLabel">{displayTitle}</h5>
    </div>
  )
}

export { ISampleCardObject, ISampleCardProps, UISampleCard }