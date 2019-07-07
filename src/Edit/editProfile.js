import React, { Component } from "react";
import "../App.css";
import { userService } from "../service";
import { ButtonToolbar, Button } from "react-bootstrap";

/*edit components */
class EditProfile extends React.Component {
  constructor(props, context) {
    super(props, context);
    const clientToEdit = JSON.parse(localStorage.getItem("client"));
    this.state = {
      isLoading: true,
      isEditProfile: false,
      healthProfile: {
        client_id: clientToEdit.client_id,
        advance_directives: clientToEdit.advance_directives,
        dietary_regimen: clientToEdit.dietary_regimen,
        is_activity_impediment: clientToEdit.is_activity_impediment,
        is_allergy: clientToEdit.is_allergy,
        is_health_condition: clientToEdit.is_health_condition,
        is_risk_and_safety_issue: clientToEdit.is_risk_and_safety_issue,
        name: clientToEdit.name
      }
    };
    this.editCancel = this.editCancel.bind(this);
    this.editProfile = this.editProfile.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({});
  }
  editCancel() {
    this.setState({
      isEditProfile: false
    });
  }
  editProfile() {
    this.setState({
      isEditProfile: true
    });
  }

  handleChange(event) {
    this.setState({
      healthProfile: {
        ...this.state.healthProfile,
        advance_directives: event.target.value,
        dietary_regimen: event.target.value
      }
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      isEditProfile: false
    });
    //userService.updateLanguage(this.state.basic.client_id, this.state.basic);
  }
  render() {
    const { healthProfile, isEditProfile } = this.state;
    return (
      <div>
        {!isEditProfile ? (
          <div>
            <p>
              <strong>Dietary Regimen:</strong> {healthProfile.dietary_regimen}{" "}
            </p>
            <p>
              <strong>Advanced Directives:</strong>{" "}
              {healthProfile.advance_directives}{" "}
            </p>
            <p>
              <strong>Active Diagnosis:</strong>{" "}
            </p>
            <div>
              {healthProfile.is_activity_impediment ? (
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
              {healthProfile.is_allergy ? (
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
              {healthProfile.is_risk_and_safety_issue ? (
                <div>>> {healthProfile.name}</div>
              ) : (
                <div />
              )}
            </div>
            <Button variant="secondary" onClick={this.editProfile}>
              Edit
            </Button>
          </div>
        ) : (
          <div>
            <p>
              <strong>Dietary Regimen:</strong>{" "}
              <select
                value={healthProfile.dietary_regimen}
                onChange={this.handleChange}
              >
                <option value="vegan">Vegan</option>
                <option value="vegan">Vegan</option>
                <option value="vegan">Vegan</option>
                <option value="vegan">Vegan</option>
              </select>
            </p>
            <p>
              <strong>Advance Directives:</strong>{" "}
              <select
                value={healthProfile.advance_directives}
                onChange={this.handleChange}
              >
                <option value="dnr">DNR</option>
                <option value="dnr">DNR</option>
                <option value="dnr">DNR</option>
                <option value="dnr">DNR</option>
              </select>
            </p>
            <p>
              <strong>Active Diagnosis:</strong>{" "}
            </p>
            <div>
              {healthProfile.is_activity_impediment ? (
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
              {healthProfile.is_allergy ? (
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
              {healthProfile.is_risk_and_safety_issue ? (
                <div>>> {healthProfile.name}</div>
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
        )}
      </div>
    );
  }
}

export default EditProfile;
