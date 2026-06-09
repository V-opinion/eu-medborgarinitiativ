# auth.md

This document describes how AI agents can register and authenticate with this service.

## Overview

This service supports agent registration via OAuth 2.0 with identity assertion (ID-JAG)
and verified email flows. Agents may also access public endpoints anonymously.

## Registration

To register as an agent, submit a `POST` request to the registration endpoint:

```
POST /agent/register
Content-Type: application/json
```

Request body:

```json
{
  "identity_type": "identity_assertion",
  "assertion_type": "urn:ietf:params:oauth:token-type:id-jag",
  "credential_types": ["bearer"]
}
```

## Supported Identity Types

| Type | Description |
|---|---|
| `identity_assertion` | Agent identity via ID-JAG token assertion |
| `verified_email` | Verified email identity |
| `anonymous` | No identity required; access to public resources only |

## Credential Types

- `bearer` — Standard OAuth 2.0 Bearer token (Authorization: Bearer <token>)

## Authorization Server

OAuth metadata is published at:

```
/.well-known/oauth-authorization-server
```

## Protected Resource Metadata

Resource metadata is published at:

```
/.well-known/oauth-protected-resource
```

## Revocation

Credentials may be revoked at the `revocation_uri` listed in the authorization server metadata.

## Support

For questions about agent access, contact: security@example.com
