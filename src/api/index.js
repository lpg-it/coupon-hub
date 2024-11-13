import axios from 'axios'

// 改用 GitHub raw content URL 或其他 CDN URL
const DATA_URL = 'https://raw.githubusercontent.com/your-username/coupon-data/main/data'

// 模拟品牌数据
const mockBrands = [
  // Technology & Electronics
  { id: '1', name: 'Amazon', logo: 'https://logo.clearbit.com/amazon.com', activeCouponsCount: 45, category: 'Shopping' },
  { id: '2', name: 'Apple', logo: 'https://logo.clearbit.com/apple.com', activeCouponsCount: 12, category: 'Electronics' },
  { id: '3', name: 'Microsoft', logo: 'https://logo.clearbit.com/microsoft.com', activeCouponsCount: 18, category: 'Electronics' },
  { id: '4', name: 'Samsung', logo: 'https://logo.clearbit.com/samsung.com', activeCouponsCount: 25, category: 'Electronics' },
  { id: '5', name: 'Best Buy', logo: 'https://logo.clearbit.com/bestbuy.com', activeCouponsCount: 32, category: 'Electronics' },
  { id: '6', name: 'Dell', logo: 'https://logo.clearbit.com/dell.com', activeCouponsCount: 15, category: 'Electronics' },
  { id: '7', name: 'HP', logo: 'https://logo.clearbit.com/hp.com', activeCouponsCount: 14, category: 'Electronics' },
  { id: '8', name: 'Lenovo', logo: 'https://logo.clearbit.com/lenovo.com', activeCouponsCount: 11, category: 'Electronics' },
  { id: '9', name: 'Sony', logo: 'https://logo.clearbit.com/sony.com', activeCouponsCount: 16, category: 'Electronics' },
  { id: '10', name: 'LG', logo: 'https://logo.clearbit.com/lg.com', activeCouponsCount: 13, category: 'Electronics' },

  // Fashion & Apparel
  { id: '11', name: 'Nike', logo: 'https://logo.clearbit.com/nike.com', activeCouponsCount: 28, category: 'Fashion' },
  { id: '12', name: 'Adidas', logo: 'https://logo.clearbit.com/adidas.com', activeCouponsCount: 26, category: 'Fashion' },
  { id: '13', name: 'H&M', logo: 'https://logo.clearbit.com/hm.com', activeCouponsCount: 35, category: 'Fashion' },
  { id: '14', name: 'Zara', logo: 'https://logo.clearbit.com/zara.com', activeCouponsCount: 22, category: 'Fashion' },
  { id: '15', name: 'UNIQLO', logo: 'https://logo.clearbit.com/uniqlo.com', activeCouponsCount: 19, category: 'Fashion' },
  { id: '16', name: 'Gap', logo: 'https://logo.clearbit.com/gap.com', activeCouponsCount: 24, category: 'Fashion' },
  { id: '17', name: 'Ralph Lauren', logo: 'https://logo.clearbit.com/ralphlauren.com', activeCouponsCount: 17, category: 'Fashion' },
  { id: '18', name: 'Tommy Hilfiger', logo: 'https://logo.clearbit.com/tommy.com', activeCouponsCount: 16, category: 'Fashion' },
  { id: '19', name: 'Puma', logo: 'https://logo.clearbit.com/puma.com', activeCouponsCount: 21, category: 'Fashion' },
  { id: '20', name: 'Under Armour', logo: 'https://logo.clearbit.com/underarmour.com', activeCouponsCount: 18, category: 'Fashion' },

  // Beauty & Cosmetics
  { id: '21', name: 'Sephora', logo: 'https://logo.clearbit.com/sephora.com', activeCouponsCount: 31, category: 'Beauty' },
  { id: '22', name: 'Ulta Beauty', logo: 'https://logo.clearbit.com/ulta.com', activeCouponsCount: 29, category: 'Beauty' },
  { id: '23', name: 'MAC Cosmetics', logo: 'https://logo.clearbit.com/maccosmetics.com', activeCouponsCount: 20, category: 'Beauty' },
  { id: '24', name: 'Estée Lauder', logo: 'https://logo.clearbit.com/esteelauder.com', activeCouponsCount: 15, category: 'Beauty' },
  { id: '25', name: 'L\'Oréal', logo: 'https://logo.clearbit.com/loreal.com', activeCouponsCount: 17, category: 'Beauty' },

  // Home & Furniture
  { id: '26', name: 'IKEA', logo: 'https://logo.clearbit.com/ikea.com', activeCouponsCount: 23, category: 'Shopping' },
  { id: '27', name: 'Wayfair', logo: 'https://logo.clearbit.com/wayfair.com', activeCouponsCount: 34, category: 'Shopping' },
  { id: '28', name: 'Home Depot', logo: 'https://logo.clearbit.com/homedepot.com', activeCouponsCount: 27, category: 'Shopping' },
  { id: '29', name: 'Lowe\'s', logo: 'https://logo.clearbit.com/lowes.com', activeCouponsCount: 25, category: 'Shopping' },
  { id: '30', name: 'Bed Bath & Beyond', logo: 'https://logo.clearbit.com/bedbathandbeyond.com', activeCouponsCount: 30, category: 'Shopping' },

  // Food & Restaurants
  { id: '31', name: 'McDonald\'s', logo: 'https://logo.clearbit.com/mcdonalds.com', activeCouponsCount: 22, category: 'Food' },
  { id: '32', name: 'Starbucks', logo: 'https://logo.clearbit.com/starbucks.com', activeCouponsCount: 19, category: 'Food' },
  { id: '33', name: 'Domino\'s Pizza', logo: 'https://logo.clearbit.com/dominos.com', activeCouponsCount: 24, category: 'Food' },
  { id: '34', name: 'Subway', logo: 'https://logo.clearbit.com/subway.com', activeCouponsCount: 21, category: 'Food' },
  { id: '35', name: 'Pizza Hut', logo: 'https://logo.clearbit.com/pizzahut.com', activeCouponsCount: 23, category: 'Food' },

  // Travel & Hotels
  { id: '36', name: 'Expedia', logo: 'https://logo.clearbit.com/expedia.com', activeCouponsCount: 28, category: 'Travel' },
  { id: '37', name: 'Booking.com', logo: 'https://logo.clearbit.com/booking.com', activeCouponsCount: 26, category: 'Travel' },
  { id: '38', name: 'Airbnb', logo: 'https://logo.clearbit.com/airbnb.com', activeCouponsCount: 20, category: 'Travel' },
  { id: '39', name: 'Marriott', logo: 'https://logo.clearbit.com/marriott.com', activeCouponsCount: 18, category: 'Travel' },
  { id: '40', name: 'Hilton', logo: 'https://logo.clearbit.com/hilton.com', activeCouponsCount: 17, category: 'Travel' },

  // Retail & Department Stores
  { id: '41', name: 'Walmart', logo: 'https://logo.clearbit.com/walmart.com', activeCouponsCount: 42, category: 'Shopping' },
  { id: '42', name: 'Target', logo: 'https://logo.clearbit.com/target.com', activeCouponsCount: 38, category: 'Shopping' },
  { id: '43', name: 'Costco', logo: 'https://logo.clearbit.com/costco.com', activeCouponsCount: 25, category: 'Shopping' },
  { id: '44', name: 'Macy\'s', logo: 'https://logo.clearbit.com/macys.com', activeCouponsCount: 33, category: 'Fashion' },
  { id: '45', name: 'Nordstrom', logo: 'https://logo.clearbit.com/nordstrom.com', activeCouponsCount: 29, category: 'Fashion' },

  // Sports & Outdoors
  { id: '46', name: 'REI', logo: 'https://logo.clearbit.com/rei.com', activeCouponsCount: 21, category: 'Shopping' },
  { id: '47', name: 'Dick\'s Sporting Goods', logo: 'https://logo.clearbit.com/dickssportinggoods.com', activeCouponsCount: 24, category: 'Shopping' },
  { id: '48', name: 'Academy Sports', logo: 'https://logo.clearbit.com/academy.com', activeCouponsCount: 19, category: 'Shopping' },
  { id: '49', name: 'The North Face', logo: 'https://logo.clearbit.com/thenorthface.com', activeCouponsCount: 16, category: 'Fashion' },
  { id: '50', name: 'Columbia Sportswear', logo: 'https://logo.clearbit.com/columbia.com', activeCouponsCount: 15, category: 'Fashion' },

  // ... 继续添加更多品牌 ...
  // 完整的100个品牌列表太长，我只展示了前50个最常见的
  // 你可以按照相同的模式继续添加更多品牌
]

