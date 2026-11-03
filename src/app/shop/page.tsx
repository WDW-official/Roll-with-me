import Link from "next/link";
import { PageIntro } from "@/components/ui";
import { ProductArt } from "@/components/art";
import { products } from "@/lib/data";
export const metadata = {
  title: "RWM Shop"
};
export default function Shop() {
  return <div className="page-width page-content"><PageIntro label="RWM SHOP / WEAR THE MOVEMENT" title={"MADE FOR\nYOUR EVERYDAY."} description="A small collection. A shared statement. Original RWM streetwear concepts built around movement, belonging and possibility." /><div className="notice"><p>COLLECTION PREVIEW / Original product illustrations and sample prices. Nothing is currently for sale. Checkout is disabled.</p></div><div className="cards-grid">{products.map(p => <Link href={`/shop/${p.slug}`} className="product-card" key={p.slug}><ProductArt kind={p.kind} /><h2>{p.name} ↗</h2><p>{p.subtitle}</p><p className="product-price">£{p.price.toFixed(2)} / SAMPLE PRICE</p></Link>)}</div></div>;
}
