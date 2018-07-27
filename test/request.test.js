const { expect } = require('chai');
const { extractHeadersAuthToken } = require('../libs/request');

describe ('request', () => {
  it('should extract authorization header', () => {
    const testToken = `msg123`;
    const testHeader = { Authorization: `bearer ${testToken}` };
    const extractedHeader = extractHeadersAuthToken(testHeader);
    expect(extractedHeader).to.eq(testToken);
  });
  it('should not extract an invalid authorization header', () => {
    const testToken = `msg123`;
    const testHeaders = { Authorization: `bearer123 ${testToken}` };
    let catched;
    try {
      extractHeadersAuthToken(testHeaders);
    } catch (error) {
     catched = error; 
    }
    expect(catched).to.exist;
  });
  it('should not extract an invalid authorization header', () => {
    const testHeaders = { test: 123 };
    let catched;
    try {
      extractHeadersAuthToken(testHeaders);
    } catch (error) {
     catched = error; 
    }
    expect(catched).to.exist;
  });
});