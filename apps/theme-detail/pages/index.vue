<template>
  <div class="container">
    <h1>Theme Detail App</h1>
    <p>This is a simple theme detail micro-frontend for Daidev.</p>
    <div class="links">
      <NuxtLink to="/theme/test" class="link">View Test Theme</NuxtLink>
      <NuxtLink to="/gallery" class="link">Theme Gallery</NuxtLink>
    </div>
  </div>
</template>

<script setup>
// Simple index page
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.links {
  margin-top: 2rem;
}

.link {
  display: inline-block;
  margin: 0 1rem;
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 4px;
}

.link:hover {
  background-color: #0056b3;
}
</style> 