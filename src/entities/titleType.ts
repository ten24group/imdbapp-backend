export * as TitleType from './titleType';

import { randomUUID } from 'crypto';

import {
	createEntitySchema,
	DefaultEntityOperations,
	EntityTypeFromSchema,
	EntityInputValidations,
	Narrow,
	TEntityOpsInputSchemas,
} from '@ten24group/fw24';


export const createTitleTypeSchema = () => createEntitySchema({
	model: {
		version: '1',
		entity: 'titleType',
		entityNamePlural: 'titleTypes',
		entityOperations: DefaultEntityOperations,
		service: 'titleTypes', // electro DB service name [logical group of entities]
	},
	attributes: {
		titleTypeId: {
			type: 'string',
			required: true,
			readOnly: true,
			isVisible: false,
			isEditable: false,
			isCreatable: false,
			isIdentifier: true, // this is required to make the listing actions work
			default: () => randomUUID()
		},
		titleTypeName: {type: 'string', required: true},
		description: {type: 'string', required: true},
		
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
				composite: ['titleTypeId'],
			},
			sk: {
				field: 'sk',
				composite: [],
			},
		},
	},

} as const);

export const TitleTypeSchema = createTitleTypeSchema();
export type TitleTypeSchemaType = ReturnType<typeof createTitleTypeSchema>
export type TitleTypeEntityType = EntityTypeFromSchema<TitleTypeSchemaType>
export type TitleTypeOpsInputSchemas = Narrow<TEntityOpsInputSchemas<TitleTypeSchemaType>>


export const TitleTypeValidations: EntityInputValidations<TitleTypeSchemaType> = {
	// Name: [
	// 	{ datatype: 'string', required:true, minLength: 3, maxLength: 10, operations: ['create'] },
	// ],
}