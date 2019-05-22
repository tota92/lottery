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
    allrole:[]
  },
  getters:{
    rolelist(state){
      return state.rolelist
    },
    allrole(state){
      var s = [...state.allrole]
      var parentArr =s.filter((item,index)=>{
        return item.parentid === 0
      })
      var childArr= s.filter((item,index)=>{
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
    }

  },
  mutations: {
     ROLELIST(state,payload){
       state.rolelist = payload.allRoles
     },
     ALLROLE(state,payload){
       state.allrole = payload.allPermission
     },
  },
  actions: {
      rolelist({commit},payload={}){
        payload.apis = apis.findAllRoles
        loadAction(commit,payload,'ROLELIST')
      },   
      allrole({commit},payload={}){
        payload.apis = apis.showAllPermission 
        loadAction(commit,payload,'ALLROLE')
      },   
  }
})
