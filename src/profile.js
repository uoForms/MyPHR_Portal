import React, { Component } from "react";
import "./App.css";
import { Col, Row, Nav, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { TabContainer, TabPane, TabContent } from "react-bootstrap";
import { userService } from "./service";
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
    const { p } = this.state;

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
                <BasicInfo />
              </TabPane>
              <TabPane eventKey="second">
                <EditProfile />
              </TabPane>
              <TabPane eventKey="third">
                <EditContact />
              </TabPane>
              <TabPane eventKey="fourth">
                <EditCaregivers />
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
