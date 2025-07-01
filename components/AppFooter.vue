<script setup lang="ts">
const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>

<template>
  <div class="flex items-center justify-center gap-2 p-4">
    <UButton
      :icon="isDark ? 'i-lucide-moon' : 'i-lucide-sun'"
      variant="ghost"
      color="neutral"
      @click="toggleDark()"
    />
    <UButton
      icon="i-lucide-github"
      variant="ghost"
      color="neutral"
      external
      target="_blank"
      href="https://github.com/krisantuswanandi/awas-ada-wibu"
    />
  </div>
</template>
