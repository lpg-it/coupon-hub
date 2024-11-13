<template>
  <MainLayout>
    <!-- Hero Section -->
    <div class="bg-gradient-to-r from-blue-500 to-indigo-600 text-white relative overflow-hidden">
      <div class="absolute inset-0 bg-grid-white/[0.1] bg-grid-8"></div>
      <div class="container mx-auto px-4 py-16 relative">
        <h1 class="text-4xl md:text-5xl font-bold text-center mb-6 animate-fade-in">
          Special Offers & Deals
        </h1>
        <p class="text-xl text-center mb-12 text-blue-100 max-w-2xl mx-auto">
          Discover exclusive discounts and limited-time offers from your favorite brands
        </p>
        <!-- Search -->
        <div class="max-w-2xl mx-auto">
          <div class="relative">
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="Search special offers..." 
              class="w-full px-6 py-4 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300 text-lg"
              @input="handleSearch"
            />
            <i class="fas fa-search absolute right-6 top-1/2 -translate-y-1/2 text-gray-400"></i>
          </div>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 py-12">
      <!-- Quick Filters -->
      <section class="mb-12">
        <div class="flex flex-wrap gap-4 justify-center">
          <button 
            v-for="filter in filters" 
            :key="filter.value"
            class="px-6 py-3 rounded-full bg-white shadow-sm hover:shadow-md transition-all
                   text-gray-600 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300
                   flex items-center gap-2"
            :class="{ 'bg-blue-50 text-blue-600': activeFilter === filter.value }"
            @click="activeFilter = filter.value"
          >
            <i :class="['fas', filter.icon]"></i>
            {{ filter.label }}
          </button>
        </div>
      </section>

      <!-- Featured Deals -->
      <section v-if="activeFilter === 'all'" class="mb-12">
        <div class="flex items-center justify-between mb-6">
          <h2 class="section-title mb-0">
            <i class="fas fa-fire text-orange-500"></i>
            Featured Deals
          </h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CouponCard 
            v-for="offer in featuredOffers"
            :key="offer.id"
            :coupon="offer"
          />
        </div>
      </section>

      <!-- All Offers -->
      <section>
        <div class="flex items-center justify-between mb-6">
          <h2 class="section-title mb-0">
            <i :class="['fas', filterIcon, 'text-blue-500']"></i>
            {{ filterTitle }}
          </h2>
          <div class="flex items-center gap-4">
            <select 
              v-model="sortBy"
              class="px-4 py-2 rounded-lg bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <option value="newest">Newest First</option>
              <option value="expiring">Expiring Soon</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>
        </div>

        <!-- Offers Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CouponCard 
            v-for="offer in sortedOffers"
            :key="offer.id"
            :coupon="offer"
          />
        </div>

        <!-- No Results Message -->
        <div v-if="sortedOffers.length === 0" class="text-center py-12">
          <div class="text-gray-400 text-6xl mb-4">
            <i class="fas fa-search"></i>
          </div>
          <h3 class="text-xl font-semibold text-gray-700 mb-2">No Offers Found</h3>
          <p class="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>

        <!-- Load More -->
        <div v-if="hasMoreOffers" class="text-center mt-12">
          <button 
            @click="loadMore"
            class="btn-primary px-8 py-3 flex items-center gap-2 mx-auto"
            :disabled="isLoading"
          >
            <span v-if="isLoading">
              <i class="fas fa-spinner fa-spin"></i>
              Loading...
            </span>
            <span v-else>
              Load More Offers
              <i class="fas fa-chevron-down"></i>
            </span>
          </button>
        </div>
      </section>
    </div>
  </MainLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { getSpecialOffers } from '../api'
import CouponCard from '../components/CouponCard.vue'
import MainLayout from '../components/MainLayout.vue'
import { useToast } from 'vue-toastification'

const toast = useToast()
const searchQuery = ref('')
const activeFilter = ref('all')
const sortBy = ref('newest')
const offers = ref([])
const page = ref(1)
const isLoading = ref(false)

const filters = [
  { label: 'All Offers', value: 'all', icon: 'fa-tags' },
  { label: 'Trending', value: 'trending', icon: 'fa-fire' },
  { label: 'Ending Soon', value: 'ending', icon: 'fa-clock' },
  { label: 'New Arrivals', value: 'new', icon: 'fa-star' },
]

const filterIcon = computed(() => {
  const filter = filters.find(f => f.value === activeFilter.value)
  return filter ? filter.icon : 'fa-tags'
})

const filterTitle = computed(() => {
  const filter = filters.find(f => f.value === activeFilter.value)
  return filter ? filter.label : 'All Offers'
})

const featuredOffers = computed(() => {
  return offers.value
    .filter(offer => offer.isSpecial)
    .slice(0, 3)
})

const filteredOffers = computed(() => {
  let result = offers.value

  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(offer => 
      offer.description.toLowerCase().includes(query) ||
      offer.brand.name.toLowerCase().includes(query)
    )
  }

  // Apply category filter
  if (activeFilter.value !== 'all') {
    result = result.filter(offer => {
      switch (activeFilter.value) {
        case 'trending':
          return offer.isTrending
        case 'ending':
          const daysLeft = Math.ceil((new Date(offer.expiryDate) - new Date()) / (1000 * 60 * 60 * 24))
          return daysLeft <= 7
        case 'new':
          const daysOld = Math.ceil((new Date() - new Date(offer.createdAt)) / (1000 * 60 * 60 * 24))
          return daysOld <= 7
        default:
          return true
      }
    })
  }

  return result
})

const sortedOffers = computed(() => {
  return [...filteredOffers.value].sort((a, b) => {
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

const hasMoreOffers = computed(() => {
  return filteredOffers.value.length > page.value * 12
})

const handleSearch = () => {
  page.value = 1
}

const loadMore = async () => {
  if (isLoading.value) return
  
  try {
    isLoading.value = true
    page.value++
    const newOffers = await getSpecialOffers(page.value)
    offers.value = [...offers.value, ...newOffers]
  } catch (error) {
    toast.error('Failed to load more offers')
  } finally {
    isLoading.value = false
  }
}

onMounted(async () => {
  try {
    const initialOffers = await getSpecialOffers()
    offers.value = initialOffers
  } catch (error) {
    toast.error('Failed to load offers')
  }
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