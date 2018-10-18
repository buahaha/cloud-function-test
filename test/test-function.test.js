const request = require('supertest');
const chai = require('chai');
let chaiHttp = require('chai-http');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
chai.use(chaiHttp);
const assert = chai.assert;

var test = require('../index').TestFunction;

describe('Google Cloud test fn()', () => {
  var app = null;

  before(done => {
    test.start();
    app = test.server;
    done();
  });

  after(done => {
    test.close();
    app.close();
    done();
  });

  it('server is up and running', done => {
    var http = require('http');
    assert.instanceOf(app, http.Server, 'server is in fact instance of http.Server');
    done();
  });

  it('GET / should run #testFunction', done => {
    test.fn = (req, res) => {
      res.send('hahaha');
    };
    request(app)
    .get('/')
    .expect(res => {
      assert.equal(res.text, 'hahaha', 'response text is as it should be');
    })
    .end((err, res) => {
      if (err) return done(err);
      done()
    });
  });

  it('POST / should run #testFunction', done => {
    test.fn = (req, res) => {
      res.send('hahaha');
    };
    request(app)
    .post('/')
    .expect(res => {
      assert.equal(res.text, 'hahaha', 'response text is as it should be');
    })
    .end((err, res) => {
      if (err) return done(err);
      done()
    });
  });

  it('PUT / should run #testFunction', done => {
    test.fn = (req, res) => {
      res.send('hahaha');
    };
    request(app)
    .put('/')
    .expect(res => {
      assert.equal(res.text, 'hahaha', 'response text is as it should be');
    })
    .end((err, res) => {
      if (err) return done(err);
      done()
    });
  });

  it('DELETE / should run #testFunction', done => {
    test.fn = (req, res) => {
      res.send('hahaha');
    };
    request(app)
    .delete('/')
    .expect(res => {
      assert.equal(res.text, 'hahaha', 'response text is as it should be');
    })
    .end((err, res) => {
      if (err) return done(err);
      done()
    });
  });

  it('PATCH / should run #testFunction', done => {
    test.fn = (req, res) => {
      res.send('hahaha');
    };
    request(app)
    .patch('/')
    .expect(res => {
      assert.equal(res.text, 'hahaha', 'response text is as it should be');
    })
    .end((err, res) => {
      if (err) return done(err);
      done();
    });
  });

  it('GET / should run #testFunction indefinietly', done => {
    test.fn = (req, res) => {
      res.send('hahaha');
    };
    var requester = chai.request(app).keepOpen();
    requester.get('/')
    .then(async res => {
      assert.equal(res.text, 'hahaha', 'response text is as it should be');
      await requester.get('/')
      .then(res => {
        assert.equal(res.text, 'hahaha', 'response text is as it should be');
        done();
      }, e => {
        done(e);
      });
    })
    .catch(e => {
      done(e);
    })
    .then(() => {
      requester.close()
    });
  });

});
