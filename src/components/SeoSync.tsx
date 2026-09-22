import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLang } from "../i18n";
import { SEO } from "../seo";

/* After the shell handoff (and on every in-app navigation / language
 * switch) the single built index.html is shared by all routes, so its
 * static canonical/og/title tags are only correct for "/". Keep the head
 * in sync with the real URL: canonical + og:url + twitter:url, the active
 * language's <title>/og:title/twitter:title, and both language-tagged
 * meta descriptions. */

const ORIGIN = "https://ioniandtwin.di.ionio.gr";

function stripTrailingSlash(path: string) {
  return path.replace(/\/+$/, "") || "/";
}

function setCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function setMeta(attr: "property" | "name", key: string, content: string, tagLang?: "el" | "en") {
  const langSelector = tagLang === "en" ? `[lang="en"]` : tagLang === "el" ? ":not([lang])" : "";
  const selector = `meta[${attr}="${key}"]${langSelector}`;
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    if (tagLang === "en") el.setAttribute("lang", tagLang);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export default function SeoSync() {
  const { lang } = useLang();
  const { pathname } = useLocation();

  useEffect(() => {
    const path = stripTrailingSlash(pathname);
    const seo = SEO[path];
    if (!seo) return;

    const url = `${ORIGIN}${path === "/" ? "" : `${path}/`}`;
    const title = lang === "en" ? seo.titleEn : seo.titleEl;

    document.title = title;
    setCanonical(url);
    setMeta("property", "og:url", url);
    setMeta("name", "twitter:url", url);
    setMeta("property", "og:title", title);
    setMeta("name", "twitter:title", title);
    setMeta("property", "og:description", lang === "en" ? seo.descEn : seo.descEl);
    setMeta("name", "twitter:description", lang === "en" ? seo.descEn : seo.descEl);
    setMeta("name", "description", seo.descEl, "el");
    setMeta("name", "description", seo.descEn, "en");
  }, [pathname, lang]);

  return null;
}