import * as React from 'react';
import * as CSS from 'csstype';

import './UICards.css';

import whiteAddButton from "../../images/whiteAddButton.png";

interface IStudioOptionObject {
  title: string,
  subtitle: string,
  showsAddButton: boolean,
  className?: string
}

interface IStudioOptionProps {
  objectIndex: number,
  object: IStudioOptionObject,
  onClick: (event: IStudioOptionObject, objectIndex?: number) => void
}

const UIStudioOptionCard: React.FC<IStudioOptionProps> = (props) => {
  const overrideClassName = props.object.className ?? ''
  const { title, subtitle } = props.object;

  const isShowingButton: CSS.Properties = {
    display: props.object.showsAddButton ? "none" : ""
  }

  return (
    <div
      key={title + subtitle + props.objectIndex}
      className="StudioSectionOptionBackground"
      onClick={() => props.onClick(props.object, props.objectIndex)}
    >
      <div>
        <h5 className="PublicBeatInfoLabel">{title}</h5>
        <h5 className="PublicBeatInfoDesc">{subtitle}</h5>
      </div>
      <img
        src={whiteAddButton}
        style={isShowingButton}
        className={`StudioButton StudioButtonSmall ${overrideClassName}`}
      ></img>
    </div>
  )
}

export { IStudioOptionObject, IStudioOptionProps, UIStudioOptionCard }