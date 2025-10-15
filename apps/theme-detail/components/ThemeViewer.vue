<template>
  <div class="theme-viewer">
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>Loading theme: {{ themeId }}</p>
    </div>
    
    <div v-else-if="error" class="error">
      <h2>Error Loading Theme</h2>
      <p>{{ error }}</p>
    </div>
    
    <div v-else class="theme-content">
      <iframe
        :src="themeUrl"
        :title="`${themeId} Theme Preview`"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
        class="theme-iframe"
        @load="onIframeLoad"
        @error="onIframeError"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  themeId: {
    type: String,
    required: true
  }
})

const loading = ref(true)
const error = ref(null)

const themeUrl = computed(() => {
  return `http://localhost:3004/theme/${props.themeId}`
})

const onIframeLoad = () => {
  loading.value = false
  error.value = null
}

const onIframeError = () => {
  loading.value = false
  error.value = 'Failed to load theme'
}

// Watch for themeId changes
watch(() => props.themeId, () => {
  loading.value = true
  error.value = null
})
</script>

<style scoped>
.theme-viewer {
  width: 100%;
  height: 70vh;
  position: relative;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  background: #f5f5f5;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  background: #f5f5f5;
  color: #e74c3c;
}

.theme-content {
  width: 100%;
  height: 100%;
}

.theme-iframe {
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>