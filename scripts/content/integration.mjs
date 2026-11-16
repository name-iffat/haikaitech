import { fileURLToPath } from 'node:url';
import { assertPublication } from '../../src/lib/content/publication.mjs';
import { writeArtifacts } from './artifacts.mjs';

export default function publicationControls() {
  let root;
  return {
    name: 'haikaitech-publication-controls',
    hooks: {
      'astro:config:setup': ({ command, config }) => {
        root = fileURLToPath(config.root);
        // Runs for every Astro build, including `astro build --mode development`.
        if (command === 'build') assertPublication(root);
      },
      'astro:build:done': ({ dir }) => writeArtifacts(root, fileURLToPath(dir)),
    },
  };
}
