import * as cheerio from 'cheerio';
import React from 'react';

interface RichTextRendererProps {
  content: string;
  className?: string;
}

/**
 * RichTextRenderer component to safely render HTML content from CKEditor
 * with standardized styling across the project.
 * Uses Cheerio on the server to modify/enhance HTML tags.
 */
const RichTextRenderer: React.FC<RichTextRendererProps> = ({ content, className = '' }) => {
  if (!content) return null;

  // Process HTML on the server to enhance tags
  const $ = cheerio.load(content, null, false);

  // 1. Modify <a> tags: add target="_blank" and rel for external links
  $('a').each((_, el) => {
    const href = $(el).attr('href');
    if (href && (href.startsWith('http') || href.startsWith('//'))) {
      $(el).attr('target', '_blank');
      $(el).attr('rel', 'noopener noreferrer');
    }
  });

  // 2. Modify <img> tags: add loading="lazy" for better performance
  $('img').each((_, el) => {
    $(el).attr('loading', 'lazy');
    // Ensure images are responsive if they aren't already
    if (!$(el).hasClass('w-full')) {
      $(el).addClass('w-full h-auto');
    }
  });

  const processedContent = $.html();

  return <div className={`rich-text-content ${className}`} dangerouslySetInnerHTML={{ __html: processedContent }} />;
};

export default RichTextRenderer;
