"use client";

import React from "react";
import { cn } from "@/lib/utils";

type DocSection = {
  id?: string;
  title: string;
  content?: string[];   // párrafos
  list?: string[];      // bullet points
};

export type DocsArticle = {
  title: string;
  subtitle: string;
  introduction?: string; // con \n o \n\n
  docContent: DocSection[];
  effectiveDate?: string;
  lastUpdated?: string;
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

export function DocsArticleRenderer({
  article,
  className,
}: {
  article: DocsArticle;
  className?: string;
}) {
  const { title, subtitle, introduction, docContent, effectiveDate } = article;

  const introParas =
    introduction?.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean) ?? [];

  return (
    <article className={cn("prose prose-invert max-w-3xl", className)}>
      <h1 className="text-3xl mb-4">{title}</h1>

      {effectiveDate && (
        <p className="text-sm text-neutral-400">
          <span className="text-md font-medium">{subtitle}:</span> {effectiveDate}
        </p>
      )}

      {introParas.length > 0 && (
        <section className="mt-4">
          {introParas.map((para, i) => (
            <p key={i} className="whitespace-pre-wrap text-neutral-300">
              {para}
            </p>
          ))}
        </section>
      )}

      {docContent.map((sec, idx) => {
        const id = sec.id ?? slugify(sec.title);
        return (
          <section key={id || idx} id={id} className="mt-8">
            <h2 className="text-md font-medium mb-3">{sec.title}</h2>

            {sec.content?.map((para, i) => (
              <p key={i} className="whitespace-pre-wrap text-neutral-300">
                {para}
              </p>
            ))}

            {sec.list && sec.list.length > 0 && (
              <ul
                className={cn(
                  "list-disc space-y-1",
                  // usa padding a la izquierda en LTR y a la derecha en RTL
                  "pl-6 rtl:pl-0 rtl:pr-6"
                )}
              >
                {sec.list.map((li, i) => (
                  <li key={i} className="text-neutral-300">
                    {li}
                  </li>
                ))}
              </ul>
            )}
          </section>
        );
      })}
    </article>
  );
}
