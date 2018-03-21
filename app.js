const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();
const port = process.env.PORT || 4000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.post('/webhook', (req, res) => {
  let reply_token = req.body.events[0].replyToken;
  reply(reply_token);
  res.sendStatus(200);
});
app.listen(port);
function reply(reply_token) {
  let headers = {
    'Content-Type': 'application/json',
    Authorization:
      'Bearer {QNvmXR/WTbjEOqzSaK/GvT2M7GxnWesBl8QjXI+R+QTc9XfNEBM7W45RNzOKI8XdsNKHGR6VBOugXDetz3B6VDjzhAcY7DPS7h0Z4lWHWTP0I9aRVu+aCMotpLrcm2br/yv38ZTUTEk5Od3DbcD6bwdB04t89/1O/w1cDnyilFU=}'
  };
  let body = JSON.stringify({
    replyToken: reply_token,
    messages: [
      {
        type: 'text',
        text: 'Hello'
      },
      {
        type: 'text',
        text: 'How are you?'
      }
    ]
  });
  request.post(
    {
      url: 'https://api.line.me/v2/bot/message/reply',
      headers: headers,
      body: body
    },
    (err, res, body) => {
      console.log('status = ' + res.statusCode);
    }
  );
}
