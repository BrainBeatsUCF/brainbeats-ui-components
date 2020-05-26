import * as React from "react";
import { Component } from 'react';

enum ButtonType {
  Important = "important",
  Optional = "optional",
  Irrelevant = "irrelevant"
}

interface IButtonProps {
  text: string,
  type: ButtonType,
  action: (selected: boolean) => void
}

interface ButtonState {
  selected: boolean
}

class SelectableButton extends Component<IButtonProps, ButtonState> {
  constructor(props: IButtonProps) {
    super(props)
    this.state = {
      selected: false
    }
  }

  handleChange = () => {
    let { selected } = this.state
    selected = !selected
    this.setState({selected: selected})
    this.props.action(selected)
  }

  render() {
    return (
      <button
        onClick = {() => this.handleChange()}
      >{this.props.text}</button>
    )
  }
}

export { SelectableButton, ButtonType }