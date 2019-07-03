import React, { Component } from "react";
import "./App.css";
import { userService } from "./service";
import { ButtonToolbar, Button } from "react-bootstrap";

/*edit components */
class EditCaregivers extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isLoading: true,
      client: {},
      c: {},
      isEditCaregivers: true
    };
    this.editCancel = this.editCancel.bind(this);
  }

  componentDidMount() {
    this.setState({
      client: JSON.parse(localStorage.getItem("client")),
      c: JSON.parse(localStorage.getItem("caregiver"))
    });
  }
  editCancel() {
    this.setState({
      isEditContact: false
    });
  }

  render() {
    const { client, c } = this.state;
    return (
      <div>
        <div>
          <p>
            <strong>Primary Contact:</strong>{" "}
          </p>
          <ul>
            <li>
              {" "}
              <strong>Name:</strong> <input placeholder="firstname" />{" "}
              <input placeholder="surname" />
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
              <input placeholder="street number" />,{" "}
              <input placeholder="city" />
              , <input placeholder="country" />,{" "}
              <input placeholder="postal code" />
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
              <input placeholder="(000)-000-0000" />
            </li>
            <li>
              <strong> Home Phone:</strong>{" "}
              <input placeholder="(000)-000-0000" />
            </li>
            <li>
              <strong> Email:</strong>{" "}
              <input type="email" placeholder="name@example.com" />
            </li>
          </ul>
        </div>
        <ButtonToolbar>
          <Button variant="secondary">Add</Button>
          <Button variant="secondary">Save</Button>
          <Button variant="secondary">Cancel</Button>
        </ButtonToolbar>
      </div>
    );
  }
}

export default EditCaregivers;