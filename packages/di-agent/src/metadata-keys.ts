/**
 * The metadata keys the agent decorators write. Same strings `@getloopscale/loopzero-di` exposes as
 * `METADATA_KEYS` today, so metadata written by an older install still reads back.
 */
export const AGENT_METADATA_KEYS = {
  SANDBOX: "getloopscale:di:sandbox",
  SUBAGENT: "getloopscale:di:subagent",
  SQUAD: "getloopscale:di:squad",
  STEP: "getloopscale:di:step",
  HITL: "getloopscale:di:hitl",
  AUTO_SUMMARIZE: "getloopscale:di:auto-summarize",
  TOOL: "getloopscale:di:tool",
  WORKFLOW: "getloopscale:di:workflow",
  EVAL: "getloopscale:di:eval",
  CRON: "getloopscale:di:cron",
  SUBSCRIPTION: "getloopscale:di:subscription",
  AUTH: "getloopscale:di:auth",
  RETRIEVER: "getloopscale:di:retriever",
  RERANKER: "getloopscale:di:reranker",
  TEXT_SPLITTER: "getloopscale:di:text-splitter",
  MEMORY_SCOPE: "getloopscale:di:memory-scope",
} as const;
