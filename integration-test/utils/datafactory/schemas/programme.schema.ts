import { heroSectionSchema } from './hero.section.schema';
import { commonsectionSchema } from './commonsection.schema';
import { contactSchema } from './contact.schema';
import { linkSchema } from './link.schema';
import { eventSchema } from './event.schema';
import { customStyleSchema } from './custom.style.schema';

export const programmePageSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    heroSection: { ...heroSectionSchema.definitions.heroSectionSchema },
    section: { ...commonsectionSchema.definitions.commonsectionSchema },
    contact: { ...contactSchema.definitions.contactSchema },
    programmeDetails: {
      type: 'array',
      items: [
        {
          type: 'object',
          properties: {
            title: {
              type: 'string',
            },
            description: {
              type: 'string',
            },
            card: { ...commonsectionSchema.definitions.commonsectionSchema },
          },
          additionalProperties: false,
          required: ['title', 'description', 'card'],
        },
      ],
    },
    eventSection: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
        },
        link: { ...linkSchema.definitions.linkSchema },
        events: { ...eventSchema.definitions.eventSchema },
      },
      additionalProperties: false,
      required: ['title', 'link'],
    },
    customStyle: { ...customStyleSchema.definitions.customStyleSchema },
  },
  additionalProperties: false,
  required: ['id', 'heroSection', 'section', 'contact', 'programmeDetails', 'eventSection', 'customStyle'],
};
