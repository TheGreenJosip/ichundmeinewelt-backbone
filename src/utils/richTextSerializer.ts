/**
 * Rich Text Serializer
 *
 * Converts Keystone document JSON into semantic HTML.
 * Designed to work with Tailwind Typography for styling.
 */
export const serializeRichText = (nodes: any[]): string => {
  return nodes
    .map((node) => {
      switch (node.type) {
        case 'paragraph':
          return `<p>${serializeRichText(node.children || [])}</p>`;
        case 'heading':
          const level = node.level || 2;
          return `<h${level}>${serializeRichText(node.children || [])}</h${level}>`;
        case 'blockquote':
          return `<blockquote>${serializeRichText(node.children || [])}</blockquote>`;
        case 'unordered-list':
          return `<ul>${serializeRichText(node.children || [])}</ul>`;
        case 'ordered-list':
          return `<ol>${serializeRichText(node.children || [])}</ol>`;
        case 'list-item':
          return `<li>${serializeRichText(node.children || [])}</li>`;
        case 'list-item-content':
          return serializeRichText(node.children || []);
        case 'link':
          return `<a href="${node.href}" target="_blank" rel="noopener noreferrer">${serializeRichText(node.children || [])}</a>`;
        case 'image':
          return `<img src="${node.src}" alt="${node.alt || ''}" />`;
        case 'code':
          return `<pre><code>${serializeRichText(node.children || [])}</code></pre>`;
        case 'table':
          return `<table>${serializeRichText(node.children || [])}</table>`;
        case 'table-head':
          return `<thead>${serializeRichText(node.children || [])}</thead>`;
        case 'table-body':
          return `<tbody>${serializeRichText(node.children || [])}</tbody>`;
        case 'table-row':
          return `<tr>${serializeRichText(node.children || [])}</tr>`;
        case 'table-cell':
          return `<td>${serializeRichText(node.children || [])}</td>`;
        default:
          if (node.text) {
            let text = node.text;
            if (node.bold) text = `<strong>${text}</strong>`;
            if (node.italic) text = `<em>${text}</em>`;
            if (node.underline) text = `<u>${text}</u>`;
            if (node.strikethrough) text = `<s>${text}</s>`;
            if (node.code) text = `<code>${text}</code>`;
            return text;
          }
          if (node.children) return serializeRichText(node.children);
          return '';
      }
    })
    .join('');
};