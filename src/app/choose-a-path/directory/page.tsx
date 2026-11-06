import { pathBranches, pathFields, pathFieldHref } from "@/lib/structure";
import { PageIntro } from "@/components/ui";
import { SectionNav, TopicCard } from "@/components/structure-ui";
export const metadata = {
  title: "Explore all learning fields",
};
export default function PathDirectory() {
  return (
    <div className="page-width page-content">
      <PageIntro
        label="CHOOSE A PATH / THE WHOLE PICTURE"
        title="MORE THAN ONE WAY FORWARD."
        description="Explore each field, find a first question and see where a supervised next step could fit."
      />
      <SectionNav
        links={pathBranches.map((b) => ({
          title: b.label,
          href: `/choose-a-path/${b.slug}`,
        }))}
      />
      {pathBranches.map((b) => (
        <section className="field-directory-section" key={b.slug}>
          <h2>{b.title}</h2>
          <p>{b.purpose}</p>
          <div className="structure-grid">
            {pathFields
              .filter((f) => f.branch === b.slug)
              .map((f) => (
                <TopicCard
                  key={f.slug}
                  title={f.title}
                  purpose={f.purpose}
                  href={pathFieldHref(f)}
                  caption="FIELD OVERVIEW"
                />
              ))}
          </div>
        </section>
      ))}
    </div>
  );
}
