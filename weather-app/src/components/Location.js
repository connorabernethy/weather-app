import React, { Component } from "react";
import { render } from "react-dom";

class Location extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      this.props.handleLocation(position.coords);
    });
  }

  render() {
    return (
      <div>
      </div>
    );
  }
}

export default Location;