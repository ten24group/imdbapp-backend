export * as TitleService from './title';
import { BaseEntityService } from '@ten24group/fw24';
import { Dynamo } from '../db/imdbapp.dynamo.client';
import { Title } from '../entities/title';

export class Service extends BaseEntityService<Title.TitleSchemaType> {

}

export const factory = () => {
	console.log("called: titleService factory");
	const schema = Title.createTitleSchema();
	return new Service(schema, Dynamo.DefaultEntityConfiguration);
}
