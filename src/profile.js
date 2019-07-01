import React, { Component } from "react";
import "./App.css";
import { Col, Row, Nav, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { TabContainer, TabPane, TabContent } from "react-bootstrap";
import { userService } from "./service";

class Profile extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      user: {},
      address: {},
      c: {},
      caregiver: {},
      isLoading: true,
      healthProfile: [],
      client: {},
      p: [],
      act: []
    };
  }

  componentDidMount() {
    this.setState({
      user: JSON.parse(localStorage.getItem("user")),
      client: JSON.parse(localStorage.getItem("client"))
    });

    //mock api calls
    /*
    userService
      .getAddress(JSON.parse(localStorage.getItem("user")).id)
      .then(data => this.setState({ address: JSON.parse(data) }));
     
*/

    userService
      .getCaregivers(JSON.parse(localStorage.getItem("user")).id)
      .then(data => this.setState({ c: JSON.parse(data) }));

    userService
      .getAddress(JSON.parse(localStorage.getItem("user")).id)
      .then(data => this.setState({ address: JSON.parse(data) }));

    userService
      .getPhysicians(JSON.parse(localStorage.getItem("user")).id)
      .then(data => this.setState({ p: JSON.parse(data) }));

    //real api calls
    userService
      .getHealthProfile(
        JSON.parse(localStorage.getItem("user")).client_id,
        JSON.parse(localStorage.getItem("user")).token
      )
      .then(data => this.setState({ healthProfile: data }));

    console.log("xxx" + localStorage.getItem("user"));
    console.log("rrr" + localStorage.getItem("address"));

    console.log("ppp" + localStorage.getItem("physicians"));

    //user from real api
    console.log("oneUser:" + localStorage.getItem("oneUser"));
    console.log(localStorage.getItem("client"));
  }

  render() {
    const { user, client, address, c, healthProfile, p } = this.state;

    return (
      <TabContainer id="left-tabs-example" defaultActiveKey="first">
        <Row>
          <Col sm={3}>
            <Nav className="flex-column">
              <Nav.Item>
                <Nav.Link
                  class="nav-item"
                  style={{
                    color: "black",
                    paddingTop: "50px",
                    paddingBottom: "50px"
                  }}
                  eventKey="first"
                >
                  Basic Info
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  class="nav-item"
                  style={{
                    color: "black",
                    paddingTop: "50px",
                    paddingBottom: "50px"
                  }}
                  eventKey="second"
                >
                  Health Profile
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  class="nav-item"
                  style={{
                    color: "black",
                    paddingTop: "50px",
                    paddingBottom: "50px"
                  }}
                  eventKey="third"
                >
                  Contact Info
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  class="nav-item"
                  style={{
                    color: "black",
                    paddingTop: "50px",
                    paddingBottom: "50px"
                  }}
                  eventKey="fourth"
                >
                  Caregivers
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  class="nav-item"
                  style={{
                    color: "black",
                    paddingTop: "50px",
                    paddingBottom: "50px"
                  }}
                  eventKey="fifth"
                >
                  Physicians
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <TabContent class="tab-content">
              <TabPane eventKey="first">
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
              </TabPane>
              <TabPane eventKey="second">
                <p>
                  <strong>Dietary Regimen:</strong> {client.dietary_regimen}{" "}
                </p>
                <p>
                  <strong>Advanced Directives:</strong>{" "}
                  {client.advance_directives}{" "}
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
              </TabPane>
              <TabPane eventKey="third">
                <p>
                  <strong>Home Address:</strong> {address.street_number},{" "}
                  {address.city}, {address.country}, {address.postal_code}
                </p>
                <p>
                  <strong>Mailing Address:</strong> {address.street_number},{" "}
                  {address.city}, {address.country}, {address.postal_code}
                </p>
                <p>
                  <strong>Other Address:</strong>{" "}
                </p>
                <p>
                  <strong>Cell Phone:</strong> {address.cell_phone}
                </p>
                <p>
                  <strong>Home Phone:</strong> {address.home_phone}
                </p>
                <p>
                  <strong>Email:</strong> {address.email}
                </p>
              </TabPane>
              <TabPane eventKey="fourth">
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
                          <strong> Home Address:</strong> {c.street_name},{" "}
                          {c.city}, {c.country}, {c.postal_code}
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
                </div>
              </TabPane>
              <TabPane eventKey="fifth">
                <p>
                  <strong>Family Physicians:</strong>{" "}
                </p>
                <div>
                  {p.map(p => (
                    <div>
                      <ul>
                        <li>
                          <strong> Name:</strong> {p.p_name}{" "}
                        </li>
                        <li>
                          <strong> Address:</strong> {p.p_street_name},{" "}
                          {p.p_city}, {p.p_country}, {p.p_postal_code}{" "}
                        </li>
                        <li>
                          <strong> Phone:</strong> {p.p_phone}{" "}
                        </li>
                      </ul>
                      <p>
                        <strong>Neurologist:</strong>{" "}
                      </p>
                      <ul>
                        <li>
                          <strong> Name:</strong> {p.n_name}{" "}
                        </li>
                        <li>
                          <strong> Address:</strong> {p.n_street_name},{" "}
                          {p.n_city}, {p.n_country}, {p.n_postal_code}{" "}
                        </li>
                        <li>
                          <strong> Phone:</strong> {p.n_phone}{" "}
                        </li>
                      </ul>
                    </div>
                  ))}
                </div>
              </TabPane>
            </TabContent>
          </Col>
        </Row>
      </TabContainer>
    );
  }
}

export default Profile;
