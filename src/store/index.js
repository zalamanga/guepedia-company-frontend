import vue from 'vue'
import vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import axios from 'axios'

vue.use(vuex)

export default new vuex.Store({
  plugins: [createPersistedState()],
  state: {
    cart: [],
    ongkir: [],
    discount: []
  },
  getters: {
    cart: (state) => state.cart,
    ongkir: (state) => state.ongkir,
    discount: (state) => state.discount,
  },
  actions: {
    addToCart({ commit }, item) {
      commit('addItemToCart', item)
    },
    addQty({ commit }, id) {
      commit('addQty', id)
      commit('updateTotalPrice', id)
    },
    setProductDiscount({ commit }, {id, value}) {
      commit('setProductDiscount', {id, value})
      commit('updateTotalPrice', id)
    },
    reduceQty({ commit }, id) {
      commit('reduceQty', id)
      commit('updateTotalPrice', id)
    },
    removeItem({ commit }, id) {
      commit('removeItem', id)
    },

    saveCart({ commit }) {
      commit('saveCart')
    },

    selectOngkir({ commit }, item) {
      commit('selectOngkir', item)
    },

    applyDiscount({ commit }, item) {
      commit('applyDiscount', item)
    },

    clearState({ commit }) {
      commit('clearState')
    },
  },
  mutations: {
    clearState(state){
      state.ongkir = [];
      state.discount = [];
      state.cart = [];
    },

    addItemToCart(state, item) {
      const addedItem = state.cart.find((product) => product.id_file_naskah === item.id_file_naskah)
      if (addedItem) {
        addedItem.qty++
        addedItem.total_price_item = addedItem.qty * addedItem.harga
      } else {
        state.cart.push({ ...item, qty: 1, discount:0, sub_total_item: item.harga,  total_price_item: item.harga })
      }
    },

    selectOngkir(state, item){
      state.ongkir = []
      state.ongkir.push({ ...item })
    },

    applyDiscount(state, item){
      state.discount = []
      state.discount.push({ ...item })
    },

    updateTotalPrice(state, id) {
      const currentItem = state.cart.find((product) => product.id_file_naskah === id)

      currentItem.total_price_item = currentItem.qty * currentItem.harga

      // if(currentItem.discount == 0){
      //   currentItem.total_price_item = currentItem.qty * currentItem.harga
      // } else {
      //   currentItem.total_price_item = currentItem.qty * currentItem.harga - (currentItem.qty * currentItem.harga * (currentItem.discount / 100))
      // }
    },

    addQty(state, id) {
      state.ongkir = []
      state.discount = []
      const currentItem = state.cart.find((product) => product.id_file_naskah === id)
      currentItem.qty++
      // currentItem.total_price_item = currentItem.qty * currentItem.harga
    },

    setProductDiscount(state, {id, value}){
      const currentItem = state.cart.find((product) => product.id_file_naskah === id)
      currentItem.discount = value
    },

    reduceQty(state, id) {
      state.ongkir = []
      state.discount = []
      const currentItem = state.cart.find((product) => product.id_file_naskah === id)
      if (currentItem.qty > 1) {
        currentItem.qty--
        currentItem.total_price_item = currentItem.qty * currentItem.harga
      } else {
        state.cart = state.cart.filter((product) => product.id_file_naskah !== id)
      }
    },

    removeItem(state, id) {
      state.ongkir = []
      state.discount = []
      state.cart = state.cart.filter((product) => product.id_file_naskah !== id)
    },
  },
})
