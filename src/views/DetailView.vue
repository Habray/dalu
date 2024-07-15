<script setup>
import { computed, onMounted } from 'vue'
import { usePropertyStore } from '@/stores/PropertyStore'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'

import 'swiper/css/pagination'
import 'swiper/css/navigation'

const property = usePropertyStore()
const isLoading = computed(() => property.isLoading)
const detailPropertyData = computed(() => property.singlePropertyData)
const modules = [Pagination, Navigation]
</script>

<template>
  <div v-if="isLoading">Loading...</div>
  <div v-else>
    <section v-if="detailPropertyData" class="details">
      <div class="slider">
        <swiper
          :slides-per-view="2"
          :space-between="10"
          :loop="true"
          :pagination="{
            clickable: true
          }"
          :navigation="true"
          :modules="modules"
        >
          <swiper-slide v-for="(eachImage, i) in detailPropertyData.img_src" :key="i"
            ><img :src="eachImage" alt="" srcset=""
          /></swiper-slide>
        </swiper>
      </div>
      <h4 class="price--text"><sup>$</sup> {{ detailPropertyData.price }}</h4>
      <p>{{ detailPropertyData.address + ', ' + detailPropertyData.municipality_district }}</p>
      <p v-if="detailPropertyData.community">
        <strong>Community: </strong>{{ detailPropertyData.community }}
      </p>

      <h4 class="details-sub-headings">PROPERTY DETAILS</h4>
      <div class="detail-card">
        <p v-if="detailPropertyData.sqft"><strong>Area: </strong>{{ detailPropertyData.sqft }}</p>
        <p v-if="detailPropertyData.bedrooms">
          <strong>Bedroom: </strong>{{ detailPropertyData.bedrooms }}
        </p>
        <p v-if="detailPropertyData.bathrooms">
          <strong>Bathroom: </strong>{{ detailPropertyData.bathrooms }}
        </p>
        <p v-if="detailPropertyData.mls_id">
          <strong>MLS: </strong>{{ detailPropertyData.mls_id }}
        </p>
        <p v-if="detailPropertyData.style">
          <strong>Style: </strong>{{ detailPropertyData.style }}
        </p>
        <p v-if="detailPropertyData.condo_exp">
          <strong>Condo Exposure: </strong>{{ detailPropertyData.condo_exp }}
        </p>
        <p v-if="detailPropertyData.tot_park_spcs">
          <strong>Total Parking Space: </strong>{{ detailPropertyData.tot_park_spcs }}
        </p>
        <p v-if="detailPropertyData.yr_built">
          <strong>Year Builts: </strong>{{ detailPropertyData.yr_built }}
        </p>
      </div>
    </section>
    <p v-else>No properties found.</p>
  </div>
</template>

<style scoped>
.slider .swiper-slide {
  height: 400px;
  object-fit: cover;
}
.slider .swiper-slide img {
  object-fit: cover;
  height: 100%;
  width: 100%;
}
.price--text {
  font-size: 40px;
  line-height: 48px;
  font-style: normal;
  font-weight: 600;
}
.details-sub-headings {
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  letter-spacing: 0.1em;
  line-height: 28px;
  text-transform: uppercase;
  margin: 2rem 0 0.5rem;
}
.detail-card {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
  background-color: #f2f3f7;
  padding: 1rem;
  border-radius: 8px;
}
p {
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 26px;
}
</style>
