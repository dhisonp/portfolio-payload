import { CollectionConfig } from 'payload/types';
import canUpdateUser from '../access/can-update-user';
import payload from 'payload';
import { validateText, validateUrl } from '../composables/utils';

export const Section: CollectionConfig = {
  slug: 'section',
  admin: {
    useAsTitle: 'heading',
  },
  access: {
    // TODO: Test CRD in Postman
    create: canUpdateUser,
    delete: canUpdateUser,
    read: () => true,
    update: canUpdateUser,
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      required: true,
      validate: value => {
        return validateText(value);
      },
    },
    {
      name: 'content',
      type: 'text',
      label: 'Content',
      required: true,
      validate: value => {
        if (value.length > 0 && value.length <= 396) return true;

        return 'Content cannot be empty or exceed 200 characters';
      },
    },
    {
      name: 'emoji',
      type: 'text',
      label: 'Emoji',
      required: false,
      validate: value => {
        if (!value) return true;

        const emojiRegex = /^(?:\p{Emoji_Presentation}|\p{Emoji}\uFE0F)$/u;
        if (emojiRegex.test(value)) return true;

        return 'Invalid emoji';
      },
    },
    {
      name: 'order',
      type: 'number',
      label: 'Sort order',
      required: false,
      defaultValue: Number.MAX_SAFE_INTEGER,
      validate: value => {
        if (value >= 0) return true;

        return 'Order must be a positive integer';
      },
    },
    {
      name: 'links',
      type: 'array',
      label: 'Links',
      maxRows: 4,
      labels: {
        singular: 'Link',
        plural: 'Links',
      },
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
          validate: value => {
            return validateText(value);
          },
        },
        {
          name: 'url',
          type: 'text',
          label: "URL",
          required: true,
          validate: value => {
            if (validateUrl(value)) return true;

            return 'Invalid URL';
          },
        },
      ],
    },
  ],
  endpoints: [
    {
      path: '/ordered',
      method: 'get',
      handler: async (req, res) => {
        const sections = await payload.find({
          collection: 'section',
          sort: 'order',
        });

        if (sections) {
          res.status(200).send(sections);
        } else {
          res.status(404).send({ message: 'No sections found' });
        }
      },
    },
  ],
};

export default Section;
