const express = require('express');
const line = require('@line/bot-sdk');

const config = {
  channelAccessToken:
    'QNvmXR/WTbjEOqzSaK/GvT2M7GxnWesBl8QjXI+R+QTc9XfNEBM7W45RNzOKI8XdsNKHGR6VBOugXDetz3B6VDjzhAcY7DPS7h0Z4lWHWTP0I9aRVu+aCMotpLrcm2br/yv38ZTUTEk5Od3DbcD6bwdB04t89/1O/w1cDnyilFU=',
  channelSecret: 'b185110c058611e4393addc9281bc70a'
};

const app = express();
app.post('/webhook', line.middleware(config), (req, res) => {
  Promise.all(req.body.events.map(handleEvent)).then(result =>
    res.json(result)
  );
});

const client = new line.Client(config);
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  return client.replyMessage(event.replyToken, {
    type: 'text',
    text: event.message.text
  });
}

app.listen(3000);
