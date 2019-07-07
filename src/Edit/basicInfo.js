import React, { Component } from "react";
import "../App.css";
import { userService } from "../service";
import { ButtonToolbar, Button } from "react-bootstrap";

/* components */
class BasicInfo extends React.Component {
  constructor(props, context) {
    super(props, context);
    const clientToEdit = JSON.parse(localStorage.getItem("client"));
    this.state = {
      basic: {
        client_id: clientToEdit.client_id,
        firstname: clientToEdit.firstname,
        surname: clientToEdit.surname,
        dob: clientToEdit.dob,
        gender: clientToEdit.gender,
        last_access: clientToEdit.last_access,
        service_language: clientToEdit.service_language
      },
      isEditBasic: false, ///remove from state
      language: clientToEdit.service_language
    };
    this.editCancel = this.editCancel.bind(this);
    this.editBasic = this.editBasic.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({
      //client: JSON.parse(localStorage.getItem("client")),
      //language: JSON.parse(localStorage.getItem("client")).service_language
    });
  }
  editBasic() {
    this.setState({
      isEditBasic: true
    });
  }
  editCancel() {
    this.setState({
      isEditBasic: false,
      basic: {
        ...this.state.basic,
        service_language: this.state.language
      }
    });
  }
  handleChange(event) {
    this.setState({
      basic: {
        ...this.state.basic,
        service_language: event.target.value
      }
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      isEditBasic: false
    });
    userService.updateLanguage(this.state.basic.client_id, this.state.basic);
  }
  render() {
    const {
      firstname,
      surname,
      dob,
      gender,
      last_access,
      service_language
    } = this.state.basic;
    return (
      <div>
        {!this.state.isEditBasic ? (
          <div>
            <p>
              <strong>
                {firstname} {surname}
              </strong>
            </p>
            <p>
              <strong>Date of Birth:</strong> {dob}
            </p>
            <p>
              <strong>Gender:</strong> {gender}
            </p>
            <p>
              <strong>Service Language:</strong> {service_language}
            </p>
            <p>
              <strong>Last Access:</strong> {last_access}
            </p>

            <Button variant="secondary" onClick={this.editBasic}>
              Edit
            </Button>
          </div>
        ) : (
          <div>
            <p>
              <strong>
                {firstname} {surname}
              </strong>
            </p>
            <p>
              <strong>Date of Birth:</strong> {dob}
            </p>
            <p>
              <strong>Gender:</strong> {gender}
            </p>
            <p>
              <strong>Service Language:</strong>{" "}
              <select
                value={this.state.basic.service_language}
                onChange={this.handleChange}
              >
                <option value="English">English</option>
                <option value="French">French</option>
              </select>
            </p>
            <p>
              <strong>Last Access:</strong> {last_access}
            </p>
            <ButtonToolbar>
              <Button variant="secondary" onClick={this.handleSubmit}>
                Save
              </Button>
              <Button variant="secondary" onClick={this.editCancel}>
                Cancel
              </Button>
            </ButtonToolbar>
          </div>
        )}
      </div>
    );
  }
}

export default BasicInfo;
