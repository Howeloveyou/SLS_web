<template>
  <div class="app-container calendar-list-container">
    <el-dialog
      title="开灯"
      :visible.sync="turnOn"
      width="40%"
      center>
      亮度设置：
      <el-slider
        input-size="mini"
        v-model="lightness"
        show-input>
      </el-slider>
      <div style="margin-top: 50px">
        <span >转为本地控制方式的时间：</span><br/>
        <el-date-picker
          style="margin-top: 20px"
          v-model="changedate"
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="turnOn = false">取 消</el-button>
    <el-button type="primary" @click="">确 定</el-button>
  </span>
    </el-dialog>
    <el-dialog
      title="关灯"
      :visible.sync="turnOff"
      width="40%"
      center>
      <div style="margin-top: 10px">
        <span >转为本地控制方式的时间：</span><br/>
        <el-date-picker
          style="margin-top: 20px"
          v-model="changedate"
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="turnOff = false">取 消</el-button>
    <el-button type="primary" @click="">确 定</el-button>
  </span>
    </el-dialog>
    <div class="filter-container">
      <span>项目：</span>
      <el-select clearable style="width: 150px" class="filter-item"  v-model="choosePro" placeholder="请选择">
        <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
    </div>
    <div>
      <el-button type="text" icon="el-icon-edit" @click="changeBatch">批量操作</el-button>
      <div style="float:right">
        <el-button type="success" plain v-if="batch" icon="el-icon-check" size="small">开灯</el-button>
       <el-button type="danger" plain v-if="batch" icon="el-icon-close" size="small">关灯</el-button>
      </div>
    </div>
    <transition name="el-zoom-in-center">
    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row
              style="width: 100%;margin-top: 10px"
              @selection-change="">
      <el-table-column type="selection" width="55" v-if="batch">
      </el-table-column>
      <el-table-column align="center" label="名称" width="100" prop="name">
      </el-table-column>
      <el-table-column align="center" label="采集时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          {{scope.row.date}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="亮度" width="100" prop="liangdu">
      </el-table-column>
      <el-table-column align="center" label="经度" width="200" prop="jingdu">
      </el-table-column>
      <el-table-column align="center" label="纬度" width="200" prop="weidu">
      </el-table-column>
      <el-table-column align="center" label="故障" width="100" prop="err">
      </el-table-column>
      <el-table-column align="center" label="操作" >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="success"
            round
            @click="turnOn = true"
            icon="el-icon-circle-check-outline">开灯</el-button>
          <el-button
            size="mini"
            type="danger"
            round
            @click="turnOff = true"
            icon="el-icon-circle-close-outline">关灯</el-button>

        </template>
      </el-table-column>
    </el-table>
    </transition>
  </div>
</template>

<script>
    export default {
      data() {
        return {
          changedate:null,//转为本地控制的时间
          lightness:0,//亮度
          turnOn:false,
          turnOff:false,
          batch:false,
          choosePro:"",
          importanceOptions: ["镇江京口区", "南京玄武区", "重庆九龙坡区"],
          tableKey: 0,
          listLoading: false,
          list:[
            {
              name:'K1',
              date:'2018-3-24',
              liangdu:'110',
              jingdu:'119.527765',
              weidu:'32.162301',
              dianliu:'4.037000',
              err:0
            },{
              name:'K2',
              date:'2018-3-24',
              liangdu:'110',
              jingdu:'119.527765',
              weidu:'32.162301',
              dianliu:'4.037000',
              err:0
            },{
              name:'K3',
              date:'2018-3-24',
              liangdu:'110',
              jingdu:'119.527765',
              weidu:'32.162301',
              dianliu:'4.037000',
              err:0
            }
          ]
        }
      },
      methods: {
        changeBatch(){
          this.batch=!this.batch
        }
      }
    }
</script>

<style scoped>

</style>
