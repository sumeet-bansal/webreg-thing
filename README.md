## webreg-thing

A Node.js app that sends an email notification when a seat opens up for a class on WebReg. Made for UCSD students.

#### Usage
1. Download or clone the repo.
```bash
~$ git clone https://github.com/sumeet-bansal/webreg-thing
```
2. Install the required Node packages.
```bash
~$ npm install
```
3. Substitute your preferred email address inside `app.js`. *Note: you will likely also need to change your account's security settings to allow less secure apps.*
4. Run it: `node app.js [COURSE]`. For example,
```bash
~$ node app.js CSE158
```
