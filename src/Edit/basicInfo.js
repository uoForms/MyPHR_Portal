import React, { Component } from "react";
import "../App.css";
import { userService } from "../service";
import { ButtonToolbar, Button } from "react-bootstrap";

/* components */
class BasicInfo extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      isLoading: true,
      client: {},
      isEditBasic: false
    };
  }

  componentDidMount() {
    this.setState({
      client: JSON.parse(localStorage.getItem("client"))
    });
    this.editBasic = this.editBasic.bind(this);
  }
  editBasic() {
    this.setState({
      isEditBasic: true
    });
  }
  render() {
    const { client } = this.state;
    return (
      <div>
        <p>
          <strong>
            {client.firstname} {client.surname}
          </strong>
        </p>
        <p>
          <strong>Date of Birth:</strong> {client.dob}
        </p>
        <p>
          <strong>Gender:</strong> {client.gender}
        </p>
        <p>
          <strong>Service Language:</strong> {client.service_language}
        </p>
        <p>
          <strong>Last Access:</strong> {client.last_access}
        </p>

        <Button variant="secondary" onClick={this.editBasic}>
          Edit
        </Button>
      </div>
    );
  }
}

export default BasicInfo;
