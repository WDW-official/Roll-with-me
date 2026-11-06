import { PageIntro, EmptyState, ButtonLink } from "@/components/ui";
import { currentUser } from "@/lib/auth";
import { Booking, Content } from "@/lib/models";
import { ActionButton, RwmForm } from "@/components/forms";
export const dynamic = "force-dynamic";
export default async function Bookings() {
  const user = await currentUser();
  const bookings = user
    ? await Booking.find({
        userId: user._id,
      }).lean()
    : [];
  const events = user
    ? await Content.find({
        _id: {
          $in: bookings.map((b) => b.eventId),
        },
      })
        .select("title")
        .lean()
    : [];
  return (
    <div className="page-width page-content">
      <PageIntro
        label="YOUR SPACE / BOOKINGS"
        title="YOUR NEXT MOVES."
        description="Only your own bookings appear here. Guardian access is limited to transparently authorised event consent."
      />
      {!user ? (
        <ButtonLink href="/sign-in">Sign in to see your bookings</ButtonLink>
      ) : !bookings.length ? (
        <EmptyState
          title="YOUR CALENDAR IS OPEN."
          description="Find something that’s you. Your confirmed sessions and waiting-list requests will appear here."
        />
      ) : (
        <div>
          {bookings.map((b) => (
            <div className="guide-card mb-4" key={String(b._id)}>
              <span className="status-label">
                {b.status.replaceAll("_", " ")}
              </span>
              <h2>
                {events.find((e) => String(e._id) === String(b.eventId))
                  ?.title ?? "Session"}
              </h2>
              <p>
                Consent notice: {b.consentNoticeVersion}.{" "}
                {b.status === "pending_consent"
                  ? "Ask your verified guardian to use the one-time code supplied when you registered. Codes expire after 24 hours. No place is reserved before consent."
                  : "Your place is private."}
              </p>
              {["confirmed", "waiting", "pending_consent"].includes(
                b.status,
              ) && (
                <div className="mt-4">
                  <ActionButton
                    endpoint="/api/booking-action"
                    payload={{
                      id: String(b._id),
                      action: "cancel",
                    }}
                    label="Cancel this booking"
                  />
                </div>
              )}
              {b.status === "attended" && (
                <div className="mt-4">
                  <RwmForm
                    endpoint="/api/booking-action"
                    extra={{
                      id: String(b._id),
                      action: "feedback",
                    }}
                    submitLabel="Share private feedback"
                    fields={[
                      {
                        name: "rating",
                        label: "How was the session? 1–5",
                        type: "number",
                        required: true,
                      },
                      {
                        name: "comment",
                        label: "General feedback (no identifying details)",
                        type: "textarea",
                        maxLength: 1000,
                      },
                    ]}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
