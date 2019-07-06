import React, { Component } from "react";
import "../App.css";
import { userService } from "../service";
import { ButtonToolbar, Button } from "react-bootstrap";

/*edit components */
class EditProfile extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isLoading: true,
      client: {},
      isEditProfile: true
    };
    this.editCancel = this.editCancel.bind(this);
  }

  componentDidMount() {
    this.setState({
      client: JSON.parse(localStorage.getItem("client"))
    });
  }
  editCancel() {
    this.setState({
      isEditProfile: false
    });
  }

  render() {
    const { client } = this.state;
    return (
      <div>
        <p>
          <strong>Dietary Regimen:</strong>{" "}
          <select>
            <option value="vegan">Vegan</option>
          </select>
        </p>
        <p>
          <strong>Advance Directives:</strong>{" "}
          <select>
            <option value="dnr">DNR</option>
          </select>
        </p>
        <p>
          <strong>Active Diagnosis:</strong>{" "}
        </p>
        <div>
          {client.is_activity_impediment ? (
            <div>
              <div> >></div>
              <ul>
                <li> diagnosed on:</li>
                <li> diagnosed by: </li>
              </ul>
            </div>
          ) : (
            <div />
          )}
        </div>

        <p>
          <strong>Allergies:</strong>{" "}
        </p>

        <div>
          {client.is_allergy ? (
            <div>
              <li> >> </li>
            </div>
          ) : (
            <div />
          )}
        </div>

        <p>
          <strong>Risk and Safety Codes:</strong>{" "}
        </p>
        <div>
          {client.is_risk_and_safety_issue ? (
            <div>>> {client.name}</div>
          ) : (
            <div />
          )}
        </div>
        <ButtonToolbar>
          <Button variant="secondary">Save</Button>
          <Button variant="secondary" onClick={this.editCancel}>
            Cancel
          </Button>
        </ButtonToolbar>
      </div>
    );
  }
}

export default EditProfile;
