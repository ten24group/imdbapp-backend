import { Application, APIConstruct } from '@ten24group/fw24';

var api = new APIConstruct({
	cors: true,
	apiOptions: {
		description: 'Sample App API Gateway',
		deployOptions: {
			stageName: 'v1',
		},
	}
});


import { AuthModule } from '@ten24group/fw24-auth-cognito';

const authModule = new AuthModule({
	userPool: {
		props: {
			selfSignUpEnabled: true,
		}
	},
	groups: [
		{
			name: 'admin',
			// policyFilePaths: [
			// 	'./src/policy/admin.json',
			// ],
			routes: ['mauth/addUserToGroup', 'mauth/removeUserFromGroup'],
		},
		{
			name: 'user',
			autoUserSignup: true,
			// policyFilePaths: [
			// 	'./src/policy/user.json',
			// ],
		}
	],
	useAsDefaultAuthorizer: true
});

import { DynamoDBConstruct } from '@ten24group/fw24';
import { AttributeType } from 'aws-cdk-lib/aws-dynamodb';

const dynamo = new DynamoDBConstruct({
	table: {
		name: 'imdbapp',
		props: {
			partitionKey: {
				name: 'pk',
				type: AttributeType.STRING,
			},
			sortKey: {
				name: 'sk',
				type: AttributeType.STRING,
			},
			globalSecondaryIndexes: [{
				indexName: 'gsi1',
				partitionKey: {
					name: 'gsi1pk',
					type: AttributeType.STRING,
				},
				sortKey: {
					name: 'gsi1sk',
					type: AttributeType.STRING,
				},
			}]
		},
	},
});

import { MailerConstruct } from '@ten24group/fw24';

const ses = new MailerConstruct({
	domain: 'mycompany.com'
});

import { QueueConstruct } from '@ten24group/fw24';

const sqs = new QueueConstruct({
	queuesDirectory: './src/queues'
});

import { TopicConstruct } from '@ten24group/fw24';

const sns = new TopicConstruct([{
	topicName: 'mytopic'
}]);

import { SchedulerConstruct } from '@ten24group/fw24';

const taskScheduler = new SchedulerConstruct({
	tasksDirectory: './src/tasks',
});

import { BucketConstruct } from '@ten24group/fw24';
import { EventType } from 'aws-cdk-lib/aws-s3';
const s3 = new BucketConstruct([
		{
			bucketName: 'mybucket',
			removalPolicy: 'destroy', // Delete the bucket when the stack is deleted
			autoDeleteObjects: true, // Delete all objects when the bucket is deleted
		}
	],
);

const s3withbucket1handler = new BucketConstruct([
		{
			bucketName: 'mybucket1',
			removalPolicy: 'destroy', // Delete the bucket when the stack is deleted
			autoDeleteObjects: true, // Delete all objects when the bucket is deleted
			// bucket with lambda trigger
			triggers: [
				{
					events: [ EventType.OBJECT_CREATED, EventType.OBJECT_REMOVED ],
					destination: 'lambda',
					functionProps: {
						entry: './src/functions/bucket1handler.ts',
						allowSendEmail: true,
					}
				}
			],
		}
	],
);


import { HttpMethods } from 'aws-cdk-lib/aws-s3';

const s3UIConfig = new BucketConstruct([
		{
			// bucket for generated-UI-config
			bucketName: 'uiconfig',
			removalPolicy: 'destroy', // Delete the bucket when the stack is deleted
			autoDeleteObjects: true, // Delete all objects when the bucket is deleted
			source: './gen/config', // Sync data from this folder on deploy
			publicReadAccess: true, // Make the bucket public
			bucketProps: {
				cors: [{
					allowedOrigins: ['*'],
					allowedHeaders: ['*'],
					allowedMethods: [HttpMethods.GET],
				}]
			}
		}
	],
);


import { SiteConstruct } from '@ten24group/fw24';

var amplify = new SiteConstruct({
	appName: 'imdbapp-admin',
    githubBranch: 'develop',
    githubOwner: 'ten24group',
    githubRepo: 'imdbapp-admin',
    secretKeyName : 'github_access_token',
    buildSpec: {
        version: 1,
        frontend: {
            phases: {
                preBuild: {
                    commands: ["npm install"],
                },
                build: {
                    commands: ["npm run build"],
                },
            },
            artifacts: {
                baseDirectory: "dist",
                files: ["**/*"],
            },
            cache: {
                paths: ["node_modules/**/*"],
            },
        },
    }
})


const app = new Application({
	functionProps: {
		bundling: {
			externalModules: ['@aws-sdk'],
		},
	}
})
.use(api)
.use(amplify)
.use(s3UIConfig)
.use(s3withbucket1handler)
.use(s3)
.use(taskScheduler)
.use(sns)
.use(sqs)
.use(ses)
.use(dynamo)
.useModule(authModule)
.run()
;
