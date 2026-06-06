import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: process.env.NODE_ENV === 'production' 
    ? {
        kind: 'github',
        repo: 'name-iffat/haikaitech-portfolio',
        branch: 'feat/keystatic-integration',
      }
    : {
        kind: 'local',
      },
  collections: {
    projects: collection({
      label: 'Projects',
      slugField: 'name',
      path: 'src/content/projects/*',
      format: { contentField: 'content' },
      schema: {
        name: fields.slug({ name: { label: 'Name' } }),
        purpose: fields.text({ label: 'Purpose' }),
        link: fields.url({ label: 'Link' }),
        image: fields.image({
          label: 'Image',
          directory: 'src/assets/projects',
          publicPath: '../../assets/projects/',
        }),
        accentColor: fields.text({ label: 'Accent Color (Tailwind classes)' }),
        theme: fields.select({
          label: 'Theme',
          options: [
            { label: 'Bear', value: 'bear' },
            { label: 'Hijrah', value: 'hijrah' },
            { label: 'Dentex', value: 'dentex' },
            { label: 'Crypto', value: 'crypto' },
            { label: 'Pizza', value: 'pizza' },
            { label: 'Murtajiz', value: 'murtajiz' },
            { label: 'Medin', value: 'medin' },
          ],
          defaultValue: 'murtajiz',
        }),
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tags',
          itemLabel: (props) => props.value,
        }),
        skills: fields.array(fields.text({ label: 'Skill' }), {
          label: 'Skills',
          itemLabel: (props) => props.value,
        }),
        content: fields.markdoc({ label: 'Content' }),
      },
    }),
  },
});
