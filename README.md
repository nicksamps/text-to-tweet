# text-to-tweet
A simple service to turn a text into a tweet. My use case for this is for me to be able to tweet via my Somewear satellite messenger device. The Somewear can text US/CA phone numbers via satellite so all I need to do is turn a text into a tweet. [Twitter's text to tweet service](https://help.twitter.com/en/using-twitter/twitter-sms) won't work for this as it needs to be tied to my phone number, which won't work in this case as the texts will be coming from Somewear's phone numbers which could theoretically change at any time.

## Setup

1. Follow the instructions [here](https://serverless.com/framework/docs/providers/aws/guide/installation/) to install Serverless and set up the AWS cli and credentials.
1. Setup a Twilio account
1. Setup a Twitter account and Twitter app to get the credentials needed for the next step
1. Set up a `keys.dev.yml`, `keys.test.yml` and do the same for any other environments (see example below)
    - `REQUIRED_SUBSTRING` is a value that needs to be in the SMS message for the tweet to posted. The string itself is removed from the tweet and the remaining string is 'trimmed' to remove spaces from the beginning / end of the string.
1. To deploy run `serverless deploy -v` (you can optionally add the `--stage ENV_NAME` flag otherwise it defaults to `dev`)
1. Copy the endpoint from the `Stack Outputs` ending in `smsreceived` and add it as one of your number`s SMS webhook hook in the Twilio console
1. Send a text message to the number from the previous step and you should see that message show up as a tweet on your Twitter account

Example `keys.*.yml`:
```
TWITTER_CONSUMER_KEY: EXAMPLE_TWITTER_CONSUMER_KEY
TWITTER_CONSUMER_SECRET: EXAMPLE_TWITTER_CONSUMER_SECRET
TWITTER_ACCESS_TOKEN_KEY: EXAMPLE_TWITTER_ACCESS_TOKEN_KEY
TWITTER_ACCESS_TOKEN_SECRET: EXAMPLE_TWITTER_ACCESS_TOKEN_SECRET
REQUIRED_SUBSTRING: EXAMPLE_REQUIRED_SUBSTRING
```
