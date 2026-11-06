"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { products } from "@/lib/data";
import type { Product } from "@/lib/types";
import { ProductArt } from "./art";
import { ButtonLink, EmptyState } from "./ui";
interface CartItem {
  slug: string;
  size: string;
  quantity: number;
}
const key = "rwm-demo-cart";
function subscribe(fn: () => void) {
  window.addEventListener("storage", fn);
  window.addEventListener("rwm-cart", fn);
  return () => {
    window.removeEventListener("storage", fn);
    window.removeEventListener("rwm-cart", fn);
  };
}
function snapshot() {
  try {
    return localStorage.getItem(key) ?? "[]";
  } catch {
    return "[]";
  }
}
function parseCart(raw: string): CartItem[] {
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (i: CartItem) =>
        products.some((p) => p.slug === i.slug && p.sizes.includes(i.size)) &&
        Number.isInteger(i.quantity) &&
        i.quantity > 0 &&
        i.quantity <= 10,
    );
  } catch {
    return [];
  }
}
function writeCart(items: CartItem[]) {
  try {
    localStorage.setItem(key, JSON.stringify(items));
    window.dispatchEvent(new Event("rwm-cart"));
    return true;
  } catch {
    return false;
  }
}
function useCart() {
  const raw = useSyncExternalStore(subscribe, snapshot, () => "[]");
  return parseCart(raw);
}
export function AddToCart({ product }: { product: Product }) {
  const [size, setSize] = useState("");
  const [message, setMessage] = useState("");
  return (
    <>
      <label className="field-label">Choose a sample size</label>
      <div className="size-select">
        {product.sizes.map((s) => (
          <button
            key={s}
            aria-pressed={size === s}
            className={size === s ? "selected" : ""}
            onClick={() => setSize(s)}
          >
            {s}
          </button>
        ))}
      </div>
      <button
        className="button"
        disabled={!size}
        onClick={() => {
          const current = parseCart(snapshot());
          const exists = current.find(
            (i) => i.slug === product.slug && i.size === size,
          );
          if (exists) exists.quantity = Math.min(10, exists.quantity + 1);
          else
            current.push({
              slug: product.slug,
              size,
              quantity: 1,
            });
          setMessage(
            writeCart(current)
              ? "Added to your demo bag. Checkout is not enabled."
              : "Your browser storage is unavailable. Nothing was added.",
          );
        }}
      >
        Add to demo bag ↗
      </button>
      {message && (
        <p role="status" className="form-feedback">
          {message}{" "}
          <Link href="/cart" className="underline">
            View bag
          </Link>
        </p>
      )}
      <p className="form-helper mt-4">
        Only product, size and quantity are stored in this browser. No personal
        details or payment information.
      </p>
    </>
  );
}
export function Cart() {
  const cart = useCart();
  if (!cart.length)
    return (
      <EmptyState
        title="ROOM FOR SOMETHING GOOD."
        description="Your demo bag is empty. Explore the original RWM collection concepts."
      />
    );
  const total = cart.reduce(
    (sum, i) =>
      sum + products.find((p) => p.slug === i.slug)!.price * i.quantity,
    0,
  );
  return (
    <>
      <div>
        {cart.map((i) => {
          const p = products.find((p) => p.slug === i.slug)!;
          return (
            <div className="cart-row" key={i.slug + i.size}>
              <ProductArt kind={p.kind} />
              <div>
                <h2>{p.name}</h2>
                <p>
                  Size {i.size} / Quantity {i.quantity} / £{p.price.toFixed(2)}{" "}
                  sample price
                </p>
                <Link href={`/shop/${i.slug}`} className="text-link mt-2">
                  View item ↗
                </Link>
              </div>
              <button
                onClick={() =>
                  writeCart(
                    cart.filter((x) => x.slug !== i.slug || x.size !== i.size),
                  )
                }
              >
                Remove
              </button>
            </div>
          );
        })}
      </div>
      <div className="cart-total">
        <span>ILLUSTRATIVE TOTAL</span>
        <strong>£{total.toFixed(2)}</strong>
      </div>
      <p className="notice">
        Design samples only. Products, stock, shipping and prices are not live
        offers. No payment can be taken.
      </p>
      <ButtonLink href="/checkout">Checkout information</ButtonLink>
      <ButtonLink secondary className="ml-3" href="/shop">
        Keep exploring
      </ButtonLink>
    </>
  );
}
