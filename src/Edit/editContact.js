import React, { Component } from "react";
import "../App.css";
import { userService } from "../service";
import { ButtonToolbar, Button, Form, InputGroup, Col } from "react-bootstrap";
import AddressForm from "../autoAddress/AddressForm";
import AddressSuggest from "../autoAddress/AddressSuggest";
import AddressInput from "../autoAddress/AddressInput";
import axios from "axios";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { Field, formInputData, formValidation } from "reactjs-input-validator";

const APP_ID_HERE = "Fz8mRRSVvIpzxV6B1qa1";
const APP_CODE_HERE = "miB6oUEV_kPBGp7CQTQTAg";

/*edit components
 *auto complete addresses
 *phone number and email validators

 validate all forms when clicking save (before save)
 */
class EditContact extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = this.getInitialState();
    this.editCancel = this.editCancel.bind(this);
    // User has entered something in the address bar
    this.onQuery = this.onQuery.bind(this);
    // User has entered something in an address field
    this.onAddressChange = this.onAddressChange.bind(this);
    // User has clicked the save button
    this.onCheck = this.onCheck.bind(this);
    // User has clicked the clear button
    this.onClear = this.onClear.bind(this);
    this.handleChange = this.handleChange.bind(this);
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

  handleSubmit(event) {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.setState({ validated: true });
  }
  onQuery(evt) {
    const query = evt.target.value;

    if (!query.length > 0) {
      this.setState(this.getInitialState());
      return;
    }

    const self = this;
    axios
      .get("https://autocomplete.geocoder.api.here.com/6.2/suggest.json", {
        params: {
          app_id: APP_ID_HERE,
          app_code: APP_CODE_HERE,
          query: query,
          maxresults: 1
        }
      })
      .then(function(response) {
        if (response.data.suggestions.length > 0) {
          const id = response.data.suggestions[0].locationId;
          const address = response.data.suggestions[0].address;
          self.setState({
            address: address,
            query: query,
            locationId: id
          });
        } else {
          const state = self.getInitialState();
          self.setState(state);
        }
      });
  }

  getInitialState() {
    return {
      address: {
        street_number: "",
        city: "",
        state: "",
        postal_code: "",
        country: ""
      },
      isLoading: true,
      client: {},
      address: {},
      isEditContact: true,
      validated: false,
      query: "",
      locationId: "",
      isChecked: false,
      coords: {},
      data: {}
    };
  }

  onClear(evt) {
    const state = this.getInitialState();
    this.setState(state);
  }

  onAddressChange(evt) {
    const id = evt.target.id;
    const val = evt.target.value;

    let state = this.state;
    state.address[id] = val;
    this.setState(state);
  }
  handleChange(event, inputValue, inputName, validationState, isRequired) {
    const value = (event && event.target.value) || inputValue;
    const { data } = this.state;
    data[inputName] = { value, validation: validationState, isRequired };
    this.setState({
      data
    });
    // if you want access to your form data
    const formData = formInputData(this.state.data); // eslint-disable-line no-unused-vars
    // tells you if the entire form validation is true or false
    const isFormValid = formValidation(this.state.data); // eslint-disable-line no-unused-vars
  }
  //when validation
  onCheck(event) {
    let params = {
      app_id: APP_ID_HERE,
      app_code: APP_CODE_HERE
    };

    if (this.state.locationId.length > 0) {
      params["locationId"] = this.state.locationId;
    } else {
      params["searchtext"] =
        this.state.address.street_number +
        this.state.address.city +
        this.state.address.state +
        this.state.address.postal_code +
        this.state.address.country;
    }

    const self = this;
    axios
      .get("https://geocoder.api.here.com/6.2/geocode.json", { params: params })
      .then(function(response) {
        const view = response.data.Response.View;
        if (view.length > 0 && view[0].Result.length > 0) {
          const location = view[0].Result[0].Location;

          self.setState({
            isChecked: "true",
            locationId: "",
            query: location.Address.Label,
            address: {
              street:
                location.Address.HouseNumber + " " + location.Address.Street,
              city: location.Address.City,
              state: location.Address.State,
              postalCode: location.Address.PostalCode,
              country: location.Address.Country
            },
            coords: {
              lat: location.DisplayPosition.Latitude,
              lon: location.DisplayPosition.Longitude
            }
          });
        } else {
          self.setState({
            isChecked: true,
            coords: null
          });
        }
      })
      .catch(function(error) {
        console.log("caught failed query");
        self.setState({
          isChecked: true,
          coords: null
        });
      });

    //validate email form
    event.preventDefault();
    const isFormValid = formValidation(this.state.data);

    if (isFormValid) {
      // do anything including ajax calls
      this.setState({ callAPI: true });
    } else {
      this.setState({ callAPI: true, shouldValidateInputs: !isFormValid });
    }

    if (this.state.isChecked & !this.state.coords & isFormValid) {
      alert("saved!");
    }
  }

  alert() {
    if (!this.state.isChecked) {
      return;
    }

    if (this.state.coords === null) {
      return (
        <div className="" role="alert">
          <b>Invalid.</b> The address is not recognized.
        </div>
      );
    } else {
      return (
        <div className="" role="alert">
          <b>Valid Address.</b>
        </div>
      );
    }
  }
  render() {
    let result = this.alert();
    const { client, address, validated } = this.state;
    return (
      <div>
        <p>
          <strong>Home Address:</strong>
          <AddressSuggest query={this.state.query} onChange={this.onQuery} />
          <input placeholder="street" value={this.state.query} />,{" "}
          <input placeholder="city" value={address.city} />
          , <input placeholder="country" value={address.country} />,{" "}
          <input placeholder="postal code" value={address.postalCode} />
          {/**

          <AddressInput
            street={this.state.address.street}
            city={this.state.address.city}
            state={this.state.address.state}
            postalCode={this.state.address.postalCode}
            country={this.state.address.country}
            onChange={this.onAddressChange}
          />
 */}
          <br />
          {result}
        </p>

        <p>
          <strong>Mailing Address:</strong>{" "}
          <input placeholder="street" value={address.street_number} />,{" "}
          <input placeholder="city" value={address.city} />
          , <input placeholder="country" value={address.country} />,{" "}
          <input placeholder="postal code" value={address.postal_code} />
        </p>
        <p>
          <strong>Other Address:</strong> <input placeholder="street number" />,{" "}
          <input placeholder="city" />
          , <input placeholder="country" />, <input placeholder="postal code" />
        </p>
        <p>
          <strong>Cell Phone:</strong>{" "}
          <PhoneInput
            placeholder="Enter phone number"
            value={this.state.phone}
            onChange={phone => this.setState({ phone })}
            required
          />
        </p>
        <p>
          <strong>Home Phone:</strong>{" "}
          <input placeholder="(000)-000-0000" value={address.home_phone} />
        </p>
        <p>
          <strong>Email:</strong>{" "}
          <Field
            validator="isEmail"
            required
            name="email"
            placeholder="Email"
            onChange={this.handleChange}
            value={this.state.data.email}
            shouldValidateInputs={this.state.shouldValidateInputs}
          />
        </p>
        <ButtonToolbar>
          <Button variant="secondary" onClick={this.onCheck}>
            Save
          </Button>
          <Button variant="secondary">Cancel</Button>
        </ButtonToolbar>
      </div>
    );
  }
}

export default EditContact;
