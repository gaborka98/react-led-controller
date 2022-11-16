import React, {MouseEvent} from 'react';
import {SketchPicker} from 'react-color';
import mqtt, { MqttClient } from "mqtt/dist/mqtt";

import "./App.scss";

class App extends React.Component<any,any> {
  private mqttClient:MqttClient;
  constructor(props:any) {
    super(props);

    this.mqttClient = mqtt.connect('ws://192.168.2.55:9001');

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
    this.handleSetEffect = this.handleSetEffect.bind(this);
  }

  handleColorChange(newColor: any) {
    this.setState({color: newColor.rgb});
  }

  handleSetColor() {
    this.mqttClient.publish('led/color', `${this.state.color.r},${this.state.color.g},${this.state.color.b},${this.state.color.a}`);
  }

  handleSetEffect(event: MouseEvent) {
    let button : HTMLButtonElement = event.currentTarget as HTMLButtonElement;
    this.mqttClient.publish('led/effect', button.className);
  }

  render(): React.ReactNode {
    return (
      <div className='main'>
        <h1>Choose a color</h1>
        <SketchPicker color={this.state.color} onChange={this.handleColorChange} />
        <button className='button' type='button' onClick={this.handleSetColor}>Set Color</button>
        <h1>Chose an effect</h1>
        <div className="simple" onClick={this.handleSetEffect} style={{backgroundColor: `rgba(${this.state.color.r},${this.state.color.g},${this.state.color.b},${this.state.color.a})`}}></div>
        <div style={{width:"150px"}}>
          <div className="fade" onClick={this.handleSetEffect} style={{backgroundColor: `rgba(${this.state.color.r},${this.state.color.g},${this.state.color.b},${this.state.color.a})`}}></div>
        </div>
        <div className="pulse" onClick={this.handleSetEffect} style={{backgroundColor: `rgba(${this.state.color.r},${this.state.color.g},${this.state.color.b},${this.state.color.a})`}}></div>
        <div className="rainbow" onClick={this.handleSetEffect}></div>
      </div>

    )
  }
}

export default App;
