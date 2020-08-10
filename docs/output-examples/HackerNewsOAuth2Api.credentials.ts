import {
	ICredentialType,
	NodePropertyTypes,
} from 'n8n-workflow';


export class HackerNewsOAuth2Api implements ICredentialType {
	name = 'HackerNewsOAuth2Api';
	extends = [
		'oAuth2Api'
	];
	displayName = 'Hacker News OAuth2 API';
	properties = [
		{
			displayName: 'Authorization URL',
			name: 'authUrl',
			type: 'hidden' as NodePropertyTypes,
			// default: '...', // TODO: Fill in authorization URL
		},
		{
			displayName: 'Access Token URL',
			name: 'accessTokenUrl',
			type: 'hidden' as NodePropertyTypes,
			// default: '...', // TODO: Fill in access token URL
		},
		{
			displayName: 'Scope',
			name: 'scope',
			type: 'hidden' as NodePropertyTypes,
			// default: '...', // TODO: Fill in default scopes
		},
		{
			displayName: 'Authentication',
			name: 'authentication',
			type: 'hidden' as NodePropertyTypes,
			// default: '...', // TODO: Select 'header' or 'body'
		},
		// TODO: Select auth query parameters if necessary
		// {
		// 	displayName: 'Auth URI Query Parameters',
		// 	name: 'authQueryParameters',
		// 	type: 'hidden' as NodePropertyTypes,
		// 	default: 'response_type=code',
		// },
		// {
		// 	displayName: 'Auth URI Query Parameters',
		// 	name: 'authQueryParameters',
		// 	type: 'hidden' as NodePropertyTypes,
		// 	default: 'grant_type=authorization_code',
		// },
	];
}