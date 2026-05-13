import { loadConfig as loadYaml } from "./config.js";
import { getChannel } from "./channels/index.js";
import { normalizeMessage } from "./format.js";

export { loadConfig } from "./config.js";

export async function send(channelName, message, config) {
  config = config || (await loadYaml());
  const msg = normalizeMessage(message);
  const adapter = getChannel(channelName);
  if (!adapter) {
    return { type: "error", error: `Unknown channel: ${channelName}` };
  }

  const channelConfig = config.channels?.[channelName] || {};
  const validation = adapter.validate(channelConfig);
  if (!validation.valid) {
    return { type: "error", error: validation.errors.join("; ") };
  }

  const payload = await adapter.build(msg, channelConfig);

  if (adapter.type === "tool") {
    return { type: "tool", channel: channelName, ...payload };
  }
  if (adapter.type === "http") {
    return { type: "http", channel: channelName, ...payload };
  }
  return { type: "placeholder", channel: channelName, ...payload };
}

export async function broadcast(message, config) {
  config = config || (await loadYaml());
  const channelNames = config.defaults?.channels || ["push"];
  const results = await Promise.all(
    channelNames.map((ch) => send(ch, message, config))
  );
  return results;
}

export async function sendProfile(profileName, message, config) {
  config = config || (await loadYaml());
  const profile = config.profiles?.[profileName];
  if (!profile) {
    return [{ type: "error", error: `Unknown profile: ${profileName}` }];
  }

  const channelNames = profile.channels || config.defaults?.channels || ["push"];
  const results = await Promise.all(
    channelNames.map((ch) => {
      const mergedConfig = { ...config };
      mergedConfig.channels = { ...config.channels };
      if (mergedConfig.channels[ch]) {
        mergedConfig.channels[ch] = {
          ...mergedConfig.channels[ch],
          ...profile[ch],
        };
      }
      return send(ch, message, mergedConfig);
    })
  );
  return results;
}
