<script setup lang="ts">
const props = defineProps<{
  entry: MediaEntry;
}>();

const emit = defineEmits<{
  updateProgress: [entryId: number, newProgress: number];
}>();

const maxEpisodes = computed(() => {
  if (props.entry.media.episodes) return props.entry.media.episodes;

  // Calculate the next power of 2 starting from 12
  // For progress 0-12: 12, 13-24: 24, 25-48: 48, 49-96: 96, etc.
  if (props.entry.progress < 12) return 12;

  // Compute which power of 2 block the number falls into
  // Equation: 12 * (2^k - 1) >= num
  const k = Math.ceil(Math.log2(props.entry.progress / 12 + 1));

  // Compute the end of that range
  const rangeStart = 12 * (2 ** k - 1);
  const rangeSize = 12 * 2 ** k;
  const rangeEnd = rangeStart + rangeSize - 1;

  return rangeEnd + 1;
});

const handleClick = () => {
  emit("updateProgress", props.entry.id, props.entry.progress + 1);
};
</script>

<template>
  <div class="relative aspect-[3/4] rounded-lg overflow-hidden">
    <NuxtImg
      :src="entry.media.coverImage.large"
      :alt="entry.media.title.english"
      class="w-full h-full object-cover"
      loading="lazy"
    />

    <!-- Score Badge -->
    <div
      v-if="entry.progress"
      class="absolute top-1 right-1 bg-black/40 text-white text-neutral rounded backdrop-blur z-10 flex items-center gap-1 px-1 py-0.5 text-sm font-bold"
    >
      <UIcon name="i-ic-round-star" class="text-yellow-300" />
      {{ entry.score || "?" }}
    </div>

    <!-- Title Overlay with Gradient -->
    <div
      class="absolute inset-0 p-2 bg-gradient-to-b from-transparent to-black flex flex-col justify-end gap-2"
    >
      <h3 class="font-semibold text-sm text-white line-clamp-3">
        <NuxtLink
          :to="`https://anilist.co/anime/${entry.media.id}`"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ entry.media.title.english }}
        </NuxtLink>
      </h3>

      <div v-if="entry.progress < maxEpisodes" class="space-y-1">
        <!-- Progress Bar with Overlay Text -->
        <div class="flex items-center gap-2">
          <UProgress :model-value="entry.progress" :max="maxEpisodes" />
          <!-- Progress Text Overlay -->
          <div class="text-xs text-white whitespace-nowrap font-semibold">
            {{ entry.progress }} / {{ entry.media.episodes || "?" }}
          </div>
        </div>

        <!-- Action Button -->
        <UButton block icon="i-lucide-plus" size="xs" @click="handleClick">
          Watch Episode
        </UButton>
      </div>
    </div>
  </div>
</template>
