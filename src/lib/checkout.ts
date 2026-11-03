/** Provider boundary: never accept card details in RWM forms. */
export interface CheckoutProvider {
  createCheckout(input: {
    userId: string;
    items: {
      productId: string;
      size: string;
      quantity: number;
    }[];
    idempotencyKey: string;
  }): Promise<{
    url: string;
    providerSessionId: string;
  }>;
  verifyWebhook(rawBody: string, signature: string): Promise<{
    eventId: string;
    type: string;
  }>;
}
export const checkoutProvider: CheckoutProvider = {
  async createCheckout() {
    throw new Error("Checkout is disabled until a provider, authoritative server-side prices, stock reservation and refund workflows are configured.");
  },
  async verifyWebhook() {
    throw new Error("No payment webhook is configured.");
  }
};
