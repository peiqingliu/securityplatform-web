<template>
    <basic-container>
        <avue-crud :option="option"
                   :table-loading="loading"
                   :data="data"
                   ref="crud"
                   v-model="form"
                   :permission="permissionList"
                   @row-del="rowDel"
                   @row-update="rowUpdate"
                   @row-save="rowSave"
                   :before-open="beforeOpen"
                   :page="page"
                   @search-change="searchChange"
                   @search-reset="searchReset"
                   @selection-change="selectionChange"
                   @current-change="currentChange"
                   @size-change="sizeChange"
                   @on-load="onLoad">
            <template slot="menuLeft">
                <el-button type="danger"
                           size="small"
                           icon="el-icon-delete"
                           plain
                           v-if="permission.user_delete"
                           @click="handleDelete">删 除
                </el-button>
            </template>
        </avue-crud>
    </basic-container>
</template>

<script>
    import {
        getList,
        remove,
        update,
        add,
        getCamera
    } from "@/api/monitor/camera";
    import {mapGetters} from "vuex";
    export default {
        name: "camera",
        data(){
            return {
                form: {},
                loading:true,
                page: {
                    pageSize: 10,
                    currentPage: 1,
                    total: 0
                },
                option:{
                    title:'',
                    align:'center',
                    menuAlign:'center',
                    height: 450,
                    calcHeight: 350,
                    tip: false,
                    border: true,
                    index: true,
                    selection: true,
                    viewBtn: true,
                    dialogHeight: 350,
                    dialogType: 'dialog',
                    column:[
                        {
                            label: "名称",
                            prop: "cameraName",
                            search: true,
                            searchSpan:4,
                            rules: [{
                                required: true,
                                message: "请输入名称",
                                trigger: "blur"
                            }]
                        },
                        {
                            label: "编码",
                            prop: "cameraCode",
                            search: true,
                            searchSpan:4,
                            rules: [{
                                required: true,
                                message: "请输入编码",
                                trigger: "blur"
                            }]
                        },
                        {
                            label: "型号",
                            prop: "cameraModel",
                            searchSpan:4,
                            search: true,
                            rules: [{
                                required: true,
                                message: "请输入型号",
                                trigger: "blur"
                            }]
                        },
                        {
                            label: '密码',
                            prop: 'password',
                            hide: true,
                            editDisplay: false,
                            viewDisplay: false
                        },
                        {
                            label: '位置',
                            prop: 'position',
                            hide: true,
                            editDisplay: false,
                            viewDisplay: false,
                            rules: [
                                {required: true,
                                    message: "请输入型号",
                                    trigger: 'blur'}
                            ]
                        },
                        {
                            label: "图片",
                            prop: "picture",
                            type:"upload",
                            accept:"String"
                        },
                        {
                            label: "IP",
                            prop: "ip",
                            search: true,
                            searchSpan:4,
                            labelSpan:1
                        },
                        {
                            label: "账号状态",
                            prop: "status"
                        }
                    ]
                },
                data:[]
            }
        },
        watch: {
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
        methods: {
            rowSave(row, loading, done) {
                add(row).then(() => {
                    loading();
                    this.onLoad(this.page);
                    this.$message({
                        type: "success",
                        message: "操作成功!"
                    });
                }, error => {
                    done();
                    console.log(error);
                });
            },
            rowUpdate(row, index, loading, done) {
                update(row).then(() => {
                    loading();
                    this.onLoad(this.page);
                    this.$message({
                        type: "success",
                        message: "操作成功!"
                    });
                }, error => {
                    done();
                    console.log(error);
                });
            },
            rowDel(row) {
                this.$confirm("确定将选择数据删除?", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        debugger;
                        return remove(row.id);
                    })
                    .then(() => {
                        this.onLoad(this.page);
                        this.$message({
                            type: "success",
                            message: "操作成功!"
                        });
                    });
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
            handleDelete() {
                if (this.selectionList.length === 0) {
                    this.$message.warning("请选择至少一条数据");
                    return;
                }
                this.$confirm("确定将选择数据删除?", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        return remove(this.ids);
                    })
                    .then(() => {
                        this.onLoad(this.page);
                        this.$message({
                            type: "success",
                            message: "操作成功!"
                        });
                        this.$refs.crud.toggleSelection();
                    });
            },
            beforeOpen(done, type) {
                if (["edit", "view"].includes(type)) {
                    getCamera(this.form.id).then(res => {
                        this.form = res.data;
                    });
                }
                done();
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
                    if (res.success === true) {
                        res.result.content.forEach(r => {
                            let roles = [];
                            r.roles.forEach(ro => {
                                roles.push(ro.roleAlias);
                            });
                            r.roleNames = roles.join("，");
                        });
                        this.page.total = res.result.totalElements;
                        this.data = res.result.content;
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