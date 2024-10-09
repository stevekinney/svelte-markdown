import type { PreprocessorGroup, Processed } from 'svelte/compiler';

import { processMarkdown } from './markdown-to-html.js';
import { matchesExtension } from './matches-extension.js';

export type SvelteMarkdownPluginOptions = {
  extensions?: string | string[];
};

export const svelteMarkdown = ({
  extensions = ['.md'],
}: SvelteMarkdownPluginOptions = {}): PreprocessorGroup => {
  return {
    name: 'svelte-markdown',
    markup({
      content,
      filename,
    }: {
      content: string;
      filename?: string;
    }): Promise<Processed> | void {
      if (matchesExtension(filename, extensions)) {
        return processMarkdown({ content, filename });
      }
    },
  };
};
