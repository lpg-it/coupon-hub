<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navigation Bar -->
    <nav class="bg-white shadow-sm sticky top-0 z-50">
      <div class="container mx-auto px-4">
        <!-- Main Navigation -->
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center gap-8">
            <router-link to="/" class="text-xl font-bold text-blue-600">CouponHub</router-link>
            <div class="hidden md:flex items-center gap-6">
              <router-link 
                v-for="item in navItems" 
                :key="item.path"
                :to="item.path"
                class="text-gray-600 hover:text-blue-600 transition-colors"
                :class="{ 'text-blue-600': isCurrentRoute(item.path) }"
              >
                {{ item.name }}
              </router-link>
              <!-- Categories Dropdown -->
              <div class="relative" @mouseleave="showCategories = false">
                <button 
                  @mouseenter="showCategories = true"
                  class="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-1"
                >
                  Categories
                  <i class="fas fa-chevron-down text-xs"></i>
                </button>
                <!-- Dropdown Menu -->
                <div 
                  v-show="showCategories"
                  class="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-lg py-2 animate-slide-down"
                >
                  <div class="grid grid-cols-1 gap-1">
                    <router-link
                      v-for="category in categories"
                      :key="category.id"
                      :to="`/category/${category.name.toLowerCase()}`"
                      class="px-4 py-2 hover:bg-blue-50 flex items-center gap-3 group"
                    >
                      <div :class="['w-8 h-8 rounded-full flex items-center justify-center', categoryColors[category.color]]">
                        <i :class="['fas', category.icon]"></i>
                      </div>
                      <div>
                        <span class="font-medium group-hover:text-blue-600">{{ category.name }}</span>
                        <p class="text-xs text-gray-500">{{ category.count }} coupons</p>
                      </div>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex items-center gap-4">
            <!-- Language Selector -->
            <div class="relative" @mouseleave="showLanguages = false">
              <button 
                @mouseenter="showLanguages = true"
                class="text-gray-600 hover:text-blue-600 flex items-center gap-2"
              >
                <i class="fas fa-globe"></i>
                <span class="text-sm">{{ currentLanguage.name }}</span>
                <i class="fas fa-chevron-down text-xs"></i>
              </button>
              <!-- Language Dropdown -->
              <div 
                v-show="showLanguages"
                class="absolute top-full right-0 mt-1 w-40 bg-white rounded-lg shadow-lg py-2 animate-slide-down"
              >
                <button
                  v-for="lang in languages"
                  :key="lang.code"
                  class="w-full px-4 py-2 text-left hover:bg-blue-50 flex items-center gap-3"
                  :class="{ 'text-blue-600 bg-blue-50': lang.code === currentLanguage.code }"
                  @click="changeLanguage(lang)"
                >
                  <img :src="lang.flag" :alt="lang.name" class="w-5 h-5 rounded-full object-cover">
                  {{ lang.name }}
                </button>
              </div>
            </div>
            
            <!-- Mobile Menu Button -->
            <button 
              @click="showMobileMenu = !showMobileMenu"
              class="md:hidden text-gray-600 hover:text-blue-600"
            >
              <i :class="['fas', showMobileMenu ? 'fa-times' : 'fa-bars']"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div 
        v-show="showMobileMenu"
        class="md:hidden bg-white border-t"
      >
        <div class="container mx-auto px-4 py-2">
          <div class="flex flex-col gap-2">
            <router-link 
              v-for="item in navItems" 
              :key="item.path"
              :to="item.path"
              class="py-2 text-gray-600"
              :class="{ 'text-blue-600': isCurrentRoute(item.path) }"
            >
              {{ item.name }}
            </router-link>
            <!-- Mobile Categories -->
            <button 
              @click="showMobileCategories = !showMobileCategories"
              class="flex items-center justify-between py-2 text-gray-600"
            >
              Categories
              <i :class="['fas', showMobileCategories ? 'fa-chevron-up' : 'fa-chevron-down']"></i>
            </button>
            <div v-show="showMobileCategories" class="pl-4 space-y-2">
              <router-link
                v-for="category in categories"
                :key="category.id"
                :to="`/category/${category.name.toLowerCase()}`"
                class="flex items-center gap-3 py-2"
              >
                <div :class="['w-8 h-8 rounded-full flex items-center justify-center', categoryColors[category.color]]">
                  <i :class="['fas', category.icon]"></i>
                </div>
                <span>{{ category.name }}</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Page Content -->
    <slot></slot>

    <!-- Back to Top Button -->
    <button 
      v-show="showBackToTop"
      @click="scrollToTop"
      class="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg
             hover:bg-blue-700 transition-all duration-300 z-50"
    >
      <i class="fas fa-arrow-up"></i>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const showBackToTop = ref(false)
const showCategories = ref(false)
const showMobileMenu = ref(false)
const showMobileCategories = ref(false)
const showLanguages = ref(false)

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Brands', path: '/brands' },
  { name: 'Special Offers', path: '/special-offers' },
  { name: 'Blog', path: '/blogs' },
]

const categories = [
  { id: 1, name: 'Shopping', icon: 'fa-shopping-bag', count: 150, color: 'blue' },
  { id: 2, name: 'Food', icon: 'fa-utensils', count: 89, color: 'red' },
  { id: 3, name: 'Travel', icon: 'fa-plane', count: 45, color: 'green' },
  { id: 4, name: 'Electronics', icon: 'fa-laptop', count: 78, color: 'purple' },
  { id: 5, name: 'Fashion', icon: 'fa-tshirt', count: 92, color: 'orange' },
  { id: 6, name: 'Beauty', icon: 'fa-spa', count: 67, color: 'pink' },
]

const categoryColors = {
  blue: 'bg-blue-100 text-blue-600',
  red: 'bg-red-100 text-red-600',
  green: 'bg-green-100 text-green-600',
  purple: 'bg-purple-100 text-purple-600',
  orange: 'bg-orange-100 text-orange-600',
  pink: 'bg-pink-100 text-pink-600',
}

const isCurrentRoute = (path) => {
  return route.path === path
}

const handleScroll = () => {
  showBackToTop.value = window.scrollY > 300
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

// Close mobile menu when route changes
router.afterEach(() => {
  showMobileMenu.value = false
  showMobileCategories.value = false
})

// 语言配置
const languages = [
  {
    code: 'en',
    name: 'English',
    flag: 'https://flagcdn.com/w40/us.png'
  }
  // 后续可以添加更多语言
  // {
  //   code: 'es',
  //   name: 'Español',
  //   flag: 'https://flagcdn.com/w40/es.png'
  // },
  // {
  //   code: 'fr',
  //   name: 'Français',
  //   flag: 'https://flagcdn.com/w40/fr.png'
  // }
]

const currentLanguage = ref(languages[0]) // 默认英语

const changeLanguage = (lang) => {
  currentLanguage.value = lang
  showLanguages.value = false
  // 这里可以添加语言切换的逻辑
  // 例如：更新 localStorage、触发事件等
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.animate-slide-down {
  animation: slideDown 0.2s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style> 