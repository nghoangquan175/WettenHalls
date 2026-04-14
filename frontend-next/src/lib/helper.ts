import * as cheerio from 'cheerio';

export function addTargetBlankToExternalLinks(html: string) {
  const $ = cheerio.load(html);

  $('a').each((index, element) => {
    const href = $(element).attr('href');
    if (href && href.startsWith('http') && !href.startsWith(process.env.SITE_URL || '')) {
      $(element).attr('target', '_blank');
      $(element).attr('rel', 'noopener noreferrer');
    }
  });

  return $.html();
}