// 模拟优惠券数据
const mockCoupons = [
  {
    id: '1',
    code: 'SAVE20',
    description: '20% off on all items',
    brand: { name: 'Amazon', logo: 'https://logo.clearbit.com/amazon.com' },
    discount: '20% OFF',
    expiryDate: '2024-12-31',
    category: 'Shopping',
    isSpecial: true
  },
  {
    id: '2',
    code: 'NEWUSER50',
    description: '50% off for new users',
    brand: { name: 'Alibaba', logo: 'https://logo.clearbit.com/alibaba.com' },
    discount: '50% OFF',
    expiryDate: '2024-12-31',
    category: 'Shopping',
    isSpecial: true
  },
  {
    id: '3',
    code: 'SPRING30',
    description: '30% off spring collection',
    brand: { name: 'JD', logo: 'https://logo.clearbit.com/jd.com' },
    discount: '30% OFF',
    expiryDate: '2024-12-31',
    category: 'Fashion',
    isSpecial: false
  },
  {
    id: '4',
    code: 'TECH100',
    description: '$100 off on electronics over $1000',
    brand: { name: 'Best Buy', logo: 'https://logo.clearbit.com/bestbuy.com' },
    discount: '$100 OFF',
    expiryDate: '2024-11-30',
    category: 'Electronics',
    isSpecial: true
  },
  {
    id: '5',
    code: 'FOOD25',
    description: '$25 off on food delivery over $100',
    brand: { name: 'Walmart', logo: 'https://logo.clearbit.com/walmart.com' },
    discount: '$25 OFF',
    expiryDate: '2024-10-31',
    category: 'Food',
    isSpecial: false
  },
  // ... 继续添加更多优惠券数据 ...
  {
    id: '30',
    code: 'GAME50',
    description: '$50 off on gaming products over $500',
    brand: { name: 'Microsoft', logo: 'https://logo.clearbit.com/microsoft.com' },
    discount: '$50 OFF',
    expiryDate: '2024-12-15',
    category: 'Gaming',
    isSpecial: true
  }
]

