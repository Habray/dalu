import { defineStore } from 'pinia'
import axios from 'axios'

export const usePropertyStore = defineStore('regions', {
  state: () => ({
    isLoading: false,
    propertyData: [],
    searchPropertyData: []
  }),

  actions: {
    async fetchAllListing(pageNumber, dataLimit) {
      this.isLoading = true
      try {
        const response = await axios.get('http://localhost:3000/properties', {
          params: {
            _start: pageNumber,
            _limit: dataLimit
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
    },
    async searchProperty(type, page = 1, limit = 9) {
      this.isLoading = true
      try {
        const response = await axios.get('http://localhost:3000/properties', {
          params: {
            s_r: type,
            _page: page,
            _limit: limit
          },
          headers: {
            'content-type': 'application/json'
          }
        })
        const totalCount = response.headers['items']
        const data = await response.data
        if (data && data.length > 0) {
          this.$patch({
            searchPropertyData: data
          })
        } else {
          this.$patch({
            searchPropertyData: []
          })
        }
      } catch (error) {
        console.log('Error Search Property: ', error)
        this.$patch({
          searchPropertyData: []
        })
      } finally {
        this.isLoading = false
      }
    }
  }
})
