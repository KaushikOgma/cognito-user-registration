// test.js
require('dotenv').config();
const { handler } = require('./index');

const mockEvent = {
    "request":{
        "userAttributes":{
            "key": "val"
        },
        "clientMetadata":{
            "key1": "val1"
        }
    }
}; // Populate this with a mock event object

handler(mockEvent, mockContext={})
    .then(response => console.log(response))
    .catch(err => console.error(err));
