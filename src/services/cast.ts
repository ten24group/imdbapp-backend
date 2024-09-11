export * as CastService from './cast';
import { BaseEntityService } from '@ten24group/fw24';
import { Dynamo } from '../db/imdbapp.dynamo.client';
import { Cast } from '../entities/cast';

export class Service extends BaseEntityService<Cast.CastSchemaType> {

}

export const factory = () => {
	console.log("called: castService factory");
	const schema = Cast.createCastSchema();
	return new Service(schema, Dynamo.DefaultEntityConfiguration);
}
