import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = (await getCollection('posts'))
    .filter(p => !p.data.draft)
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  return rss({
    title: "jskyzero's blog",
    description: '用来分享编程与计算机科学相关的内容。',
    site: context.site,
    items: posts.map(post => ({
      title: post.data.title,
      description: post.data.description || '',
      pubDate: post.data.date,
      link: `/posts/${post.slug}`,
    })),
  });
}
