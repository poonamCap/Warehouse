const createMockRequestResponse = () => {
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };
    const next = jest.fn();
    return { req, res, next };
  };

module.exports = { createMockRequestResponse };
