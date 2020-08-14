import {
	IExecuteFunctions,
} from 'n8n-core';

import {
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IDataObject,
} from 'n8n-workflow';

import {
	hackerNewsApiRequest,
	hackerNewsApiRequestAllItems,
} from './GenericFunctions';

export class HackerNews implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Hacker News',
		name: 'hackerNews',
		icon: 'file:hackerNews.png',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Consume Hacker News API',
		defaults: {
			name: 'Hacker News',
			color: '#ff6600',
		},
		inputs: ['main'],
		outputs: ['main'],
		properties: [
			// ----------------------------------
			//         Resources
			// ----------------------------------
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				options: [
					{
						name: 'Article',
						value: 'article',
					},
					{
						name: 'User',
						value: 'user',
					},
				],
				default: 'article',
				description: 'Resource to consume',
			},
			// ----------------------------------
			//         Operations
			// ----------------------------------
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				displayOptions: {
					show: {
						resource: [
							'article',
						],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						description: 'Get a Hacker News article',
					},
					{
						name: 'Get All',
						value: 'getAll',
						description: 'Get all Hacker News articles',
					},
				],
				default: 'get',
				description: 'Operation to perform',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				displayOptions: {
					show: {
						resource: [
							'user',
						],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						description: 'Get a Hacker News user',
					},
					{
						name: 'Rename',
						value: 'rename',
						description: 'Rename a Hacker News user',
					},
				],
				default: 'get',
				description: 'Operation to perform',
			},
			// ----------------------------------
			//         Fields
			// ----------------------------------
			{
				displayName: 'Article ID',
				name: 'articleId',
				description: 'The ID of the Hacker News article to be returned',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: [
							'article',
						],
						operation: [
							'get',
						],
					},
				},
			},
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				required: true,
				default: {},
				displayOptions: {
					show: {
						resource: [
							'article',
						],
						operation: [
							'get',
						],
					},
				},
				options: [
					{
						name: 'Include comments',
						description: 'Whether to include all the comments in the article',
						type: 'boolean',
						default: false,
					},
				],
			},
			{
				displayName: 'Return All',
				name: 'returnAll',
				description: 'Whether to return all results or only up to a limit',
				type: 'boolean',
				required: true,
				default: false,
				displayOptions: {
					show: {
						resource: [
							'article',
						],
						operation: [
							'getAll',
						],
					},
				},
			},
			{
				displayName: 'Limit',
				name: 'limit',
				description: 'Limit of Hacker News articles to be returned for the query',
				type: 'number',
				required: true,
				default: 5,
				displayOptions: {
					show: {
						resource: [
							'article',
						],
						operation: [
							'getAll',
						],
						returnAll: [
							true,
						]
					},
				},
			},
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				required: true,
				default: {},
				displayOptions: {
					show: {
						resource: [
							'article',
						],
						operation: [
							'getAll',
						],
					},
				},
				options: [
					{
						name: 'Keyword',
						description: 'The keyword for filtering the results of the query',
						type: 'string',
						default: '',
					},
					{
						name: 'Tags',
						description: 'Tags for filtering the results of the query',
						type: 'multiOptions',
						default: {},
						options: [
							{
								name: 'Story',
								description: 'Returns query results filtered by story tag',
								type: '',
								default: '',
							},
							{
								name: 'Comment',
								description: 'Returns query results filtered by comment tag',
								type: '',
								default: '',
							},
							{
								name: 'Poll',
								description: 'Returns query results filtered by poll tag',
								type: '',
								default: '',
							},
							{
								name: 'Show HN',
								description: 'Returns query results filtered by Show HN tag',
								type: '',
								default: '',
							},
							{
								name: 'Ask HN',
								description: 'Returns query results filtered by Ask HN tag',
								type: '',
								default: '',
							},
							{
								name: 'Front Page',
								description: 'Returns query results filtered by Front Page tag',
								type: '',
								default: '',
							},
						],
					},
				],
			},
			{
				displayName: 'Username',
				name: 'username',
				description: 'The Hacker News user to be returned',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: [
							'user',
						],
						operation: [
							'get',
						],
					},
				},
			},
			{
				displayName: 'Username',
				name: 'username',
				description: 'The Hacker News user to be renamed',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: [
							'user',
						],
						operation: [
							'rename',
						],
					},
				},
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: IDataObject[] = [];

		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		let responseData: any;

		for (let i = 0; i < items.length; i++) {

			let qs: IDataObject = {};
			let body: IDataObject = {};

			if (resource === 'article') {

				if (operation === 'get') {

					const articleId = this.getNodeParameter('articleId', i);
					const endpoint = `items/${articleId}`;

					const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
					// TODO: Use additionalFields.fieldName in `qs` or in `body` or as boolean flag

					responseData = await hackerNewsApiRequest.call(this, 'GET', endpoint, body, qs);

				} else if (operation === 'getAll') {

					const endpoint = 'search?';

					const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
					// TODO: Use additionalFields.fieldName in `qs` or in `body` or as boolean flag

					// TODO: Replace TODO_PROPERTY_NAME with the name of the property whose value is all the items
					responseData = await hackerNewsApiRequestAllItems.call(this, TODO_PROPERTY_NAME, 'GET', endpoint, body, qs);

				} else {
					throw new Error(`The operation ${operation} is not known!`);
				}

			} else if (resource === 'user') {

				if (operation === 'get') {

					const username = this.getNodeParameter('username', i);
					const endpoint = `users/${username}`;

					const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
					// TODO: Use additionalFields.fieldName in `qs` or in `body` or as boolean flag

					responseData = await hackerNewsApiRequest.call(this, 'GET', endpoint, body, qs);

				} else if (operation === 'rename') {

					const username = this.getNodeParameter('username', i);
					const endpoint = `users/${username}`;

					const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
					// TODO: Use additionalFields.fieldName in `qs` or in `body` or as boolean flag

					await hackerNewsApiRequest.call(this, 'PUT', endpoint, body, qs);
					responseData = { success: true };

				} else {
					throw new Error(`The operation ${operation} is not known!`);
				}

			} else {
				throw new Error(`The resource ${resource} is not known!`);
			}

			if (Array.isArray(responseData)) {
				returnData.push.apply(returnData, responseData as IDataObject[]);
			} else {
				returnData.push(responseData as IDataObject);
			}

		}

		return [this.helpers.returnJsonArray(returnData)];
	}
}


