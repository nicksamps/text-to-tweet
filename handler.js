'use strict';

const qs = require('querystring');
const Twit = require('twit');

module.exports.smsReceived = async (event) => {
  let post = qs.parse(event.body);
  let tweet = post.Body;

  var client = new Twit({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  });

  await client.post('statuses/update', {status: tweet})

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/xml'
    }
  };
};
