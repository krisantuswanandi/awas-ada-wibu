# Agent Guidelines for Awas Ada Wibu

## Build Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run generate` - Generate static site
- `npm run preview` - Preview production build
- **No test commands configured** - add tests if needed

## Code Style & Conventions
- **Language**: TypeScript with strict mode
- **Framework**: Nuxt 3 with Composition API
- **Imports**: Use auto-imports (no explicit Vue imports needed)
- **Components**: PascalCase naming, .vue extension
- **Composables**: camelCase with `use` prefix in `composables/` directory
- **Types**: Export interfaces from `utils/type.ts`, use PascalCase
- **GraphQL**: Use `gql` template literals with descriptive query names
- **State**: Vue Query for server state, composables for shared logic
- **Authentication**: Use `useAuth()` composable, store tokens as "awaw_access_token"
- **API**: GraphQL client with AniList API, include Bearer token in headers
- **Styling**: Tailwind CSS classes, Nuxt UI components preferred
- **Error Handling**: Use `retry: false` for auth queries, handle loading states

## Key Patterns
- Authentication check: `if (!auth.accessToken.value) navigateTo("/login")`
- GraphQL setup: `new GraphQLClient("https://graphql.anilist.co", { headers: { Authorization: \`Bearer \${token}\` } })`
- Query pattern: `useQuery({ queryKey: ["unique-key"], queryFn: () => client.request(gql\`...\`) })`