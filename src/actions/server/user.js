export function generateUserId() {
  const prefix = "USER";
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const random = crypto.randomUUID().toString("hex").toUpperCase();

  return `${prefix}-${date}-${random}`;
}
