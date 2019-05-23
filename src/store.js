import Vue from 'vue'
import Vuex from 'vuex'
import mtaxios from './utils/mtaxios'
import apis from './apis/apis'
import axios from 'axios';

Vue.use(Vuex)
const loadAction = (commit, payload, mutationName) => {
  axios.get(payload.apis, {
      id: payload.id
    })
    .then((resp) => {
      var resp = resp.data
      commit(mutationName, resp)
    })
}
export default new Vuex.Store({
  state: {
    rolelist: [], //获取所有角色
    allrole: [], //获取所有权限
    allUsers: [], //获取所有账号
  },
  getters: {
    allPrentRole(state) {
      var arr = state.allrole
      var arr2 = []
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].parentid === 0) {
          arr2.push(arr[i]._id)
        }

      }
      return arr2
    },
    rolelist(state) {
      return state.rolelist
    },
    //所有权限
    allrole(state) {
      var s = [...state.allrole]
      var parentArr = s.filter((item) => {
        return item.parentid === 0
      })
      var childArr = s.filter((item) => {
        return item.parentid !== 0
      })
      for (var i = 0; i < parentArr.length; i++) {
        parentArr[i].children = []
        for (var j = 0; j < childArr.length; j++) {
          if (parentArr[i]._id === childArr[j].parentid) {
            parentArr[i].children.push(childArr[j])
          }
        }
      }
      return parentArr
    },
    //获取所有账号
    allUsers(state) {
      function f(obj, arr) {
        var roles = obj.roles
        obj.rolesName = []
        for (var i = 0; i < roles.length; i++) {
          for (var j = 0; j < arr.length; j++) {
            if (roles[i] === arr[j]._id) {
              obj.rolesName.push(arr[j].roleName)
              break;
            }
          }
        }
      }
      var users =[...state.allUsers] 
      var role = state.rolelist
      for (var j = 0; j < users.length; j++) {
        f(users[j], role)
      }
      return users
    }
  },
  mutations: {
    ROLELIST(state, payload) { //获取所有角色
      state.rolelist = payload.allRoles
    },
    ALLROLE(state, payload) { //获取所有权限
      state.allrole = payload.allPermission
    },
    ALLUSERS(state, payload) {
      state.allUsers = payload.allUsers
    }
  },
  actions: {
    rolelist({
      commit
    }, payload = {}) {
      payload.apis = apis.findAllRoles
      loadAction(commit, payload, 'ROLELIST')
    },
    allrole({
      commit
    }, payload = {}) { //
      payload.apis = apis.showAllPermission
      loadAction(commit, payload, 'ALLROLE')
    },
    allUsers({
      commit
    }, payload = {}) {
      payload.apis = apis.findAllUsers
      loadAction(commit, payload, 'ALLUSERS')
    },
  }
})