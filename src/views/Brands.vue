<template>
  <MainLayout>
    <!-- Hero Section -->
    <div class="bg-gradient-to-r from-blue-500 to-indigo-600 text-white relative overflow-hidden">
      <div class="absolute inset-0 bg-grid-white/[0.1] bg-grid-8"></div>
      <div class="container mx-auto px-4 py-16 relative">
        <h1 class="text-4xl md:text-5xl font-bold text-center mb-6 animate-fade-in">
          All Brands
        </h1>
        <div class="max-w-2xl mx-auto">
          <div class="relative">
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="Search brands..." 
              class="w-full px-6 py-4 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300 text-lg"
              @input="handleSearch"
            />
            <i class="fas fa-search absolute right-6 top-1/2 -translate-y-1/2 text-gray-400"></i>
          </div>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 py-12">
      <!-- Categories Filter -->
      <div class="flex flex-wrap gap-4 mb-8">
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

      <!-- Brands Grid -->
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        <BrandCard
          v-for="brand in filteredBrands"
          :key="brand.id"
          :brand="brand"
        />
      </div>

      <!-- No Results Message -->
      <div v-if="filteredBrands.length === 0" class="text-center py-12">
        <p class="text-gray-500 text-lg">No brands found matching your search criteria</p>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { getBrands } from '../api'
import BrandCard from '../components/BrandCard.vue'
import MainLayout from '../components/MainLayout.vue'
import { useToast } from 'vue-toastification'

const toast = useToast()
const searchQuery = ref('')
const selectedCategory = ref('All')
const brands = ref([])

const categories = [
  'All',
  'Shopping',
  'Fashion',
  'Electronics',
  'Food',
  'Travel',
  'Beauty'
]

const filteredBrands = computed(() => {
  let result = brands.value

  if (selectedCategory.value !== 'All') {
    result = result.filter(brand => brand.category === selectedCategory.value)
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(brand => 
      brand.name.toLowerCase().includes(query)
    )
  }

  return result
})

const handleSearch = () => {
  // Immediate search without button click
}

onMounted(async () => {
  try {
    const initialBrands = await getBrands()
    brands.value = initialBrands.map(brand => ({
      ...brand,
      category: ['Shopping', 'Fashion', 'Electronics', 'Food', 'Travel', 'Beauty'][Math.floor(Math.random() * 6)]
    }))
  } catch (error) {
    toast.error('Failed to load brands')
    console.error('Error loading brands:', error)
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