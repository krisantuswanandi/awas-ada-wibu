<script setup lang="ts">
const auth = useAuth();
const route = useRoute();

const params = new URLSearchParams(route.hash.substring(1));
const accessToken = params.get("access_token");

onMounted(() => {
  if (accessToken) {
    auth.accessToken.value = accessToken;
    navigateTo("/");
  } else {
    navigateTo("/login");
  }
});
</script>

<template>
  <div>Logging in...</div>
</template>
