import React, {MouseEvent} from 'react';
import {SketchPicker} from 'react-color';

import "./App.scss";

class App extends React.Component<any,any> {
  constructor(props:any) {
    super(props);

    this.state = {
      color: {
        r: 100,
        g: 100,
        b: 100,
        a: 1
      },
      effect: ""
    }

    this.handleColorChange = this.handleColorChange.bind(this);
    this.handleSetColor = this.handleSetColor.bind(this);
  }

  handleColorChange(newColor: any) {
    this.setState({color: newColor.rgb});
  }

  handleSetColor(event: MouseEvent) {

  }

  render(): React.ReactNode {
    return (
      <div className='main'>
        <h1>Choose a color</h1>
        <SketchPicker color={this.state.color} onChange={this.handleColorChange} />
        <button className='button' type='button' onClick={this.handleSetColor}>Set Color</button>
        <h1>Chose an effect</h1>
        <div className="fade" style={{backgroundColor: `rgba(${this.state.color.r},${this.state.color.g},${this.state.color.b},${this.state.color.a})`}}></div>
        <div className="pulse" style={{backgroundColor: `rgba(${this.state.color.r},${this.state.color.g},${this.state.color.b},${this.state.color.a})`}}></div>
        <div className="rainbow"></div>
      </div>
    )
  }
}

export default App;
