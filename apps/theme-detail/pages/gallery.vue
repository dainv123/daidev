<template>
  <div class="gallery">
    <div class="header">
      <h1>Theme Gallery</h1>
      <NuxtLink to="/" class="back-link">← Back to Home</NuxtLink>
    </div>
    <div class="content">
      <p class="description">Browse our collection of beautiful HTML themes. Click on any theme to preview it in detail.</p>
      <div class="theme-grid">
        <div 
          class="theme-card" 
          v-for="theme in availableThemes" 
          :key="theme.id"
          @click="viewTheme(theme.id)"
        >
          <div class="theme-preview">
            <iframe 
              :src="`/themes/${theme.id}/index.html`"
              class="preview-iframe"
              :title="theme.title"
            ></iframe>
          </div>
          <div class="theme-info">
            <h3>{{ theme.title }}</h3>
            <p>{{ theme.description }}</p>
            <div class="theme-meta">
              <span class="category">{{ theme.category }}</span>
              <span class="price">{{ theme.price }}</span>
            </div>
            <div class="theme-tags">
              <span v-for="tag in theme.tags" :key="tag" class="tag">{{ tag }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Gallery page with real theme data
const router = useRouter()

// Available themes data
const availableThemes = [
  {
    id: 'theme-1',
    title: 'Modern Business',
    description: 'Professional and elegant design for business websites',
    category: 'Business',
    price: '$29.99',
    tags: ['responsive', 'modern', 'clean', 'professional']
  },
  {
    id: 'theme-2',
    title: 'Creative Portfolio',
    description: 'Perfect for designers, artists, and creative professionals',
    category: 'Portfolio',
    price: '$24.99',
    tags: ['creative', 'portfolio', 'colorful', 'animated']
  },
  {
    id: 'theme-3',
    title: 'E-commerce Store',
    description: 'Complete online store solution with modern design',
    category: 'E-commerce',
    price: '$39.99',
    tags: ['e-commerce', 'shopping', 'responsive', 'modern']
  },
  {
    id: 'theme-4',
    title: 'Restaurant & Food',
    description: 'Delicious design for restaurants and food businesses',
    category: 'Food',
    price: '$19.99',
    tags: ['restaurant', 'food', 'warm', 'inviting']
  },
  {
    id: 'theme-5',
    title: 'Tech Startup',
    description: 'Innovative design for technology companies',
    category: 'Technology',
    price: '$34.99',
    tags: ['tech', 'startup', 'modern', 'innovative']
  },
  {
    id: 'theme-6',
    title: 'Personal Blog',
    description: 'Clean and minimal design for personal blogs',
    category: 'Blog',
    price: '$14.99',
    tags: ['blog', 'minimal', 'clean', 'personal']
  }
]

const viewTheme = (themeId) => {
  router.push(`/theme/${themeId}`)
}
</script>

<style scoped>
.gallery {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
}

.back-link {
  color: #007bff;
  text-decoration: none;
}

.back-link:hover {
  text-decoration: underline;
}

.content {
  background-color: #f8f9fa;
  padding: 2rem;
  border-radius: 8px;
}

.description {
  text-align: center;
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 2rem;
}

.theme-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.theme-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  cursor: pointer;
}

.theme-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
}

.theme-preview {
  height: 200px;
  overflow: hidden;
  position: relative;
}

.preview-iframe {
  width: 100%;
  height: 100%;
  border: none;
  transform: scale(0.5);
  transform-origin: top left;
  pointer-events: none;
}

.theme-info {
  padding: 1.5rem;
}

.theme-info h3 {
  margin: 0 0 0.5rem 0;
  color: #333;
  font-size: 1.3rem;
}

.theme-info p {
  color: #666;
  margin-bottom: 1rem;
  line-height: 1.5;
}

.theme-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.category {
  background: #e9ecef;
  color: #495057;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
}

.price {
  color: #28a745;
  font-weight: bold;
  font-size: 1.1rem;
}

.theme-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  background: #007bff;
  color: white;
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
}

@media (max-width: 768px) {
  .gallery {
    padding: 1rem;
  }
  
  .header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
  
  .theme-grid {
    grid-template-columns: 1fr;
  }
  
  .theme-meta {
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
  }
}
</style> 