# catbox.js
A (WIP) wrapper for the [Catbox](https://catbox.moe/) api.

[![NPM](https://nodei.co/npm/catbox.js.png)](https://nodei.co/npm/catbox.js/)

## Source
The source can be found at [samsamson33/catbox.js](https://github.com/samsamson33/catbox.js) on GitHub.

## Use
```javascript
const CatboxClient = require("catbox.js");

//Leave `userHash` out to use the API anonymously
const client = new CatboxClient("<userHash>");

//Upload a file
client.fileUpload("/path/to/file.png").then(url => console.log(url));

//Upload a file from a url
client.urlUpload("https://example.org/path/to/file.png").then(url => console.log(url));

//Delete files (cannot be done anonymously)
client.deleteFiles(["filename.png", "abcdef.jpg"]);
```
