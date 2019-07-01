import React, { Component } from "react";
import "./App.css";
import Gallery from "react-grid-gallery";
import { userService } from "./service";

/*home page */
class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isLoading: true,
      ACTIVITIES: []
    };
  }

  componentDidMount() {
    userService
      .getActivities()
      .then(data => this.setState({ ACTIVITIES: JSON.parse(data) }));
  }

  render() {
    const { ACTIVITIES } = this.state;
    return (
      <div>
        <h1>Today's Activities</h1>

        <Gallery images={ACTIVITIES} />
      </div>
    );
  }
}
export default App;
