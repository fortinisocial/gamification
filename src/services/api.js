import axios from 'axios';

export const newBusinessAndFundRaisingTeamId =
  process.env.REACT_APP_NEW_BUSINESS_AND_FUND_RAISING_TEAM_ID;

export const params = {
  key: process.env.REACT_APP_TRELLO_API_KEY,
  token: process.env.REACT_APP_TRELLO_USER_TOKEN,
};

const api = axios.create({
  baseURL: 'https://api.trello.com',
});

export default api;
