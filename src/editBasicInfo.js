import React, { Component } from "react";
import "./App.css";
import { userService } from "./service";
import { ButtonToolbar, Button } from "react-bootstrap";

/*edit components */
class EditBasicInfo extends React.Component {
  constructor(props, context) {
    super(props, context);
    const test = JSON.parse(localStorage.getItem("client"));
    this.state = {
      isLoading: true,
      client: {},
      isEdit: true,
      language: {},
      l: test.service_language
    };
    this.editCancel = this.editCancel.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({
      client: JSON.parse(localStorage.getItem("client")),
      language: JSON.parse(localStorage.getItem("client")).service_language
    });
  }
  editCancel() {
    this.setState({
      isEdit: false
    });
  }

  handleChange(event) {
    this.setState({ l: event.target.value });
  }

  handleSubmit(event) {
    alert("Your favorite flavor is: " + this.state.l);
    userService.updateClient(this.state.client.client_id, this.test);
    event.preventDefault();
  }

  render() {
    const { client, language, l } = this.state;
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
          <strong>Service Language:</strong>{" "}
          <select value={l} onChange={this.handleChange}>
            <option value="English">English</option>
            <option value="French">French</option>
          </select>
        </p>
        <p>
          <strong>Last Access:</strong> {client.last_access}
        </p>
        <ButtonToolbar>
          <Button variant="secondary" onClick={this.handleSubmit}>
            Save
          </Button>
          <Button variant="secondary">Cancel</Button>
        </ButtonToolbar>
      </div>
    );
  }
}

export default EditBasicInfo;
