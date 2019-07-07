import React, { Component } from "react";
import "../App.css";
import { userService } from "../service";
import { ButtonToolbar, Button } from "react-bootstrap";
import AddContact from "./addContact";

/*edit components */
class EditCaregivers extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isLoading: true,
      client: {},
      c: {},
      isEditCaregivers: false,
      isAddContact: false
    };
    this.editCancel = this.editCancel.bind(this);
    this.editCaregivers = this.editCaregivers.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addContact = this.addContact.bind(this);
  }

  componentDidMount() {
    this.setState({
      client: JSON.parse(localStorage.getItem("client")),
      c: JSON.parse(localStorage.getItem("caregiver"))
    });
  }
  editCancel() {
    this.setState({
      isEditCaregivers: false
    });
  }
  editCaregivers() {
    this.setState({
      isEditCaregivers: true
    });
  }
  addContact() {
    this.setState({
      isAddContact: true
    });
    if (this.state.isAddContact) {
      return <AddContact />;
    }
  }

  handleChange(event) {
    this.setState({});
  }
  handleSubmit(event) {}
  render() {
    const { c, isEditCaregivers } = this.state;
    return (
      <div>
        {!isEditCaregivers ? (
          <div>
            {c.is_primary_caregiver ? (
              <div>
                <p>
                  <strong>Primary Contact:</strong>{" "}
                </p>
                <ul>
                  <li>
                    {" "}
                    <strong>Name:</strong> {c.firstname} {c.surname}
                  </li>
                  <li>
                    <strong> Relationship:</strong> {c.relationship}
                  </li>
                  <li>
                    <strong> Home Address:</strong> {c.street_name}, {c.city},{" "}
                    {c.country}, {c.postal_code}
                  </li>

                  <li>
                    <strong> Mailing Address:</strong> {c.mailingAddress}
                  </li>
                  <li>
                    <strong> Cell Phone:</strong> {c.cell_phone}
                  </li>
                  <li>
                    <strong> Home Phone:</strong> {c.home_phone}
                  </li>
                  <li>
                    <strong> Email:</strong> {c.email}
                  </li>
                </ul>
              </div>
            ) : (
              <div>
                <p>
                  <strong>Second Contact:</strong>{" "}
                </p>
                <ul>
                  <li>
                    <strong> Name:</strong> {c.firstname} {c.surname}
                  </li>
                  <li>
                    <strong> Relationship:</strong>
                    {c.relationship}{" "}
                  </li>
                  <li>
                    <strong> Home Address:</strong>{" "}
                  </li>
                  <li>
                    <strong> Mailing Address:</strong>{" "}
                  </li>
                  <li>
                    <strong> Cell Phone:</strong>{" "}
                  </li>
                  <li>
                    <strong> Home Phone:</strong>{" "}
                  </li>
                  <li>
                    <strong> Email:</strong>{" "}
                  </li>
                </ul>
              </div>
            )}
            <Button variant="secondary" onClick={this.editCaregivers}>
              Edit
            </Button>
          </div>
        ) : (
          <div>
            <div>
              <p>
                <strong>Primary Contact:</strong>{" "}
              </p>
              <ul>
                <li>
                  {" "}
                  <strong>Name:</strong>{" "}
                  <input placeholder="firstname" value={c.firstname} />{" "}
                  <input placeholder="surname" value={c.surname} />
                </li>
                <li>
                  <strong> Relationship:</strong>{" "}
                  <select>
                    <option value="father">father</option>
                    <option value="mother">mother</option>
                  </select>
                </li>
                <li>
                  <strong> Home Address:</strong>{" "}
                  <input placeholder="street number" value={c.street_name} />,{" "}
                  <input placeholder="city" value={c.city} />
                  , <input placeholder="country" value={c.country} />,{" "}
                  <input placeholder="postal code" value={c.postal_code} />
                </li>

                <li>
                  <strong> Mailing Address:</strong>{" "}
                  <input placeholder="street number" />,{" "}
                  <input placeholder="city" />
                  , <input placeholder="country" />,{" "}
                  <input placeholder="postal code" />
                </li>
                <li>
                  <strong> Cell Phone:</strong>{" "}
                  <input placeholder="(000)-000-0000" value={c.cell_phone} />
                </li>
                <li>
                  <strong> Home Phone:</strong>{" "}
                  <input placeholder="(000)-000-0000" value={c.home_phone} />
                </li>
                <li>
                  <strong> Email:</strong>{" "}
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={c.email}
                  />
                </li>
              </ul>
            </div>
            <ButtonToolbar>
              <Button variant="secondary" onClick={this.addContact}>
                Add
              </Button>
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

export default EditCaregivers;
