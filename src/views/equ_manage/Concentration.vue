<template>
  <div class="app-container calendar-list-container">
    <el-row :gutter="20">
      <el-col :span="6">
        <span class="filter-item">项目：</span>
        <el-select clearable style="width: 150px" class="filter-item"  v-model="choosePro" placeholder="请选择">
          <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <span class="filter-item" >线路：</span>
        <el-select clearable style="width: 150px" class="filter-item"  v-model="choosePro" placeholder="请选择">
          <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <div class="bt">
      <el-button>添加</el-button>
    </div>
    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row
              style="width: 100%;margin-top: 10px"
              @selection-change="">
      <el-table-column align="center" label="编号" width="100" prop="">
      </el-table-column>
      <el-table-column align="center" label="名称" width="100" prop="name">
      </el-table-column>
      <el-table-column align="center" label="经度" width="100" prop="jingdu">
      </el-table-column>
      <el-table-column align="center" label="纬度" width="100" prop="weidu">
      </el-table-column>
      <el-table-column align="center" label="数据上传间隔" width="100" prop="">
      </el-table-column>
      <el-table-column align="center" label="数据上传延时长度" width="100" prop="">
      </el-table-column>
      <el-table-column align="center" label="数据重传次数" width="100" prop="err">
      </el-table-column>
      <el-table-column align="center" label="系统控制方式" width="100" prop="">
      </el-table-column>
      <el-table-column align="center" label="8个回路状态" width="100" prop="">
      </el-table-column>
      <el-table-column align="center" label="采集时间间隔" width="100" prop="">
      </el-table-column>
      <el-table-column align="center" label="地点" width="100" prop="">
      </el-table-column>
      <el-table-column align="center" label="备注" width="100" prop="">
      </el-table-column>
      <el-table-column align="center" label="操作" >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="success"
            round
            @click=""
            icon="el-icon-circle-check-outline">修改</el-button>
          <el-button
            size="mini"
            type="danger"
            round
            @click=""
            icon="el-icon-circle-close-outline">删除</el-button>

        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
    export default {
        name: "concentration",
        data(){
          return{
            importanceOptions: ["镇江京口区", "南京玄武区", "重庆九龙坡区"]
          }

        }
    }
</script>

<style scoped>
.bt{
  margin-top: 10px;
}
</style>
