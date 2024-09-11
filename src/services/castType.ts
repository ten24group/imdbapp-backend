export * as CastTypeService from './castType';
import { BaseEntityService } from '@ten24group/fw24';
import { Dynamo } from '../db/imdbapp.dynamo.client';
import { CastType } from '../entities/castType';

export class Service extends BaseEntityService<CastType.CastTypeSchemaType> {

}

export const factory = () => {
	console.log("called: castTypeService factory");
	const schema = CastType.createCastTypeSchema();
	return new Service(schema, Dynamo.DefaultEntityConfiguration);
}
