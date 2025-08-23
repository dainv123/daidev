<template>
  <div class="theme-display">
    <iframe
      :src="`/themes/${$route.params.name}/index.html`"
      class="theme-iframe"
      title="Theme Display"
      sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
    ></iframe>
  </div>
</template>

<script setup>
// Simple theme display - just show the HTML theme
const route = useRoute()

// Validate theme exists
const themePath = `/themes/${route.params.name}/index.html`
</script>

<style scoped>
.theme-display {
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.theme-iframe {
  width: 100%;
  height: 100%;
  border: none;
  margin: 0;
  padding: 0;
}
</style> 