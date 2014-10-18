var chai = require('chai');
var sinon = require('sinon');
chai.use(require('sinon-chai'));
chai.should();

beforeEach(function () {
    global.env = sinon.sandbox.create();
});

afterEach(function () {
    global.env.restore();
});
