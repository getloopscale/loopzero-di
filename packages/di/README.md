# @getloopscale/loopzero-di

> Lightweight TypeScript dependency injection container for the loopzero ecosystem.

NestJS-compatible API (`@Injectable`, `@Inject`, `@Module`, `providers: []`) with three lifecycle scopes (SINGLETON, TRANSIENT, REQUEST via AsyncLocalStorage). Foundation for [`@getloopscale/loopzero-orm`](../orm) and `@getloopscale/loopzero-http`, which ships from the sibling `loopzero` repository under `packages/http`. An earlier name, `@getloopscale/loopzero-http-decorators`, no longer exists. Agent-aware integration via the companion [`@getloopscale/loopzero-di-agent`](../di-agent) package.

**Status:** `0.1.1` on npm `latest`.

## Install

```bash
pnpm add @getloopscale/loopzero-di reflect-metadata
```

Then import `reflect-metadata` ONCE at your app entry point:

```typescript
import "reflect-metadata";
```

## TypeScript configuration

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

Without these flags, decorator metadata is not emitted and the container cannot auto-resolve constructor parameters.

## Quick start

```typescript
import "reflect-metadata";
import { Container, Injectable, Module } from "@getloopscale/loopzero-di";

@Injectable()
class GreeterService {
  greet(name: string): string {
    return `Hello, ${name}!`;
  }
}

@Module({
  providers: [GreeterService],
})
class AppModule {}

const container = new Container();
container.registerModule(AppModule);

const greeter = container.resolve(GreeterService);
console.log(greeter.greet("world")); // Hello, world!
```

## Request seed

`runInRequest` accepts a seed, the value the request serves (an inbound message, an HTTP request, a
session key). Read it with `container.requestSeed()` from any REQUEST-scoped factory or code running
inside the request. Nested requests each see their own seed.

```typescript
import { Container, Scope } from "@getloopscale/loopzero-di";

const container = new Container();
container.register({
  provide: "session",
  useFactory: () => ({ key: container.requestSeed<string>() }),
  scope: Scope.REQUEST,
});

const session = await container.runInRequest(() => container.resolveAsync("session"), {
  seed: "user-42",
});
```

`requestSeed()` throws `ScopeViolationError` outside a request, and `MissingRequestSeedError` in a
request opened without `{ seed }`.

## Polyglot strategy

`@getloopscale/loopzero-di` is **intentionally TS-only**. DI containers are language-specific runtime constructs — Python uses `inspect`/`typing.get_type_hints`, Go uses `reflect`, etc. The cross-language story for the loopzero ecosystem lives in the **contract layer** (OpenAPI from `@getloopscale/loopzero-http`, SQL migrations + JSON schemas from `@getloopscale/loopzero-orm`), not in the container.

## License

Apache-2.0
