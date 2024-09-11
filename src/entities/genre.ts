export * as Genre from './genre';

import { randomUUID } from 'crypto';

import {
	createEntitySchema,
	DefaultEntityOperations,
	EntityTypeFromSchema,
	EntityInputValidations,
	Narrow,
	TEntityOpsInputSchemas,
} from '@ten24group/fw24';


export const createGenreSchema = () => createEntitySchema({
	model: {
		version: '1',
		entity: 'genre',
		entityNamePlural: 'genres',
		entityOperations: DefaultEntityOperations,
		service: 'genres', // electro DB service name [logical group of entities]
	},
	attributes: {
		genreId: {
			type: 'string',
			required: true,
			readOnly: true,
			isVisible: false,
			isEditable: false,
			isCreatable: false,
			isIdentifier: true, // this is required to make the listing actions work
			default: () => randomUUID()
		},
		genreName: {type: 'string', required: true},
		
		createdAt: {
			// will be set once at the time of create
			type: "string",
			readOnly: true,
			required: true,
			isCreatable: false,
			isEditable: false,
			isListable: false,
			default: () => new Date().toISOString(),
			set: () => new Date().toISOString(),
		},
		updatedAt:{
			type: "string",
			watch: "*", // will be set every time any prop is updated
			required: true,
			readOnly: true,
			isCreatable: false,
			isEditable: false,
			isListable: false,
			default: () => new Date().toISOString(),
			set: () => new Date().toISOString(),
		},
	},
	indexes: {
		primary: {
			pk: {
				field: 'pk',
				composite: ['genreId'],
			},
			sk: {
				field: 'sk',
				composite: [],
			},
		},
	},

} as const);

export const GenreSchema = createGenreSchema();
export type GenreSchemaType = ReturnType<typeof createGenreSchema>
export type GenreEntityType = EntityTypeFromSchema<GenreSchemaType>
export type GenreOpsInputSchemas = Narrow<TEntityOpsInputSchemas<GenreSchemaType>>


export const GenreValidations: EntityInputValidations<GenreSchemaType> = {
	// Name: [
	// 	{ datatype: 'string', required:true, minLength: 3, maxLength: 10, operations: ['create'] },
	// ],
}