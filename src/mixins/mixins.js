import Vue from 'vue'
Vue.mixin({
    methods:{
        pushView(item){
           this.$router.push({name:item.name,path:item.path,query:item.query,params:item.params})
        },
        post(url,params){
         return this.$http.post(url,params).then((resp)=>{
              this.$message({
                  type:resp.data.success?'success':'danger',
                  message:resp.data.message
              })
          })
        },
        operateConfirm(message, action) {
         return  this.$confirm("请确认是否"+message+"?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                .then(() => {
                return   action()  
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消"+message
                    });
                });
        }
    }
})