<template>
  <MainLayout>
    <!-- Hero Section -->
    <div class="bg-gradient-to-r from-blue-500 to-indigo-600 text-white relative overflow-hidden">
      <div class="absolute inset-0 bg-grid-white/[0.1] bg-grid-8"></div>
      <div class="container mx-auto px-4 py-16 relative">
        <div class="flex items-center justify-center gap-4 mb-6">
          <div :class="['w-16 h-16 rounded-full flex items-center justify-center text-2xl', categoryColor]">
            <i :class="['fas', categoryIcon]"></i>
          </div>
          <h1 class="text-4xl md:text-5xl font-bold text-center animate-fade-in">
            {{ categoryName }} Coupons
          </h1>
        </div>
        <p class="text-xl text-center mb-12 text-blue-100 max-w-2xl mx-auto">
          Find the best {{ categoryName.toLowerCase() }} deals and discount codes
        </p>
        <!-- Search -->
        <div class="max-w-2xl mx-auto">
          <div class="relative">
            <input 
              v-model="searchQuery"
              type="text" 
              :placeholder="`Search ${categoryName.toLowerCase()} coupons...`"
              class="w-full px-6 py-4 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300 text-lg"
              @input="handleSearch"
            />
            <i class="fas fa-search absolute right-6 top-1/2 -translate-y-1/2 text-gray-400"></i>
          </div>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 py-12">
      <!-- Sort Options -->
      <div class="flex justify-end mb-8">
        <select 
          v-model="sortBy"
          class="px-4 py-2 rounded-lg bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <option value="newest">Newest First</option>
          <option value="expiring">Expiring Soon</option>
          <option value="popular">Most Popular</option>
        </select>
      </div>

      <!-- Coupons Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CouponCard 
          v-for="coupon in sortedCoupons"
          :key="coupon.id"
          :coupon="coupon"
        />
      </div>

      <!-- No Results Message -->
      <div v-if="sortedCoupons.length === 0" class="text-center py-12">
        <div class="text-gray-400 text-6xl mb-4">
          <i class="fas fa-search"></i>
        </div>
        <h3 class="text-xl font-semibold text-gray-700 mb-2">No Coupons Found</h3>
        <p class="text-gray-500">Try adjusting your search criteria</p>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getCoupons } from '../api'
import CouponCard from '../components/CouponCard.vue'
import MainLayout from '../components/MainLayout.vue'
import { useToast } from 'vue-toastification'

const route = useRoute()
const toast = useToast()
const searchQuery = ref('')
const sortBy = ref('newest')
const coupons = ref([])

const categoryName = computed(() => {
  return route.params.category.charAt(0).toUpperCase() + route.params.category.slice(1)
})

const categoryIcon = computed(() => {
  const icons = {
    shopping: 'fa-shopping-bag',
    food: 'fa-utensils',
    travel: 'fa-plane',
    electronics: 'fa-laptop',
    fashion: 'fa-tshirt',
    beauty: 'fa-spa'
  }
  return icons[route.params.category.toLowerCase()] || 'fa-tag'
})

const categoryColor = computed(() => {
  const colors = {
    shopping: 'bg-blue-100 text-blue-600',
    food: 'bg-red-100 text-red-600',
    travel: 'bg-green-100 text-green-600',
    electronics: 'bg-purple-100 text-purple-600',
    fashion: 'bg-orange-100 text-orange-600',
    beauty: 'bg-pink-100 text-pink-600'
  }
  return colors[route.params.category.toLowerCase()] || 'bg-gray-100 text-gray-600'
})

const filteredCoupons = computed(() => {
  let result = coupons.value.filter(coupon => 
    coupon.category.toLowerCase() === route.params.category.toLowerCase()
  )

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(coupon => 
      coupon.description.toLowerCase().includes(query) ||
      coupon.brand.name.toLowerCase().includes(query)
    )
  }

  return result
})

const sortedCoupons = computed(() => {
  return [...filteredCoupons.value].sort((a, b) => {
    switch (sortBy.value) {
      case 'expiring':
        return new Date(a.expiryDate) - new Date(b.expiryDate)
      case 'popular':
        return (b.usageCount || 0) - (a.usageCount || 0)
      default: // 'newest'
        return new Date(b.createdAt || b.expiryDate) - new Date(a.createdAt || a.expiryDate)
    }
  })
})

const handleSearch = () => {
  // Immediate search
}

const loadCoupons = async () => {
  try {
    const allCoupons = await getCoupons()
    coupons.value = allCoupons
  } catch (error) {
    toast.error('Failed to load coupons')
  }
}

// Watch for category changes
watch(() => route.params.category, () => {
  loadCoupons()
})

onMounted(() => {
  loadCoupons()
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