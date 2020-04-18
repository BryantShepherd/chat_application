const axios = require("axios");
const { baseURL, channelAPI } = require("./api");

function getMessagesInChannel(token, id) {
  return axios({
    url: baseURL + channelAPI.getMessage,
    method: "get",
    headers: {
      Authorization: `Bearer ${token}`
    },
    params: {
      id
    }
  });
}

function getMembersInChannel(token, id) {
  return axios({
    url: baseURL + channelAPI.getMember,
    method: "get",
    headers: {
      Authorization: `Bearer ${token}`
    },
    params: {
      id
    }
  });
}

module.exports = {
  getMessagesInChannel,
  getMembersInChannel
};
