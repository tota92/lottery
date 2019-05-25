<template>
  <div id="lotteryView">
    <div id="h2">双 色 球 走 势 图</div>
    <table ref="table">
      <tr>
        <th rowspan="2" style="vertical-align: middle;">期 号</th>
        <th colspan="33" style="backgroundColor:#FCA995; letter-spacing:10px">红 球</th>
        <th colspan="16" style="backgroundColor:#ACD5FF ;letter-spacing:10px">蓝 球</th>
      </tr>
      <tr>
        <th v-for="item in 33" :key="item+'red'">{{item | addZero}}</th>
        <th v-for="item in 16" :key="item+'blue'">{{item | addZero}}</th>
      </tr>
      <tr v-for="(item,index) in list" :key="index">
        <td style="font-size:14px;color:black;">{{item.period}}</td>

        <td
          v-for="(ite1,inde1) in item.missNumber.general.slice(0,33)"
          :key="inde1+'b'"
          :class="['redBar',ite1<=0?'red':'']"
        >{{ite1 <= 0?inde1+1:ite1 | addZero}}</td>

        <td
          v-for="(ite2,inde2) in item.missNumber.general.slice(33,49)"
          :key="inde2+'r'"
          :ref="['blueBar',ite2<=0?'blue':'']"
          :class="['blueBar',ite2<=0?'blue':'']"
        >{{ite2<=0?inde2+1:ite2 | addZero}}</td>
      </tr>
    </table>
    <canvas id='canvas' ref="canvas"></canvas>
    <div class="block">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="100"
        layout="prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
var getSize = (num, Size, _this) => {
  var en = localStorage.getItem("lottery");
  _this.$http
    .get(_this.$apis.findByGameName, {
      gameName: en,
      pageNo: num,
      pageSize: Size
    })
    .then(resp => {
      _this.list = resp.data.data.data;
      _this.currentPage = resp.data.data.currentPage;
      _this.total = Math.ceil((resp.data.total * 100 - 1600) / Size);
    });
};

export default {
  data() {
    return {
      list: [],
      total: 1,
      currentPage: 1
    };
  },
  methods: {
    handleCurrentChange(num) {
      getSize(num, 17, this);
    },

    drawLine(){
      var canvas = this.$refs.canvas;
      var table = this.$refs.table;
      canvas.width = table.clientWidth;
      canvas.height = table.clientHeight;
      canvas.style.cssText = "position:absoulte;top:0;"
          
      
      
      
    }




  },
  filters: {
    addZero(value) {
      var num = value;
      if (num < 10) {
        num = "0" + num;
      }
      return num;
    }
  },
  mounted() {
    console.log(this.$refs);
    getSize(1, 17, this);
  },
  updated() {
   this.drawLine()
  },
};
</script>

<style lang="scss" scoped>
#lotteryView {
  height: 100%;
  width: 100%;
  padding: 5px 5px;
  text-align: center;
  box-sizing: border-box;
}
table {
  width: 100%;
  background: rgb(253, 252, 249);
}

th,
td {
  
  line-height: 20px;
  text-align: center;
  border: 1px solid rgb(233, 233, 233);
}
th {
  font-size: 14px;
  height: 20px;
}
td {
  font-size: 10px;
  height: 20px;
  width: 20px;
}
.red {
  background: red;
  color: white !important;
  font-weight: 700;
  border-radius: 50%;
  box-shadow: 2px 2px 2px rgb(85, 84, 84);
}
.blue {
  background: blue;
  color: white !important;
  font-weight: 700;
  border-radius: 50%;
  box-shadow: 2px 2px 2px rgb(82, 81, 81);
}
#h2 {
  font-size: 22px;
  font-weight: 400;
  padding: 10px 0;
}
.block {
  position: fixed;
  left: 450px;
  bottom: 15px;
}
.blueBar {
  color: lightblue;
}
.redBar {
  color: lightpink;
}
#canvas{
  background: rgba(253, 253, 94, 0.4)
}
</style>