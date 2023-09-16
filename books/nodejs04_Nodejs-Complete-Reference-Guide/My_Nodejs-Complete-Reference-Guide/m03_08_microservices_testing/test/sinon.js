const chai = require("chai");
const http = require("chai-http");
const sinon = require("sinon");
const tools = require("../tools");

it('invokes the database', async function() {
    sinon.spy(tools.service, 'where');

    await subject.getFoo(1234);
    const dbArgs = db.where.getCall(0).args[0];
    expect(dbArgs.id).to.eql(1234);
});