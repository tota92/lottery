import Vue from 'vue'
import Vuex from 'vuex'
import mtaxios from './utils/mtaxios'
import apis from './apis/apis'
import axios from 'axios';

Vue.use(Vuex)
const loadAction =(commit,payload,mutationName)=>{
  axios.get(payload.apis,{id:payload.id})
  .then((resp)=>{
    var resp = resp.data
     commit(mutationName,resp)
  })
}
export default new Vuex.Store({
  state: {
    rolelist:[],
    allrole:[],
    allUsers:[],
  },
  getters:{
    allPrentRole(state){
      var arr = state.allrole
      var arr2 =[]
      for(var i = 0;i<arr.length;i++){
        if(arr[i].parentid === 0){
          arr2.push(arr[i]._id)
        }
        
      }
      console.log(arr2)
      return arr2
    },
    rolelist(state){
      return state.rolelist
    },
    allrole(state){
      console.log(state.allrole)
      var s = [...state.allrole]
      var parentArr =s.filter((item)=>{
        return item.parentid === 0
      })
      var childArr= s.filter((item)=>{
        return item.parentid !== 0
      })
      for(var i=0;i<parentArr.length;i++){
          parentArr[i].children=[]
          for(var j=0;j<childArr.length;j++){
            if(parentArr[i]._id === childArr[j].parentid){
              parentArr[i].children.push(childArr[j])
            }
          }
      }
      return parentArr
    },
    allUsers(state){
      return state.allUsers
    }
  },
  mutations: {
     ROLELIST(state,payload){  //获取所有角色
       state.rolelist = payload.allRoles
     },
     ALLROLE(state,payload){ //获取所有权限
       state.allrole = payload.allPermission
     },
     ALLUSERS(state,payload){
        state.allUsers = payload.allUsers
    }
  },
  actions: {
      rolelist({commit},payload={}){
        payload.apis = apis.findAllRoles
        loadAction(commit,payload,'ROLELIST')
      },   
      allrole({commit},payload={}){ //
        payload.apis = apis.showAllPermission 
        loadAction(commit,payload,'ALLROLE')
      },   
      allUsers({commit},payload={}){
        payload.apis = apis.findAllUsers 
        loadAction(commit,payload,'ALLUSERS')
      },   
  }
})
