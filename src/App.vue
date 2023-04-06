<template>
  <router-view v-slot="{ Component }">
    <Transition name="fade">
      <component :is="Component" />
    </Transition>
  </router-view>
</template>
<script setup>
</script>