# @getloopscale/loopzero-di-agent

> Agent-first DI integration for `@getloopscale/loopzero-di`.

Ships a single `@InjectAgent()` decorator and a `createAgentProvider()` factory helper that produces a **REQUEST-scoped** `Agent` instance — so every HTTP request gets an isolated `@getloopscale/loopzero-sdk` Agent automatically.

## Install

```bash
pnpm add @getloopscale/loopzero-di @getloopscale/loopzero-sdk @getloopscale/loopzero-di-agent reflect-metadata
```

## Quick start

```typescript
import "reflect-metadata";
import { Agent } from "@getloopscale/loopzero-sdk";
import { Container, Injectable, Module } from "@getloopscale/loopzero-di";
import { InjectAgent, createAgentProvider } from "@getloopscale/loopzero-di-agent";

@Injectable()
class ChatService {
  constructor(@InjectAgent() private readonly agent: Agent) {}

  async chat(message: string) {
    return this.agent.send(message);
  }
}

@Module({
  providers: [
    createAgentProvider({
      factory: () =>
        Agent.create({
          apiKey: process.env.OPENROUTER_API_KEY!,
          model: { id: "openai/gpt-4o-mini" },
        }),
    }),
    ChatService,
  ],
})
class AppModule {}

const container = new Container();
container.registerModule(AppModule);

// In your HTTP handler:
await container.runInRequest(async () => {
  const chat = await container.resolveAsync(ChatService);
  return chat.chat("hello");
});
```

## License

Apache-2.0
