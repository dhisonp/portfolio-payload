import { GlobalConfig } from 'payload/types';
import { HTMLConverterFeature, lexicalEditor, lexicalHTML } from '@payloadcms/richtext-lexical';

export const Bio: GlobalConfig = {
  slug: 'bio-global',
  access: {
    read: () => true,
  },
  fields: [
    {
      // NOTE: Is it possible to not include the Lexical JSON in the response?
      name: 'content',
      type: 'richText',
      required: true,
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          // The HTMLConverter Feature is the feature which manages the HTML serializers.
          // If you do not pass any arguments to it, it will use the default serializers.
          HTMLConverterFeature({}),
        ],
      }),
    },
    lexicalHTML('content', { name: 'html' }),
  ],
};

export default Bio;
