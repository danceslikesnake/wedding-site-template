'use strict';

//const url = `${window.location.origin}/api/getInvitation/${rsvp}`;
const baseUrl = `https://yichunjaredweds.com/api/`;

module.exports.getInvitation = (rsvp) => {
  const url = `${baseUrl}getInvitation/${rsvp}`;
  return fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
  }).then(response => response.text())
    .then(response => parseResponseText(response))
    .then(response => response.body)
    .catch(error => {
      console.log(error);
    });
};

module.exports.updateInvitation = (payload) => {
  //const url = `${window.location.origin}/api/getInvitation/${rsvp}`;
  const url = `${baseUrl}updateInvitation`;
  return fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  }).then(response => response.text())
    .then(response => parseResponseText(response))
    .then(response => response.body)
    .catch(error => {
      console.log(error);
    });
};


const parseResponseText = (text, defaultValue = {}) => {
  return text ? JSON.parse(text) : defaultValue;
};

