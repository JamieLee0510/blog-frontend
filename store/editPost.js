export const state = () => ({
  article_id: '',
  article_title: '',
  article_description: '',
  article_content: '',
  article_delta: undefined,
  article_img_url: '',
  article_img_file: undefined,
  article_preview: false,
})

export const mutations = {
  setEditId(state, payload) {
    state.article_id = payload
  },
  setEditTitle(state, payload) {
    state.article_title = payload
  },
  setEditDescription(state, payload) {
    state.article_description = payload
  },
  setEditContent(state, payload) {
    state.article_content = payload
  },
  setEditDelta(state, payload) {
    state.article_delta = payload
  },
  setEditImgUrl(state, payload) {
    state.article_img_url = payload
  },
  setEditImgFile(state, payload) {
    state.article_img_file = payload
  },
  setPreviewState(state, payload) {
    state.article_preview = payload
  },
}

export const getters = {
  article_id: (state) => {
    return state.article_id
  },
  article_title: (state) => {
    return state.article_title
  },
  article_description: (state) => {
    return state.article_description
  },
  article_content: (state) => {
    return state.article_content
  },
  article_delta: (state) => {
    return state.article_delta
  },
  article_img_url: (state) => {
    return state.article_img_url
  },
  article_img_file: (state) => {
    return state.article_img_file
  },
  article_preview: (state) => {
    return state.article_preview
  },
}
