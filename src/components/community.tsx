"use client";

import { useEffect, useState } from "react";
import { RwmForm, ActionButton } from "./forms";
import { EmptyState } from "./ui";
interface Post {
  _id: string;
  title: string;
  body: string;
  category: string;
}
export function ParentForum({
  demo,
  verified
}: {
  demo: boolean;
  verified: boolean;
}) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState("");
  useEffect(() => {
    if (!demo && verified) fetch("/api/forum").then(async r => {
      const d = await r.json();
      if (!r.ok) setError(d.error);else setPosts(d.posts);
    }).catch(() => setError("The forum could not be loaded."));
  }, [demo, verified]);
  return <>{demo || !verified ? <EmptyState title="A VERIFIED SPACE. A HUMAN REVIEW." description={demo ? "The parent forum is in preview. No live posts or adult verification service are being represented as active." : "A manually verified adult account is required before you can read or write in this separate parent and carer space."} /> : <><h2 className="mt-8">THE CONVERSATION.</h2>{error && <p className="form-feedback">{error}</p>}{posts.length ? posts.map(p => <article key={p._id} className="guide-card mt-5"><span className="mono">{p.category.toUpperCase()}</span><h2>{p.title}</h2><p className="whitespace-pre-wrap">{p.body}</p><div className="flex gap-3 mt-5 flex-wrap"><ActionButton endpoint={`/api/forum/${p._id}`} payload={{
            action: "report",
            reason: "Community rules concern"
          }} label="Report for review" /><ActionButton endpoint={`/api/forum/${p._id}`} payload={{
            action: "block"
          }} label="Hide this post" onDone={() => setPosts(posts.filter(x => x._id !== p._id))} /></div></article>) : <p className="notice">No approved posts yet. Every new contribution is reviewed before appearing.</p>}<h2 className="mt-10">START A CONVERSATION.</h2><RwmForm endpoint="/api/forum" submitLabel="Send to moderation" fields={[{
        name: "category",
        label: "Topic",
        type: "select",
        required: true,
        options: [{
          value: "activities",
          label: "Activities & opportunities"
        }, {
          value: "support",
          label: "General support"
        }, {
          value: "local-ideas",
          label: "Ideas for our area"
        }, {
          value: "parenting",
          label: "Parenting & caring"
        }]
      }, {
        name: "title",
        label: "Title",
        required: true,
        maxLength: 120
      }, {
        name: "body",
        label: "Your post",
        type: "textarea",
        required: true,
        maxLength: 2000,
        helper: "No identifying details about children, alleged offences, diagnoses, precise locations or private disclosures."
      }, {
        name: "rulesAccepted",
        label: "I agree to the community rules and understand that every post is reviewed before publication.",
        type: "checkbox",
        required: true
      }]} /></>}</>;
}
