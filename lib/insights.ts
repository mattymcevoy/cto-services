import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export type InsightMeta = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  author?: string;
};

export type Insight = InsightMeta & {
  contentHtml: string;
};

const insightsDirectory = path.join(process.cwd(), "content/insights");

export function getSortedInsights(): InsightMeta[] {
  const fileNames = fs.readdirSync(insightsDirectory);

  const allInsights = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(insightsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);

    return {
      slug,
      ...(matterResult.data as Omit<InsightMeta, "slug">),
    };
  });

  return allInsights.sort((a, b) => {
    if (a.date < b.date) return 1;
    if (a.date > b.date) return -1;
    return 0;
  });
}

export function getAllInsightSlugs(): { slug: string }[] {
  const fileNames = fs.readdirSync(insightsDirectory);

  return fileNames.map((fileName) => ({
    slug: fileName.replace(/\.md$/, ""),
  }));
}

export async function getInsightBySlug(slug: string): Promise<Insight> {
  const fullPath = path.join(insightsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);

  const contentHtml = processedContent.toString();

  return {
    slug,
    contentHtml,
    ...(matterResult.data as Omit<Insight, "slug" | "contentHtml">),
  };
}
