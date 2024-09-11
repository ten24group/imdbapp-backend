export * as Cast from './cast';

import { randomUUID } from 'crypto';

import {
	createEntitySchema,
	DefaultEntityOperations,
	EntityTypeFromSchema,
	EntityInputValidations,
	Narrow,
	TEntityOpsInputSchemas,
} from '@ten24group/fw24';


export const createCastSchema = () => createEntitySchema({
	model: {
		version: '1',
		entity: 'cast',
		entityNamePlural: 'casts',
		entityOperations: DefaultEntityOperations,
		service: 'casts', // electro DB service name [logical group of entities]
	},
	attributes: {
		castId: {
			type: 'string',
			required: true,
			readOnly: true,
			isVisible: false,
			isEditable: false,
			isCreatable: false,
			isIdentifier: true, // this is required to make the listing actions work
			default: () => randomUUID()
		},
		castName: {type: 'string', required: true},
		
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
				composite: ['castId'],
			},
			sk: {
				field: 'sk',
				composite: [],
			},
		},
	},

} as const);

export const CastSchema = createCastSchema();
export type CastSchemaType = ReturnType<typeof createCastSchema>
export type CastEntityType = EntityTypeFromSchema<CastSchemaType>
export type CastOpsInputSchemas = Narrow<TEntityOpsInputSchemas<CastSchemaType>>


export const CastValidations: EntityInputValidations<CastSchemaType> = {
	// Name: [
	// 	{ datatype: 'string', required:true, minLength: 3, maxLength: 10, operations: ['create'] },
	// ],
}