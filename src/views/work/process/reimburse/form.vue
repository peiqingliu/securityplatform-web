<template>
  <basic-container>
    <avue-form :option="option" v-model="form" @submit="handleSubmit"></avue-form>
  </basic-container>
</template>

<script>

  import {reimburseProcess} from "@/api/work/process";

    export default {
        name: "form",
        data(){
          return {
            form: {
            },
            option: {
              group: [
                {
                  icon: 'el-icon-info',
                  label: '报销申清',
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
                      label: '报销金额',
                      prop: 'reimburseMoney',
                      type: 'input',
                      span: 24,
                      rules: [
                        {
                          required: true,
                          message: '报销金额不能为空',
                          trigger: 'blur'
                        }
                      ]
                    },
                    {
                      label: '报销凭据',
                      prop: 'reason',
                      type: 'textarea',
                      span: 24,
                      rules: [
                        {
                          required: true,
                          message: '请输入报销凭据',
                          trigger: 'blur'
                        }
                      ]
                    },
                  ]
                },
              ],
            }
          }
        },
        methods:{
          handleSubmit() {
            const params = {
              processDefinitionId: this.$route.params.processDefinitionId,
              ...this.form,
            };
            reimburseProcess(params).then(resp => {
              const data = resp.data;
              if (data.success) {
                this.$message.success(data.msg);
                this.$router.$avueRouter.closeTag();
                this.$router.push({path: `/work/start`});
              } else {
                this.$message.error(data.msg || '提交失败');
              }
            });
          }
        }
    }
</script>

<style scoped>

</style>
