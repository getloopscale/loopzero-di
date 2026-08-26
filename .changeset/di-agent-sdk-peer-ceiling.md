---
"@getloopscale/loopzero-di-agent": minor
---

Realign the `@getloopscale/loopzero-sdk` peer with the SDK this package actually imports.

**Install-contract break.** `@getloopscale/loopzero-sdk` moves from `^1.3.0` to `>=4.0.1 <5`. An app pinned below
4 stops satisfying the peer. Minor bump because the version is still 0.x, where minor is the
breaking slot.

The old range described nothing that existed. `src/workflow-builder.ts` imports
`@getloopscale/loopzero-sdk/workflow` at runtime, the package is developed and tested against the modern SDK, and
the published SDK has been on 4.x for months — so `npm i @getloopscale/loopzero-di-agent @getloopscale/loopzero-sdk@^4` ended in
`ERESOLVE`, and pnpm users got a peer warning for a combination that was never supported.
(getloopscale/loopzero-di#40)

Verified at both ends of the new range: the suite passes against 4.0.1 and against 4.57.0. The
`@getloopscale/loopzero-sdk` devDependency moves to `^4.57.0` for the same reason the range went stale unnoticed —
CI was resolving 1.x, compiling against it, and going green on a combination no consumer installs.
