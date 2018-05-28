<template>
  <div class="app-container calendar-list-container">
    <el-dialog
      title="开灯"
      :visible.sync="OnLamp"
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
          v-model="changeDate"
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="this.OnLamp = false">取 消</el-button>
    <el-button type="primary" @click="turnOnLamp">确 定</el-button>
  </span>
    </el-dialog>
    <el-dialog
      title="关灯"
      :visible.sync="OffLamp"
      width="40%"
      center>
      <div style="margin-top: 10px">
        <span >转为本地控制方式的时间：</span><br/>
        <el-date-picker
          style="margin-top: 20px"
          v-model="changeDate"
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="this.OffLamp = false">取 消</el-button>
    <el-button type="primary" @click="turnOffLamp">确 定</el-button>
  </span>
    </el-dialog>
    <el-dialog
      title="开回路"
      :visible.sync="OnCircuit"
      width="40%"
      center>
      <div style="margin-top: 50px">
        <span >转为本地控制方式的时间：</span><br/>
        <el-date-picker
          style="margin-top: 20px"
          v-model="changeDate"
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="this.OnCircuit = false">取 消</el-button>
    <el-button type="primary" @click="turnOnCircuit">确 定</el-button>
  </span>
    </el-dialog>
    <el-dialog
      title="关回路"
      :visible.sync="OffCircuit"
      width="40%"
      center>
      <div style="margin-top: 10px">
        <span >转为本地控制方式的时间：</span><br/>
        <el-date-picker
          style="margin-top: 20px"
          v-model="changeDate"
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="this.OffCircuit = false">取 消</el-button>
    <el-button type="primary" @click="turnOffCircuit">确 定</el-button>
  </span>
    </el-dialog>
    <div class="filter-container">
      <span>项目：</span>
      <el-select clearable style="width: 150px" class="filter-item"  v-model="choosePro" placeholder="请选择项目" @change="getRouteList">
        <el-option v-for="item in projectList" :key="item.projectId" :label="item.projectName" :value="item.projectId">
        </el-option>
      </el-select>
      <span>线路：</span>
      <el-select clearable style="width: 150px" class="filter-item"  v-model="chooseRou" placeholder="请选择线路" @change="getConcentratorList">
        <el-option v-for="item in routeList" :key="item.routeId" :label="item.routeName" :value="item.routeId">
        </el-option>
      </el-select>
    </div>
    <div class="cardtable">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-card shadow="hover">
            <div slot="header" class="clearfix">
              <span>集中</span>
              <el-button-group style="margin-left: 30px">
                <el-button
                  size="mini"
                  type="success"
                  @click=""
                  icon="el-icon-circle-check-outline">开</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click=""
                  icon="el-icon-circle-close-outline">关</el-button>
                <el-button
                  size="mini"
                  type="warning"
                  @click=""
                  icon="el-icon-document">策略</el-button>
              </el-button-group>
            </div>
            <el-table ref="multipleTable" :data="concentratorList" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row
                      style="width: 100%;margin-top: 10px"
                      @selection-change="getCircuit">
              <el-table-column type="selection" width="55" prop="concentratorID">
              </el-table-column>
              <el-table-column align="center" label="名称"  prop="concentratorName">
              </el-table-column>
            </el-table>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover">
            <div slot="header" class="clearfix">
              <span>回路</span>
              <el-button-group style="margin-left: 30px">
                <el-button
                  size="mini"
                  type="success"
                  @click="showOnCircuit"
                  icon="el-icon-circle-check-outline">开</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="showOffCircuit"
                  icon="el-icon-circle-close-outline">关</el-button>
                <el-button
                  size="mini"
                  type="warning"
                  @click=""
                  icon="el-icon-document">策略</el-button>
              </el-button-group>
            </div>
            <el-table :key=2 :data="circuitList" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row
                      style="width: 100%;margin-top: 10px"
                      @selection-change="getGroup">
              <el-table-column type="selection" width="55" prop="circuitId">
              </el-table-column>
              <el-table-column align="center" label="名称"  prop="circuitName">
              </el-table-column>
            </el-table>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover">
            <div slot="header" class="clearfix">
              <span>组</span>
              <el-button-group style="margin-left: 40px">
                <el-button
                  size="mini"
                  type="success"
                  @click=""
                  icon="el-icon-circle-check-outline">开</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click=""
                  icon="el-icon-circle-close-outline">关</el-button>
                <el-button
                  size="mini"
                  type="warning"
                  @click=""
                  icon="el-icon-document">策略</el-button>
              </el-button-group>
            </div>
            <el-table  :data="groupList" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row
                       style="width: 100%;margin-top: 10px"
                       @selection-change="getControllerList">
              <el-table-column type="selection" width="55" prop="groupId">
              </el-table-column>
              <el-table-column align="center" label="名称"  prop="groupName">
              </el-table-column>
            </el-table>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card  shadow="hover">
            <div slot="header" class="clearfix">
              <span>灯</span>
              <el-button-group style="margin-left: 40px">
                <el-button
                  size="mini"
                  type="success"
                  @click="showOnLamp"
                  icon="el-icon-circle-check-outline">开</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="showOffLamp"
                  icon="el-icon-circle-close-outline">关</el-button>
                <el-button
                  size="mini"
                  type="warning"
                  @click=""
                  icon="el-icon-document">策略</el-button>
              </el-button-group>
            </div>
            <el-table  :data="controllerList" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row
                       style="width: 100%;margin-top: 10px"
                       @selection-change="changeChooseController">
              <el-table-column type="selection" width="55" prop="controllerId">
              </el-table-column>
              <el-table-column align="center" label="名称"  prop="controllerName">
              </el-table-column>
            </el-table>
          </el-card>
        </el-col>
      </el-row>

    </div>
  </div>
