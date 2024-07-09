import { defineStore } from 'pinia'
import axios from 'axios'

export const usePropertyStore = defineStore('regions', {
  state: () => ({
    isLoading: true,
    propertyData: [],
    page: 1,
    limit: 15
  }),

  actions: {
    async fetchAllListing(pageNumber, dataLimit) {
      this.isLoading = true
      try {
        const response = await axios.get('http://localhost:3000/properties', {
          params: {
            _start: pageNumber,
            _end: dataLimit
          },
          headers: {
            'content-type': 'application/json'
          }
        })
        const data = await response.data
        if (data && data.length > 0) {
          this.$patch({
            propertyData: data
          })
        } else {
          this.$patch({
            propertyData: []
          })
        }
      } catch (error) {
        console.error('Error fetching listings:', error)
        this.$patch({
          propertyData: []
        })
      } finally {
        this.isLoading = false
      }
    }
  }
})
