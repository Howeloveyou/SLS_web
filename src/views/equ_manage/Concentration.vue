<template>
  <div class="app-container calendar-list-container">
    <el-row :gutter="20">
      <el-col :span="6">
        <span>项目：</span>
        <el-select clearable style="width: 150px" class="filter-item"  v-model="choosePro" placeholder="请选择项目" @change="getRouteList">
          <el-option v-for="item in projectList" :key="item.projectId" :label="item.projectName" :value="item.projectId">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <span>线路：</span>
        <el-select clearable style="width: 150px" class="filter-item"  v-model="chooseRou" placeholder="请选择线路" @change="getConcentratorDetail">
          <el-option v-for="item in routeList" :key="item.routeId" :label="item.routeName" :value="item.routeId">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <div style="margin-top: 30px">
      <div v-show="isShow === 1">
        <div class="bt" >
          <el-button type="success"
                     size="mini"
                     @click="toAddConcentrator" :disabled="addButtonFlag" round>添加</el-button>
        </div>
        <el-collapse-transition>
          <el-table  :data="concentratorDetailList" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row
                     style="width: 100%;margin-top: 10px"
                     @cell-dblclick="changeToCircuit">
            <el-table-column align="center" label="编号"  prop="id" width="110px">
            </el-table-column>
            <el-table-column align="center" label="名称"  prop="name">
            </el-table-column>
            <el-table-column align="center" label="经度"  prop="longitude" width="110px">
            </el-table-column>
            <el-table-column align="center" label="纬度"  prop="latitude" width="110px">
            </el-table-column>
            <el-table-column align="center" label="数据上传间隔"  prop="upInterval" >
            </el-table-column>
            <el-table-column align="center" label="数据上传延时长度"  prop="upDelay">
            </el-table-column>
            <el-table-column align="center" label="数据重传次数"  prop="upRepeat">
            </el-table-column>
            <el-table-column align="center" label="系统控制方式"  prop="systemControlMode">
            </el-table-column>
            <el-table-column align="center" label="8个回路状态"  prop="circuitState" width="90px">
            </el-table-column>
            <el-table-column align="center" label="采集时间间隔"  prop="collectTimeInterval">
            </el-table-column>
            <el-table-column align="center" label="地点"  prop="location">
            </el-table-column>
            <el-table-column align="center" label="通道" prop="channelNum">
            </el-table-column>
            <el-table-column align="center" label="操作" width="220px" >
              <template slot-scope="scope">
                <el-button-group>
                  <el-button
                    size="mini"
                    type="primary"
                    @click="toAmendConcentrator(scope.row)"
                  >修改</el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="toDeleteConcentrator(scope.row.id)"
                  >删除</el-button>
                  <el-button
                    size="mini"
                    type="warning"
                    @click=""
                  >配置</el-button>
                </el-button-group>
              </template>
            </el-table-column>
          </el-table>
        </el-collapse-transition>
      </div>
      <div v-show="isShow === 2" >
        <div class="bt" >
          <el-button type="text" icon="el-icon-back" size="mini" circle @click="isShow = 1" style="margin-left: 95%">返回</el-button>
        </div>
        <el-collapse-transition>
          <el-table  :data="circuitDetailList" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row
                     style="width: 100%;margin-top: 10px"
                     @cell-dblclick="changeToGroup">
            <el-table-column align="center" label="编号"  prop="idnum" >
            </el-table-column>
            <el-table-column align="center" label="名称"  prop="name">
            </el-table-column>
            <el-table-column align="center" label="操作"  >
              <template slot-scope="scope">
                <el-button-group>
                  <el-button
                    size="mini"
                    type="primary"
                    @click=""
                  >修改</el-button>
                </el-button-group>
              </template>
            </el-table-column>
          </el-table>
        </el-collapse-transition>
      </div>
      <div v-show="isShow === 3" >
        <div class="bt" >
          <el-button type="success"
                   size="mini"
                   @click="toAddConcentrator" :disabled="addButtonFlag" round>添加</el-button>
          <el-button type="text" icon="el-icon-back" size="mini" circle @click="isShow = 2" style="margin-left: 90%">返回</el-button>
        </div>
        <el-collapse-transition>
          <el-table  :data="groupDetailList" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row
                     style="width: 100%;margin-top: 10px"
                     @cell-dblclick="changeToController">
            <el-table-column align="center" label="编号"  prop="idnum" >
            </el-table-column>
            <el-table-column align="center" label="名称"  prop="name">
            </el-table-column>
            <el-table-column align="center" label="操作"  >
              <template slot-scope="scope">
                <el-button-group>
                  <el-button
                    size="mini"
                    type="primary"
                    @click=""
                  >修改</el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click=""
                  >删除</el-button>
                </el-button-group>
              </template>
            </el-table-column>
          </el-table>
        </el-collapse-transition>
      </div>
      <div v-show="isShow === 4">
        <div class="bt" >
          <el-button type="success"
                     size="mini"
                     @click=""  round>添加</el-button>
          <el-button type="text" icon="el-icon-back" size="mini" circle @click="isShow = 3" style="margin-left: 90%">返回</el-button>
        </div>
        <el-collapse-transition>
          <el-table  :data="controllerDetailList" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row
                     style="width: 100%;margin-top: 10px"
          >
            <el-table-column align="center" label="编号"  prop="controllerId" >
            </el-table-column>
            <el-table-column align="center" label="组内序号"  prop="controllerNumber" >
            </el-table-column>
            <el-table-column align="center" label="名称"  prop="controllerName">
            </el-table-column>
            <el-table-column align="center" label="经度"  prop="longitude" >
            </el-table-column>
            <el-table-column align="center" label="纬度"  prop="latitude" >
            </el-table-column>
            <el-table-column align="center" label="控制器类型编号"  prop="typeId" >
            </el-table-column>
            <el-table-column align="center" label="路灯类型编号"  prop="lampTypeId">
            </el-table-column>
            <el-table-column align="center" label="线路编号"  prop="routeId">
            </el-table-column>
            <el-table-column align="center" label="集中器编号"  prop="concentratorId">
            </el-table-column>
            <el-table-column align="center" label="回路编号"  prop="circuitId" >
            </el-table-column>
            <el-table-column align="center" label="组编号"  prop="groupId">
            </el-table-column>
            <el-table-column align="center" label="更换时间"  prop="renewTime">
            </el-table-column>
            <el-table-column align="center" label="通道" prop="channelNum">
            </el-table-column>
            <el-table-column align="center" label="地点" prop="location">
            </el-table-column>
            <el-table-column align="center" label="是否授权" prop="isregist">
            </el-table-column>
            <el-table-column align="center" label="操作" width="220px" >
              <template slot-scope="scope">
                <el-button-group>
                  <el-button
                    size="mini"
                    type="primary"
                    @click=""
                  >修改</el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click=""
                  >删除</el-button>
                  <el-button
                    size="mini"
                    type="warning"
                    @click=""
                  >配置</el-button>
                </el-button-group>
              </template>
            </el-table-column>
          </el-table>
        </el-collapse-transition>
      </div>
      <el-dialog
        title="提示"
        :visible.sync="deleteConcentratorFlag"
        width="30%">
        <span>确认删除？</span>
        <span slot="footer" class="dialog-footer">
    <el-button @click="deleteConcentratorFlag = false">取 消</el-button>
    <el-button type="primary" @click="deleteConcentrator">确 定</el-button>
  </span>
      </el-dialog>
      <el-dialog
        title="添加集中器"
        :visible.sync="addConcentratorFlag"
        width="80%"
        center>
        <el-row :gutter="30">
          <el-col :span="10" style="margin-left: 130px">
            <el-row >
              <el-col :span="6">
                <span>编号：</span>
               </el-col >
              <el-col :span="4">
                <el-tag type="info">FEF11E2</el-tag>
              </el-col>
              <el-col :span="6">
                <el-input size="small" v-model="params.id"></el-input>
              </el-col>
            </el-row>
            <el-row style="margin-top: 15px">
              <el-col :span="6">
                <span>所属线路编号：</span>
              </el-col>
              <el-col :span="10">
                <el-input size="small" v-model="chooseRou" disabled="true"></el-input>
              </el-col>
            </el-row>
            <el-row style="margin-top: 15px">
              <el-col :span="6">
                <span>名称：</span>
              </el-col>
              <el-col :span="10">
                <el-input size="small" v-model="params.name"></el-input>
              </el-col>
            </el-row>
            <el-row style="margin-top: 15px">
              <el-col :span="6">
                <span>经度：</span>
              </el-col>
              <el-col :span="10">
                <el-input size="small" v-model="params.longitude"></el-input>
              </el-col>
            </el-row>
            <el-row style="margin-top: 15px">
              <el-col :span="6">
                <span>纬度：</span>
              </el-col>
              <el-col :span="10">
                <el-input size="small" v-model="params.latitude"></el-input>
              </el-col>
            </el-row>
            <el-row style="margin-top: 15px">
              <el-col :span="6">
                <span>回路状态：</span>
              </el-col>
              <el-col :span="10">
                <el-input size="small" v-model="params.circuitState"></el-input>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="10">
            <el-row>
              <el-col :span="6">
                <span>上传间隔：</span>
              </el-col>
              <el-col :span="10">
                <el-select v-model="params.upInterval" placeholder="请选择" size="mini">
                  <el-option
                    v-for="item in upIntervalOptions"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key">
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row style="margin-top: 15px">
              <el-col :span="6">
                <span>延时长度：</span>
              </el-col>
              <el-col :span="10">
                <el-select v-model="params.upDelay" placeholder="请选择" size="mini">
                  <el-option
                    v-for="item in upDelayOptions"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key">
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row style="margin-top: 15px">
              <el-col :span="6">
                <span>重传次数：</span>
              </el-col>
              <el-col :span="10">
                <el-select v-model="params.upRepeat" placeholder="请选择" size="mini">
                  <el-option
                    v-for="item in upRepeatOptions"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key">
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row style="margin-top: 15px">
              <el-col :span="6">
                <span>系统控制方式：</span>
              </el-col>
              <el-col :span="10">
                <el-select v-model="params.systemControlMode" placeholder="请选择" size="mini">
                  <el-option
                    v-for="item in controlModeOptions"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key">
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row style="margin-top: 15px">
              <el-col :span="6">
                <span>采集间隔：</span>
              </el-col>
              <el-col :span="10">
                <el-select v-model="params.collectTimeInterval" placeholder="请选择" size="mini">
                  <el-option
                    v-for="item in collectTimeOptions"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key">
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row style="margin-top: 15px">
              <el-col :span="6">
                <span>地点：</span>
              </el-col>
              <el-col :span="10">
                <el-input size="small" v-model="params.location"></el-input>
              </el-col>
            </el-row>
            <el-row style="margin-top: 15px">
              <el-col :span="6">
                <span>通道号：</span>
              </el-col>
              <el-col :span="10">
                <el-input size="small" v-model="params.channelNum"></el-input>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <span slot="footer" class="dialog-footer" >
    <el-button @click="addConcentratorFlag = false">取 消</el-button>
    <el-button type="primary" @click="addConcentrator">确 定</el-button>
  </span>
      </el-dialog>
      <el-dialog
        title="修改集中器"
        :visible.sync="amendConcentratorFlag"
        width="80%"
        center>
        <el-row :gutter="30">
          <el-col :span="10" style="margin-left: 130px">
            <el-row >
              <el-col :span="6">
                <span>编号：</span>
              </el-col >
              <el-col :span="4">
                <el-tag type="info">FEF11E2</el-tag>
              </el-col>
              <el-col :span="6">
                <el-input size="small" v-model="partId"></el-input>
              </el-col>
            </el-row>
            <el-row style="margin-top: 15px">
              <el-col :span="6">
                <span>所属线路编号：</span>
              </el-col>
              <el-col :span="10">
                <el-input size="small" v-model="chooseRou" disabled="true"></el-input>
              </el-col>
            </el-row>
            <el-row style="margin-top: 15px">
              <el-col :span="6">
                <span>名称：</span>
              </el-col>
              <el-col :span="10">
                <el-input size="small" v-model="params.name"></el-input>
              </el-col>
            </el-row>
            <el-row style="margin-top: 15px">
              <el-col :span="6">
                <span>经度：</span>
              </el-col>
              <el-col :span="10">
                <el-input size="small" v-model="params.longitude"></el-input>
              </el-col>
            </el-row>
            <el-row style="margin-top: 15px">
              <el-col :span="6">
                <span>纬度：</span>
              </el-col>
              <el-col :span="10">
                <el-input size="small" v-model="params.latitude"></el-input>
              </el-col>
            </el-row>
            <el-row style="margin-top: 15px">
              <el-col :span="6">
                <span>回路状态：</span>
              </el-col>
              <el-col :span="10">
                <el-input size="small" v-model="params.circuitState"></el-input>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="10">
            <el-row>
              <el-col :span="6">
                <span>上传间隔：</span>
              </el-col>
              <el-col :span="10">
                <el-select v-model="params.upInterval" placeholder="请选择" size="mini">
                  <el-option
                    v-for="item in upIntervalOptions"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key">
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row style="margin-top: 15px">
              <el-col :span="6">
                <span>延时长度：</span>
              </el-col>
              <el-col :span="10">
                <el-select v-model="params.upDelay" placeholder="请选择" size="mini">
                  <el-option
                    v-for="item in upDelayOptions"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key">
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row style="margin-top: 15px">
              <el-col :span="6">
                <span>重传次数：</span>
              </el-col>
              <el-col :span="10">
                <el-select v-model="params.upRepeat" placeholder="请选择" size="mini">
                  <el-option
                    v-for="item in upRepeatOptions"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key">
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row style="margin-top: 15px">
              <el-col :span="6">
                <span>系统控制方式：</span>
              </el-col>
              <el-col :span="10">
                <el-select v-model="params.systemControlMode" placeholder="请选择" size="mini">
                  <el-option
                    v-for="item in controlModeOptions"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key">
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row style="margin-top: 15px">
              <el-col :span="6">
                <span>采集间隔：</span>
              </el-col>
              <el-col :span="10">
                <el-select v-model="params.collectTimeInterval" placeholder="请选择" size="mini">
                  <el-option
                    v-for="item in collectTimeOptions"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key">
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row style="margin-top: 15px">
              <el-col :span="6">
                <span>地点：</span>
              </el-col>
              <el-col :span="10">
                <el-input size="small" v-model="params.location"></el-input>
              </el-col>
            </el-row>
            <el-row style="margin-top: 15px">
              <el-col :span="6">
                <span>通道号：</span>
              </el-col>
              <el-col :span="10">
                <el-input size="small" v-model="params.channelNum"></el-input>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <span slot="footer" class="dialog-footer" >
    <el-button @click="amendConcentratorFlag = false">取 消</el-button>
    <el-button type="primary" @click="amendConcentrator">确 定</el-button>
  </span>
      </el-dialog>
    </div>
    </div>

