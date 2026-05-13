# /geno-notify

Send notifications through the geno-notify universal hub.

## Usage

```
/geno-notify "title" "body"
/geno-notify --profile camp-alerts "title" "body"
/geno-notify --channel discord "title" "body"
```

## Arguments

- First positional: notification title
- Second positional: notification body (optional)
- `--profile <name>`: use a named profile from ~/.geno/notify.yaml
- `--channel <name>`: send to a specific channel instead of defaults
- `--url <url>`: attach a link to the notification

## Behavior

1. Load config from `~/.geno/notify.yaml`
2. Determine target channels (from --profile, --channel, or defaults)
3. Build payloads for each channel
4. For each result:
   - **type: "tool"** — The agent MUST invoke the returned tool with the returned params. Example: if the result is `{ type: "tool", tool: "PushNotification", params: { title: "X", body: "Y" } }`, call the PushNotification tool with those params.
   - **type: "http"** — The notification was already sent via HTTP. Report the status to the user.
   - **type: "error"** — Report the error to the user.

## Examples

Send a push notification (default):
```
/geno-notify "Build complete" "All 42 tests passed"
```

Send via camp-alerts profile (push + email):
```
/geno-notify --profile camp-alerts "Deploy failed" "See CI logs for details"
```

## Config location

`~/.geno/notify.yaml` — edit to enable/disable channels, set webhook URLs, and define profiles.
