import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { METADATA_KEYS } from "../src/index.js";

describe("METADATA_KEYS compatibility", () => {
  it("keeps the 16 deprecated agent keys at their current values", () => {
    const agent = {
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
    };
    for (const [k, v] of Object.entries(agent)) {
      expect((METADATA_KEYS as Record<string, string>)[k]).toBe(v);
    }
    expect(Object.keys(METADATA_KEYS)).toHaveLength(24);
  });
});

describe("METADATA_KEYS deprecation tags", () => {
  it("tags exactly the 16 agent keys, and none of the 8 container keys", () => {
    const src = readFileSync(
      fileURLToPath(new URL("../src/internal/metadata.ts", import.meta.url)),
      "utf8",
    );
    const body = src.slice(src.indexOf("METADATA_KEYS = {"), src.indexOf("} as const"));
    const entries = [...body.matchAll(/\/\*\*((?:(?!\*\/)[\s\S])*)\*\/\s*(\w+):/g)];
    expect(entries).toHaveLength(24);
    const tagged = entries.filter((m) => m[1]!.includes("@deprecated")).map((m) => m[2]);
    expect(tagged).toHaveLength(16);
    for (const k of [
      "INJECTABLE",
      "INJECT_TOKENS",
      "OPTIONAL_FLAGS",
      "DESIGN_PARAMTYPES",
      "QUALIFIER_NAMES",
      "PRIMARY",
      "POST_CONSTRUCT",
      "PRE_DESTROY",
    ]) {
      expect(tagged).not.toContain(k);
    }
  });
});
