export * as CastType from './castType';

import { randomUUID } from 'crypto';

import {
	createEntitySchema,
	DefaultEntityOperations,
	EntityTypeFromSchema,
	EntityInputValidations,
	Narrow,
	TEntityOpsInputSchemas,
} from '@ten24group/fw24';


export const createCastTypeSchema = () => createEntitySchema({
	model: {
		version: '1',
		entity: 'castType',
		entityNamePlural: 'castTypes',
		entityOperations: DefaultEntityOperations,
		service: 'castTypes', // electro DB service name [logical group of entities]
	},
	attributes: {
		castTypeId: {
			type: 'string',
			required: true,
			readOnly: true,
			isVisible: false,
			isEditable: false,
			isCreatable: false,
			isIdentifier: true, // this is required to make the listing actions work
			default: () => randomUUID()
		},
		castTypeName: {type: 'string', required: true},
		
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
				composite: ['castTypeId'],
			},
			sk: {
				field: 'sk',
				composite: [],
			},
		},
	},

} as const);

export const CastTypeSchema = createCastTypeSchema();
export type CastTypeSchemaType = ReturnType<typeof createCastTypeSchema>
export type CastTypeEntityType = EntityTypeFromSchema<CastTypeSchemaType>
export type CastTypeOpsInputSchemas = Narrow<TEntityOpsInputSchemas<CastTypeSchemaType>>


export const CastTypeValidations: EntityInputValidations<CastTypeSchemaType> = {
	// Name: [
	// 	{ datatype: 'string', required:true, minLength: 3, maxLength: 10, operations: ['create'] },
	// ],
}