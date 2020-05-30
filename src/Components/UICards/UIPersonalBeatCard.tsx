import * as React from 'react';
import * as CSS from 'csstype';

import './UICards.css';

interface IPersonalBeatObject {
  displayImage: string,
  displayTitle: string,
  audioSource: string,
  displayTags: [string],
  className?: string
}

interface IPersonalBeatProps {
  objectIndex: number,
  object: IPersonalBeatObject,
  displayTagLimit?: number,
  onClick: (event: IPersonalBeatObject, objectIndex?: number) => void
}

const UIPersonalBeatCard: React.FC<IPersonalBeatProps> = (props) => {
  const overrideClassName = props.object.className ?? ''
  const { displayImage, displayTitle } = props.object
  const tagLength = props.displayTagLimit ?? props.object.displayTags.length
  const displayedTags = props.object.displayTags.slice(0, tagLength).map((tagValue, tagIndex) => {
    return (
      <h5 
        key={tagValue + tagIndex} className="BeatsCardTag"
      >{tagValue}</h5>
    )
  })

  const backgroundStyle: CSS.Properties = {
    backgroundImage: `url(${displayImage})`
  }

  return (
    <div key={displayTitle} className={`BeatsContainer ${overrideClassName}`} style={backgroundStyle} onClick={() => props.onClick(props.object, props.objectIndex)}>
      <div className="BeatsCardTagContainer">
        {displayedTags}
      </div>
      <div className="BeatsCardContainerOverlay">
        <h4>{displayTitle}</h4>
      </div>
    </div>
  );
}

export { IPersonalBeatObject, IPersonalBeatProps, UIPersonalBeatCard }