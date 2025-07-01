<script setup lang="ts">
const config = useRuntimeConfig();
const auth = useAuth();

definePageMeta({
  layout: false,
});

const anilistClientId = config.public.anilistClientId;
const anilistAuthUrl = `https://anilist.co/api/v2/oauth/authorize?client_id=${anilistClientId}&response_type=token`;

onMounted(() => {
  if (auth.accessToken.value) {
    navigateTo("/");
  }
});
</script>

<template>
  <NuxtLayout name="blank">
    <div class="flex flex-col items-center justify-center p-4 min-h-dvh">
      <UButton
        :to="anilistAuthUrl"
        external
        class="bg-slate-700 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-slate-200 gap-0 p-1 group"
      >
        <div
          class="h-6 w-6 p-0.5 bg-slate-700 group-hover:bg-slate-800 transition-colors rounded"
        >
          <NuxtImg
            src="https://anilist.co/img/icons/icon.svg"
            alt="AniList Logo"
            class="h-full w-full object-contain"
            loading="lazy"
          />
        </div>
        <div class="px-2">Login with AniList</div>
      </UButton>
      <AppFooter class="mt-10" />
    </div>
  </NuxtLayout>
</template>
