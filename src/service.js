import config from "config";
import { authHeader } from "./backend";

export const userService = {
  login,
  logout,
  getClient,
  getAll,
  getAddress,
  getCaregivers,
  getComment,
  getDietaryRegimen,
  getEpisodes,
  getHealthProfile,
  getPhysicians,
  getPhoneNumber,
  getActivities,
  getAlerts,
  //update PUT data
  updateLanguage
};

//for fake api, responsing to backend.js
function login(username, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  };
  return fetch(`${config.apiUrl}/users/authenticate`, requestOptions)
    .then(handleResponse)
    .then(user => {
      // login successful if there's a user in the response
      if (user) {
        // store user details and basic auth credentials in local storage
        // to keep user logged in between page refreshes
        user.authdata = window.btoa(username + ":" + password);
        localStorage.setItem("user", JSON.stringify(user));
        console.log(localStorage.getItem("user"));
      }

      return user;
    });
}

function getClient(client_id) {
  localStorage.removeItem("client");
  return (
    fetch(`https://5cdc6232069eb30014202d8e.mockapi.io/profile/${client_id}`)
      // We get the API response and receive data in JSON format...
      .then(response => response.json())
      // ...then we locally store data
      .then(client => {
        localStorage.setItem("client", JSON.stringify(client));
        //console.log("client is:" + localStorage.getItem("client"));
        const cli = localStorage.getItem("client");

        return client;
      })
  );
}

function getAddress(client_id) {
  return (
    fetch(`https://5cdc6232069eb30014202d8e.mockapi.io/addresses/${client_id}`)
      // We get the API response and receive data in JSON format...
      .then(response => response.json())
      // ...then we locally store data
      .then(address => {
        localStorage.setItem("address", JSON.stringify(address));

        const c = localStorage.getItem("address");

        return c;
      })
  );
}
//https://5cdc6232069eb30014202d8e.mockapi.io/addresses/${id}

//how about two or more caregivers, is the client_id patient id?
function getCaregivers(client_id) {
  localStorage.removeItem("caregiver");
  return (
    fetch(`https://5cdc6232069eb30014202d8e.mockapi.io/caregivers/${client_id}`) //must have a place to put userId
      // We get the API response and receive data in JSON format...
      .then(response => response.json())
      // ...then we locally store data
      .then(caregiver => {
        localStorage.setItem("caregiver", JSON.stringify(caregiver));

        const c = localStorage.getItem("caregiver");
        // console.log("print caregiver:" + c);
        return c;
      })
  );
}

function getComment() {}
function getDietaryRegimen() {}
function getEpisodes() {}

//response to real api
function getHealthProfile(client_id, token) {
  localStorage.removeItem("healthProfile");

  return fetch(
    `http://localhost:5000/health_profile?client_id=${client_id}&token=${token}`
  )
    .then(handleResponse)
    .then(healthProfile => {
      // login successful if there's a user in the response
      if (healthProfile) {
        // store user details and basic auth credentials in local storage
        // to keep user logged in between page refreshes
        localStorage.setItem("healthProfile", JSON.stringify(healthProfile));
        console.log(
          "health profile information:" + localStorage.getItem("healthProfile")
        );
      }
      return healthProfile;
    });
}
function getPhysicians(client_id) {
  localStorage.removeItem("physicians");
  return (
    fetch(
      `https://5cdc6232069eb30014202d8e.mockapi.io/profile/${client_id}/users/`
    ) //must have a place to put userId
      // We get the API response and receive data in JSON format...
      .then(response => response.json())
      // ...then we locally store data
      .then(physicians => {
        localStorage.setItem("physicians", JSON.stringify(physicians));

        const p = localStorage.getItem("physicians");

        return p;
      })
  );
}
function getPhoneNumber() {}

function logout() {
  localStorage.removeItem("oneUser");
  //localStorage.removeItem("address");
}

function getAll() {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };
  return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
}

function getActivities() {
  localStorage.removeItem("activities");
  return (
    fetch(`http://www.mocky.io/v2/5d1a58582f0000a148fd75f5`)
      // We get the API response and receive data in JSON format...
      .then(response => response.json())
      // ...then we locally store data
      .then(activities => {
        localStorage.setItem("activities", JSON.stringify(activities));

        const act = localStorage.getItem("activities");

        return act;
      })
  );
}
function getAlerts() {
  localStorage.removeItem("alerts");
  return (
    fetch(`http://www.mocky.io/v2/5d1a60c62f00000e00fd7624`)
      // We get the API response and receive data in JSON format...
      .then(response => response.json())
      // ...then we locally store data
      .then(alerts => {
        localStorage.setItem("alerts", JSON.stringify(alerts));

        const ale = localStorage.getItem("alerts");
        console.log("print alerts:" + alerts);
        return ale;
      })
  );
}

//update service language of basic info page
function updateLanguage(client_id, data) {
  return fetch(
    "https://5cdc6232069eb30014202d8e.mockapi.io/profile/" + client_id,
    {
      method: "PUT",
      //mode: "CORS",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }
  )
    .then(res => {
      return res;
    })
    .catch(err => err);
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        //location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
