import { PageIntro, ButtonLink } from "@/components/ui";
export default function Checkout() {
  return <div className="page-width page-content"><PageIntro label="RWM SHOP / NOT YET OPEN" title="GOOD THINGS TAKE A MINUTE." description="The collection is a design preview. Checkout is not enabled and no payment information is collected." /><div className="prose"><h2>BEFORE THE FIRST DROP.</h2><p>Real sales need a configured, server-managed payment provider, confirmed stock, reviewed shipping and refund terms, tax handling and a verified webhook process. These services are not active.</p></div><div className="mt-8"><ButtonLink href="/shop">Back to the collection</ButtonLink></div></div>;
}