// 模拟博客文章数据
const mockPosts = [
  {
    id: 1,
    title: 'How to Use CouponHub: Complete Guide',
    excerpt: 'Learn how to find, verify and use coupon codes effectively. Our step-by-step guide will help you maximize savings on every purchase.',
    content: `
      <h2>Getting Started with CouponHub</h2>
      <p>Welcome to CouponHub! This guide will walk you through everything you need to know about finding and using coupon codes effectively.</p>
      
      <h3>1. Finding the Right Coupons</h3>
      <ul>
        <li>Use the search bar to find specific brands or products</li>
        <li>Browse categories to discover relevant deals</li>
        <li>Check the "Special Offers" section for the best discounts</li>
      </ul>

      <h3>2. Verifying Coupon Codes</h3>
      <p>All our coupons are verified daily, but here's how to ensure the best results:</p>
      <ul>
        <li>Check the expiration date</li>
        <li>Read terms and conditions</li>
        <li>Look for user success rates</li>
      </ul>

      <h3>3. Using Coupon Codes</h3>
      <p>Follow these steps to use your coupon:</p>
      <ol>
        <li>Click "Get Code" to reveal the coupon code</li>
        <li>Copy the code</li>
        <li>Click through to the retailer's website</li>
        <li>Add items to your cart</li>
        <li>Paste the code at checkout</li>
      </ol>
    `,
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d',
    date: 'Nov 15, 2023',
    category: 'How-to Guides',
    views: '2.5K',
    author: {
      name: 'Sarah Johnson',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      role: 'Senior Editor'
    }
  },
  {
    id: 2,
    title: 'Amazon Prime Day: Ultimate Shopping Guide',
    excerpt: 'Maximize your savings during Amazon Prime Day with our comprehensive guide to the best deals, hidden discounts, and shopping strategies.',
    content: `
      <h2>What is Amazon Prime Day?</h2>
      <p>Amazon Prime Day is one of the biggest shopping events of the year, offering exclusive deals to Prime members.</p>

      <h3>How to Prepare</h3>
      <ul>
        <li>Sign up for Amazon Prime before the event</li>
        <li>Create a wishlist of items you want to buy</li>
        <li>Set up price alerts</li>
        <li>Download the Amazon app</li>
      </ul>

      <h3>Best Categories to Shop</h3>
      <ul>
        <li>Electronics and gadgets</li>
        <li>Home appliances</li>
        <li>Amazon devices</li>
        <li>Fashion and accessories</li>
      </ul>
    `,
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644',
    date: 'Nov 10, 2023',
    category: 'Shopping Guides',
    views: '3.1K',
    author: {
      name: 'Michael Chen',
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
      role: 'Shopping Expert'
    }
  },
  {
    id: 3,
    title: 'Nike Shopping Secrets: Insider Tips',
    excerpt: 'Discover hidden Nike discounts, best times to shop, and expert strategies for getting the best deals on Nike products.',
    content: `
      <h2>Nike Shopping Strategies</h2>
      <p>Learn how to get the best deals on Nike products with these insider tips.</p>

      <h3>Best Times to Shop</h3>
      <ul>
        <li>End of season sales</li>
        <li>Black Friday and Cyber Monday</li>
        <li>Holiday sales events</li>
      </ul>

      <h3>Membership Benefits</h3>
      <p>Sign up for Nike membership to access:</p>
      <ul>
        <li>Exclusive discounts</li>
        <li>Early access to sales</li>
        <li>Free shipping</li>
      </ul>
    `,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
    date: 'Nov 5, 2023',
    category: 'Brand Reviews',
    views: '4.2K',
    author: {
      name: 'Emily Rodriguez',
      avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
      role: 'Fashion Editor'
    }
  },
  {
    id: 4,
    title: 'Black Friday Shopping Strategy Guide',
    excerpt: 'Your complete guide to Black Friday shopping: preparation tips, best categories to shop, and how to find the biggest discounts.',
    content: `
      <h2>Black Friday Shopping Guide</h2>
      <p>Make the most of Black Friday with our expert shopping strategies.</p>

      <h3>Preparation Tips</h3>
      <ul>
        <li>Research prices in advance</li>
        <li>Sign up for retailer newsletters</li>
        <li>Create shopping lists</li>
        <li>Set up online accounts</li>
      </ul>
    `,
    image: 'https://images.unsplash.com/photo-1607083206721-3d6018887383',
    date: 'Oct 30, 2023',
    category: 'Shopping Guides',
    views: '5.7K',
    author: {
      name: 'David Wilson',
      avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
      role: 'Deal Expert'
    }
  },
  {
    id: 5,
    title: 'Best Student Discounts Guide 2024',
    excerpt: 'The ultimate guide to student discounts: where to find them, how to verify your student status, and the best deals available.',
    content: `
      <h2>Student Savings Guide</h2>
      <p>Make the most of your student status with these amazing discounts.</p>

      <h3>Top Student Discounts</h3>
      <ul>
        <li>Technology and software</li>
        <li>Clothing and fashion</li>
        <li>Entertainment services</li>
        <li>Food and dining</li>
      </ul>
    `,
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1',
    date: 'Oct 25, 2023',
    category: 'Money Saving Tips',
    views: '3.8K',
    author: {
      name: 'Jessica Lee',
      avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
      role: 'Student Savings Expert'
    }
  },
  {
    id: 6,
    title: 'Apple Products: Best Time to Buy',
    excerpt: 'Learn when to buy Apple products for the best deals, including seasonal sales, education discounts, and refurbished options.',
    content: `
      <h2>Apple Shopping Guide</h2>
      <p>Strategic timing and insider tips for buying Apple products.</p>

      <h3>Best Times to Buy</h3>
      <ul>
        <li>Back to School season</li>
        <li>Black Friday</li>
        <li>After new product launches</li>
      </ul>
    `,
    image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1',
    date: 'Oct 20, 2023',
    category: 'Brand Reviews',
    views: '4.5K',
    author: {
      name: 'Tom Anderson',
      avatar: 'https://randomuser.me/api/portraits/men/6.jpg',
      role: 'Tech Editor'
    }
  },
  {
    id: 7,
    title: 'Travel Hacks: Save on Flights & Hotels',
    excerpt: 'Expert tips for finding the best travel deals, including flight booking strategies, hotel savings, and loyalty program benefits.',
    content: `
      <h2>Travel Savings Guide</h2>
      <p>Smart strategies for saving money on travel bookings.</p>

      <h3>Flight Booking Tips</h3>
      <ul>
        <li>Best days to book</li>
        <li>Price tracking tools</li>
        <li>Loyalty program strategies</li>
      </ul>
    `,
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05',
    date: 'Oct 15, 2023',
    category: 'Travel',
    views: '3.9K',
    author: {
      name: 'Anna Martinez',
      avatar: 'https://randomuser.me/api/portraits/women/7.jpg',
      role: 'Travel Expert'
    }
  },
  {
    id: 8,
    title: 'Maximizing Cashback Rewards',
    excerpt: 'Learn how to stack cashback offers, credit card rewards, and coupon codes for maximum savings on every purchase.',
    content: `
      <h2>Cashback Optimization Guide</h2>
      <p>Advanced strategies for maximizing your cashback earnings.</p>

      <h3>Stacking Strategies</h3>
      <ul>
        <li>Credit card rewards</li>
        <li>Shopping portals</li>
        <li>Store loyalty programs</li>
      </ul>
    `,
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44',
    date: 'Oct 10, 2023',
    category: 'Money Saving Tips',
    views: '4.1K',
    author: {
      name: 'Robert Kim',
      avatar: 'https://randomuser.me/api/portraits/men/8.jpg',
      role: 'Financial Expert'
    }
  },
  {
    id: 9,
    title: 'Holiday Shopping Guide 2024',
    excerpt: 'Your comprehensive guide to holiday shopping, including best times to buy, price tracking, and gift ideas within budget.',
    content: `
      <h2>Holiday Shopping Strategy</h2>
      <p>Make the most of holiday sales with these expert tips.</p>

      <h3>Key Shopping Dates</h3>
      <ul>
        <li>Black Friday</li>
        <li>Cyber Monday</li>
        <li>Pre-Christmas sales</li>
      </ul>
    `,
    image: 'https://images.unsplash.com/photo-1512909006721-3d6018887383',
    date: 'Oct 5, 2023',
    category: 'Shopping Guides',
    views: '3.5K',
    author: {
      name: 'Lisa Thompson',
      avatar: 'https://randomuser.me/api/portraits/women/9.jpg',
      role: 'Shopping Editor'
    }
  },
  {
    id: 10,
    title: 'Electronics Shopping Guide',
    excerpt: 'Expert advice on buying electronics, including price trends, warranty tips, and the best times to buy different gadgets.',
    content: `
      <h2>Electronics Buying Guide</h2>
      <p>Smart strategies for saving on electronics purchases.</p>

      <h3>Best Times to Buy</h3>
      <ul>
        <li>Major holiday sales</li>
        <li>New model releases</li>
        <li>End of financial year</li>
      </ul>
    `,
    image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03',
    date: 'Sep 30, 2023',
    category: 'Electronics',
    views: '4.7K',
    author: {
      name: 'James Moore',
      avatar: 'https://randomuser.me/api/portraits/men/10.jpg',
      role: 'Tech Expert'
    }
  }
]

