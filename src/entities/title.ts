export * as Title from './title';

import { CastTypeSchema } from './castType';
 import { CastSchema } from './cast';
 import { CountrySchema } from './country';
 import { GenreSchema } from './genre';
 import { TitleTypeSchema } from './titleType';
 import { createEntityRelation } from '@ten24group/fw24';
 import { randomUUID } from 'crypto';

import {
	createEntitySchema,
	DefaultEntityOperations,
	EntityTypeFromSchema,
	EntityInputValidations,
	Narrow,
	TEntityOpsInputSchemas,
} from '@ten24group/fw24';


export const createTitleSchema = () => createEntitySchema({
	model: {
		version: '1',
		entity: 'title',
		entityNamePlural: 'titles',
		entityOperations: DefaultEntityOperations,
		service: 'titles', // electro DB service name [logical group of entities]
	},
	attributes: {
		titleId: {
			type: 'string',
			required: true,
			readOnly: true,
			isVisible: false,
			isEditable: false,
			isCreatable: false,
			isIdentifier: true, // this is required to make the listing actions work
			default: () => randomUUID()
		},
		titleName: {type: 'string', required: true},
		titleSummary: {type: 'string', required: true},
		
		storyline: {
			type: 'list',
			fieldType: 'wysiwyg',
			isListable: false,
			items: { type: 'any' },
		},
		releaseDate: {
			type: 'string',
			fieldType: 'date',
		},
		titleType: {
			type: 'string',
            relation: createEntityRelation({
                entity: TitleTypeSchema,
                type: 'many-to-one',
                identifiers: {
                    source: 'titleType',
                    target: 'titleTypeId',
                }
            }),
            fieldType: 'select',
            addNewOption: {
                entityName: 'titleType',
            },
            options: {
                apiUrl: '/titletype',
                apiMethod: 'GET',
                responseKey: 'items',
                optionMapping: {
                    label: 'titleTypeName',
                    value: 'titleTypeId',
                }
            },
            isListable: false,

		},
		genre: {
			type: 'string',
            relation: createEntityRelation({
                entity: GenreSchema,
                type: 'many-to-one',
                identifiers: {
                    source: 'genre',
                    target: 'genreId',
                }
            }),
            fieldType: 'select',
            addNewOption: {
                entityName: 'genre',
            },
            options: {
                apiUrl: '/genre',
                apiMethod: 'GET',
                responseKey: 'items',
                optionMapping: {
                    label: 'genreName',
                    value: 'genreId',
                }
            },
            isListable: false,

		},
		country: {
			type: 'list', items: {type: 'any'},
            relation: createEntityRelation({
                entity: CountrySchema,
                type: 'many-to-one',
                identifiers: {
                    source: 'country',
                    target: 'countryId',
                }
            }),
            fieldType: 'multi-select',
            addNewOption: {
                entityName: 'country',
            },
            options: {
                apiUrl: '/country',
                apiMethod: 'GET',
                responseKey: 'items',
                optionMapping: {
                    label: 'countryName',
                    value: 'countryId',
                }
            },
            isListable: false,

		},
		casts: {
            isListable: false,
            type: 'list',
            items: {
                type: 'map',
                properties: {
                    cast: {
			// @ts-ignore
			            relation: createEntityRelation({
                entity: CastSchema,
                type: 'many-to-one',
                identifiers: {
                    source: 'cast',
                    target: 'castId',
                }
            }),
            fieldType: 'select',
            addNewOption: {
                entityName: 'cast',
            },
            options: {
                apiUrl: '/cast',
                apiMethod: 'GET',
                responseKey: 'items',
                optionMapping: {
                    label: 'castName',
                    value: 'castId',
                }
            },
            isListable: false,

		},
		castType: {
			// @ts-ignore
			            relation: createEntityRelation({
                entity: CastTypeSchema,
                type: 'many-to-one',
                identifiers: {
                    source: 'castType',
                    target: 'castTypeId',
                }
            }),
            fieldType: 'select',
            addNewOption: {
                entityName: 'castType',
            },
            options: {
                apiUrl: '/casttype',
                apiMethod: 'GET',
                responseKey: 'items',
                optionMapping: {
                    label: 'castTypeName',
                    value: 'castTypeId',
                }
            },
            isListable: false,

		},
		
                }
            }
        },
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
				composite: ['titleId'],
			},
			sk: {
				field: 'sk',
				composite: [],
			},
		},
	},

} as const);

export const TitleSchema = createTitleSchema();
export type TitleSchemaType = ReturnType<typeof createTitleSchema>
export type TitleEntityType = EntityTypeFromSchema<TitleSchemaType>
export type TitleOpsInputSchemas = Narrow<TEntityOpsInputSchemas<TitleSchemaType>>


export const TitleValidations: EntityInputValidations<TitleSchemaType> = {
	// Name: [
	// 	{ datatype: 'string', required:true, minLength: 3, maxLength: 10, operations: ['create'] },
	// ],
}