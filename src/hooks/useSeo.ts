import { useEffect } from "react";
import { company } from "@/data/company";

interface Seo {
  title: string;
  description: string;
  image?: string;
  path?: string;
  type?: "website" | "article";
}

const setMeta = (attr: "name" | "property", key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

export function useSeo({ title, description, image, path = "/", type = "website" }: Seo) {
  useEffect(() => {
    document.title = title;
    const url = `${company.siteUrl}${path}`;
    setMeta("name", "description", description);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", url);
    setMeta("property", "og:type", type);
    if (image) setMeta("property", "og:image", image);
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url;
  }, [title, description, image, path, type]);
}
