'use strict';

const qs = require('querystring');
const helpers = require('./helpers');

module.exports.smsReceived = async (event) => {
  let post = qs.parse(event.body);
  let tweet = post.Body;
  let client = helpers.getTwitterClient();

  await client.post('statuses/update', {status: tweet})

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/xml'
    }
  };
};
