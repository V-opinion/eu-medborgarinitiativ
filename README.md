# Agent-Ready: Files to Deploy

Replace all occurrences of `https://example.com` with your real domain before deploying.

---

## File Map

```
/auth.md                                         ← serve at GET /auth.md
/.well-known/oauth-protected-resource            ← JSON, no .json extension
/.well-known/oauth-authorization-server          ← JSON, no .json extension
/.well-known/mcp/server-card.json
/.well-known/agent-skills/index.json
/public/webmcp.js                                ← embed in your HTML <head>
```

---

## 1. Auth.md (`/auth.md`)

Served as Markdown at the site root. The H1 heading **must** contain `auth.md`.
Links to your OAuth metadata endpoints.

## 2. OAuth Protected Resource Metadata (`/.well-known/oauth-protected-resource`)

Declares your resource server, supported scopes, and that `header` bearer is accepted.
Content-Type: `application/json`

## 3. OAuth Authorization Server Metadata (`/.well-known/oauth-authorization-server`)

Standard AS metadata **plus** an `agent_auth` block with:
- `register_uri` — where agents POST to register
- `identity_types_supported` — identity_assertion, verified_email, anonymous
- Per-type blocks with `assertion_types_supported`, `credential_types_supported`, `claim_uri`
- `revocation_uri` and `events_supported` for ID-JAG

Content-Type: `application/json`

## 4. MCP Server Card (`/.well-known/mcp/server-card.json`)

SEP-1649 server card. Update `transport.endpoint` to your actual MCP endpoint.
Content-Type: `application/json`

## 5. Agent Skills Index (`/.well-known/agent-skills/index.json`)

RFC v0.2.0 discovery document listing all published SKILL.md files.

> ⚠️ **Update digests**: The `digest` values must be `sha256:` of the **actual bytes** at each `url`.
> Recompute with: `curl -s <url> | sha256sum`

## 6. WebMCP (`/public/webmcp.js`)

Add to your HTML pages:

```html
<script src="/public/webmcp.js"></script>
```

Or inline the script. Customize the three tools (search, navigate, get-page-content)
to match your site's real endpoints and content structure.

---

## Validation

Once deployed, check all four checks at once:

```bash
curl -s -X POST https://isitagentready.com/api/scan \
  -H "Content-Type: application/json" \
  -d '{"url": "[https://your-site.com](https://multireligionvalsystem.eu.org)"}' | jq .
```

Look for `"status": "pass"` on:
- `checks.discovery.authMd`
- `checks.discovery.mcpServerCard`
- `checks.discovery.agentSkills`
- `checks.discovery.webMcp`
