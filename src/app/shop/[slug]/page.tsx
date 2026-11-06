import { notFound } from "next/navigation";
import { products } from "@/lib/data";
import { ProductArt } from "@/components/art";
import { AddToCart } from "@/components/shop";
export default async function Product({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } = await params;
  const p = products.find((p) => p.slug === slug);
  if (!p) notFound();
  return (
    <div className="page-width page-content">
      <div className="product-detail">
        <ProductArt kind={p.kind} />
        <div>
          <span className="eyebrow mono">RWM ORIGINALS / DESIGN SAMPLE</span>
          <h1>{p.name}</h1>
          <p>
            {p.subtitle} {p.colour}.
          </p>
          <p className="mono text-[var(--ink)]">
            £{p.price.toFixed(2)} / ILLUSTRATIVE PRICE
          </p>
          <AddToCart product={p} />
          <div className="prose">
            <h3>EVERYDAY MOVEMENT.</h3>
            <p>
              This is an original garment illustration, not a production
              photograph. Fabric, fit, care instructions, suppliers and stock
              require confirmation before any real sale.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
