<script setup lang="ts">
const auth = useAuth();
const { media, loading, updateProgress } = useAnilist();

onMounted(() => {
  if (!auth.accessToken.value) {
    navigateTo("/login");
  }
});

const orderedLists = computed(() => {
  if (!media.value) return [];

  const sections = media.value.User.mediaListOptions.animeList.sectionOrder;
  const lists = media.value.MediaListCollection.lists;

  return sections
    .map((section: string) => {
      const list = lists.find((l) => l.name === section);
      return {
        name: section,
        entries: list ? list.entries : [],
      };
    })
    .filter((list) => list.entries.length > 0);
});

// Section state management with localStorage persistence
const config = useLocalStorage("aaw_config", { sections: {} } as Record<
  string,
  Record<string, boolean>
>);

const getSectionOpenState = (sectionName: string) => {
  // If state exists in localStorage, use it; otherwise default "Watching" to true, others to false
  if (sectionName in config.value.sections) {
    return config.value.sections[sectionName];
  }
  return sectionName === "Watching";
};

const setSectionOpenState = (sectionName: string, isOpen: boolean) => {
  config.value.sections[sectionName] = isOpen;
};

const handleUpdateProgress = (entryId: number, newProgress: number) => {
  updateProgress({
    ids: [entryId],
    progress: newProgress,
  });
};
</script>

<template>
  <div>
    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center py-24">
      <UIcon name="i-lucide-loader-circle" class="animate-spin w-12" />
    </div>

    <!-- Content -->
    <div v-else-if="media">
      <!-- Empty State -->
      <div
        v-if="!media.MediaListCollection.lists.length"
        class="flex flex-col items-center justify-center gap-2 mt-8"
      >
        <UIcon name="i-lucide-film" class="w-12 text-(--ui-text-muted)" />
        <h3 class="text-lg">No anime found</h3>
        <p class="text-sm text-(--ui-text-muted)">
          Start adding anime to your list on AniList to see them here.
        </p>
        <UButton
          to="https://anilist.co"
          external
          target="_blank"
          icon="i-lucide-external-link"
          label="Visit AniList"
          class="mt-4"
        />
      </div>

      <!-- Anime Lists -->
      <div v-else class="space-y-4">
        <UCollapsible
          v-for="list in orderedLists"
          :key="list.name"
          :open="getSectionOpenState(list.name)"
          class="bg-gray-100 rounded-lg"
          @update:open="(isOpen) => setSectionOpenState(list.name, isOpen)"
        >
          <!-- Section Header as Trigger -->
          <UButton
            class="p-4 justify-between group"
            variant="ghost"
            color="neutral"
            trailing-icon="i-lucide-chevron-down"
            :ui="{
              trailingIcon:
                'group-data-[state=open]:rotate-180 transition-transform duration-200',
            }"
            block
          >
            <div class="flex items-center gap-2">
              <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
                {{ list.name }}
              </h2>
              <UBadge
                :label="list.entries.length.toString()"
                variant="soft"
                size="md"
              />
            </div>
          </UButton>

          <!-- Collapsible Content -->
          <template #content>
            <div class="@container p-4 pt-0">
              <div class="grid gap-2 grid-cols-2 @[480px]:grid-cols-3 @[720px]:grid-cols-4 @[960px]:grid-cols-5 @[1200px]:grid-cols-6 @[1440px]:grid-cols-7 @[1680px]:grid-cols-8">
                <AnimeCard
                  v-for="entry in list.entries"
                  :key="entry.id"
                  :entry="entry"
                  @update-progress="handleUpdateProgress"
                />
              </div>
            </div>
          </template>
        </UCollapsible>
      </div>
    </div>
  </div>
</template>
