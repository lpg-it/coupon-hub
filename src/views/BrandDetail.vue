<template>
  <MainLayout>
    <div v-if="brand" class="min-h-screen bg-gray-50">
      <!-- Hero Section -->
      <div class="bg-gradient-to-r from-blue-500 to-indigo-600 text-white relative overflow-hidden">
        <div class="absolute inset-0 bg-grid-white/[0.1] bg-grid-8"></div>
        <div class="container mx-auto px-4 py-16 relative">
          <div class="flex flex-col md:flex-row items-center gap-8 max-w-4xl mx-auto">
            <!-- Brand Logo -->
            <div class="w-32 h-32 bg-white rounded-xl p-4 shadow-lg flex-shrink-0">
              <img 
                :src="brand.logo" 
                :alt="brand.name"
                class="w-full h-full object-contain"
              />
            </div>
            <!-- Brand Info -->
            <div class="flex-1 text-center md:text-left">
              <h1 class="text-3xl md:text-4xl font-bold mb-4">{{ brand.name }} Coupons & Promo Codes</h1>
              <div class="flex flex-wrap gap-4 justify-center md:justify-start">
                <div class="bg-white/10 px-4 py-2 rounded-full">
                  <span class="font-semibold">{{ brand.coupons.length }}</span> Active Offers
                </div>
                <div class="bg-white/10 px-4 py-2 rounded-full">
                  Last Updated: {{ formatDate(new Date()) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container mx-auto px-4 py-12">
        <div class="flex flex-col lg:flex-row gap-8">
          <!-- Main Content -->
          <div class="flex-1">
            <!-- Quick Stats -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <div 
                v-for="stat in stats" 
                :key="stat.label"
                class="bg-white rounded-xl p-6 text-center shadow-sm"
              >
                <div class="text-2xl font-bold text-gray-800 mb-2">{{ stat.value }}</div>
                <div class="text-gray-500">{{ stat.label }}</div>
              </div>
            </div>

            <!-- Filters -->
            <div class="flex flex-wrap gap-4 mb-8">
              <button 
                v-for="filter in filters" 
                :key="filter.value"
                class="px-6 py-2 rounded-full bg-white shadow-sm hover:shadow-md transition-all
                       text-gray-600 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300
                       flex items-center gap-2"
                :class="{ 'bg-blue-50 text-blue-600': activeFilter === filter.value }"
                @click="activeFilter = filter.value"
              >
                <i :class="['fas', filter.icon]"></i>
                {{ filter.label }}
              </button>
            </div>

            <!-- Coupons Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CouponCard 
                v-for="coupon in filteredCoupons"
                :key="coupon.id"
                :coupon="coupon"
              />
            </div>
          </div>

          <!-- Sidebar -->
          <div class="lg:w-80 flex-shrink-0">
            <!-- About Brand -->
            <div class="bg-white rounded-xl p-6 shadow-sm sticky top-24">
              <h2 class="text-xl font-bold text-gray-800 mb-4">About {{ brand.name }}</h2>
              <p class="text-gray-600 mb-6">{{ brand.description }}</p>
              
              <!-- Quick Links -->
              <div class="space-y-4">
                <a 
                  :href="brand.website"
                  target="_blank"
                  class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors
                         flex items-center justify-center gap-2 w-full"
                >
                  <i class="fas fa-external-link-alt"></i>
                  Visit Store
                </a>
                <button 
                  @click="openShareModal"
                  class="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg 
                         hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 w-full"
                >
                  <i class="fas fa-share-alt"></i>
                  Share
                </button>
              </div>

              <!-- Additional Info -->
              <div class="mt-6 space-y-4">
                <div class="flex items-center gap-3 text-gray-600">
                  <i class="fas fa-check-circle text-green-500"></i>
                  <span>Verified Coupons</span>
                </div>
                <div class="flex items-center gap-3 text-gray-600">
                  <i class="fas fa-clock text-blue-500"></i>
                  <span>Updated Daily</span>
                </div>
                <div class="flex items-center gap-3 text-gray-600">
                  <i class="fas fa-users text-purple-500"></i>
                  <span>{{ Math.floor(Math.random() * 10000) }}+ Users Saved</span>
                </div>
              </div>
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
        <p class="text-gray-500">Loading brand details...</p>
      </div>
    </div>

    <!-- Share Modal -->
    <Teleport to="body">
      <div 
        v-if="showShareModal"
        class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        @click="closeShareModal"
      >
        <div 
          class="bg-white rounded-xl p-8 max-w-md w-full mx-4 transform transition-all"
          @click.stop
        >
          <div class="text-center">
            <h3 class="text-xl font-bold text-gray-800 mb-4">Share {{ brand?.name }}</h3>
            <p class="text-gray-600 mb-6">Share these deals with your friends</p>
            
            <!-- Share URL -->
            <div class="bg-gray-50 rounded-lg p-3 mb-6 flex items-center gap-2">
              <input 
                ref="shareUrlInput"
                type="text" 
                :value="shareUrl" 
                readonly
                class="flex-1 bg-transparent border-none focus:outline-none text-gray-600"
              />
              <button 
                @click="copyShareUrl"
                class="text-blue-600 hover:text-blue-700 px-3 py-1"
              >
                <i class="fas fa-copy"></i>
              </button>
            </div>

            <!-- Social Share Buttons -->
            <div class="grid grid-cols-2 gap-4">
              <a 
                :href="getTwitterShareUrl()"
                target="_blank"
                class="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#1DA1F2] text-white hover:bg-[#1a8cd8] transition-colors"
              >
                <i class="fab fa-twitter"></i>
                Twitter
              </a>
              <a 
                :href="getFacebookShareUrl()"
                target="_blank"
                class="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#4267B2] text-white hover:bg-[#365899] transition-colors"
              >
                <i class="fab fa-facebook"></i>
                Facebook
              </a>
              <a 
                :href="getLinkedInShareUrl()"
                target="_blank"
                class="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#0077B5] text-white hover:bg-[#006399] transition-colors"
              >
                <i class="fab fa-linkedin"></i>
                LinkedIn
              </a>
              <a 
                :href="getWhatsAppShareUrl()"
                target="_blank"
                class="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#25D366] text-white hover:bg-[#20bd5a] transition-colors"
              >
                <i class="fab fa-whatsapp"></i>
                WhatsApp
              </a>
            </div>

            <!-- Close Button -->
            <button 
              @click="closeShareModal"
              class="mt-6 text-gray-500 hover:text-gray-700"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </MainLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getBrandDetails } from '../api'
import MainLayout from '../components/MainLayout.vue'
import CouponCard from '../components/CouponCard.vue'
import { useToast } from 'vue-toastification'

const route = useRoute()
const toast = useToast()
const brand = ref(null)
const activeFilter = ref('all')

const filters = [
  { label: 'All Offers', value: 'all', icon: 'fa-tags' },
  { label: 'Coupons', value: 'coupons', icon: 'fa-ticket-alt' },
  { label: 'Deals', value: 'deals', icon: 'fa-percent' },
  { label: 'Best Offers', value: 'best', icon: 'fa-star' },
]

const stats = computed(() => [
  { 
    label: 'Total Offers',
    value: brand.value?.coupons.length || 0
  },
  {
    label: 'Avg Discount',
    value: calculateAverageDiscount()
  },
  {
    label: 'Success Rate',
    value: '98%'
  },
  {
    label: 'Total Saved',
    value: '$1.2M+'
  }
])

const filteredCoupons = computed(() => {
  if (!brand.value) return []
  
  let result = brand.value.coupons
  
  switch (activeFilter.value) {
    case 'coupons':
      return result.filter(c => c.type === 'Coupon')
    case 'deals':
      return result.filter(c => c.type === 'Deal')
    case 'best':
      return result.filter(c => c.isSpecial)
    default:
      return result
  }
})

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const calculateAverageDiscount = () => {
  if (!brand.value?.coupons.length) return '0%'
  
  const percentages = brand.value.coupons
    .map(c => parseInt(c.discount))
    .filter(n => !isNaN(n))
  
  if (!percentages.length) return 'Varies'
  
  const avg = percentages.reduce((a, b) => a + b, 0) / percentages.length
  return `${Math.round(avg)}%`
}

const showShareModal = ref(false)
const shareUrlInput = ref(null)

// 获取当前页面URL
const shareUrl = computed(() => {
  return window.location.href
})

// 分享文本
const shareText = computed(() => {
  return `Check out these amazing deals from ${brand.value?.name} on CouponHub!`
})

// 社交媒体分享URL
const getTwitterShareUrl = () => {
  const text = encodeURIComponent(shareText.value)
  const url = encodeURIComponent(shareUrl.value)
  return `https://twitter.com/intent/tweet?text=${text}&url=${url}`
}

const getFacebookShareUrl = () => {
  const url = encodeURIComponent(shareUrl.value)
  return `https://www.facebook.com/sharer/sharer.php?u=${url}`
}

const getLinkedInShareUrl = () => {
  const url = encodeURIComponent(shareUrl.value)
  const title = encodeURIComponent(shareText.value)
  return `https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}`
}

const getWhatsAppShareUrl = () => {
  const text = encodeURIComponent(`${shareText.value}\n${shareUrl.value}`)
  return `https://wa.me/?text=${text}`
}

// 复制分享链接
const copyShareUrl = async () => {
  try {
    await navigator.clipboard.writeText(shareUrl.value)
    toast.success('Link copied to clipboard!')
  } catch (error) {
    toast.error('Failed to copy link')
  }
}

// 打开分享弹窗
const openShareModal = () => {
  showShareModal.value = true
}

// 关闭分享弹窗
const closeShareModal = () => {
  showShareModal.value = false
}

onMounted(async () => {
  try {
    brand.value = await getBrandDetails(route.params.id)
    if (!brand.value) {
      toast.error('Brand not found')
    }
  } catch (error) {
    toast.error('Failed to load brand details')
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