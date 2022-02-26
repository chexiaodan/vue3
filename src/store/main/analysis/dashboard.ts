import { Module } from 'vuex'

import {
  getAmountList,
  getCategoryGoodsCount,
  getCategoryGoodsSale,
  getCategoryGoodsFavor,
  getGoodsSaleTop10,
  getGoodsAddressSale
} from '@/service/main/analysis/dashboard'

import type { IAnalysis } from './types'
import { IRootState } from '../../types'

const analysisModule: Module<IAnalysis, IRootState> = {
  namespaced: true,
  state() {
    return {
      topPanelDatas: [],
      categoryGoodsCount: [],
      categoryGoodsSale: [],
      categoryGoodsFavor: [],
      goodsSaleTop10: [],
      goodsAddressSale: []
    }
  },
  mutations: {
    changeTopPanelDatas(state, list) {
      state.topPanelDatas = list.data
    },
    changeCategoryGoodsCount(state, list) {
      state.categoryGoodsCount = list.data
    },
    changeCategoryGoodsSale(state, list) {
      state.categoryGoodsSale = list.data
    },
    changeCategoryGoodsFavor(state, list) {
      state.categoryGoodsFavor = list.data
    },
    changeGoodsSaleTop10(state, list) {
      state.goodsSaleTop10 = list.data
    },
    changeGoodsAddressSale(state, list) {
      state.goodsAddressSale = list.data
    }
  },
  actions: {
    async getAnalysisDataAction({ commit }) {
      const resultTopPanelDatas = await getAmountList()
      commit('changeTopPanelDatas', resultTopPanelDatas)

      const goodsCount = await getCategoryGoodsCount()
      commit('changeCategoryGoodsCount', goodsCount)

      const goodsSale = await getCategoryGoodsSale()
      commit('changeCategoryGoodsSale', goodsSale)

      const goodsFavor = await getCategoryGoodsFavor()
      commit('changeCategoryGoodsFavor', goodsFavor)

      const saleTop10 = await getGoodsSaleTop10()
      commit('changeGoodsSaleTop10', saleTop10)

      const addressSasle = await getGoodsAddressSale()
      commit('changeGoodsAddressSale', addressSasle)
    }
  }
}

export default analysisModule
