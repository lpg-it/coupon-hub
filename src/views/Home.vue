<template>
  <MainLayout>
    <!-- Hero Section -->
    <div class="bg-gradient-to-r from-blue-500 to-indigo-600 text-white relative overflow-hidden">
      <div class="absolute inset-0 bg-grid-white/[0.1] bg-grid-8"></div>
      <div class="container mx-auto px-4 py-20 relative">
        <h1 class="text-4xl md:text-6xl font-bold text-center mb-8 animate-fade-in">
          Discover Latest Coupon Codes
        </h1>
        <p class="text-xl text-center mb-12 text-blue-100">
          Save money with hundreds of new coupons updated daily
        </p>
        <div class="max-w-2xl mx-auto">
          <div class="relative">
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="Search brands or coupons..." 
              class="w-full px-6 py-4 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300 text-lg"
              @keyup.enter="handleSearch"
            />
            <button 
              @click="handleSearch"
              class="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white p-4 rounded-full
                     hover:bg-blue-700 transition-colors"
            >
              <i class="fas fa-search"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="container mx-auto px-4 py-12">
      <!-- Categories -->
      <section class="mb-16">
        <h2 class="section-title">
          <i class="fas fa-tags text-blue-500"></i>
          Popular Categories
        </h2>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <CategoryCard 
            v-for="category in categories" 
            :key="category.id"
            :category="category"
          />
        </div>
      </section>

      <!-- Featured Coupons -->
      <section class="mb-16">
        <div class="flex items-center justify-between mb-6">
          <h2 class="section-title mb-0">
            <i class="fas fa-star text-yellow-500"></i>
            Featured Coupons
          </h2>
          <router-link to="/special-offers" class="btn-primary">
            View All <i class="fas fa-arrow-right ml-2"></i>
          </router-link>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CouponCard 
            v-for="coupon in todaysCoupons"
            :key="coupon.id"
            :coupon="coupon"
          />
        </div>
      </section>

      <!-- Popular Brands -->
      <section>
        <div class="flex items-center justify-between mb-6">
          <h2 class="section-title mb-0">
            <i class="fas fa-crown text-amber-500"></i>
            Popular Brands
          </h2>
          <router-link to="/brands" class="btn-primary">
            All Brands <i class="fas fa-arrow-right ml-2"></i>
          </router-link>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          <BrandCard
            v-for="brand in popularBrands.slice(0, 6)"
            :key="brand.id"
            :brand="brand"
          />
        </div>
      </section>
    </div>
  </MainLayout>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { getCoupons, getBrands, searchCoupons } from '../api'
import CouponCard from '../components/CouponCard.vue'
import BrandCard from '../components/BrandCard.vue'
import CategoryCard from '../components/CategoryCard.vue'
import { useToast } from 'vue-toastification'
import MainLayout from '../components/MainLayout.vue'

const toast = useToast()
const searchQuery = ref('')
const todaysCoupons = ref([])
const popularBrands = ref([])
const showBackToTop = ref(false)

const categories = ref([
  { id: 1, name: 'Shopping', icon: 'fa-shopping-bag', count: 150, color: 'blue' },
  { id: 2, name: 'Food', icon: 'fa-utensils', count: 89, color: 'red' },
  { id: 3, name: 'Travel', icon: 'fa-plane', count: 45, color: 'green' },
  { id: 4, name: 'Electronics', icon: 'fa-laptop', count: 78, color: 'purple' },
  { id: 5, name: 'Fashion', icon: 'fa-tshirt', count: 92, color: 'orange' },
  { id: 6, name: 'Beauty', icon: 'fa-spa', count: 67, color: 'pink' },
])

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Brands', path: '/brands' },
  { name: 'Special Offers', path: '/special-offers' },
  { name: 'Blog', path: '/blogs' },
]

const handleSearch = async () => {
  if (!searchQuery.value.trim()) {
    toast.warning('Please enter a search term')
    return
  }
  try {
    const results = await searchCoupons(searchQuery.value)
    todaysCoupons.value = results
  } catch (error) {
    toast.error('Search failed, please try again')
  }
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

onMounted(async () => {
  try {
    todaysCoupons.value = await getCoupons()
    popularBrands.value = await getBrands()
    window.addEventListener('scroll', handleScroll)
  } catch (error) {
    toast.error('Failed to load data, please refresh')
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
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

.animate-fade-in {
  animation: fadeIn 1s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style> 