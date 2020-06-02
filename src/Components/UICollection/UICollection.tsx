import * as React from 'react';
import { Component } from "react";

import './UICollection.css';

import redAddButton from "../../images/redAddButton.png";

enum UICollectionDirection {
  Vertical,
  Horizontal
}

/**
 * Some parameters are only available for vertical collections:
 * 1. onAdd callback: This triggers when the user taps on the add button
 */
interface ICollectionProps<RenderObject, RenderComponent> {
  title: string,
  data: [RenderObject],
  direction: UICollectionDirection,
  getRender: (object: RenderObject, indexKey: number, filterQuery?: string) => RenderComponent,
  onSearch: (filterQuery: string) => void,
  onAdd?: () => void,
  showAddButton?: boolean,
  filterQuery?: string
}

interface ICollectionState {
  filterQuery: string
}

class UICollection<RenderObject, RenderComponent> extends Component<ICollectionProps<RenderObject,RenderComponent>, ICollectionState> {
  constructor(props: ICollectionProps<RenderObject, RenderComponent>) {
    super(props)
    this.state = {
      filterQuery: props.filterQuery ?? ''
    }
  }

  handleFilterClick = (query: string) => {
    this.setState({filterQuery: query})
    this.props.onSearch(query)
  }

  render() {
    const listComponents = this.props.data.map((singleData, index) => {
      return this.props.getRender(singleData, index, this.state.filterQuery)
    })

    const searchButton = (
      <input 
        className="HomeHorizontalScrollSearchButton" 
        type="text" 
        placeholder="Search"
        name={`${this.props.title} search field`}
      ></input>
    )

    let collection: JSX.Element
    if(this.props.direction == UICollectionDirection.Horizontal) {
      collection = (
        <div className="HomeHorizontalScrollSection">
          <div className="HomeHorizontalScrollMenu">
            <h4 className="HomeHorizontalScrollMenuTitle">{this.props.title}</h4>
            {searchButton}
          </div>
          <hr></hr>
          <div className="HomeHorizontalScrollCardContainer">
            {listComponents}
            <h1 className="Spacer">some space</h1>
          </div>
        </div>
      )
    } else {
      collection = (
        <div className="StudioSectionBackground">
          <div className="StudioSectionHeading">
            <h4 className="HomeHorizontalScrollMenuTitle">
              {this.props.title}
            </h4>
            <img
              src={redAddButton}
              className="StudioButton StudioButtonMedium"
              onClick={() => {
                if(this.props.onAdd != null || this.props.onAdd != undefined) {
                  this.props.onAdd()
                }
              }}
            ></img>
          </div>
          {searchButton}
          {listComponents}
        </div>
      )
    }

    return collection
  }
}

export { UICollectionDirection, ICollectionProps, ICollectionState, UICollection }