# Cloud Function Test ![Travis CI][travis ci]

Test your functions before deploying to cloud. Write code locally, then test it.

Note that before deploying function to Google Cloud you have to first enable
billing for your project, but using Cloud Functions is free up to a free
tier quota - [Google Cloud Functions Pricing][google's functions pricing]

## Installation

Install tester using npm

```shell
npm install cloud-function-test
```

## Usage

1. Import TestFunction class

```javascript
var test = require('cloud-function-test').TestFunction;
```

2. Initialize server

```javascript
test.start(portNumber);
```

3. Create your own function that you want to test locally.
It **has** to have `req` and `res` parameters which **will** be passed to your
function from the Google's server. They stand for [Request][express req] and
[Response][express res] objects of Express framework.

```javascript
test.fn = (req, res) => {
  res.send({
    status: 'OK',
    message: 'Hello from function'
  });
};
```

4. Run your script. Function will be available to you on
`http://localhost:3003` or the `http://localhost:portNumber` you set it to be.

5. Close the server

```Javascript
test.close();
```

[google's functions pricing]: https://cloud.google.com/functions/pricing
[express req]: http://expressjs.com/en/4x/api.html#req
[express res]: http://expressjs.com/en/4x/api.html#res
[travis ci]: https://travis-ci.org/buahaha/cloud-function-test.svg?branch=master
