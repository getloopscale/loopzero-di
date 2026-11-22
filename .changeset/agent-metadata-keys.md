---
"@getloopscale/loopzero-di-agent": minor
---

`@getloopscale/loopzero-di-agent` owns its metadata keys (`AGENT_METADATA_KEYS`, same strings as before) and marks
the fourteen decorators nothing reads, with their `read*Metadata` functions, `@deprecated`. Nothing is
removed; `@Workflow` and `@Step` are unchanged (getloopscale/loopzero-di#82).
