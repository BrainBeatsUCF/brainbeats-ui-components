import * as React from 'react';
import { Component } from "react";

import './UICollection.css';

enum UICollectionDirection {
  Vertical,
  Horizontal
}

interface ICollectionProps<RenderObject, RenderComponent> {
  title: string,
  data: [RenderObject],
  direction: UICollectionDirection,
  getRender: (object: RenderObject, indexKey: number, filterQuery?: string) => RenderComponent,
  onSearch: (filterQuery: string) => void,
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

    let collection: JSX.Element
    if(this.props.direction == UICollectionDirection.Horizontal) {
      collection = (
        <div className="HomeHorizontalScrollSection">
          <div className="HomeHorizontalScrollMenu">
            <h4 className="HomeHorizontalScrollMenuTitle">{this.props.title}</h4>
            <input 
              className="HomeHorizontalScrollSearchButton" 
              type="text" 
              placeholder="Search"
            ></input>
          </div>
          <hr></hr>
          <div className="HomeHorizontalScrollCardContainer">
            {listComponents}
            <h1 className="Spacer">some space</h1>
          </div>
        </div>
      )
    } else {
      collection = <div></div>
    }

    return collection
  }
}

export { UICollectionDirection, ICollectionProps, ICollectionState, UICollection }