</template>

<script>
  import {getProjectList, getRouteList, getConcentratorList,getCircuitList,getGroupList,
    getControllerList,turnOnLamp,turnOffLamp,turnOnCircuit,turnOffCircuit} from '@/api/monitoring'
  export default {
    data(){
      return{
        OnLamp:false,
        OffLamp:false,
        OnCircuit:false,
        OffCircuit:false,
        listLoading:false,
        lightness:100,
        changeDate:null,
        choosePro:null,
        chooseRou:null,
        chooseConcentratorIds:"",
        chooseConcentrator:[],
        chooseCircuitIds:"",
        chooseCircuit:[],
        chooseGroupIds:"",
        chooseGroup:[],
        chooseControllerIds:"",
        chooseController:[],
        projectList:[],
        routeList:[],
        concentratorList:[],
        circuitList:[],
        groupList:[],
        controllerList:[],
      }
    },
    mounted(){
      this.getProjectList()
    },
    methods: {
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
      getConcentratorList(){
        // console.log(this.chooseRou)
        return new Promise((resolve, reject) => {
          getConcentratorList(this.chooseRou).then(response => {
            const data = response.data
            // console.log(data)
            this.concentratorList = data
            resolve(response)
          }).catch(error => {
            reject(error)
          })
        })
      },
      getCircuit(val){
        this.chooseConcentrator = val
        let arrs = []
        for(let va of this.chooseConcentrator){
          arrs.push(va.concentratorID)
        }
        this.chooseConcentratorIds = arrs.join(",")
        //console.log(this.chooseConcentratorIds )
        return new Promise((resolve, reject) => {
          getCircuitList(this.chooseConcentratorIds).then(response => {
            const data = response.data
            //console.log(data)
            this.circuitList = data
            resolve(response)
          }).catch(error => {
            reject(error)
          })
        })
      },
      getGroup(val){
        this.chooseCircuit = val
        let arrs = []
        for(let va of this.chooseCircuit){
          arrs.push(va.circuitId)
        }
        this.chooseCircuitIds = arrs.join(",")
        // console.log(this.chooseCircuitIds )
        return new Promise((resolve, reject) => {
          getGroupList(this.chooseCircuitIds).then(response => {
            const data = response.data
            //  console.log(data)
            this.groupList = data
            resolve(response)
          }).catch(error => {
            reject(error)
          })
        })
      },
      getControllerList(val){
        this.chooseGroup = val
        let arrs = []
        for(let va of this.chooseGroup){
          arrs.push(va.groupId)
        }
        this.chooseGroupIds = arrs.join(",")
        //console.log(this.chooseGroupIds )
        return new Promise((resolve, reject) => {
          getControllerList(this.chooseGroupIds).then(response => {
            const data = response.data
            // console.log(data)
            this.controllerList = data
            resolve(response)
          }).catch(error => {
            reject(error)
          })
        })
      },
      changeChooseController(val){
        this.chooseController = val
        let arrs = []
        for(let va of this.chooseController){
          arrs.push(va.controllerId)
        }
        this.chooseControllerIds = arrs.join(",")
        console.log(this.chooseControllerIds )
      },
      showOnLamp(){
        if (this.chooseController.length > 0){
          this.OnLamp = true
        }
        console.log(this.chooseController)
        console.log(this.On)
      },
      showOffLamp(){
        if (this.chooseController.length > 0){
          this.OffLamp = true
        }
      },
      turnOnLamp(){
        this.OnLamp = false
        return new Promise((resolve, reject) => {
          turnOnLamp(this.chooseControllerIds,this.changeDate,this.lightness,
            this.$store.state.user.userId).then(response => {
            const data = response.message
            console.log(data)
            resolve(response)
          }).catch(error => {
            reject(error)
          })
        })
      },
      turnOffLamp(){
        this.OffLamp = false
        return new Promise((resolve, reject) => {
          turnOffLamp(this.chooseControllerIds,this.changeDate,
            this.$store.state.user.userId).then(response => {
            const data = response.message
            console.log(data)
            resolve(response)
          }).catch(error => {
            reject(error)
          })
        })
      },
      showOnCircuit(){
        if (this.chooseCircuit.length>0){
          this.OnCircuit = true
        }
      },
      showOffCircuit(){
        if (this.chooseCircuit.length>0){
          this.OffCircuit = true
        }
      },
      turnOnCircuit(){
        this.OnCircuit = false
        return new Promise((resolve, reject) => {
          turnOnCircuit(this.chooseCircuitIds,this.changeDate,
            this.$store.state.user.userId).then(response => {
            const data = response.message
            console.log(data)
            resolve(response)
          }).catch(error => {
            reject(error)
          })
        })
      },
      turnOffCircuit(){
        this.OffCircuit = false
        return new Promise((resolve, reject) => {
          turnOffCircuit(this.chooseCircuitIds,this.changeDate,
            this.$store.state.user.userId).then(response => {
            const data = response.message
            console.log(data)
            resolve(response)
          }).catch(error => {
            reject(error)
          })
        })
      },
    }
  }
</script>

<style scoped>
  .cardtable{
    margin-top: 20px;
  }
</style>
