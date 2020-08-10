import {
	IExecuteFunctions,
	IHookFunctions,
} from 'n8n-core';

import {
	IDataObject,
} from 'n8n-workflow';

import {
	OptionsWithUri,
} from 'request';


/**
 * Make an API request to Hacker News
 *
 * @param {IHookFunctions | IExecuteFunctions} this
 * @param {string} method
 * @param {string} endpoint
 * @param {IDataObject} body
 * @param {IDataObject} qs
 * @param {string} [uri]
 * @param {IDataObject} [headers]
 * @returns {Promise<any>}
 */
export async function hackerNewsApiRequest(
	this: IHookFunctions | IExecuteFunctions,
	method: string,
	endpoint: string,
	body: IDataObject,
	qs: IDataObject,
	uri?: string,
	headers?: IDataObject,
): Promise<any> { // tslint:disable-line:no-any

	const options: OptionsWithUri = {
		headers: {},
		body,
		method,
		qs,
		uri: uri || `http://hn.algolia.com/api/v1/${endpoint}`,
		json: true,
	};

	try {

		const credentials = this.getCredentials('hackerNewsOAuth2Api');

		if (credentials === undefined) {
			throw new Error('No credentials got returned!');
		}

		if (Object.keys(headers).length !== 0) {
			options.headers = Object.assign({}, options.headers, headers);
		}

		if (Object.keys(body).length === 0) {
			delete options.body;
		}

		return await this.helpers.requestOAuth2.call(this, 'hackerNewsApi', options);

	} catch (error) {

		// TODO: Replace TODO_ERROR_STATUS_CODE and TODO_ERROR_MESSAGE based on the error object returned by API.

		if (TODO_ERROR_STATUS_CODE === 401) {
			// Return a clear error
			throw new Error('The Hacker News credentials are invalid!');
		}

		if (TODO_ERROR_MESSAGE) {
			// Try to return the error prettier
			throw new Error(`Hacker News error response [${TODO_ERROR_STATUS_CODE}]: ${TODO_ERROR_MESSAGE}`);
		}

		// If that data does not exist for some reason, return the actual error.
		throw error;
	}
}


/**
 * Make an API request to Hacker News and return all results
 *
 * @export
 * @param {IHookFunctions | IExecuteFunctions} this
 * @param {string} method
 * @param {string} endpoint
 * @param {IDataObject} body
 * @param {IDataObject} qs
 * @returns {Promise<any>}
 */
export async function hackerNewsApiRequestAllItems(
	this: IHookFunctions | IExecuteFunctions,
	propertyName: string,
	method: string,
	endpoint: string,
	body: IDataObject,
	qs: IDataObject
): Promise<any> { // tslint:disable-line:no-any

	const returnData: IDataObject[] = [];
	let responseData: any;

	do {
		responseData = await hackerNewsApiRequest.call(this, method, endpoint, body, qs);
		// TODO: Get next page using `responseData` or `qs`
		returnData.push.apply(returnData, responseData[propertyName]);

	} while (
		// TODO: Add condition for total not yet reached
	);

	return returnData;
}
