<script setup lang="ts">
const config = useRuntimeConfig();
const auth = useAuth();

const anilistClientId = config.public.anilistClientId;
const anilistAuthUrl = `https://anilist.co/api/v2/oauth/authorize?client_id=${anilistClientId}&response_type=token`;

onMounted(() => {
  if (auth.accessToken.value) {
    navigateTo("/");
  }
});
</script>

<template>
  <div>
    <a :href="anilistAuthUrl">Login</a>
  </div>
</template>
