import { defineStore } from 'pinia'
import axios from 'axios'

export const usePropertyStore = defineStore('regions', {
  state: () => ({
    isLoading: false,
    propertyData: [],
    searchPropertyData: [],
    totalPages: 0,
    currentPage: 1,
    lastPage: 1,
    prevPage: null,
    nextPage: null
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
    async searchProperty(type, page = 1, perPage = 9) {
      this.isLoading = true
      try {
        const response = await axios.get('http://localhost:3000/properties', {
          params: {
            s_r: type,
            _per_page: perPage,
            _page: page
          },
          headers: {
            'content-type': 'application/json'
          }
        })

        const { prev, next, last, pages, data } = await response.data
        if (data && data.length > 0) {
          this.$patch({
            searchPropertyData: data,
            totalPages: pages,
            currentPage: page,
            lastPage: last,
            prevPage: prev,
            nextPage: next
          })
        } else {
          this.$patch({
            searchPropertyData: [],
            totalPages: 0,
            currentPage: 1,
            lastPage: 1,
            prevPage: null,
            nextPage: null
          })
        }
      } catch (error) {
        console.log('Error Search Property: ', error)
        this.$patch({
          searchPropertyData: [],
          totalPages: 0,
          currentPage: 1,
          lastPage: 1,
          prevPage: null,
          nextPage: null
        })
      } finally {
        this.isLoading = false
      }
    }
  }
})
