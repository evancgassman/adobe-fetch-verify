# adobe-fetch-verify
A simple NodeJS module that checks an email's inbox for a verification code sent by Adobe Services.

## Install for NodeJS
```js
npm install adobe-fetch-verify
```

## Usage and Functions
```js
fetch(example@example.com, password, options);
```

##Example
```js
const adobeVerify = require("./index.js");

async function mainHandler() {
    let options = {
        searchFlag: 'ALL',
        subSearchFlag: 'SINCE',
        subSearchFlagValue: new Date(),
        returnTimestamp: true,
        limit: 15
    };

    let codeList = await adobeVerify.fetch("example@gmail.com", "wgg3g2hh2h", options);
    console.log(codeList);
}

mainHandler();
``

