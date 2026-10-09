<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Architecture

- Keep Next.js routes, redirects, cache revalidation and Server Action entry points in app/.
- Organize business functionality under src/features/.
- Domain code must remain pure and independent of React, Next.js and Supabase.
- Application code depends on domain and contracts, never infrastructure or UI.
- Infrastructure implements contracts and contains database/storage details.
- Presentation accesses use cases through src/composition/, never infrastructure directly.
- Server composition modules must use server-only.
- Keep browser and server composition separate.
- Use public feature exports for dependencies between features.
- Keep src/shared/ independent of features and application routes.
- Preserve behavior when refactoring. Group related changes into reviewable commits.
- Commit format: gitmoji first, then conventional type and optional scope.

## Verification

Run pnpm check, pnpm test, pnpm knip and pnpm build before closing a refactor.
Manually verify authentication, autosave, publishing, follow/unfollow and image storage.
