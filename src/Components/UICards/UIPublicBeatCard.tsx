import * as React from 'react';
import * as CSS from 'csstype';

import playButton from './../../images/playButton.png';
import pauseButton from './../../images/pauseButton.png';

import './UICards.css';

interface IPublicBeatObject {
  ownerProfileImage: string,
  displayImage: string,
  displayTitle: string,
  displayOwner: string,

  audioSource: string,
  sampleCount: number,
  playTime: string

  className?: string
}

interface IPublicBeatProps {
  isPlaying: boolean,
  objectIndex: number,
  object: IPublicBeatObject,
  onClick: (event: IPublicBeatObject, objectIndex?: number) => void
}

const UIPublicBeatCard: React.FC<IPublicBeatProps> = (props) => {
  const { ownerProfileImage, displayImage, displayTitle, displayOwner } = props.object
  const { sampleCount, playTime } = props.object
  const overrideClassName = props.object.className ?? ''

  const style: CSS.Properties = {
    backgroundImage: `url(${displayImage})`
  }

  return (
    <div key={displayTitle + props.objectIndex} className={`PublicBeatsContainer ${overrideClassName}`} style={style}>
      <div className="PublicBeatsContentOverlay"></div>
      <div className="PublicBeatsContent">
        <img className="PublicBeatsOwnerImage" src={ownerProfileImage} height="60px" width="60px"></img>
        <div className="PublicBeatInfo">
          <h5 className="PublicBeatInfoLabel">{displayTitle}</h5>
          <div className="PublicBeatInfoContent">
            <img 
              className="PublicBeatActionButton" onClick={() => props.onClick(props.object, props.objectIndex)}
              src={props.isPlaying ? pauseButton: playButton} 
              height="30px" width="30px"
            ></img>
            <div className="PublicBeatPlayInfo">
              <h5 className="PublicBeatInfoDesc">{displayOwner}</h5>
              <h5 className="PublicBeatInfoDesc">{`${sampleCount} samples, ${playTime}`}</h5>
            </div>
          </div>
          <div className="PublicBeatVerticalSpacer"></div>
        </div>
      </div>
    </div>
  );
}

export { IPublicBeatObject, IPublicBeatProps, UIPublicBeatCard }