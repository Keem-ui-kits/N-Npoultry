"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import type { ProductDetail } from "@/lib/products-data";

type Topic = Pick<ProductDetail, "slug" | "breadcrumb" | "accent" | "faq">;

export function FaqExplorer({ topics }: { topics: Topic[] }) {
  const [query, setQuery] = useState("");
  const [activeSlug, setActiveSlug] = useState(topics[0]?.slug ?? "");
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const normalizedQuery = query.trim().toLowerCase();

  const filteredTopics = useMemo(() => {
    if (!normalizedQuery) return topics;
    return topics
      .map((topic) => ({
        ...topic,
        faq: topic.faq.filter(
          (item) =>
            item.q.toLowerCase().includes(normalizedQuery) ||
            item.a.toLowerCase().includes(normalizedQuery)
        ),
      }))
      .filter((topic) => topic.faq.length > 0);
  }, [normalizedQuery, topics]);

  useEffect(() => {
    if (normalizedQuery) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const slug = entry.target.getAttribute("data-slug") as Topic["slug"] | null;
            if (slug) setActiveSlug(slug);
          }
        });
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0.01 }
    );
    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [normalizedQuery, topics]);

  const scrollToTopic = (slug: Topic["slug"]) => {
    setActiveSlug(slug);
    sectionRefs.current[slug]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/* Hero card */}
      <section style={{ background: "var(--color-cream)", padding: "clamp(60px, 9vw, 130px) clamp(20px, 4vw, 56px) clamp(40px, 5vw, 70px)" }}>
        <div
          className="grid grid-cols-12 gap-8 items-center"
          style={{
            maxWidth: "var(--container-site)",
            margin: "0 auto",
            background: "rgba(17,17,17,.04)",
            borderRadius: 28,
            padding: "clamp(28px, 4vw, 56px)",
          }}
        >
          <div className="col-span-12 md:col-span-6">
            <div className="flex items-center gap-3.5" style={{ marginBottom: 26 }}>
              <span style={{ width: 44, height: 1, background: "var(--color-terracotta)", display: "inline-block" }} />
              <span className="font-mono uppercase" style={{ fontSize: 11, letterSpacing: ".24em", color: "rgba(17,17,17,.55)" }}>
                FAQ / Help Center
              </span>
            </div>
            <h1 style={{ margin: 0, fontSize: "clamp(42px, 6vw, 80px)", fontWeight: 800, lineHeight: 0.92, letterSpacing: "-.035em" }}>
              Questions,
              <br />
              answered.
            </h1>
            <p style={{ marginTop: 26, maxWidth: "42ch", fontSize: "clamp(16px, 1.2vw, 19px)", lineHeight: 1.6, color: "rgba(17,17,17,.66)" }}>
              Everything customers ask about eggs, manure and hens. Can&apos;t find it here — search below or send us a message.
            </p>
            <div className="flex flex-col sm:flex-row" style={{ gap: 12, marginTop: 34 }}>
              <div
                className="flex items-center flex-1"
                style={{ background: "var(--color-cream)", border: "1px solid rgba(17,17,17,.2)", borderRadius: 10, padding: "4px 4px 4px 18px", gap: 10 }}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, opacity: 0.5 }}>
                  <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                  <path d="M21 21l-4.3-4.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search the N&N FAQ"
                  className="flex-1 bg-transparent border-0 outline-none"
                  style={{ fontSize: 15, padding: "12px 0", color: "var(--color-dark)", fontFamily: "inherit" }}
                />
              </div>
              <button
                type="button"
                onClick={() => document.getElementById("faq-results")?.scrollIntoView({ behavior: "smooth" })}
                className="font-semibold"
                style={{
                  background: "var(--color-terracotta)",
                  color: "var(--color-cream)",
                  border: 0,
                  borderRadius: 10,
                  padding: "16px 30px",
                  fontSize: 15,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                Search
              </button>
            </div>
          </div>
          <div className="col-span-12 md:col-span-6">
            <div className="relative" style={{ borderRadius: 20, overflow: "hidden", aspectRatio: "5/4" }}>
              <Image src="/farm-sign.jpeg" alt="N&N Poultry Farm" fill sizes="(max-width: 900px) 100vw, 42vw" style={{ objectFit: "cover" }} />
            </div>
          </div>
        </div>
      </section>

      {/* Topics + accordion */}
      <section id="faq-results" style={{ background: "var(--color-cream)", padding: "0 clamp(20px, 4vw, 56px) clamp(90px, 10vw, 150px)" }}>
        <div className="grid grid-cols-12 gap-8" style={{ maxWidth: "var(--container-site)", margin: "0 auto" }}>
          {/* Sidebar */}
          <div className="col-span-12 md:col-span-3">
            <div style={{ position: "sticky", top: 130 }}>
              <div className="font-mono uppercase" style={{ fontSize: 11, letterSpacing: ".2em", color: "rgba(17,17,17,.45)", marginBottom: 18 }}>
                Topics
              </div>
              <nav className="flex flex-row md:flex-col flex-wrap" style={{ gap: 8 }}>
                {topics.map((topic) => {
                  const isActive = !normalizedQuery && activeSlug === topic.slug;
                  return (
                    <button
                      key={topic.slug}
                      type="button"
                      onClick={() => scrollToTopic(topic.slug)}
                      className="flex items-center gap-3 text-left"
                      style={{
                        padding: "12px 16px",
                        borderRadius: 8,
                        background: isActive ? "rgba(17,17,17,.06)" : "transparent",
                        border: 0,
                        cursor: "pointer",
                        fontSize: 15,
                        fontWeight: isActive ? 700 : 500,
                        color: isActive ? "var(--color-dark)" : "rgba(17,17,17,.6)",
                      }}
                    >
                      <span style={{ width: 8, height: 8, borderRadius: "50%", background: topic.accent, display: "inline-block", flexShrink: 0 }} />
                      {topic.breadcrumb}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Accordion groups */}
          <div className="col-span-12 md:col-span-8 md:col-start-5">
            {filteredTopics.length === 0 && (
              <p style={{ fontSize: 18, color: "rgba(17,17,17,.6)", padding: "40px 0" }}>
                No questions match &ldquo;{query}&rdquo;. Try a different word, or send us a message.
              </p>
            )}
            {filteredTopics.map((topic) => (
              <div
                key={topic.slug}
                ref={(el) => {
                  sectionRefs.current[topic.slug] = el;
                }}
                data-slug={topic.slug}
                id={`${topic.slug}-faq`}
                style={{ marginBottom: 56, scrollMarginTop: 130 }}
              >
                <div className="flex items-center gap-3.5" style={{ marginBottom: 4 }}>
                  <span style={{ width: 26, height: 3, background: topic.accent, display: "inline-block" }} />
                  <h2 style={{ margin: 0, fontSize: "clamp(24px, 2.4vw, 34px)", fontWeight: 700, letterSpacing: "-.02em" }}>
                    {topic.breadcrumb}
                  </h2>
                </div>
                <div style={{ borderTop: "1px solid rgba(17,17,17,.2)", marginTop: 20 }}>
                  {topic.faq.map((item) => (
                    <details key={item.q} style={{ borderBottom: "1px solid rgba(17,17,17,.16)" }}>
                      <summary
                        className="flex justify-between items-baseline"
                        style={{ gap: 32, padding: "26px 4px", listStyle: "none", cursor: "pointer" }}
                      >
                        <span style={{ fontSize: "clamp(17px, 1.6vw, 20px)", fontWeight: 600, letterSpacing: "-.01em" }}>{item.q}</span>
                        <span
                          className="nn-plus"
                          style={{
                            fontSize: 22,
                            fontWeight: 300,
                            color: "var(--color-terracotta)",
                            display: "inline-block",
                            transition: "transform .45s var(--ease-editorial)",
                            flexShrink: 0,
                          }}
                        >
                          +
                        </span>
                      </summary>
                      <p style={{ margin: "0 0 26px", padding: "0 4px", fontSize: 16, lineHeight: 1.7, color: "rgba(17,17,17,.68)", maxWidth: "56ch" }}>
                        {item.a}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
