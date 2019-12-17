<template>
    <basic-container>
        <avue-crud :option="option"
                   :table-loading="loading"
                   :data="data"
                   ref="crud"
                   v-model="form"
                   :permission="permissionList"
                   :before-open="beforeOpen"
                   :page="page"
                   @search-change="searchChange"
                   @search-reset="searchReset"
                   @selection-change="selectionChange"
                   @current-change="currentChange"
                   @size-change="sizeChange"
                   @on-load="onLoad">
        </avue-crud>
    </basic-container>
</template>

<script>
    import {mapGetters} from "vuex";
    import {getList} from "@/api/system/log"
    export default {
        name: "log",
        data(){
            return {
                form: {},
                loading: true,
                page: {
                    pageSize: 10,
                    currentPage: 1,
                    total: 0
                },
                query:{
                    key:''
                },
                option: {
                    height: 'auto',
                    calcHeight: 350,
                    tip: false,
                    border: true,
                    index: true,
                    selection: true,
                    viewBtn: true,
                    addBtn:false,
                    dialogHeight: 450,
                    dialogType: 'drawer',
                    column: [
                        {
                            label: "标题",
                            prop: "name",
                        },
                        {
                            label: "操作人",
                            prop: "username",
                            search:true
                        },
                        {
                            label: 'IP',
                            prop: 'ip',
                        },
                        {
                            label: "请求参数",
                            prop: "requestParam",
                        },
                        {
                            label: "请求URL",
                            prop: "requestUrl"
                        },
                        {
                            label: "描述",
                            prop: "description",
                        },
                        {
                            label: "日志类型",
                            prop: "logType",
                            type: "select",
                            dicData: [
                                {
                                    label: "接口日志",
                                    value: 0
                                },
                                {
                                    label: "登录系统",
                                    value: 1
                                }
                            ],
                            search:true
                        },
                        {
                            label: "创建时间",
                            type: "date",
                            prop: "createTime",
                            format: "yyyy-MM-dd hh:mm:ss",
                            valueFormat: "yyyy-MM-dd hh:mm:ss",
                            search:true
                        }
                    ]
                },
                data: []
            }
        },
        computed: {
            ...mapGetters(["permission"]),
            permissionList() {
                return {
                    addBtn: this.vaildData(this.permission.user_add, false),
                    viewBtn: this.vaildData(this.permission.user_view, false),
                    delBtn: this.vaildData(this.permission.user_delete, false),
                    editBtn: this.vaildData(this.permission.user_edit, false)
                };
            },
            ids() {
                let ids = [];
                this.selectionList.forEach(ele => {
                    ids.push(ele.id);
                });
                return ids.join(",");
            },
        },
        methods:{
            beforeOpen(done, type) {
                if (["edit", "view"].includes(type)) {
                }
                done();
            },
            searchReset() {
                this.query = {};
                this.onLoad(this.page);
            },
            searchChange(params) {
                this.query = params;
                this.onLoad(this.page, params);
            },
            selectionChange(list) {
                this.selectionList = list;
            },
            selectionClear() {
                this.selectionList = [];
                this.$refs.crud.toggleSelection();
            },
            currentChange(currentPage) {
                this.page.currentPage = currentPage;
            },
            sizeChange(pageSize) {
                this.page.pageSize = pageSize;
            },
            onLoad(page, params = {}) {
                this.loading = false;
                getList(page.currentPage, page.pageSize, Object.assign(params, this.query)).then(res => {
                    debugger;
                    if (res.success === true){

                        const data = res.result;
                        this.page.total = data.totalElements;
                        this.data = data.content;
                        this.loading = false;
                        this.selectionClear();
                    }
                });
            }
        }
    }
</script>

<style scoped>

</style>