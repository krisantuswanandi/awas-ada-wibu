<script setup lang="ts">
const auth = useAuth();

onMounted(() => {
  if (!auth.accessToken.value) {
    navigateTo("/login");
  }
});
</script>

<template>
  <div>ini kalo su login anjay</div>
</template>
