const chai = require('chai');
const { assert, expect } = require('chai');
const AWSMock = require('aws-sdk-mock');
const AWS = require('aws-sdk');

const sinonChai = require('sinon-chai');
const { mockReq, mockRes } = require('sinon-express-mock');
const { healthCheck, sendMessage } = require('../routes/status');

chai.use(sinonChai);
AWSMock.setSDKInstance(AWS);

describe('Test Status API', () => {
  beforeEach('setup mocked objects', () => {
    const request = {
      body: {},
    };
    this.req = mockReq(request);
    this.res = mockRes();
  });

  describe('healthCheck()', () => {
    it('Should be called with 200', () => {
      healthCheck(this.req, this.res);
      expect(this.res.sendStatus).to.be.calledWith(200);
    });
  });
});

describe('Test SNS API', () => {
  beforeEach('setup mock objects', () => {
    const request = {
      body: {},
    };
    this.req = mockReq(request);
    this.res = mockRes();
  });

  afterEach('restore sandbox', () => {
    AWSMock.restore('SNS', 'publish');
  });

  it('Should successfully send message', () => {
    const msgBody = 'Success';
    AWSMock.mock('SNS', 'publish', (err, cb) => {
      cb(null, msgBody);
    });
    sendMessage(this.req, this.res);
    expect(this.res.json).to.be.calledOnceWith({ message: msgBody });
  });

  it('Should fail to send message', () => {
    const err = new Error('Failed');
    AWSMock.mock('SNS', 'publish', (error, cb) => {
      cb(err);
    });
    sendMessage(this.req, this.res);
    expect(this.res.json).to.be.calledOnceWith({ err });
  });
});
