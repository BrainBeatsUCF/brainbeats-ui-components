import * as React from 'react';
import { Component } from 'react';

import './UIButton.css';

enum UIMenuButtonType {
  Blue = "blue",
  Red = "red"
}

interface IMenuButtonProps {
  title: string,
  image: string,
  imageAlt: string,
  imageHeight: number,
  imageWidth: number,
  buttonType: UIMenuButtonType,
  onClick: () => void,
  className?: string,
  initAsActive?: boolean
}

class UIMenuButton extends Component<IMenuButtonProps, {}> {
  constructor(props: IMenuButtonProps) {
    super(props)
  }

  render() {
    let overrideClassName = this.props.className ?? ''
    let isActive = this.props.initAsActive ?? false
    return (
      <div
        className={
          `
          NavigationInput 
          ${isActive ? "NavigationInputActive" : ""} 
          ${this.props.buttonType == UIMenuButtonType.Red ? "NavigationLogoutInput" : ""} 
          ${overrideClassName}
          `
        }
        onClick={() => this.props.onClick()}
      >
        <label>{this.props.title}</label>
        <img src={this.props.image} alt={this.props.imageAlt} height={this.props.imageHeight} width={this.props.imageWidth}></img>
      </div>
    )
  }
}

export { UIMenuButton, IMenuButtonProps, UIMenuButtonType }