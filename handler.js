'use strict';

const qs = require('querystring');
const helpers = require('./helpers');
const REQUIRED_SUBSTRING = process.env.REQUIRED_SUBSTRING;

module.exports.smsReceived = async (event) => {
  let post = qs.parse(event.body);
  let tweet = post.Body;
  let client = helpers.getTwitterClient();

  if (!REQUIRED_SUBSTRING || tweet.toLowerCase().indexOf(REQUIRED_SUBSTRING.toLowerCase()) > -1) {
    await client.post('statuses/update', {status: tweet.replace(REQUIRED_SUBSTRING, '').trim()})
  }

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/xml'
    }
  };
};
