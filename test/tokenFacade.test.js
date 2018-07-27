const { encodeToken, decodeToken } = require('../libs/tokenFacade');
const { expect } = require('chai');

const jwtSecret = 'secret123';
const shaPassword = 'pass456';

describe('tokenFacade', () => {
  describe('With Encryption', () => {
    it('should be able to decode an encoded token', async () => {
      const testPayload = { msg: 'test123' };
      const encoded = await encodeToken({ payload: testPayload, expiresIn: '7d', jwtSecret, isToEncrypt: true, shaPassword });
      const decoded = await decodeToken({ token: encoded, isToDecrypt: true, jwtSecret, shaPassword });
      expect(decoded).to.contain(testPayload);
    });
  });
  describe('Without Encryption', () => {
    it('should be able to decode an encoded token', async () => {
      const testPayload = { msg: 'test123' };
      const encoded = await encodeToken({ payload: testPayload, expiresIn: '7d', jwtSecret });
      const decoded = await decodeToken({ token: encoded, jwtSecret });
      expect(decoded).to.contain(testPayload);
    });
  });
  describe ('validation', () => {
    it ('should throw an error if shaPassword is missing', async () => {
      let catched;
      try {
        await encodeToken({ payload: { msg: '123' }, expiresIn: '7d', jwtSecret, isToEncrypt: true, shaPassword: null });
      } catch (error) {
        catched = error;
      }
      expect(catched).to.exist;
      expect(catched.message.toLowerCase()).to.include('missing');
    });
    it ('should throw an error if shaPassword is not a string', async () => {
      let catched;
      try {
        await encodeToken({ payload: { msg: '123' }, expiresIn: '7d', jwtSecret, isToEncrypt: true, shaPassword: { test: 123 } });
      } catch (error) {
        catched = error;
      }
      expect(catched).to.exist;
      expect(catched.message.toLowerCase()).to.include('a string');
    });
  });
});
