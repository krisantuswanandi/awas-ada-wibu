<script setup lang="ts">
const auth = useAuth();

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
    <div class="p-4 max-w-7xl mx-auto flex items-center">
      <div
        class="font-semibold text-lg text-gray-900 dark:text-white md:hidden"
      >
        Awas Ada Wibu!!!
      </div>
      <div class="flex items-center space-x-2">
        <UButton
          v-if="auth.accessToken.value"
          variant="ghost"
          icon="i-lucide-logout"
          :label="$route.path === '/login' ? undefined : 'Logout'"
          @click="logout"
        />
      </div>
    </div>
  </div>
</template>
