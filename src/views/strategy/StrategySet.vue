<template>
  <div class="app-container">
    <el-row :gutter="10">
      <el-col :span="12">
          <span>策略组：</span>
          <el-select
                     v-model="params.chooseGroupId"
                     filterable placeholder="请选择"
                      @change="getDetailList">
            <el-option
              v-for="item in strategyGroupList"
              :key="item.groupId"
              :label="item.groupName"
              :value="item.groupId">
            </el-option>
          </el-select>
      </el-col>
      <el-col :span="8">
        <span >亮度设置：</span>
        <div >
          <el-slider
            input-size="mini"
            v-model="params.lightness"
            show-input>
          </el-slider>
        </div>
      </el-col>
    </el-row>
    <el-tabs type="card" style="margin-top: 20px" v-model="params.chooseCycle" @tab-click="chooseTab">
      <el-tab-pane :name="'1'" >
        <span slot="label" ><icon-svg  :icon-class="moren"/> 默认</span>
        <div style="margin-left:90%">
          <el-button type="primary" size="mini" :disabled="defaultCommitFlag" @click="defaultCommit">提交</el-button>
        </div>
        <el-row :gutter="5" style="margin-top: 15px">
          <el-col :span="8">
            <span style="margin-left: 20px">开始月：</span>
            <el-select v-model="params.startMonth"
                       placeholder="请选择"
                       @change="getEndMonth"
                       style="width: 100px">
              <el-option
                v-for="item in 12"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="8">
            <span style="margin-left: 20px">结束月：</span>
            <el-select v-model="params.endMonth"
                       placeholder="请选择"
                       style="width: 100px">
              <el-option
                v-for="item in endMonthRange"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row style="margin-top: 30px;margin-left: 20px">
          <el-col>
            <el-switch
              v-model="d"
              active-color="#D1EEEE"
              inactive-color="#D1EEEE"
              active-text="车流"
              inactive-text="光感">
            </el-switch>
          </el-col>
        </el-row>
        <el-row  :gutter="5" style="margin-top: 30px;margin-left: 20px">
          <el-col :span="12">
            <el-switch
              v-model="params.onAbsoluteTime"
              active-color="#D1EEEE"
              inactive-color="#D1EEEE"
              active-text="相对时间"
              active-value="0"
              inactive-text="绝对时间"
              inactive-value="1">
            </el-switch>
          </el-col>
          <el-col :span="12">
            <el-switch
              v-model="params.offAbsoluteTime"
              active-color="#D1EEEE"
              inactive-color="#D1EEEE"
              active-text="相对时间"
              active-value="0"
              inactive-text="绝对时间"
              inactive-value="1">
            </el-switch>
          </el-col>
        </el-row>
        <el-row  :gutter="0" style="margin-top: 30px;margin-left: 20px">
          <el-col :span="12">
                <span>开灯时间：</span>
                <el-select v-model="params.onAbsolute"
                           :disabled="params.onAbsoluteTime === '1'"
                           placeholder="请选择"
                           style="width: 100px">
                  <el-option
                    v-for="item in SunsetOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-time-picker
                  v-model="params.onTime"
                  size="small"
                  value-format="HH:mm"
                  :picker-options="{format: 'HH:mm' }"
                  placeholder="任意时间点">
                </el-time-picker>
          </el-col>
          <el-col :span="12">
            <span>开灯时间：</span>
            <el-select v-model="params.offAbsolute"
                       :disabled="params.offAbsoluteTime === '1'"
                       placeholder="请选择"
                       style="width: 100px">
              <el-option
                v-for="item in SunriseOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-time-picker
              v-model="params.offTime"
              size="small"
              value-format="HH:mm"
              :picker-options="{format: 'HH:mm' }"
              placeholder="任意时间点">
            </el-time-picker>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane :name="'2'" >
        <span slot="label" ><icon-svg  :icon-class="weekend"/>周末</span>
        <div style="margin-left:90%">
          <el-button type="primary" size="mini" :disabled="weekendCommitFlag" @click="weekendCommit">提交</el-button>
        </div>
        <el-row :gutter="3" style="margin-top: 15px">
          <el-col :span="4">
            <span style="margin-left: 20px">周末选择：</span>
          </el-col>
          <el-col :span="8">
            <el-checkbox-group v-model="params.weekendList" size="small">
              <el-checkbox-button v-for="item in weekendGroup" :label="item"  :key="item">{{item}}</el-checkbox-button>
            </el-checkbox-group>
          </el-col>
        </el-row>
        <el-row style="margin-top: 30px;margin-left: 20px">
          <el-col>
            <el-switch
              v-model="d"
              active-color="#D1EEEE"
              inactive-color="#D1EEEE"
              active-text="车流"
              inactive-text="光感">
            </el-switch>
          </el-col>
        </el-row>
        <el-row  :gutter="5" style="margin-top: 30px;margin-left: 20px">
          <el-col :span="12">
            <el-switch
              v-model="params.onAbsoluteTime"
              active-color="#D1EEEE"
              inactive-color="#D1EEEE"
              active-text="相对时间"
              active-value="0"
              inactive-text="绝对时间"
              inactive-value="1">
            </el-switch>
          </el-col>
          <el-col :span="12">
            <el-switch
              v-model="params.offAbsoluteTime"
              active-color="#D1EEEE"
              inactive-color="#D1EEEE"
              active-text="相对时间"
              active-value="0"
              inactive-text="绝对时间"
              inactive-value="1">
            </el-switch>
          </el-col>
        </el-row>
        <el-row  :gutter="0" style="margin-top: 30px;margin-left: 20px">
          <el-col :span="12">
            <span>开灯时间：</span>
            <el-select v-model="params.onAbsolute"
                       :disabled="params.onAbsoluteTime === '1'"
                       placeholder="请选择"
                       style="width: 100px">
              <el-option
                v-for="item in SunsetOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-time-picker
              v-model="params.onTime"
              size="small"
              value-format="HH:mm"
              :picker-options="{format: 'HH:mm' }"
              placeholder="任意时间点">
            </el-time-picker>
          </el-col>
          <el-col :span="12">
            <span>开灯时间：</span>
            <el-select v-model="params.offAbsolute"
                       :disabled="params.offAbsoluteTime === '1'"
                       placeholder="请选择"
                       style="width: 100px">
              <el-option
                v-for="item in SunriseOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-time-picker
              v-model="params.offTime"
              size="small"
              value-format="HH:mm"
              :picker-options="{format: 'HH:mm' }"
              placeholder="任意时间点">
            </el-time-picker>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane :name="'3'" >
        <span slot="label" ><i class="el-icon-star-off"></i>节假日</span>
      </el-tab-pane>
      <el-tab-pane :name="'4'">
        <span slot="label"><i class="el-icon-star-off"></i>当日</span>
      </el-tab-pane>
    </el-tabs>
    <el-table
      :data="StrategyDetail"
      style="width: 100%;margin-top: 20px;">
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
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button
            type="danger"
            size="mini"
            @click="deleteStrategy(scope.row.strategyId)">删除</el-button>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
  import {getGroupList,getStrategyDetailByCycle,defaultStrategyCommit,weekendStrategyCommit,
    deleteStrategy} from '@/api/strategy'
    export default {
        name: "strategy-set",
        data(){
          return{
            params:{
              chooseGroupId:null,
              calendar:1,
              chooseCycle:"1",
              onAbsoluteTime:"1",
              startMonth:null,
              endMonth:null,
              weekendList:[],
              onAbsolute:null,
              onTime:null,
              offAbsoluteTime:"1",
              offMonth:null,
              offDay:null,
              offAbsolute:null,
              offTime:null,
              lightness:100,
            },
            endMonthRange:[],
            StrategyDetail:null,

            strategyGroupList:null,

            weekend:'week',
            moren:"default",
            checkList:[],
            d:false,


            endTime:null,


            sunsetTime:null,
            sunriseTime:null,
            SunsetOptions:[
              {
                value: -1,
                label: '日落前'
              },
              {
                value: 1,
                label: '日落后'
              }
            ],
            SunriseOptions:[
              {
                value: -1,
                label: '日出前'
              },
              {
                value: 1,
                label: '日出后'
              }
            ],
            weekendGroup:[5,6,7],
          }
        },
      mounted(){
        this.getGroupList()
      },
      methods: {
        getGroupList() {
          return new Promise((resolve, reject) => {
            getGroupList().then(response => {
              const data = response.data
              //console.log(data)
              this.strategyGroupList = data
              resolve(response)
            }).catch(error => {
              reject(error)
            })
          })
        },
        getDetailList(){
          return new Promise((resolve, reject) => {
            getStrategyDetailByCycle(this.params.chooseGroupId,this.params.chooseCycle).then(response => {
              const data = response.data
              //console.log(data)
              this.StrategyDetail = data
              resolve(response)
            }).catch(error => {
              reject(error)
            })
          })
        },
        chooseTab(){
          if(this.params.chooseGroupId){
            this.getDetailList()
          }
        },
        getEndMonth(){
          this.params.endMonth = null
          this.endMonthRange = []
          for (let i=this.params.startMonth;i<13;i++){
            this.endMonthRange.push(i)
          }
        },
        deleteStrategy(strategyId){
          return new Promise((resolve, reject) => {
            deleteStrategy(strategyId).then(response => {
              this.$message({
                message: '删除成功！',
                type: 'success'
              });
              this.getDetailList()
              resolve(response)
            }).catch(error => {
              reject(error)
            })
          })
        },
        defaultCommit(){
          return new Promise((resolve, reject) => {
            defaultStrategyCommit(this.params).then(response => {
              this.$message({
                message: '添加成功！',
                type: 'success'
              });
              this.getDetailList()
              resolve(response)
            }).catch(error => {
              reject(error)
            })
          })
        },
        weekendCommit(){
          return new Promise((resolve, reject) => {
            weekendStrategyCommit(this.params).then(response => {
              this.$message({
                message: '添加成功！',
                type: 'success'
              });
              this.getDetailList()
              resolve(response)
            }).catch(error => {
              reject(error)
            })
          })
        },
      },
      computed: {
        defaultCommitFlag:function () {
          if (this.params.chooseGroupId && this.params.startMonth && this.params.endMonth){
            if (this.params.onAbsoluteTime==='1' && this.params.offAbsoluteTime==='1'){
                if (this.params.onTime && this.params.offTime){
                  return false
                }
            }else if(this.params.onAbsoluteTime==='0' && this.params.offAbsoluteTime==='1'){
              if (this.params.onTime && this.params.offTime && this.params.onAbsolute){
                return false
              }
            }
            else if(this.params.onAbsoluteTime==='1' && this.params.offAbsoluteTime==='0'){
              if (this.params.onTime && this.params.offTime && this.params.offAbsolute){
                return false
              }
            }else if(this.params.onAbsoluteTime==='0' && this.params.offAbsoluteTime==='0'){
              if (this.params.onTime && this.params.offTime &&this.params.onAbsolute && this.params.offAbsolute){
                return false
              }
            }
          }
          return true
        },
        weekendCommitFlag:function () {
          if (this.params.chooseGroupId && this.params.weekendList.length > 0){
            if (this.params.onAbsoluteTime==='1' && this.params.offAbsoluteTime==='1'){
              if (this.params.onTime && this.params.offTime){
                return false
              }
            }else if(this.params.onAbsoluteTime==='0' && this.params.offAbsoluteTime==='1'){
              if (this.params.onTime && this.params.offTime && this.params.onAbsolute){
                return false
              }
            }
            else if(this.params.onAbsoluteTime==='1' && this.params.offAbsoluteTime==='0'){
              if (this.params.onTime && this.params.offTime && this.params.offAbsolute){
                return false
              }
            }else if(this.params.onAbsoluteTime==='0' && this.params.offAbsoluteTime==='0'){
              if (this.params.onTime && this.params.offTime &&this.params.onAbsolute && this.params.offAbsolute){
                return false
              }
            }
          }
          return true
        }
      },
      // watch:{
      //   defaultCommitFlag:{
      //     handler: function(val) {
      //       console.log(val)
      //     },
      //     deep: true
      //   }
      // }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .svg-icon {
    margin-right: 10px;
  }
</style>
