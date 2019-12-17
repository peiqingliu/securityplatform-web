<template>
  <basic-container>
    <avue-form :option="option" v-model="form" @submit="handleSubmit"></avue-form>
  </basic-container>
</template>

<script>

  import {
    getStore,
  } from "@/util/store";

  import {
    getDept
  } from "@/api/system/dept";

  import {
    materialProcess
  } from "@/api/work/process";

  let moment = require("moment");

  export default {
    name: "form",
    data() {
      return {
        form: {
          applyUser:"",
          applyDate:moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
          applyDept:""
        },
        option: {
          group: [
            {
              icon: 'el-icon-info',
              label: '物资申请信息',
              prop: 'group1',
              column: [
                {
                  label: '审批人员',
                  prop: 'taskUser',
                  type: 'select',
                  dicUrl: `/api/blade-user/user-list`,
                  props: {
                    label: "account",
                    value: "id"
                  },
                  span: 24,
                  rules: [
                    {
                      required: true,
                      message: '请选择审批人员',
                      trigger: 'blur'
                    }
                  ]
                },
                {
                  label: '申请时间',
                  prop: 'applyDate',
                  type: 'datetime',
                  span: 24,
                  readonly:true,
                  valueFormat: 'yyyy-MM-dd HH:mm:ss',
                  rules: [
                    {
                      required: true,
                      message: '请选择开始时间',
                      trigger: 'blur'
                    }
                  ]
                },
                {
                  label: '申请人',
                  prop: 'applyUser',
                  type: 'input',
                  span: 24,
                  readonly:true,
                  rules: [
                    {
                      required: true,
                      message: '申请人不能为空',
                      trigger: 'blur'
                    }
                  ]
                },
                {
                  label: '申请部门',
                  prop: 'applyDept',
                  type: 'input',
                  span: 24,
                  readonly:true,
                  rules: [
                    {
                      required: true,
                      message: '申请部门不能为空',
                      trigger: 'blur'
                    }
                  ]
                },
                {
                  label: '物品名称',
                  prop: 'articleName',
                  type: 'input',
                  span: 24,
                  rules: [
                    {
                      required: true,
                      message: '物品名称不能为空',
                      trigger: 'blur'
                    }
                  ]
                },
                {
                  label: '收件地址',
                  prop: 'address',
                  type: 'input',
                  span: 24,
                  rules: [
                    {
                      required: true,
                      message: '收件地址不能',
                      trigger: 'blur'
                    }
                  ]
                },
                {
                  label: '收件人',
                  prop: 'recipient',
                  type: 'input',
                  span: 24,
                  rules: [
                    {
                      required: true,
                      message: '收件人不能为空',
                      trigger: 'blur'
                    }
                  ]
                }
              ]
            },
          ],
        }
      }
    },
    methods: {
      handleSubmit(){
        const params = {
          processDefinitionId: this.$route.params.processDefinitionId,
          ...this.form,
        };
        //保存
        materialProcess(params).then(resp => {
          const data = resp.data;
          if (data.success) {
            this.$message.success(data.msg);
            this.$router.$avueRouter.closeTag();
            this.$router.push({path: `/work/start`});
          } else {
            this.$message.error(data.msg || '提交失败');
          }
        });
      },
      init(){
        let userInfo = getStore({name:"userInfo"});
        if (userInfo){
          this.form.applyUser = userInfo.account;
          this.form.applyDept = userInfo.dept_id;

          getDept(this.form.applyDept).then(res => {
            if (res.data.code === 200){
              let deptName = res.data.data.fullName;
              this.form.applyDept = deptName;
            }
          });
        }
      }
    },
    mounted() {
      this.init();
    }
  }
</script>

<style scoped>

</style>
