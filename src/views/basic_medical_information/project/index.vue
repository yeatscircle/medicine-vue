<template>
  <div class="app-container">

    <!--搜索表单-->
    <el-form :inline="true" :model="searchPro" class="demo-form-inline">
      <el-form-item label="项目编号">
        <el-input
          v-model="searchPro.diaId"
          placeholder="请输入完整的项目编号"
        ></el-input>
      </el-form-item>
      <el-form-item label="项目名称">
        <el-input
          v-model="searchPro.diaName"
          placeholder="请输入项目名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="收费类别">
        <el-select v-model="searchPro.diaExpType" placeholder="请选择">
          <el-option
            v-for="typeInfo in diaExpTypeList"
            :key="typeInfo.diaExpType"
            :label="typeInfo.name"
            :value="typeInfo.diaExpType">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="项目创建时间">
        <el-date-picker
          v-model="createtime"
          clearable
          value-format="yyyy-MM-dd"
          type="daterange"
          placeholder="选择日期"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          style="width: 400px; margin-left: 20px"
        ></el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="info" @click="clear">清空</el-button>
      </el-form-item>
    </el-form>



    <!--按钮-->
    <el-row>
      <el-button type="danger" size="medium" @click="deleteByIds">- 批量删除</el-button>
      <el-button type="primary" size="medium" @click="dialogVisible = true; pro = {};">+ 新增项目</el-button>
      <el-button type="success" size="medium" @click="exportExcelFile">导出 Excel</el-button>
    </el-row>


    <!--添加数据对话框表单-->
    <el-dialog ref="form" title="编辑" :visible.sync="dialogVisible" width="30%">
      <el-form ref="form" :model="pro" :rules="rules" label-width="80px" size="mini">
      <el-form-item label="项目编码" prop="diaId">
        <el-input v-model="pro.diaId"></el-input>
      </el-form-item>

      <el-form-item label="项目名称" prop="diaName">
        <el-input v-model="pro.diaName"></el-input>
      </el-form-item>

        <el-form-item label="收费类别">
          <el-select v-model="pro.diaExpType" placeholder="请选择" style="width:100%">
            <el-option
              v-for="item in diaExpTypeList"
              :key="item.value"
              :label="item.name"
              :value="item.diaExpType"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="项目等级">
          <el-radio-group v-model="pro.diaExpLevel">
            <el-radio v-for="item in diaExpLevelList" :label="item.id" :key="item.id">{{ item.name }}</el-radio>
          </el-radio-group>
        </el-form-item>


        <el-form-item label="最高限价" prop="diaMaxPrice">
          <el-input v-model="pro.diaMaxPrice" @blur="handlePriceBlur">
            <template slot-scope="scope">
              {{ parseFloat(scope.row.diaMaxPrice).toFixed(2) }}
            </template>
          </el-input>
        </el-form-item>

        <el-form-item label="开始日期">
          <el-date-picker
            v-model="pro.diaStarttime"
            clearable
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期"
            size="small"
            style="width:100%"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="终止日期">
          <el-date-picker
            v-model="pro.diaEndtime"
            clearable
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期"
            size="small"
            style="width:100%"
          ></el-date-picker>
        </el-form-item>


        <el-form-item label="有效标志">
          <el-radio-group v-model="pro.diaValid">
            <el-radio v-for="item in diaValidList" :label="item.id" :key="item.id">{{ item.name }}</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="医院等级">
          <el-radio-group v-model="pro.diaHosLevel">
            <el-radio v-for="item in diaHosLevelList" :label="item.id" :key="item.id">{{ item.name }}</el-radio>
          </el-radio-group>
        </el-form-item>


        <el-form-item label="审批标志">
          <el-radio-group v-model="pro.diaApprovalmark">
            <el-radio v-for="item in diaApprovalmarkList" :label="item.id" :key="item.id">{{ item.name }}</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="add">提交</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <br>
    <!--表格-->
    <template>
      <div class="app-container">
        <el-table :data="tableData" style="width: 100%" border @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column prop="diaId" label="项目编码" align="center"></el-table-column>
          <el-table-column prop="diaName" label="项目名称" align="center"></el-table-column>
          <el-table-column prop="diaExpType" label="收费类别" align="center" :formatter="formatExpTypeName"></el-table-column>
          <el-table-column prop="diaExpLevel" label="项目等级" align="center" :formatter="formatDiaExpLevel"></el-table-column>
          <el-table-column prop="diaMaxPrice" label="最高限价" align="center">
            <template slot-scope="scope">
              {{ parseFloat(scope.row.diaMaxPrice).toFixed(2) }}
            </template>
          </el-table-column>
          <el-table-column prop="diaStarttime" label="开始日期" align="center"></el-table-column>
          <el-table-column prop="diaEndtime" label="终止日期" align="center"></el-table-column>
          <el-table-column prop="diaValid" label="有效标志" align="center" :formatter="formatDiaValid"></el-table-column>
          <el-table-column prop="diaHosLevel" label="医院等级" align="center" :formatter="formatDiaHosLevel"></el-table-column>
          <el-table-column prop="diaApprovalmark" label="审批需求" align="center" :formatter="formatDiaApprovalmark"></el-table-column>
          <el-table-column prop="updatetime" label="更新时间" align="center"></el-table-column>
          <el-table-column prop="createtime" label="创建时间" align="center"></el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <div style="display: flex; justify-content: center;">
                <el-button type="primary" size="small" @click="update(scope.row.id)">编辑</el-button>
                <el-button type="danger" size="small" @click="deleteById(scope.row.id)" style="margin-left: 10px;">删除</el-button>
              </div>
            </template>
          </el-table-column>

        </el-table>
      </div>
    </template>

    <!--分页工具条-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :background="background"
      :current-page="currentPage"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="5"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount">
    </el-pagination>
  </div>