</template>

<script>
  import {getProjectList, getRouteList} from '@/api/monitoring'
  import {getConcentratorDetail,deleteConcentrator,getCircuitDetail,getGroupDetail,getControllerDetail} from '@/api/equ_manage'
  import {FormatNumber,FormatBinary} from '@/utils/format'
    export default {
        name: "concentration",
        data(){
          return{

            params:{
              id:null,
              name:null,
              longitude:null,
              latitude:null,
              upInterval:null,
              upDelay:null,
              upRepeat:null,
              systemControlMode:null,
              circuitState:null,
              collectTimeInterval:null,
              location:null,
              channelNum:null,
            },
            paramsCopy:{
              id:null,
              name:null,
              longitude:null,
              latitude:null,
              upInterval:null,
              upDelay:null,
              upRepeat:null,
              systemControlMode:null,
              circuitState:null,
              collectTimeInterval:null,
              location:null,
              channelNum:null,
            },
            partId:null,
            listLoading:false,
            choosePro:null,
            chooseRou:null,
            chooseCon:null,
            projectList:[],
            routeList:[],
            isShow:1,
            deleteConcentratorFlag:false,
            addConcentratorFlag:false,
            amendConcentratorFlag:false,
            concentratorDetailList:[],
            circuitDetailList:[],
            groupDetailList:[],
            controllerDetailList:[],
            upIntervalOptions:[
              {
                key:0,
                value:"无",
              },
              {
                key:1,
                value:"2s",
              },
              {
                key:2,
                value:"5s",
              },
              {
                key:3,
                value:"10s",
              },
              {
                key:4,
                value:"15s",
              },
              {
                key:5,
                value:"20s",
              },
              {
                key:6,
                value:"30s",
              },
              {
                key:7,
                value:"1m",
              },
              {
                key:8,
                value:"2m",
              },
              {
                key:9,
                value:"3m",
              },
              {
                key:10,
                value:"10m",
              },
              {
                key:11,
                value:"15m",
              },
              {
                key:12,
                value:"20m",
              },
              {
                key:13,
                value:"30m",
              },
              {
                key:14,
                value:"1h",
              },
              {
                key:15,
                value:"2h",
              },
              {
                key:16,
                value:"3h",
              },
              {
                key:17,
                value:"4h",
              },
              {
                key:18,
                value:"6h",
              },
              {
                key:19,
                value:"12h",
              },
            ],
            upDelayOptions:[
              {
                key:1,
                value:"1s",
              },
              {
                key:2,
                value:"2s",
              },
              {
                key:3,
                value:"3s",
              },
              {
                key:4,
                value:"4s",
              },
              {
                key:5,
                value:"5s",
              },
              {
                key:6,
                value:"6s",
              },
              {
                key:7,
                value:"7s",
              },
              {
                key:8,
                value:"8s",
              },
              {
                key:9,
                value:"9s",
              },
              {
                key:10,
                value:"10s",
              },
            ],
            upRepeatOptions:[
              {
                key:1,
                value:"1次",
              },
              {
                key:2,
                value:"2次",
              },
              {
                key:3,
                value:"3次",
              },
              {
                key:4,
                value:"4次",
              },
              {
                key:5,
                value:"5次",
              },
              {
                key:6,
                value:"6次",
              },
              {
                key:7,
                value:"7次",
              },
              {
                key:8,
                value:"8次",
              },
              {
                key:9,
                value:"9次",
              },
              {
                key:10,
                value:"10次",
              },
            ],
            controlModeOptions:[
              {
                key:0,
                value:"本地",
              },
              {
                key:1,
                value:"远程",
              }
            ],
            collectTimeOptions:[
              {
                key:0,
                value:"无",
              },
              {
                key:1,
                value:"2s",
              },
              {
                key:2,
                value:"5s",
              },
              {
                key:3,
                value:"10s",
              },
              {
                key:4,
                value:"15s",
              },
              {
                key:5,
                value:"20s",
              },
              {
                key:6,
                value:"30s",
              },
              {
                key:7,
                value:"1m",
              },
              {
                key:8,
                value:"2m",
              },
              {
                key:9,
                value:"3m",
              },
              {
                key:10,
                value:"10m",
              },
              {
                key:11,
                value:"15m",
              },
              {
                key:12,
                value:"20m",
              },
              {
                key:13,
                value:"30m",
              },
              {
                key:14,
                value:"1h",
              },
              {
                key:15,
                value:"2h",
              },
              {
                key:16,
                value:"3h",
              },
              {
                key:17,
                value:"4h",
              },
              {
                key:18,
                value:"6h",
              },
              {
                key:19,
                value:"12h",
              },
            ],
          }

        },
      mounted(){
        this.getProjectList()
      },
      methods:{
        getProjectList() {
          return new Promise((resolve, reject) => {
            getProjectList(this.$store.state.user.projectID).then(response => {
              const data = response.data
              //  console.log(data)
              this.projectList = data
              resolve(response)
            }).catch(error => {
              reject(error)
            })
          })
        },
        getRouteList(){
          this.chooseRou = null;
          return new Promise((resolve, reject) => {
            getRouteList(this.choosePro).then(response => {
              const data = response.data
              // console.log(data)
              this.routeList = data
              resolve(response)
            }).catch(error => {
              reject(error)
            })
          })
        },
        disposeDetail(data){
          let res = []
          for (let value of data){
            value.upInterval = this.judgeUpInterval(value.upInterval)
            value.upDelay = value.upDelay + "s"
            value.upRepeat = value.upRepeat + "次"
            value.systemControlMode = this.judgeControlMode(value.systemControlMode)
            value.collectTimeInterval = this.judgeUpInterval(value.collectTimeInterval)
            value.longitude = FormatNumber(value.longitude,6)
            value.latitude = FormatNumber(value.latitude,6)
            value.circuitState = FormatBinary(Number(value.circuitState).toString(2),8)
            res.push(value)
          }
          return res
        },
        judgeUpInterval(num){
          switch (num){
            case 0 :
              return "无"
            case 1 :
              return "2s"
            case 2 :
              return "5s"
            case 3 :
              return "10s"
            case 4 :
              return "15s"
            case 5 :
              return "20s"
            case 6 :
              return "30s"
            case 7 :
              return "1m"
            case 8 :
              return "2m"
            case 9 :
              return "5m"
            case 10 :
              return "10m"
            case 11 :
              return "15m"
            case 12 :
              return "20m"
            case 13 :
              return "30m"
            case 14 :
              return "1h"
            case 15 :
              return "2h"
            case 16 :
              return "3h"
            case 17 :
              return "4h"
            case 18 :
              return "6h"
            case 19 :
              return "12h"
          }
        },
        judgeControlMode(num){
          switch (num){
            case 0:
              return "本地"
            case 1:
              return "远程"
          }
        },
        getConcentratorDetail(){
          this.isShow = 1
          this.listLoading = true
          return new Promise((resolve, reject) => {
            getConcentratorDetail(this.chooseRou).then(response => {
              const data = response.data
              this.concentratorDetailList = this.disposeDetail(data)
              this.listLoading = false
              resolve(response)
            }).catch(error => {
              reject(error)
            })
          })
        },
        toAddConcentrator(){
          this.params = this.paramsCopy
          this.addConcentratorFlag = true
        },
        addConcentrator(){},
        toDeleteConcentrator(concentratorId){
          this.chooseCon = concentratorId
          this.deleteConcentratorFlag = true
        },
        deleteConcentrator(){
          this.deleteConcentratorFlag = false
          return new Promise((resolve, reject) => {
            deleteConcentrator(this.chooseCon).then(response => {
              this.$message({
                message: '删除成功！',
                type: 'success'
              });
              this.getConcentratorDetail()
              resolve(response)
            }).catch(error => {
              reject(error)
            })
          })
        },
        toAmendConcentrator(params){
          this.params=params
          this.partId = this.dealId(params.id)
          this.amendConcentratorFlag = true
        },
        amendConcentrator(){},
        dealId(id){
          return id.replace("FEF11E2","")
        },
        changeToCircuit(row){
          return new Promise((resolve, reject) => {
            getCircuitDetail(row.id).then(response => {
              const data = response.data
              // console.log(data)
              this.circuitDetailList = data
              this.isShow = 2
              resolve(response)
            }).catch(error => {
              reject(error)
            })
          })
        },
        changeToGroup(row){
          return new Promise((resolve, reject) => {
            getGroupDetail(row.id).then(response => {
              const data = response.data
              // console.log(data)
              this.groupDetailList = data
              this.isShow = 3
              resolve(response)
            }).catch(error => {
              reject(error)
            })
          })
        },
        changeToController(row){
          return new Promise((resolve, reject) => {
            getControllerDetail(row.id).then(response => {
              const data = response.data
              console.log(data)
              this.controllerDetailList = data
              this.isShow = 4
              resolve(response)
            }).catch(error => {
              reject(error)
            })
          })
        },

      },
      computed: {
        addButtonFlag:function () {
          if (this.choosePro && this.chooseRou){
            return false
          }
          return true
        },
      }
    }
</script>

<style scoped>
.bt{
  margin-top: 10px;
}
</style>
