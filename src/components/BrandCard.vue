<template>
  <router-link 
    :to="`/brands/${brand.id}`"
    class="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-4 group cursor-pointer"
  >
    <div class="aspect-square relative overflow-hidden rounded-lg mb-4">
      <img 
        :src="brand.logo" 
        :alt="brand.name"
        class="w-full h-full object-contain p-2 group-hover:scale-110 transition-transform duration-300"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </div>
    <div class="text-center">
      <h3 class="font-semibold text-gray-800 mb-1">{{ brand.name }}</h3>
      <p class="text-sm text-gray-500">{{ brand.activeCouponsCount }} Active Coupons</p>
    </div>
  </router-link>
</template>

<script setup>
defineProps({
  brand: {
    type: Object,
    required: true
  }
})
</script> 