</template>

<script>
import { deleteById ,page, addPro, update, deleteByIds, selectById ,exportExcel } from "@/api/project.js";
import { getAll } from "@/api/medicineCategory.js";
import { getToken } from '@/utils/auth';

export default {
  data() {
    return {
      background: true,
      // 每页显示的条数
      pageSize: 5,
      // 总记录数
      totalCount: 100,
      // 当前页码
      currentPage: 1,
      // 添加数据对话框是否展示的标记
      dialogVisible: false,
      // 品牌模型数据
      searchPro: {
        diaName: "",
        diaId: "",
        diaExpType: "",
      },
      diaExpTypeList: [],
      diaExpLevelList:[{id: 0,name: "甲类"},{id: 1,name: "乙类"},{id:2,name:"丙类"}],
      diaValidList: [{id: 0,name: "无效"},{id: 1,name: "有效"}],
      diaApprovalmarkList:[{id: 0,name: "无需审批"},{id: 1,name: "需要审批"}],
      diaHosLevelList:[{id: 0,name: "一级医院"},{id: 1,name: "二级医院"},{id:2,name:"三级医院"},{id:3,name:"社区医院"},{id:4,name:"所有医院"}],
      begin: "",
      end: "",
      createtime: "",

      pro:{
        id:"",
        diaExpLevel:"",
        diaMaxPrice:"",
        diaValid:"",
        diaHosLevel:"",
        diaApprovalmark:"",
        diaStarttime: "",
        diaEndtime: "",
        updateTime:"",
      },


      // 被选中的id数组
      selectedIds: [],
      // 复选框选中数据集合
      multipleSelection: [],
      // 表格数据
      tableData: [],
      token: {token: getToken()},
      rules: {
        diaId: [
          { required: true, message: '项目编码不能为空', trigger: 'blur' },
          { min: 6, max: 32, message: '项目编码长度为6到32位', trigger: 'blur' }
        ],
        diaName: [
          { required: true, message: '项目名称不能为空', trigger: 'blur' },
          { min: 4, max: 16, message: '项目名称长度为4到16位', trigger: 'blur' }
        ],
        diaMaxPrice: [
          { required: true, message: '最高限价不能为空', trigger: 'blur' },
          { pattern: /^(\d{1,5}(\.\d{1,2})?)$/, message: '请输入不超过99999.99的有效数字', trigger: 'blur' }
        ]
      },
    };
  },
  computed: {
    ExpMap() {
      const map = {};
      this.diaExpTypeList.forEach(item => {
        map[item.diaExpType] = item.name;
      });
      return map;
    },
  },
  handlePriceBlur() {
    if (this.pro.diaMaxPrice) {
      this.pro.diaMaxPrice = parseFloat(this.pro.diaMaxPrice).toFixed(2);
    }
  },

  mounted() {
    this.page(); //当页面加载完成后，发送异步请求，获取数据
    getAll().then((result) => {
      this.diaExpTypeList = result.data.data;
      console.log(this.diaExpTypeList);
    });
  },

  methods: {
    // 查询分页数据
    page() {
      page(
        this.searchPro.diaId,
        this.searchPro.diaName,
        this.searchPro.diaExpType,
        this.begin,
        this.end,
        this.currentPage,
        this.pageSize
      ).then((res) => {
        if (res.data.code === 1) {
          this.totalCount = res.data.data.total;
          this.tableData = res.data.data.records; // 绑定返回的数据到 tableData
          console.log(this.tableData); // 检查 tableData 数据
        } else {
          this.$message.error("数据获取失败");
        }
      }).catch(error => {
        console.error("Failed to fetch data:", error);
      });
    },

    exportExcelFile() {
      exportExcel().then(response => {
        // 创建Blob对象
        const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', '诊疗项目信息维护表.xlsx'); // 指定下载文件名
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      }).catch(error => {
        console.error('Error exporting excel file:', error);
        this.$message.error("文件下载失败");
      });
    },



    formatPrice(value) {
      return parseFloat(value).toFixed(2);
    },

    // 复选框选中后执行的方法
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    formatExpTypeName(row) {
      return this.ExpMap[row.diaExpType];
    },

    formatDiaExpLevel(row) {
      const item = this.diaExpLevelList.find(item => item.id === row.diaExpLevel);
      return item ? item.name : '';
    },
    formatDiaValid(row) {
      const item = this.diaValidList.find(item => item.id === row.diaValid);
      return item ? item.name : '';
    },
    formatDiaHosLevel(row) {
      const item = this.diaHosLevelList.find(item => item.id === row.diaHosLevel);
      return item ? item.name : '';
    },
    formatDiaApprovalmark(row) {
      const item = this.diaApprovalmarkList.find(item => item.id === row.diaApprovalmark);
      return item ? item.name : '';
    },


    // 查询方法
    onSubmit() {
      this.currentPage = 1;
      this.page();
    },

    clear(){
      this.searchPro = {diaId: "", diaName: "",diaExpType: ""};
      this.begin = "";
      this.end = "";
      this.createtime = "";
      this.page();
    },
    // 添加数据
    add() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          let operator;
          this.pro.diaMaxPrice = this.formatPrice(this.pro.diaMaxPrice);
          if (this.pro.id) { // 修改为 this.pro.DiaId
            operator = update(this.pro); // 修改为 update(this.pro)
          } else {
            operator = addPro(this.pro); // 修改为 addPro(this.pro)
          }
          operator.then((resp) => {
            if (resp.data.code == "1") {
              this.dialogVisible = false;
              this.page();
              this.$message({ message: "恭喜你，保存成功", type: "success" });
              this.pro = {}; // 修改为 this.pro = {}
            } else {
              this.$message.error(resp.data.msg);
            }
          })
        } else {
          alert('表单验证失败，请检查输入!');
          return;
        }
      });
    },

    // 批量删除员工信息
    deleteByIds() {
      // 弹出确认提示框
      this.$confirm("此操作将删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        // 用户点击确认按钮
        // 1. 创建以逗号连接的id字符串, 从 this.multipleSelection 获取
        let selectedIds = this.multipleSelection.map(item => item.id).join(',');

        // 2. 发送AJAX请求
        deleteByIds(selectedIds).then((resp) => {
          if (resp.data.code == "1") {
            // 删除成功
            this.$message.success("恭喜你，删除成功");
            this.page();
          } else {
            this.$message.error(resp.data.msg);
          }
        });
      }).catch(() => {
        // 用户点击取消按钮
        this.$message.info("已取消删除");
      });
    },



    update(id) {
      //1. 打开窗口
      this.dialogVisible = true;
      //2. 发送请求

      selectById(id).then((result) => {
        if (result.data.code === 1) {
          this.pro = result.data.data;
        }
      });
    },


    //分页
    handleSizeChange(val) {
      // 重新设置每页显示的条数
      this.pageSize = val;
      this.page();
    },

    handleCurrentChange(val) {
      // 重新设置当前页码
      this.currentPage = val;
      this.page();
    },


    //删除
    deleteById(id){
      this.$confirm("此操作将删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        //2. 发送AJAX请求
        deleteById(id).then((resp) => {
          if (resp.data.code == 1) {
            //删除成功
            this.$message.success("恭喜你，删除成功");
            this.page();
          } else {
            this.$message.error(resp.data.msg);
          }
        });
      }).catch(() => {
        //用户点击取消按钮
        this.$message.info("已取消删除");
      });
    }
  },
  watch: {
    createtime(val) {
      if (val && val.length >= 2) {
        this.begin = val[0];
        this.end = val[1];
      } else {
        this.begin = "";
        this.end = "";
      }
    },
  },
}

</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>
