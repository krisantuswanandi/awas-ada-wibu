<template>
  <UApp>
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
      <AppHeader />

      <!-- Main content with mobile-first padding -->
      <main class="p-4 max-w-7xl mx-auto">
        <slot />
      </main>

      <AppFooter />
    </div>
  </UApp>
</template>
