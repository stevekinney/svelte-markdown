import type { PreprocessorGroup, Processed } from 'svelte/compiler';

import { processMarkdown } from './markdown-to-html.js';
import { matchesExtension } from './matches-extension.js';

export type SvelteMarkdownPluginOptions = {
  extensions?: string | string[];
};

type SvelteFile = {
  content: string;
  filename?: string;
};

export const markdown = ({
  extensions = ['.md'],
}: SvelteMarkdownPluginOptions = {}): PreprocessorGroup => {
  return {
    name: 'svelte-markdown',
    markup({ content, filename }: SvelteFile): Promise<Processed> | void {
      if (matchesExtension(filename, extensions)) {
        return processMarkdown({ content, filename });
      }
    },
  };
};

export default markdown;
