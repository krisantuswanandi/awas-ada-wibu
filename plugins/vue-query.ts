import type {
  DehydratedState,
  VueQueryPluginOptions,
} from "@tanstack/vue-query";
import { VueQueryPlugin, QueryClient, hydrate } from "@tanstack/vue-query";

import { defineNuxtPlugin, useState } from "#imports";

export default defineNuxtPlugin((nuxt) => {
  const vueQueryState = useState<DehydratedState | null>("vue-query");

  // Modify your Vue Query global settings here
  const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: 5000 } },
  });
  const options: VueQueryPluginOptions = { queryClient };

  nuxt.vueApp.use(VueQueryPlugin, options);

  nuxt.hooks.hook("app:created", () => {
    hydrate(queryClient, vueQueryState.value);
  });
});
