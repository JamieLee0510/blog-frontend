export const state = () => ({
  //保證content
  delta: undefined,
  curContent: '',

  //保證title
  curTitle: '',

  //保證description
  curDescription: '',

  //保證img file
  imgFile: undefined,
})

export const mutations = {
  //保證content
  setDelta(state, payload) {
    state.delta = payload
  },
  setContent(state, payload) {
    state.curContent = payload
  },
  //保證title
  setTitle(state, payload) {
    state.curTitle = payload
  },
  //保證description
  setDescription(state, payload) {
    state.curDescription = payload
  },
  //保證img file
  setImg(state, payload) {
    state.imgFile = payload
  },
}

export const getters = {
  //保證content
  delta: (state) => {
    return state.delta
  },
  curContent: (state) => {
    return state.curContent
  },
  //保證title
  curTitle: (state) => {
    return state.curTitle
  },
  //保證description
  curDescription: (state) => {
    return state.curDescription
  },
  //保證img file
  imgFile: (state) => {
    return state.imgFile
  },
}