// 为每个品牌生成模拟优惠券
const generateBrandCoupons = (brand) => {
  const coupons = []
  const types = ['Coupon', 'Deal']
  const discountTypes = ['Percentage', 'Fixed', 'Free']
  
  // 生成5-8个优惠券
  const count = 5 + Math.floor(Math.random() * 4)
  
  for (let i = 0; i < count; i++) {
    const type = types[Math.floor(Math.random() * types.length)]
    const discountType = discountTypes[Math.floor(Math.random() * discountTypes.length)]
    let discount, description
    
    switch (discountType) {
      case 'Percentage':
        const percent = [10, 15, 20, 25, 30, 40, 50][Math.floor(Math.random() * 7)]
        discount = `${percent}% OFF`
        description = `${percent}% off on ${type === 'Coupon' ? 'your purchase' : 'selected items'}`
        break
      case 'Fixed':
        const amount = [10, 15, 20, 25, 30, 50, 100][Math.floor(Math.random() * 7)]
        discount = `$${amount} OFF`
        description = `$${amount} off on orders over $${amount * 4}`
        break
      case 'Free':
        discount = 'FREE SHIPPING'
        description = 'Free shipping on orders over $50'
        break
    }

    coupons.push({
      id: `${brand.id}-${i + 1}`,
      type,
      code: type === 'Coupon' ? generateCode() : null,
      description,
      discount,
      brand: {
        id: brand.id,
        name: brand.name,
        logo: brand.logo,
        website: brand.website
      },
      expiryDate: generateFutureDate(),
      isSpecial: Math.random() > 0.7,
      usageCount: Math.floor(Math.random() * 1000),
      terms: [
        'Cannot be combined with other offers',
        'Valid for new customers only',
        'Some exclusions may apply'
      ],
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString()
    })
  }
  
  return coupons
}

