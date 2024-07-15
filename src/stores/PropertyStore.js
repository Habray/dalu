import { defineStore } from 'pinia'
import axios from 'axios'

export const usePropertyStore = defineStore('property', {
  state: () => ({
    isLoading: false,
    singlePropertyData: [],
    searchPropertyData: [],
    totalPages: 0,
    currentPage: 1,
    lastPage: 1,
    prevPage: null,
    nextPage: null
  }),

  actions: {
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
    },
    async fetchSingleListing(id) {
      this.isLoading = true
      try {
        const response = await axios.get(`http://localhost:3000/properties/${id}`, {
          headers: {
            'content-type': 'application/json'
          }
        })
        const data = await response.data
        if (data) {
          this.$patch({
            singlePropertyData: data
          })
        } else {
          this.$patch({
            singlePropertyData: []
          })
        }
      } catch (error) {
        console.error('Error fetching Single listings:', error)
        this.$patch({
          singlePropertyData: []
        })
      } finally {
        this.isLoading = false
      }
    }
  }
})
