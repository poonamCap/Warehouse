const createMockRequestResponse = () => {
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };
    return { req, res };
  };

module.exports = { createMockRequestResponse };
