# catbox.js
A wrapper for the [Catbox](https://catbox.moe/) api

## Use
```javascript
const CatboxClient = require("catbox.js");

//Leave `userHash` out to use the API anonymously
const client = new CatboxClient("<userHash>");

//Upload a file
client.fileUpload("/path/to/file.png").then(url => console.log(url));

//Upload a file from a url
client.urlUpload("https://example.org/path/to/file.png").then(url => console.log(url));

```
