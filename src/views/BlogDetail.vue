<template>
  <MainLayout>
    <div v-if="post" class="min-h-screen bg-gray-50">
      <!-- Hero Section -->
      <div class="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
        <div class="container mx-auto px-4 py-16">
          <div class="max-w-4xl mx-auto">
            <div class="flex items-center gap-4 mb-6">
              <router-link 
                to="/blogs"
                class="text-blue-100 hover:text-white transition-colors flex items-center gap-2"
              >
                <i class="fas fa-arrow-left"></i>
                Back to Blog
              </router-link>
              <span class="text-blue-200">|</span>
              <span class="text-blue-100">{{ post.category }}</span>
            </div>
            <h1 class="text-4xl md:text-5xl font-bold mb-6">{{ post.title }}</h1>
            <div class="flex items-center gap-6 text-blue-100">
              <div class="flex items-center gap-3">
                <img 
                  :src="post.author.avatar" 
                  :alt="post.author.name"
                  class="w-10 h-10 rounded-full"
                />
                <div>
                  <div class="font-medium">{{ post.author.name }}</div>
                  <div class="text-sm">{{ post.author.role }}</div>
                </div>
              </div>
              <div class="flex items-center gap-4">
                <span><i class="fas fa-calendar-alt mr-2"></i>{{ post.date }}</span>
                <span><i class="fas fa-eye mr-2"></i>{{ post.views }} views</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container mx-auto px-4 py-12">
        <div class="max-w-4xl mx-auto">
          <!-- Featured Image -->
          <img 
            :src="post.image" 
            :alt="post.title"
            class="w-full h-[400px] object-cover rounded-xl mb-12"
          />

          <!-- Content -->
          <div class="bg-white rounded-xl p-8 shadow-sm">
            <div class="prose max-w-none" v-html="post.content"></div>

            <!-- Tags -->
            <div class="mt-12 pt-8 border-t">
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="tag in tags" 
                  :key="tag"
                  class="px-4 py-2 bg-gray-100 rounded-full text-gray-600 text-sm"
                >
                  #{{ tag }}
                </span>
              </div>
            </div>

            <!-- Share -->
            <div class="mt-8 flex items-center gap-4">
              <span class="text-gray-600">Share this article:</span>
              <div class="flex gap-4">
                <button class="text-gray-600 hover:text-blue-600">
                  <i class="fab fa-twitter"></i>
                </button>
                <button class="text-gray-600 hover:text-blue-600">
                  <i class="fab fa-facebook"></i>
                </button>
                <button class="text-gray-600 hover:text-blue-600">
                  <i class="fab fa-linkedin"></i>
                </button>
                <button class="text-gray-600 hover:text-blue-600">
                  <i class="fas fa-link"></i>
                </button>
              </div>
            </div>
          </div>

          <!-- Author Bio -->
          <div class="bg-white rounded-xl p-8 shadow-sm mt-8">
            <div class="flex items-center gap-6">
              <img 
                :src="post.author.avatar" 
                :alt="post.author.name"
                class="w-16 h-16 rounded-full"
              />
              <div>
                <h3 class="text-xl font-bold text-gray-800 mb-2">{{ post.author.name }}</h3>
                <p class="text-gray-600">{{ post.author.role }}</p>
                <p class="text-gray-600 mt-2">
                  Expert in finding and verifying the best deals and discounts. Passionate about helping people save money while shopping online.
                </p>
              </div>
            </div>
          </div>

          <!-- Related Articles -->
          <div class="mt-12">
            <h2 class="text-2xl font-bold text-gray-800 mb-6">Related Articles</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <article 
                v-for="article in relatedArticles" 
                :key="article.id"
                class="bg-white rounded-xl shadow-sm overflow-hidden group hover:shadow-md transition-all"
              >
                <router-link :to="`/blogs/${article.id}`">
                  <div class="relative overflow-hidden">
                    <img 
                      :src="article.image" 
                      :alt="article.title"
                      class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div class="p-6">
                    <h3 class="text-xl font-bold text-gray-800 mb-2">{{ article.title }}</h3>
                    <p class="text-gray-600 line-clamp-2">{{ article.excerpt }}</p>
                  </div>
                </router-link>
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-else class="min-h-screen bg-gray-50 flex items-center justify-center">
      <div class="text-center">
        <div class="text-6xl text-gray-300 mb-4">
          <i class="fas fa-spinner fa-spin"></i>
        </div>
        <p class="text-gray-500">Loading article...</p>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getBlogPost } from '../api'
import MainLayout from '../components/MainLayout.vue'
import { useToast } from 'vue-toastification'

const route = useRoute()
const toast = useToast()
const post = ref(null)

const tags = computed(() => [
  'Shopping Tips',
  'Money Saving',
  'Online Shopping',
  'Deals',
  'Coupons'
])

const relatedArticles = computed(() => {
  // 这里可以根据当前文章的分类或标签来筛选相关文章
  return [
    {
      id: 2,
      title: 'Amazon Shopping Secrets: Hidden Deals & Tips',
      excerpt: 'Discover lesser-known Amazon shopping hacks, prime benefits, and how to find the best deals.',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644'
    },
    {
      id: 3,
      title: 'Nike: Ultimate Guide to Sneaker Deals',
      excerpt: 'From release dates to exclusive discounts, learn how to get the best deals on Nike sneakers.',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3'
    }
  ]
})

onMounted(async () => {
  try {
    post.value = await getBlogPost(route.params.id)
  } catch (error) {
    toast.error('Failed to load article')
  }
})
</script>

<style>
.prose {
  max-width: 100%;
  color: #374151;
}

.prose h2 {
  font-size: 1.875rem;
  font-weight: 700;
  margin-top: 2.5rem;
  margin-bottom: 1.25rem;
  color: #1f2937;
}

.prose h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-top: 2rem;
  margin-bottom: 1rem;
  color: #1f2937;
}

.prose p {
  margin-top: 1.25rem;
  margin-bottom: 1.25rem;
  line-height: 1.75;
}

.prose ul {
  margin-top: 1.25rem;
  margin-bottom: 1.25rem;
  padding-left: 1.625rem;
  list-style-type: disc;
}

.prose ol {
  margin-top: 1.25rem;
  margin-bottom: 1.25rem;
  padding-left: 1.625rem;
  list-style-type: decimal;
}

.prose li {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  padding-left: 0.375rem;
}
</style> 