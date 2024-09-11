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

const app = new Application({
	functionProps: {
		bundling: {
			externalModules: ['@aws-sdk'],
		},
	}
})
.use(api)
.run()
;
