export * as Country from './country';

import { randomUUID } from 'crypto';

import {
	createEntitySchema,
	DefaultEntityOperations,
	EntityTypeFromSchema,
	EntityInputValidations,
	Narrow,
	TEntityOpsInputSchemas,
} from '@ten24group/fw24';


export const createCountrySchema = () => createEntitySchema({
	model: {
		version: '1',
		entity: 'country',
		entityNamePlural: 'countries',
		entityOperations: DefaultEntityOperations,
		service: 'countries', // electro DB service name [logical group of entities]
	},
	attributes: {
		countryId: {
			type: 'string',
			required: true,
			readOnly: true,
			isVisible: false,
			isEditable: false,
			isCreatable: false,
			isIdentifier: true, // this is required to make the listing actions work
			default: () => randomUUID()
		},
		countryName: {type: 'string', required: true},
		
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
				composite: ['countryId'],
			},
			sk: {
				field: 'sk',
				composite: [],
			},
		},
	},

} as const);

export const CountrySchema = createCountrySchema();
export type CountrySchemaType = ReturnType<typeof createCountrySchema>
export type CountryEntityType = EntityTypeFromSchema<CountrySchemaType>
export type CountryOpsInputSchemas = Narrow<TEntityOpsInputSchemas<CountrySchemaType>>


export const CountryValidations: EntityInputValidations<CountrySchemaType> = {
	// Name: [
	// 	{ datatype: 'string', required:true, minLength: 3, maxLength: 10, operations: ['create'] },
	// ],
}