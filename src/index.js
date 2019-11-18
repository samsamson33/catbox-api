const fs = require("fs");
const { promisify } = require("util");

const FormData = require("form-data");

/**
 * Node.js Readable stream
 *
 * @external ReadableStream
 * @see https://nodejs.org/api/stream.html#stream_class_stream_readable
 */

/**
 * A client for interfacing with the [Catbox]{@link https://catbox.moe} api
 */
class CatboxClient {

	/**
	 * Creates an instance of {@link CatboxClient}.
	 *
	 * @class
	 * @param {string} [userHash] - The userhash to use for operations
	 */
	constructor(userHash = null) {
		this.userHash = userHash;
	}

	/**
	 * Gets data from a Stream
	 *
	 * @private
	 * @instance
	 * @memberof CatboxClient
	 *
	 * @param {ReadableStream} stream - The stream from which to extract the data
	 * @returns {Promise<Buffer>} The data from the stream
	 *
	 */
	async _getData(stream) {
		return new Promise(resolve => {
			stream.on("data", data => {
				resolve(data.toString());
			});
		});
	}

	/**
	 * POSTs form data to the Catbox API
	 *
	 * @private
	 * @instance
	 * @memberof CatboxClient
	 *
	 * @param {object} dataObj - The data to use in the post request
	 * @returns {object} submitData
	 */
	async _send(dataObj) {
		const data = new FormData();
		for (let key in dataObj) {
			const value = dataObj[key];
			if (value != null) {
				data.append(key, value);
			}
		}

		const submit = promisify(data.submit).bind(data);

		return submit("https://catbox.moe/user/api.php");
	}

	/**
	 * Throws if the client does not have a userhash specified.
	 *
	 * @private
	 * @instance
	 * @memberof CatboxClient
	 *
	 * @param {string} caller - The name of the function calling this method
	 * @returns {boolean} `True` if a userhash is specified on the client
	 */
	_requireUserHash(caller) {
		if (!this.userHash) {
			throw `A userhash must be specified to use the \`${caller}\` method`;
		}

		return true;
	}

	/**
	 * Uploads a file
	 *
	 * @instance
	 * @memberof CatboxClient
	 *
	 * @param {string} path - The path of the file to upload
	 * @returns {Promise<string>} The url of the uploaded file
	 */
	async fileUpload(path) {
		const res = await this._send({
			reqtype: "fileupload",
			userhash: this.userHash,
			fileToUpload: fs.createReadStream(path)
		});

		return this._getData(res);
	}

	/**
	 * Uploads a file from a URL
	 *
	 * @instance
	 * @memberof CatboxClient
	 *
	 * @param {string} url - The url of the file to upload
	 * @returns {Promise<string>} The url of the uploaded file
	 */
	async urlUpload(url) {
		const res = await this._send({
			reqtype: "urlupload",
			userhash: this.userHash,
			url
		});

		return this._getData(res);
	}

	/**
	 * Deletes files.
	 * NOTE: This requires a userhash to be specified!
	 *
	 * @instance
	 * @memberof CatboxClient
	 *
	 * @param {Array<string>} files - The file names to delete
	 * @returns {boolean} `True` if the operation was successful
	 */
	async deleteFiles(files) {
		this._requireUserHash("deleteFiles");

		const fileNameWithSpaces = files.find(fileName => fileName.includes(" "));

		if (fileNameWithSpaces) {
			throw `Files cannot have spaces in their name: \`${fileNameWithSpaces}\` is an invalid file name`;
		}

		const res = await this._send({
			reqtype: "deletefiles",
			userhash: this.userHash,
			files: files.join(" ")
		});

		if (res.statusCode === 200) {
			return true;
		} else {
			throw `Could not delete one or more files (Status Message: ${res.statusMessage}): ${files.join(" ")}`;
		}
	}
}

module.exports = CatboxClient;
