import { parse, type Processed } from 'svelte/compiler';
import MagicString from 'magic-string';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import { unified } from 'unified';
import remarkFrontmatter from 'remark-frontmatter';
import matter from 'gray-matter';
import prettier from 'prettier';

const format = (code: string) => prettier.format(code, { parser: 'html' });

const getFronmatter = (content: string) => {
  const result = matter(content.trim());
  return result.data;
};

const getScript = async () => {
  return format(`
    <script>
      let className = '';
      export { className as class };
    </script>
  `);
};

const toExports = async (data: Record<string, unknown>) => {
  return format(`
    <script context="module">
      export const metadata = ${JSON.stringify(data)};
    </script>
  `);
};

const toHTML = async (content: string) => {
  const markup = await unified()
    .use(remarkParse)
    .use(remarkFrontmatter)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(content);

  return format(`<div data-markdown class={className}>${markup}</div>`);
};

export const processMarkdown = async ({
  content,
  filename,
}: {
  content: string;
  filename?: string;
}): Promise<Processed> => {
  const result = new MagicString(content);
  const { html } = parse(content);
  const { start, end } = html;

  const metadata = getFronmatter(content);

  const markup = await toHTML(content.slice(start, end));
  result.update(start, end, String(markup));

  result.prepend(await getScript());

  if (metadata) {
    result.prepend(await toExports(metadata));
  }

  const code = result.toString();
  const map = result.generateMap({ source: filename, hires: true });

  return {
    code,
    map,
  };
};
