<template>
    <div id="home">
        <div id='leftBar'></div>
       <div id="topBar">
             <el-button type="danger">退出</el-button>
       </div>

        
        <div id='rightBar'></div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
  #home {
     width:100%;
     height:100%;
  }
  #topBar{
      height:8%;
      width:85%;
      background: yellow;
  }
  #leftBar{
      height:100%;
      width:15%;
      background:rgb(43, 43, 43);
  }
</style>