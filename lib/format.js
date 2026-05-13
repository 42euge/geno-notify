export function formatPlain(message) {
  const parts = [];
  if (message.title) parts.push(message.title);
  if (message.body) parts.push(message.body);
  if (message.url) parts.push(message.url);
  return parts.join("\n\n");
}

export function formatSubject(message, prefix) {
  const base = message.title || "Notification";
  return prefix ? `${prefix} ${base}` : base;
}

export function normalizeMessage(input) {
  if (typeof input === "string") {
    return { title: input, body: input, url: null, data: {} };
  }
  return {
    title: input.title || "",
    body: input.body || "",
    url: input.url || null,
    data: input.data || {},
  };
}
