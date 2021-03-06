/* eslint-disable no-sequences */
import React from 'react';

import { existingRoutes, consoleWarnTextStyles } from 'config';
import Fetch from 'utils/fetch';

const getRouteTitle = location => {
  return location === '/' ? existingRoutes.default : location.split('/')[1].toUpperCase();
}

const omit = (obj, exclude) =>
  Object.keys(obj).reduce((acc, item) =>
    (!exclude.includes(item) && (acc[item] = obj[item]), acc), {});

const pick = (obj, picks) =>
  Object.keys(obj).reduce((acc, item) =>
    (picks.includes(item) && (acc[item] = obj[item]), acc), {});

async function makeRequest(url, method, data) {
  try {
    const response = await Fetch.request(url, method, data);

    return response && (response.success
      ? omit(response, ['success'])
      : pick(response, ['errorMessage', 'status']));
  } catch(err) {
    console.warn(err);
    return { errorMessage: err };
  }
}

const removeItem = (arr, i) => {
  const res = arr.slice(0);
  res.splice(i, 1);
  return res;
}

const consoleWarnText = text => console.log(
  `%c ${text}`,
  consoleWarnTextStyles,
);

const consoleImage = url => {
  const image = new Image();

  image.onload = function() {
    const styles = `
      font-size: 1px;
      line-height: ${this.height}px;
      padding: ${this.height * .5 }px ${this.width * .5}px;
      background-size:${this.width}px ${this.height}px;
      background: url(${url});
    `;

    console.log('%c', styles);
  };

  image.src = url;
}

const getTeamScore = (results, team) => (results[team._id] && results[team._id].score) || 0;

const getResultsWithNames = (results, teams) => Object.keys(results).reduce(
  (acc, key) => (acc.push(
    key === 'guests'
      ? {
        name: 'Guests',
        _id: 1,
        ...results.guests,
      }
      : { ...teams.find(team => team._id === key), ...results[key] }
  ), acc),
  [],
);

const withNewLinens = (str = '', initial = '') => `${initial}${str}`.split('\n').map((item, i) => <span key={i}>{item}</span>);

export {
  getRouteTitle,
  omit,
  makeRequest,
  removeItem,
  consoleImage,
  consoleWarnText,
  getTeamScore,
  getResultsWithNames,
  withNewLinens,
};
