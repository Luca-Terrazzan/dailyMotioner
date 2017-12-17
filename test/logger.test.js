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

describe('Daily Motioner', () => {
    var dm = require('../dist/lib/dailyMotion').default;

    it('Should be able to login', (done) => {
        var dailyMotion = new dm();
        dailyMotion.login().should.eventually.be.equal(false).notify(done);
    });
});
