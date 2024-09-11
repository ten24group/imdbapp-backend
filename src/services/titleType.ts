export * as TitleTypeService from './titleType';
import { BaseEntityService } from '@ten24group/fw24';
import { Dynamo } from '../db/imdbapp.dynamo.client';
import { TitleType } from '../entities/titleType';

export class Service extends BaseEntityService<TitleType.TitleTypeSchemaType> {

}

export const factory = () => {
	console.log("called: titleTypeService factory");
	const schema = TitleType.createTitleTypeSchema();
	return new Service(schema, Dynamo.DefaultEntityConfiguration);
}
