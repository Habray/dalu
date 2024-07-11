<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'

import { computed } from 'vue'
import { usePropertyStore } from '@/stores/PropertyStore'
const property = usePropertyStore()
const isLoading = computed(() => property.isLoading)

const propertiesData = computed(() => property.searchPropertyData)
</script>
<template>
  <div v-if="isLoading">Loading...</div>
  <section v-else-if="propertiesData && propertiesData.length > 0" class="results">
    <div v-for="property in propertiesData" :key="property.id" class="data-card">
      <div class="card-upper">
        <span class="data-type">{{ property.s_r }}</span>
        <swiper :slides-per-view="1" :space-between="50">
          <swiper-slide v-for="each_image in property.img_src"
            ><img :src="each_image" alt="" srcset=""
          /></swiper-slide>
        </swiper>
      </div>
      <div class="card-lower">
        <p class="data-location">{{ property.address }}</p>
        <h4 class="data-title">{{ property.community + ', ' + property.area }}</h4>
        <div class="data-price">
          <p class="price--text"><sup>$</sup> {{ property.price }}</p>
          <p class="area--text" v-if="property.sqft">{{ property.sqft }}</p>
        </div>
        <div class="bed-bath" v-if="property.bedrooms || property.bathrooms">
          <p v-if="property.bedrooms"><strong>Bed </strong>{{ property.bedrooms }}</p>
          <p v-if="property.bathrooms"><strong>Bath </strong>{{ property.bathrooms }}</p>
        </div>
        <p class="mls--text" v-if="property.mls_id">
          MLS# <strong>{{ property.mls_id }}</strong>
        </p>
      </div>
    </div>
  </section>
  <p v-else class="no-result--text">No result found.</p>
</template>

<style scoped>
.results {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
  margin-top: 4rem;
}
.card-upper {
  position: relative;
}
.data-type {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 10;
  background: white;
  padding: 5px 20px;
  border-radius: 25rem;
  font-size: 14px;
  line-height: 14px;
  font-weight: 500;
}
.data-card {
  border: 1px solid #d4d4d4;
  border-radius: 15px;
  overflow: hidden;
  transition:
    transform 300ms ease-in-out,
    box-shadow 300ms ease-in-out;
}
.data-card:hover {
  transform: translateY(-1.2rem);
  box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.2);
}
.data-card .swiper-slide img {
  object-fit: cover;
  height: 100%;
  max-height: 260px;
  min-height: 260px;
  width: 100% !important;
}
.card-lower {
  padding: 30px 20px 20px 20px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.data-location {
  font-size: 14px;
  line-height: normal;
  font-weight: 500;
  color: #b5b5b5;
  text-transform: capitalize;
}
.data-title {
  font-size: 24px;
  line-height: 28px;
  font-weight: 700;
}
.data-price,
.bed-bath {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.price--text {
  font-size: 20px;
  font-weight: 700;
}
.area--text {
  font-size: 16px;
}
.bed-bath {
  justify-content: start;
  gap: 1rem;
}
.no-result--text {
  font-size: 20px;
  line-height: normal;
  font-weight: 700;
  text-align: center;
}
</style>
