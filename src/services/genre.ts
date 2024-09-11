export * as GenreService from './genre';
import { BaseEntityService } from '@ten24group/fw24';
import { Dynamo } from '../db/imdbapp.dynamo.client';
import { Genre } from '../entities/genre';

export class Service extends BaseEntityService<Genre.GenreSchemaType> {

}

export const factory = () => {
	console.log("called: genreService factory");
	const schema = Genre.createGenreSchema();
	return new Service(schema, Dynamo.DefaultEntityConfiguration);
}
