import { Context } from '@nuxt/types'
import { GetterTree, ActionTree, MutationTree } from 'vuex'
import pathify, { make } from 'vuex-pathify'

export const state = () => ({
  local: {
    theme: 0,
    acrylic: true
  },
  drawers: {
    main: false,
    settings: false
  },
  data: {}
})

type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  ...make.getters(state)
}

export const mutations: MutationTree<RootState> = {
  ...make.mutations(state)
}

export const actions: ActionTree<RootState, RootState> = {
  ...make.actions(state),
  async nuxtInit(_store, ctx: Context) {
    const data = await ctx.$axios.$get('/status/list')
    this.set('data', data)
  }
}

export const plugins = [pathify.plugin]
