<template>
  <div class="app-container calendar-list-container">
    <div>
      <el-button
        type="success"
        size="mini"
        @click="toAddGroup">添加</el-button>
    </div>
    <el-table  :data="strategyGroupList" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row
              style="width: 100%;margin-top: 10px"
    >
      <el-table-column align="center" label="编号" width="350" prop="groupId">
      </el-table-column>
      <el-table-column align="center" label="策略组名" width="350" prop="groupName">
      </el-table-column>
      <el-table-column align="center" label="操作">
      <template slot-scope="scope">
        <el-button
          type="info"
          size="mini"
          @click="getStrategyDetail(scope.row.groupId)">详情</el-button>
        <el-button
          type="warning"
          size="mini"
          @click="changeStrategyDetail(scope.row.groupId,scope.row.groupName)">修改</el-button>
        <el-button
          type="danger"
          size="mini"
          @click="toDeleteStrategyDetail(scope.row.groupId)">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
    <div class="block pagination">

      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :pager-count="7"
        :page-size="pageSize"
        layout=" prev, pager, next"
        :page-count="pageCount">
      </el-pagination>
    </div>
    <el-dialog
      title="策略详情"
      :visible.sync="detailFlag"
      width="80%"
      center>
      <el-table
        :data="StrategyDetail"
        style="width: 100%">
        <el-table-column
          prop="strategyId"
          label="编号"
          align="center">
        </el-table-column>
        <el-table-column
          prop="groupId"
          label="组编号"
          align="center">
        </el-table-column>
        <el-table-column
          prop="calendar"
          label="历法"
          align="center">
        </el-table-column>
        <el-table-column
          prop="cycle"
          label="周期"
          align="center">
        </el-table-column>
        <el-table-column
          prop="onVehicle"
          label="车流"
          align="center">
        </el-table-column>
        <el-table-column
          prop="onLuma"
          label="光感"
          align="center">
        </el-table-column>
        <el-table-column
          prop="onDate"
          label="开始时间"
          align="center">
        </el-table-column>
        <el-table-column
          prop="offDate"
          label="结束时间"
          align="center">
        </el-table-column>
        <el-table-column
          prop="onTime"
          label="开始时刻"
          align="center">
        </el-table-column>
        <el-table-column
          prop="offTime"
          label="结束时刻"
          align="center">
        </el-table-column>
        <el-table-column
          prop="lumaLevel"
          label="亮度"
          align="center">
        </el-table-column>


      </el-table>
    </el-dialog>
    <el-dialog
      title="修改策略"
      :visible.sync="changeNameFlag"
      width="30%">
      <span>策略名：</span><el-input v-model="groupName" placeholder="请输入内容"></el-input>
      <span slot="footer" class="dialog-footer">
    <el-button @click="changeNameFlag = false">取 消</el-button>
    <el-button type="primary" @click="changeGroupName">确 定</el-button>
  </span>
    </el-dialog>
    <el-dialog
      title="提示"
      :visible.sync="deleteGroupFlag"
      width="30%">
      <span>确认删除？</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="deleteGroupFlag = false">取 消</el-button>
    <el-button type="primary" @click="deleteGroup">确 定</el-button>
  </span>
    </el-dialog>
    <el-dialog
      title="添加策略"
      :visible.sync="addGroupFlag"
      width="30%">
      <span>策略名：</span><el-input v-model="groupName" placeholder="请输入内容"></el-input>
      <span slot="footer" class="dialog-footer">
    <el-button @click="addGroupFlag = false">取 消</el-button>
    <el-button type="primary" @click="addGroup">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import {getStrategyGroupList,getStrategyDetail,changeGroupName,deleteGroup,addGroup} from '@/api/strategy'
    export default {
        name: "strategy-lib",
      data(){
          return{
            groupId:null,
            groupName:"",
            listLoading:false,
            detailFlag:false,
            addGroupFlag:false,
            changeNameFlag:false,
            deleteGroupFlag:false,
            currentPage:1,
            pageCount:null,
            pageSize:null,
            strategyGroupList:[],
            StrategyDetail:[],
          }
      },
      mounted(){
          this.listLoading = true
          this.getStrategyGroupList()
      },
      methods:{
        getStrategyGroupList(){
          return new Promise((resolve, reject) => {
            getStrategyGroupList(this.currentPage).then(response => {
              const data = response.data
              //console.log(data)
              this.listLoading = false
              this.strategyGroupList = data.list
              this.pageCount = data.pages
              this.pageSize = data.PageSize
              resolve(response)
            }).catch(error => {
              reject(error)
            })
          })
        },
        handleCurrentChange(){
          this.listLoading = true
          this.getStrategyGroupList(this.currentPage)
        },
        getStrategyDetail(groupId){
          //console.log(groupId)
          this.detailFlag = true
          return new Promise((resolve, reject) => {
            getStrategyDetail(groupId).then(response => {
              const data = response.data
              //  console.log(data)
              this.StrategyDetail = data
              resolve(response)
            }).catch(error => {
              reject(error)
            })
          })
        },
        changeStrategyDetail(groupId,groupName){
          this.groupName = groupName
          this.changeNameFlag = true
          this.groupId = groupId
        },
        changeGroupName(){
          this.changeNameFlag = false
          return new Promise((resolve, reject) => {
            changeGroupName(this.groupId,this.groupName).then(response => {
              this.$message({
                message: '修改成功！',
                type: 'success'
              });
              this.getStrategyGroupList()
              resolve(response)
            }).catch(error => {
              reject(error)
            })
          })
        },
        toDeleteStrategyDetail(groupId){
          this.groupId = groupId
          this.deleteGroupFlag = true
        },
        deleteGroup(){
          this.deleteGroupFlag = false
          return new Promise((resolve, reject) => {
            deleteGroup(this.groupId).then(response => {
              this.$message({
                message: '删除成功！',
                type: 'success'
              });
              this.getStrategyGroupList()
              resolve(response)
            }).catch(error => {
              reject(error)
            })
          })
        },
        toAddGroup(){
          this.groupName = null
          this.addGroupFlag = true
        },
        addGroup(){
          this.addGroupFlag = false
          return new Promise((resolve, reject) => {
            addGroup(this.groupName).then(response => {
              this.$message({
                message: '添加成功！',
                type: 'success'
              });
              this.getStrategyGroupList()
              resolve(response)
            }).catch(error => {
              reject(error)
            })
          })
        },
      },
    }
</script>

<style scoped>
.pagination{
  margin-top: 40px;
  margin-left: 40%;
}
</style>
