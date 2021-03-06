'use strict';

// tests for smsReceived
// Generated by serverless-mocha-plugin

const mochaPlugin = require('serverless-mocha-plugin');
const expect = mochaPlugin.chai.expect;
const helpers = require('../helpers');
const sinon = require('sinon');
let wrapped = mochaPlugin.getWrapper('smsReceived', '/handler.js', 'smsReceived');
const REQUIRED_SUBSTRING = process.env.REQUIRED_SUBSTRING;

describe('smsReceived', () => {
  beforeEach((done) => {
    this.event = {
      body: `Body=Tweet tweet ${REQUIRED_SUBSTRING}`
    };

    this.postStub = sinon.stub();
    this.getTwitterClientStub = sinon.stub(helpers, 'getTwitterClient');
    this.getTwitterClientStub.returns({
      post: this.postStub
    });

    done();
  });

  afterEach(() => {
    this.getTwitterClientStub.restore();
  });

  it('post called correctly', () => {
    return wrapped.run(this.event).then((response) => {
      expect(this.postStub.calledWith('statuses/update', {status: 'Tweet tweet'})).to.be.true;
    });
  });

  it('post not called if REQUIRED_SUBSTRING missing', () => {
    this.event.body = this.event.body.replace(REQUIRED_SUBSTRING, '');
    return wrapped.run(this.event).then((response) => {
      expect(this.postStub.called).to.be.false;
    });
  });

  it('returns an empty XML response', () => {
    return wrapped.run(this.event).then((response) => {
      expect(response).to.deep.equal({
        statusCode: 200,
        headers: {
          'Content-Type': 'text/xml'
        }
      });
    });
  });
});