// 生成随机优惠码
const generateCode = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let code = ''
  for (let i = 0; i < 8; i++) {
    code += chars[Math.floor(Math.random() * chars.length)]
  }
  return code
}

// 生成未来日期
const generateFutureDate = () => {
  const date = new Date()
  date.setDate(date.getDate() + Math.floor(Math.random() * 60) + 30) // 30-90天后过期
  return date.toISOString().split('T')[0]
}

// 获取所有优惠券
export const getCoupons = async () => {
  try {
    const response = await axios.get(`${DATA_URL}/coupons.json`)
    return response.data
  } catch (error) {
    console.error('Failed to fetch coupons:', error)
    return mockCoupons
  }
}

// 获取所有品牌
export const getBrands = async () => {
  try {
    const response = await axios.get(`${DATA_URL}/brands.json`)
    return response.data
  } catch (error) {
    console.error('Failed to fetch brands:', error)
    return mockBrands
  }
}

// 搜索优惠券 (本地搜索)
export const searchCoupons = async (keyword) => {
  try {
    const allCoupons = await getCoupons()
    return allCoupons.filter(coupon => 
      coupon.description.toLowerCase().includes(keyword.toLowerCase()) ||
      coupon.brand.name.toLowerCase().includes(keyword.toLowerCase())
    )
  } catch (error) {
    console.error('Search failed:', error)
    return mockCoupons.filter(coupon => 
      coupon.description.toLowerCase().includes(keyword.toLowerCase()) ||
      coupon.brand.name.toLowerCase().includes(keyword.toLowerCase())
    )
  }
}

