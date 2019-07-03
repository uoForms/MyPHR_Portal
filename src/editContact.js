import React, { Component } from "react";
import "./App.css";
import { userService } from "./service";
import { ButtonToolbar, Button } from "react-bootstrap";

/*edit components */
class EditContact extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isLoading: true,
      client: {},
      address: {},
      isEditContact: true
    };
    this.editCancel = this.editCancel.bind(this);
  }

  componentDidMount() {
    this.setState({
      client: JSON.parse(localStorage.getItem("client")),
      address: JSON.parse(localStorage.getItem("address"))
    });
  }
  editCancel() {
    this.setState({
      isEditContact: false
    });
  }

  render() {
    const { client, address } = this.state;
    return (
      <div>
        <p>
          <strong>Home Address:</strong> <input placeholder="street number" />,{" "}
          <input placeholder="city" />
          , <input placeholder="country" />, <input placeholder="postal code" />
        </p>
        <p>
          <strong>Mailing Address:</strong>{" "}
          <input placeholder="street number" />, <input placeholder="city" />
          , <input placeholder="country" />, <input placeholder="postal code" />
        </p>
        <p>
          <strong>Other Address:</strong> <input placeholder="street number" />,{" "}
          <input placeholder="city" />
          , <input placeholder="country" />, <input placeholder="postal code" />
        </p>
        <p>
          <strong>Cell Phone:</strong> <input placeholder="(000)-000-0000" />
        </p>
        <p>
          <strong>Home Phone:</strong> <input placeholder="(000)-000-0000" />
        </p>
        <p>
          <strong>Email:</strong>{" "}
          <input type="email" placeholder="name@example.com" />
        </p>
        <ButtonToolbar>
          <Button variant="secondary">Save</Button>
          <Button variant="secondary">Cancel</Button>
        </ButtonToolbar>
      </div>
    );
  }
}

export default EditContact;
