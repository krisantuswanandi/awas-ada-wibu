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
      <div v-else class="space-y-8">
        <div v-for="list in orderedLists" :key="list.name">
          <!-- Section Header -->
          <div class="flex items-center gap-2">
            <h2
              class="text-lg md:text-xl font-semibold text-gray-900 dark:text-white"
            >
              {{ list.name }}
            </h2>
            <UBadge
              :label="list.entries.length.toString()"
              variant="soft"
              size="md"
            />
          </div>

          <!-- Mobile-first Grid -->
          <div class="grid grid-cols-6 gap-2 mt-2">
            <AnimeCard
              v-for="entry in list.entries"
              :key="entry.id"
              :entry="entry"
              @update-progress="handleUpdateProgress"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
