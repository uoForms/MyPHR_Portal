import React, { Component } from "react";
import "./App.css";
import { Col, Row, Nav, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  TabContainer,
  TabPane,
  TabContent,
  ButtonToolbar,
  Button
} from "react-bootstrap";
import { userService } from "./service";
import EditBasicInfo from "./Edit/editBasicInfo";
import BasicInfo from "./Edit/basicInfo";
import EditProfile from "./Edit/editProfile";
import EditContact from "./Edit/editContact";
import EditCaregivers from "./Edit/editCaregivers";

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
      act: [],
      isEditBasic: false,
      isEditProfile: false,
      isEditContact: false,
      isEditCaregivers: false
    };
    this.editBasic = this.editBasic.bind(this);
    this.editProfile = this.editProfile.bind(this);
    this.editContact = this.editContact.bind(this);
    this.editCaregivers = this.editCaregivers.bind(this);
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

  editBasic() {
    this.setState({
      isEditBasic: true
    });
  }
  editProfile() {
    this.setState({
      isEditProfile: true
    });
  }
  editContact() {
    this.setState({
      isEditContact: true
    });
  }
  editCaregivers() {
    this.setState({
      isEditCaregivers: true
    });
  }

  render() {
    const {
      user,
      client,
      address,
      c,
      healthProfile,
      p,
      isEditBasic,
      isEditProfile,
      isEditContact,
      isEditCaregivers
    } = this.state;

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
                <div>
                  {!isEditBasic ? (
                    <BasicInfo editBasic={this.editBasic} />
                  ) : (
                    <EditBasicInfo />
                  )}
                </div>
              </TabPane>
              <TabPane eventKey="second">
                <div>
                  {!isEditProfile ? (
                    <div>
                      <p>
                        <strong>Dietary Regimen:</strong>{" "}
                        {client.dietary_regimen}{" "}
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
                      <Button variant="secondary" onClick={this.editProfile}>
                        Edit
                      </Button>
                    </div>
                  ) : (
                    <EditProfile />
                  )}
                </div>
              </TabPane>
              <TabPane eventKey="third">
                <div>
                  {!isEditContact ? (
                    <div>
                      <p>
                        <strong>Home Address:</strong> {address.street_number},{" "}
                        {address.city}, {address.country}, {address.postal_code}
                      </p>
                      <p>
                        <strong>Mailing Address:</strong>{" "}
                        {address.street_number}, {address.city},{" "}
                        {address.country}, {address.postal_code}
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

                      <Button variant="secondary" onClick={this.editContact}>
                        Edit
                      </Button>
                    </div>
                  ) : (
                    <EditContact />
                  )}
                </div>
              </TabPane>
              <TabPane eventKey="fourth">
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
                              <strong> Home Address:</strong> {c.street_name},{" "}
                              {c.city}, {c.country}, {c.postal_code}
                            </li>

                            <li>
                              <strong> Mailing Address:</strong>{" "}
                              {c.mailingAddress}
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
                    <EditCaregivers />
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