// 获取特别优惠 (本地过滤)
export const getSpecialOffers = async () => {
  try {
    const allCoupons = await getCoupons()
    return allCoupons.filter(coupon => coupon.isSpecial)
  } catch (error) {
    console.error('Failed to fetch special offers:', error)
    return mockCoupons.filter(coupon => coupon.isSpecial)
  }
}

// 获取品牌详情和优惠券
export const getBrandDetails = async (brandId) => {
  try {
    const brand = mockBrands.find(b => b.id === brandId)
    if (!brand) {
      throw new Error('Brand not found')
    }
    
    return {
      ...brand,
      description: `Find the latest ${brand.name} coupons, promo codes, and deals. Save money on your next purchase with exclusive offers from ${brand.name}.`,
      website: `https://${brand.name.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
      coupons: generateBrandCoupons(brand)
    }
  } catch (error) {
    console.error('Failed to fetch brand details:', error)
    return null
  }
}

// 订阅 Newsletter
export const subscribeNewsletter = async (email) => {
  try {
    // 在实际应用中，这里应该调用后端 API
    // 现在我们模拟一个成功的响应
    await new Promise(resolve => setTimeout(resolve, 1000)) // 模拟网络延迟
    
    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      throw new Error('Invalid email format')
    }

    // 模拟成功响应
    return {
      success: true,
      message: 'Successfully subscribed to newsletter!'
    }
  } catch (error) {
    console.error('Newsletter subscription failed:', error)
    throw error
  }
}

// 获取博客文章
export const getBlogPosts = async (page = 1, category = null) => {
  try {
    // 在实际应用中，这里应该调用后端 API
    await new Promise(resolve => setTimeout(resolve, 500)) // 模拟网络延迟

    let posts = mockPosts
    if (category && category !== 'All') {
      posts = posts.filter(post => post.category === category)
    }

    // 模拟分页
    const perPage = 9
    const start = (page - 1) * perPage
    const end = start + perPage

    return {
      posts: posts.slice(start, end),
      total: posts.length,
      hasMore: end < posts.length
    }
  } catch (error) {
    console.error('Failed to fetch blog posts:', error)
    throw error
  }
}

// 获取单篇文章详情
export const getBlogPost = async (id) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 500))
    const post = mockPosts.find(p => p.id === parseInt(id))
    if (!post) {
      throw new Error('Post not found')
    }
    return post
  } catch (error) {
    console.error('Failed to fetch blog post:', error)
    throw error
  }
} 