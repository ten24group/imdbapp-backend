export * as Dynamo from './imdbapp.dynamo.client';

import { EntityConfiguration } from 'electrodb';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { createLogger } from '@ten24group/fw24';

export const DefaultDynamoDBClient = new DynamoDBClient({});

const tableEnvKey = `${'imdbapp'}_table`.toUpperCase();
//@ts-ignore
const processTableName = process.env[tableEnvKey];

const logger = createLogger('DefaultDynamoClient:');

export const DefaultEntityConfiguration: EntityConfiguration = {
	table: processTableName,
	client: DefaultDynamoDBClient,
	logger: (event) => {
		logger.debug('-- event -- ', JSON.stringify(event, null, 4) );
	},
};
