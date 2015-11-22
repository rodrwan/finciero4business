'use strict';

var Q, request, apiGet, apiPost, apiDelete;

Q = require('q');
request = require('request');

apiGet = function (route) {
  var options, deferred;

  deferred = Q.defer();
  options = {
    url: process.env.API_URL + route,
    json: true,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Token token=' + process.env.API_ACCESS_TOKEN
    }
  };
  console.log(options);
  request.get(options, function (err, res, body) {
    if (err) {
      console.log('--- Remote error ---');
      console.log(err);
      return deferred.reject(err);
    }

    deferred.resolve({
      res: res,
      body: body
    });
  });

  return deferred.promise;
};

apiPost = function (route, data) {
  var options, deferred;

  deferred = Q.defer();
  options = {
    url: process.env.API_URL + route,
    body: data,
    json: true,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Token token=' + process.env.API_ACCESS_TOKEN
    }
  };
  console.log(options);
  request.post(options, function (err, res, body) {
    if (err) {
      console.log('--- Remote error ---');
      console.log(err);
      return deferred.reject(err);
    }

    deferred.resolve({
      res: res,
      body: body
    });
  });

  return deferred.promise;
};

apiDelete = function (route, data) {
  var options, deferred;

  deferred = Q.defer();
  options = {
    url: process.env.API_URL + route,
    body: data,
    json: true,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Token token=' + process.env.API_ACCESS_TOKEN
    }
  };

  request.del(options, function (err, res, body) {
    if (err) {
      console.log('--- Remote error ---');
      console.log(err);
      return deferred.reject(err);
    }

    deferred.resolve({
      res: res,
      body: body
    });
  });

  return deferred.promise;
};

module.exports = {
  apiGet: apiGet,
  apiPost: apiPost,
  apiDelete: apiDelete
};
