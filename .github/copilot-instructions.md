# Copilot Instructions for Awas Ada Wibu

## Project Overview

This is a Nuxt.js 3 application built with TypeScript that integrates with the AniList GraphQL API for anime-related functionality. The app appears to be a personal anime tracking or discovery application.

## Tech Stack

- **Framework**: Nuxt.js 3 (SSR disabled)
- **Language**: TypeScript
- **UI Framework**: Nuxt UI (with Tailwind CSS)
- **State Management**: Vue Query (@tanstack/vue-query)
- **API**: AniList GraphQL API via graphql-request
- **Styling**: Tailwind CSS
- **Icons**: Nuxt Icon
- **Fonts**: Nuxt Fonts
- **Images**: Nuxt Image
- **Utilities**: VueUse

## Key Features

- AniList OAuth authentication
- Anime data fetching via GraphQL
- Client-side only application (SSR disabled)
- Local storage for access token management

## Development Guidelines

### Authentication

- Use the `useAuth()` composable for authentication state
- Access tokens are stored in localStorage with key "awaw_access_token"
- Redirect unauthenticated users to `/login`

### API Integration

- Use GraphQL client with AniList API (https://graphql.anilist.co)
- Include Authorization header with Bearer token
- Use Vue Query for caching and state management

### Code Style

- Follow TypeScript best practices
- Use Nuxt 3 patterns (composables, pages, plugins)
- Utilize Vue 3 Composition API
- Keep components reactive with Vue Query

### UI Components

- Use Nuxt UI components for consistent styling
- Leverage Tailwind CSS for custom styling
- Use Nuxt Icon for icons
- Optimize images with Nuxt Image

### State Management

- Use Vue Query for server state
- Use composables for shared logic
- Utilize VueUse utilities where appropriate

## Common Patterns

### GraphQL Queries

```typescript
const { data, isLoading } = useQuery({
  queryKey: ["unique-key"],
  queryFn: async () => {
    return client.request(gql`
      query {
        # GraphQL query
      }
    `);
  },
});
```

### Authentication Check

```typescript
onMounted(() => {
  if (!auth.accessToken.value) {
    navigateTo("/login");
  }
});
```

### GraphQL Client Setup

```typescript
const client = new GraphQLClient("https://graphql.anilist.co", {
  headers: {
    Authorization: `Bearer ${auth.accessToken.value}`,
  },
});
```

## Environment Configuration

- Configure AniList client ID in `nuxt.config.ts` under `runtimeConfig.public.anilistClientId`
- Ensure proper OAuth redirect URLs are configured

## Best Practices

- Always check authentication state before making API calls
- Use descriptive query keys for Vue Query
- Handle loading and error states appropriately
- Keep GraphQL queries focused and efficient
- Use TypeScript interfaces for API responses
- Implement proper error handling for OAuth flow

## Testing

- Test authentication flow thoroughly
- Verify GraphQL queries return expected data
- Test offline scenarios with Vue Query caching
- Ensure proper redirect behavior for unauthenticated users

When working on this project, always consider the anime domain context and ensure that new features align with the AniList API capabilities and user authentication flow.
