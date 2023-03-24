//   ___ ___ ___ ___   _   _____   _______ ___ 
//  / __|_ _| _ ) _ ) /_\ | _ ) \ / /_   _| __|
// | (_ || || _ \ _ \/ _ \| _ \\ V /  | | | _|  
//  \___|___|___/___/_/ \_\___/ |_|   |_| |___|
//  By Evan Gassman

exports.fetch = async function (emailAddress, password, options = {}) {
    
    const IMAP = require("imap");

    if(options.searchFlag == undefined) options.searchFlag = "ALL";
    if(options.subSearchFlag == undefined) options.subSearchFlag = "SINCE";
    if(options.subSearchFlagValue == undefined) options.subSearchFlagValue = new Date();
    if(options.limit == undefined) options.limit = 15;
    if(options.returnTimestamp == undefined) options.returnTimestamp = true;

    let imapServer = null;
    let service = emailAddress.split("@")[1];
    if(service === "gmail.com") imapServer = "imap.gmail.com";
    if(service === "yahoo.com") imapServer = "imap.mail.yahoo.com";
    if(service === "outlook.com") imapServer = "imap-mail.outlook.com";

    let imapConnection = new IMAP({
        user: emailAddress,
        password: password,
        host: imapServer,
        port: 993,
        tls: true,
        tlsOptions: {
            rejectUnauthorized: false
        }
    });

    let codeList = [];
    
    return new Promise(resolve => {
      imapConnection.once('ready', function() {
         imapConnection.openBox('INBOX', true, () => {
            imapConnection.search([options.searchFlag, [options.subSearchFlag, options.subSearchFlagValue]], (err, results) => {
                const f = imapConnection.fetch(results, {bodies: ''});
                f.on('message', function(msg, seqno) {
                    msg.on('body', function(stream, info) {
                      let buffer = '';
                      stream.on('data', function(chunk) {
                        buffer += chunk.toString('utf8');
                      });
                      stream.once('end', function() {
                        headerData = IMAP.parseHeader(buffer);
                        headerDate = headerData.date;
                        if(headerData.from.includes("Adobe <message@adobe.com>")
                        && headerData.subject.includes("Verification code")) {
                            verificationCode = buffer.split('<strong style=3D"font-size:28px; line-height:32px;">')[1];
                            verificationCode = verificationCode.split('</str')[0];
                            returnData = {code: verificationCode, timestamp: headerDate};
                            if(options.returnTimestamp === false) returnData = verificationCode;
                            if(codeList.length < options.limit) {
                                codeList.push(returnData);
                            }
                        } 
                      });
                    });
                });
                f.once('end', function() {
                 imapConnection.end();
                 resolve(codeList);
                });
            });
         });
      });
      
      imapConnection.on('error', function(err) {
        console.log(err);
      });
      
      imapConnection.once('end', function() {
        console.log('Connection ended');
      });
      
      imapConnection.connect();
    });
}