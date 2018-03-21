const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();
const port = process.env.PORT || 4000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.post('/webhook', (req, res) => {
  let reply_token = req.body.events[0].replyToken;
  let msg = req.body.events[0].message.text;
  reply(reply_token, msg);
  res.sendStatus(200);
});
app.listen(port);
function reply(reply_token, msg) {
  let headers = {
    'Content-Type': 'application/json',
    Authorization:
      'Bearer {QNvmXR/WTbjEOqzSaK/GvT2M7GxnWesBl8QjXI+R+QTc9XfNEBM7W45RNzOKI8XdsNKHGR6VBOugXDetz3B6VDjzhAcY7DPS7h0Z4lWHWTP0I9aRVu+aCMotpLrcm2br/yv38ZTUTEk5Od3DbcD6bwdB04t89/1O/w1cDnyilFU=}'
  };
  request.get(
    {
      url: `https://en.wikipedia.org/w/api.php?action=opensearch&search=${msg}&limit=1&namespace=0&format=jsonfm`
    },
    (error, response, body) => {
      const replyBody = JSON.stringify({
        replyToken: reply_token,
        messages: [
          {
            type: 'text',
            text: body
          }
        ]
      });
      request.post(
        {
          url: 'https://api.line.me/v2/bot/message/reply',
          headers: headers,
          body: replyBody
        },
        (err, res, body) => {
          console.log('status = ' + res.statusCode);
        }
      );
    }
  );
}
