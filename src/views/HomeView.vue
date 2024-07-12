<script setup>
import { ref, computed, onMounted } from 'vue'
import { usePropertyStore } from '@/stores/PropertyStore'
import PropertyCard from '@/components/PropertyCard.vue'

const property = usePropertyStore()
const searchText = ref('')
const radiovalue = ref('')
const pageNumber = computed(() => property.page)
const dataLimit = computed(() => property.limit)

// onMounted(() => {
//   property.fetchAllListing(pageNumber.value, dataLimit.value)
// })

async function searchProperties() {
  await property.searchProperty(radiovalue.value)
}
</script>

<template>
  <section class="home">
    <h3>Tired Of Your Cramped Space? Search For a BIGGER Home</h3>
    <form @submit.prevent="searchProperties" @keyup.prevent="searchProperties" method="get">
      <div class="type-radio">
        <input
          type="radio"
          name="type"
          id="all"
          value="All"
          checked="checked"
          v-model="radiovalue"
        />
        <label for="all">All</label>
        <input type="radio" name="type" id="sale" value="Sale" v-model="radiovalue" />
        <label for="sale">sale</label>
        <input type="radio" name="type" id="lease" value="Lease" v-model="radiovalue" />
        <label for="lease">lease</label>
      </div>
      <div class="search">
        <input
          type="text"
          v-model="searchText"
          placeholder="City, Neighborhood, Address, Postal Code, School District"
        />
        <button type="submit">Search</button>
      </div>
    </form>
  </section>
  <PropertyCard :dType="radiovalue" />
</template>

<style scoped>
.home {
  background: hsla(160, 100%, 37%, 1);
  padding: 8rem 0;
}
h3 {
  color: #000;
  font-size: 56px;
  line-height: 64px;
  font-weight: 600;
  letter-spacing: -0.01em;
  margin-bottom: 40px;
  text-align: center;
  max-width: 780px;
  margin: 0 auto;
}
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;
  gap: 1rem;
}
.type-radio {
  display: flex;
  gap: 1rem;
}
.type-radio label {
  cursor: pointer;
  color: #000;
  font-size: 16px;
  font-style: normal;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  font-weight: 600;
  padding: 0.5rem;
}
.type-radio input:checked + label:after {
  background: #000;
  border-radius: 20px 20px 0 0;
  box-shadow:
    0px 0px 1px rgba(26, 27, 36, 0.3),
    0px 2px 4px rgba(26, 27, 36, 0.1);
  box-sizing: border-box;
  content: ' ';
  display: block;
  height: 4px;
  width: 100%;
}
.type-radio input {
  display: none;
}
.search {
  width: 780px;
  display: flex;
  position: relative;
  border-radius: 50rem;
  overflow: hidden;
}
.search input[type='text'] {
  width: 100%;
  padding: 1.2rem 1.5rem;
  border: 0;
  font-size: 16px;
  font-style: normal;
}
.search button[type='submit'] {
  position: absolute;
  right: 7px;
  top: 50%;
  transform: translateY(-50%);
  height: 80%;
  width: 20%;
  border: 0;
  border-radius: 25rem;
  font-size: 16px;
  font-style: normal;
  background: hsla(160, 100%, 37%, 1);
}
.search input[type='text']:focus,
.search input[type='text']:active .search button[type='submit']:focus,
.search button[type='submit']:active {
  border: 0;
  outline: unset !important;
}
</style>
