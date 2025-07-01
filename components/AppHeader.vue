<script setup lang="ts">
const auth = useAuth();
const isDark = useDark();

const toggleDark = useToggle(isDark);

const logout = () => {
  auth.accessToken.value = "";
  navigateTo("/login");
};
</script>

<template>
  <!-- Mobile-optimized header -->
  <div
    class="border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur"
  >
    <div class="p-4 max-w-7xl mx-auto flex items-center justify-between">
      <div class="font-semibold">Awas Ada Wibu!!!</div>
      <div class="flex items-center space-x-2">
        <UButton
          icon="i-lucide-github"
          variant="ghost"
          color="neutral"
          external
          target="_blank"
          href="https://github.com/krisantuswanandi/awas-ada-wibu"
        />
        <UButton
          :icon="isDark ? 'i-lucide-moon' : 'i-lucide-sun'"
          variant="ghost"
          color="neutral"
          @click="toggleDark()"
        />
        <UButton
          v-if="auth.accessToken.value"
          variant="ghost"
          icon="i-lucide-log-out"
          color="neutral"
          @click="logout"
        />
      </div>
    </div>
  </div>
</template>
