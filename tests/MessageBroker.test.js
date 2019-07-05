const chai = require('chai');
const { assert, expect } = require('chai');
const AWSMock = require('aws-sdk-mock');
const AWS = require('aws-sdk');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { publish } = require('../lib/messageBroker');

AWSMock.setSDKInstance(AWS);
chai.use(sinonChai);

describe('Test messageBroker', () => {
  beforeEach('setup spy and mock vars', () => {
    this.publishSpy = sinon.spy();
    AWSMock.mock('SNS', 'publish', this.publishSpy);

    process.env.AWS_REGION = 'region';
    process.env.AWS_ACCOUNT = '000001010';
    process.env.SNS_TOPIC = 'interesting';

    this.msgBody = 'test';
    this.expectedParams = {
      Message: this.msgBody,
      TopicArn: `arn:aws:sns:${ process.env.AWS_REGION }:${ process.env.AWS_ACCOUNT }:${ process.env.SNS_TOPIC }`,
    };
  });
  afterEach('restore sandbox', () => {
    AWSMock.restore();
  });

  describe('When publish() is called', () => {
    it('Should successfully send message', () => {
      publish(this.msgBody, data => data);
      assert.isTrue(this.publishSpy.calledOnce, 'should have called publish()');
      expect(this.publishSpy).to.have.been.calledWith(this.expectedParams);
    });
  });
});
