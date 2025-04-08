import { getCollection } from "astro:content";

const tagToSlug = (tag: string) => {
  return tag
    .toLowerCase()
    .replace(/\W+/g, '-')
    .replace(/^-|-$/g, '');
}

export const posts = (await getCollection('blog')).sort((a, b) => {
  return b.data.pubDate.getTime() - a.data.pubDate.getTime();
});

const tagsMap = new Map<string, number>();

for (const post of posts) {
  for (const tag of post.data.tags) {
    if (!tagsMap.has(tag)) {
      tagsMap.set(tag, 1);
    }
    else {
      tagsMap.set(tag, tagsMap.get(tag)! + 1);
    }
  }
}

export const tags = Array.from(tagsMap.entries()).sort((a, b) => {
  return a[0].localeCompare(b[0]);
}).map(([tag, count]) => ({
  name: tag,
  slug: tagToSlug(tag),
  count,
}));