'use strict';

var assert = require('assert');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
chai.should();

describe('Logger', () => {
    var logger = require('../dist/lib/logger').default;

    it('Should be singleton', () => {
        // Get one instance
        var first = logger.getInstance();
        // Get another one
        var second = logger.getInstance();
        // They should be the same
        assert.equal(first, second);
    });
});

// These are real API calls, timeout deafult (2sec) shoudl be increased to at least 10sec
// e.g. mocha --timeout 15000
describe('Daily Motioner', () => {
    var dm = require('../dist/lib/dailyMotion').default;

    it('Should not be able to login without proper credentials', (done) => {
        // Get dm isntance without passing credentials
        var dailyMotion = new dm();
        dailyMotion.login().should.eventually.be.equal(false).notify(done);
    });
});
