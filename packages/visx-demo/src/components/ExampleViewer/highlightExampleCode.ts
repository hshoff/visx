import rehypePrettyCode from 'rehype-pretty-code';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

/**
 * Server-only: highlight TSX source with Shiki via rehype-pretty-code (VS Code dark-plus / github-light).
 */
export async function highlightExampleCode(source: string): Promise<string> {
  const md = `\n\`\`\`tsx\n${source.replace(/\n$/, '')}\n\`\`\`\n`;

  const file = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypePrettyCode, {
      theme: {
        dark: 'dark-plus',
        light: 'github-light',
      },
      defaultLang: {
        block: 'tsx',
      },
    })
    .use(rehypeStringify)
    .process(md);

  return String(file);
}
