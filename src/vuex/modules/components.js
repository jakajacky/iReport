import types from '../constTypes.js'
import { getNewComp, getRandomId } from '../function.js'

const BASE_COMP_SUFFIX = 'Data'
const state = {
  list: [],
  curCompId: null,
  propsPanel: {
    show: false,
    name: '',
    id: ''
  }, // 组件属性面板
  layerPanel: {
    show: false,
    name: '',
    id: ''
  } // 图层属性面板
}
const getters = {
  // 根据页面ID取页面中所有的组件
  getComponentsBuPageId: (state) => (pageId) => {
    return state.list.finter((_x) => _x.parentId === pageId)
  },
  // 根据组件ID取当前组件
  curComp: (state) => {
    return state.list.find(_x => _x.id === state.curCompId)
  },
  // 根据组件ID取当前组件的配置信息
  getCompConfigByCompId: (state) => (compId) => {
    return state.list.find(_x => _x.id === compId)
  },
  propPanel: (state) => {
    return state.propsPanel
  },
  layerPanel: (state) => {
    return state.layerPanel
  }
}
const mutations = {
  // 设置当前组件id
  [types.TOGGLE_COMP] (state, id) {
    state.curCompId = id
  },
  // 编辑当前组件
  [types.EDIT_COMP] (state, { type, value, compId }) {
    // 先取当前组件
    let component = state.list.find((_x) => _x.id === compId || _x.id === state.curCompId)
    if (component) {
      let compProp = component[type]
      for (let key in value) {
        if (!compProp[key] || !compProp[key].toString()) {
          continue
        }
        if (typeof value[key] === 'object') {
          Object.assign(compProp[key], value[key])
        } else {
          compProp[key] = value[key]
        }
      }
    }
  },
  // 新增组件
  [types.ADD_COMPONENT] (state, val) {
    state.list.push(val)
  },
  // 删除组件
  [types.REMOVE_COMP] (state, compId) {
    let list = state.list
    let index = list.findIndex(_x => _x.id === compId)
    if (index > -1) {
      list.splice(index, 1)
      let nextActiveComp = list[index] || list[index - 1]
      if (nextActiveComp) {
        state.curCompId = nextActiveComp['id']
        state.list = list
      } else {
        state.curCompId = null
        state.list = []
      }
    }
  },
  // 打开组件属性面板
  [types.OPEN_PROPS_PANEL] (state, { id, name }) {
    state.propsPanel = {
      show: true,
      name: name,
      id: id
    }
  },
  // 关闭组件属性面板
  [types.CLOSE_PROPS_PANEL] (state) {
    state.propsPanel = {
      show: false,
      id: '',
      name: ''
    }
  },
  // 打开图层属性面板
  [types.OPEN_LAYER_PANEL] (state, { id, name }) {
    state.layerPanel = {
      show: true,
      name: name,
      id: id
    }
  },
  // 关闭图层属性面板
  [types.CLOSE_LAYER_PANEL] (state) {
    state.layerPanel = {
      show: false,
      id: '',
      name: ''
    }
  }
}
const actions = {
  // 添加一个新组件
  addNewComp ({ commit, getters }, name) {
    const compData = getNewComp(name + BASE_COMP_SUFFIX)
    if (compData) {
      let newCompData = Object.assign(compData, {
        parentId: getters.curPageId
      })
      commit(types.ADD_COMP_TO_PAGES, newCompData)
      commit(types.ADD_COMPONENT, newCompData)
    }
  },
  // 带参数添加组件
  addNewCompByParams ({ commit, getters }, params) {
    const compData = getNewComp(params.name + BASE_COMP_SUFFIX)
    if (compData) {
      // 带入参数
      compData.props = { ...params }
      let newCompData = Object.assign(compData, {
        parentId: getters.curPageId
      })
      commit(types.ADD_COMP_TO_PAGES, newCompData)
      commit(types.ADD_COMPONENT, newCompData)
    }
  },
  // 激活当前组件
  toggleComp ({ commit }, val) {
    commit(types.TOGGLE_COMP, val)
  },
  // 更新组件
  editComp ({ commit }, { type, value, compId }) {
    commit(types.EDIT_COMP, {
      type, value, compId
    })
  },
  // 拷贝指定组件
  copyComp ({ commit, getters }, compId) {
    let id = getRandomId()
    if (id) {
      let compData = getters.curPage.comps.find(_x => _x.id === compId)
      let newCompData = Object.assign(compData, {
        parentId: getters.curPageId
      })
      commit(types.ADD_COMP_TO_PAGES, newCompData)
      commit(types.ADD_COMPONENT, newCompData)
    }
    return id
  },
  // 删除指定组件
  removeComp ({ commit }, compId) {
    commit(types.REMOVE_COMP, compId)
    return compId
  },
  // 打开组件属性设置面板
  openPropsPanel ({ commit }, { id, name }) {
    commit(types.OPEN_PROPS_PANEL, {
      id: id,
      name: name
    })
  },
  // 关闭组件属性设置面板
  closePropsPanel ({ commit }) {
    commit(types.CLOSE_PROPS_PANEL)
  },
  // 打开图层属性面板
  openLayerPanel ({ commit }, { id, name }) {
    commit(types.OPEN_LAYER_PANEL, {
      id: id,
      name: name
    })
  },
  // 关闭图层属性面板
  closeLayerPanel ({ commit }) {
    commit(types.CLOSE_LAYER_PANEL)
  }
}
export default {
  state,
  getters,
  mutations,
  actions
}
