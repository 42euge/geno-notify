import * as push from "./push.js";
import * as email from "./email.js";
import * as imessage from "./imessage.js";
import * as discord from "./discord.js";
import * as slack from "./slack.js";
import * as sms from "./sms.js";
import * as whatsapp from "./whatsapp.js";
import * as messenger from "./messenger.js";

const adapters = [push, email, imessage, discord, slack, sms, whatsapp, messenger];

const registry = new Map();
for (const adapter of adapters) {
  registry.set(adapter.name, adapter);
}

export function getChannel(name) {
  return registry.get(name) || null;
}

export function listChannels() {
  return [...registry.keys()];
}

export { registry };
