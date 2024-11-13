<template>
  <MainLayout>
    <!-- Hero Section -->
    <div class="bg-gradient-to-r from-blue-500 to-indigo-600 text-white relative overflow-hidden">
      <div class="absolute inset-0 bg-grid-white/[0.1] bg-grid-8"></div>
      <div class="container mx-auto px-4 py-16 relative">
        <h1 class="text-4xl md:text-5xl font-bold text-center mb-6 animate-fade-in">
          Savings Blog & Guides
        </h1>
        <p class="text-xl text-center mb-12 text-blue-100 max-w-2xl mx-auto">
          Discover money-saving tips, brand reviews, and guides to make the most of your shopping experience
        </p>
        <!-- Search -->
        <div class="max-w-2xl mx-auto">
          <div class="relative">
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="Search articles..." 
              class="w-full px-6 py-4 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300 text-lg"
              @input="handleSearch"
            />
            <i class="fas fa-search absolute right-6 top-1/2 -translate-y-1/2 text-gray-400"></i>
          </div>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 py-12">
      <!-- Quick Categories -->
      <div class="flex flex-wrap gap-4 justify-center mb-12">
        <button 
          v-for="category in categories" 
          :key="category"
          class="px-6 py-2 rounded-full bg-white shadow-sm hover:shadow-md transition-all
                 text-gray-600 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          :class="{ 'bg-blue-50 text-blue-600': selectedCategory === category }"
          @click="selectedCategory = category"
        >
          {{ category }}
        </button>
      </div>

      <!-- Featured Guide -->
      <div class="bg-white rounded-2xl shadow-sm overflow-hidden mb-12">
        <div class="aspect-w-16 aspect-h-9 relative">
          <img 
            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d" 
            alt="How to Use CouponHub"
            class="w-full h-[400px] object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div class="absolute bottom-0 p-8 text-white">
            <span class="bg-blue-500 text-white px-3 py-1 rounded-full text-sm mb-4 inline-block">Featured Guide</span>
            <h2 class="text-3xl font-bold mb-4">How to Use CouponHub: Complete Guide</h2>
            <p class="text-lg text-gray-200 mb-4">Learn how to find, verify and use coupon codes effectively to maximize your savings</p>
            <router-link 
              :to="`/blogs/1`"
              class="btn-primary"
            >
              Read Full Guide
            </router-link>
          </div>
        </div>
      </div>

      <!-- Latest Articles -->
      <section class="mb-16">
        <h2 class="text-2xl font-bold mb-8 flex items-center gap-2">
          <i class="fas fa-newspaper text-blue-500"></i>
          Latest Articles
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <article 
            v-for="post in filteredPosts" 
            :key="post.id" 
            class="bg-white rounded-xl shadow-sm overflow-hidden group hover:shadow-md transition-all"
          >
            <div class="relative overflow-hidden">
              <img 
                :src="post.image" 
                :alt="post.title" 
                class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div class="absolute top-4 left-4">
                <span class="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm">
                  {{ post.category }}
                </span>
              </div>
            </div>
            <div class="p-6">
              <div class="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <span><i class="fas fa-calendar-alt mr-2"></i>{{ post.date }}</span>
                <span><i class="fas fa-eye mr-2"></i>{{ post.views }} views</span>
              </div>
              <h3 class="text-xl font-bold text-gray-800 mb-2 line-clamp-2">{{ post.title }}</h3>
              <p class="text-gray-600 mb-4 line-clamp-2">{{ post.excerpt }}</p>
              <router-link 
                :to="`/blogs/${post.id}`"
                class="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-2"
              >
                Read Article <i class="fas fa-arrow-right"></i>
              </router-link>
            </div>
          </article>
        </div>

        <!-- Loading State -->
        <div v-if="isLoading" class="text-center py-12">
          <div class="text-6xl text-gray-300 mb-4">
            <i class="fas fa-spinner fa-spin"></i>
          </div>
          <p class="text-gray-500">Loading articles...</p>
        </div>

        <!-- No Results Message -->
        <div v-if="!isLoading && filteredPosts.length === 0" class="text-center py-12">
          <div class="text-gray-400 text-6xl mb-4">
            <i class="fas fa-newspaper"></i>
          </div>
          <h3 class="text-xl font-semibold text-gray-700 mb-2">No Articles Found</h3>
          <p class="text-gray-500">Try adjusting your search criteria</p>
        </div>

        <!-- Load More -->
        <div v-if="hasMore" class="text-center mt-8">
          <button 
            @click="loadMore"
            class="btn-primary px-8 py-3"
            :disabled="isLoading"
          >
            <span v-if="isLoading">
              <i class="fas fa-spinner fa-spin mr-2"></i>
              Loading...
            </span>
            <span v-else>
              Load More Articles
            </span>
          </button>
        </div>
      </section>

      <!-- Newsletter -->
      <section class="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-8 text-white text-center">
        <h2 class="text-2xl font-bold mb-4">Stay Updated with Latest Deals</h2>
        <p class="mb-6 text-blue-100">Subscribe to our newsletter and never miss out on exclusive deals and savings tips</p>
        <form @submit.prevent="handleSubscribe" class="max-w-md mx-auto">
          <div class="flex gap-4">
            <input 
              v-model="email"
              type="email" 
              placeholder="Enter your email" 
              class="flex-1 px-4 py-2 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
              :disabled="isSubscribing"
            />
            <button 
              type="submit"
              class="bg-white text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50 transition-colors disabled:opacity-50"
              :disabled="isSubscribing"
            >
              <span v-if="isSubscribing">
                <i class="fas fa-spinner fa-spin mr-2"></i>
                Subscribing...
              </span>
              <span v-else>Subscribe</span>
            </button>
          </div>
        </form>
      </section>
    </div>
  </MainLayout>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import MainLayout from '../components/MainLayout.vue'
