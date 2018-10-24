const express = require('express');

class TestFunction {
  static fn(req, res) {
    res.status(404).send({
      status: '404',
      message: 'TestFunction.fn() is not set'
    });
  }
  static close() {
    if (this.server) {
      this.server.close();
    }
  }
  static start(port = 3003) {
    var app = express();

    // parse json
    app.use(express.json());       // to support JSON-encoded bodies
    app.use(express.urlencoded({extended: true})); // to support URL-encoded bodies

    app.get('/', (req, res) => {
      this.fn(req, res);
    });
    app.post('/', (req, res) => {
      this.fn(req, res);
    });
    app.put('/', (req, res) => {
      this.fn(req, res);
    });
    app.delete('/', (req, res) => {
      this.fn(req, res);
    });
    app.patch('/', (req, res) => {
      this.fn(req, res);
    });
    this.server = app.listen(port, () => {
      console.log(`Function running on http://localhost:${port}`);
    });
    // return this.server;
  }
}

module.exports.TestFunction = TestFunction;
