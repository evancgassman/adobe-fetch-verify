# adobe-fetch-verify
A simple NodeJS module that checks an email's inbox for a verification code sent by Adobe Services.

## Install for NodeJS
```css
npm install adobe-fetch-verify
```
## What exactly is this for?
This simple one-function NodeJS module connects your email account via IMAP, and scans for emails by Adobe, returning any emails containing a verification code. This is simply for educational purposes only, and by using this, you agree that I am not responsible for your actions. **An example email sent by Adobe:**

![image](https://user-images.githubusercontent.com/102568007/227413659-b83aa859-11d9-4cef-946c-b8a0d9ddd338.png)


## Usage and Functions
```css
fetch(example@example.com, password, options);
```
## Important Notes and Support

- **For most email services, you will be required to turn IMAP access on!**
- **Services like GMAIL will require you to enable 2-Factor Authorization, and create an "App Password".** 
- **Supported Email Services: ✔️ GMAIL, ✔️YAHOO, ✔️OUTLOOK.**

❤️ If you require any assistance, feel free to join <a href="https://discord.gg/y6UywbeB3U">my support Discord!</a>! ❤️

## Example with Annotations
```js
const adobeVerify = require("adobe-fetch-verify");

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
```