import { getBlogPosts, subscribeNewsletter } from '../api'
import { useToast } from 'vue-toastification'

const toast = useToast()
const searchQuery = ref('')
const selectedCategory = ref('All')
const email = ref('')
const isSubscribing = ref(false)
const isLoading = ref(false)
const page = ref(1)
const posts = ref([])
const hasMore = ref(false)

const categories = [
  'All',
  'Shopping Guides',
  'Brand Reviews',
  'Money Saving Tips',
  'Deal Alerts',
  'How-to Guides'
]

const filteredPosts = computed(() => {
  let result = posts.value

  if (selectedCategory.value !== 'All') {
    result = result.filter(post => post.category === selectedCategory.value)
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(post => 
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query)
    )
  }

  return result
})

const handleSearch = () => {
  loadPosts(true) // 重新加载并重置页码
}

const loadPosts = async (reset = false) => {
  if (reset) {
    page.value = 1
    posts.value = []
  }

  try {
    isLoading.value = true
    const result = await getBlogPosts(page.value, selectedCategory.value === 'All' ? null : selectedCategory.value)
    
    if (reset) {
      posts.value = result.posts
    } else {
      posts.value = [...posts.value, ...result.posts]
    }
    
    hasMore.value = result.hasMore
  } catch (error) {
    toast.error('Failed to load articles')
  } finally {
    isLoading.value = false
  }
}

const loadMore = () => {
  page.value++
  loadPosts()
}

const handleSubscribe = async () => {
  if (!email.value) {
    toast.warning('Please enter your email')
    return
  }

  try {
    isSubscribing.value = true
    await subscribeNewsletter(email.value)
    toast.success('Successfully subscribed to newsletter!')
    email.value = ''
  } catch (error) {
    toast.error(error.message || 'Failed to subscribe, please try again')
  } finally {
    isSubscribing.value = false
  }
}

// Watch for category changes
watch(() => selectedCategory.value, () => {
  loadPosts(true)
})

// 初始加载
onMounted(() => {
  loadPosts()
})
</script>

<style scoped>
.bg-grid-white {
  background-image: linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px),
                    linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px);
}

.bg-grid-8 {
  background-size: 8rem 8rem;
}
</style> 