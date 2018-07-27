const { expect } = require('chai');
const { signToken, verifyToken } = require('../libs/token');

const secret = 'secret123';
const shaPassword = 'pass456';

const wait = async (ms) => new Promise(resolve => setTimeout(resolve, ms));

describe('token', () => {
  it('should throw an error if payload is a string', async () => {
    let catched;
    try {
      await signToken({ payload: 'this is a sample string', secret, expiresIn: '7d' });
    }
    catch (error) {
      catched = error;
    }
    expect(catched).to.exist;
  });
  it('should be able to verify a signed token', async () => {
    const testPayload = { msg: '123' }
    const token = await signToken({ payload: testPayload, secret, expiresIn: '7d' });

    const decoded = await verifyToken({ token, secret });
    expect(decoded).to.contain(testPayload);
  });
  it('should not be able to verify an expired token', async () => {
    const testPayload = { msg: '123' }
    // Set the expiry for 50 ms
    const token = await signToken({ payload: testPayload, secret, expiresIn: '50' });

    // Wait for 100ms
    await wait(100);

    let catched;
    let decoded;
    try {
      decoded = await verifyToken({ token, secret });

    } catch (error) {
      catched = error;
    }
    expect(catched).to.exist;
    expect(decoded).to.not.exist;
  });
});