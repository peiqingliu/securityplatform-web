<template>
    <basic-container>
        <avue-crud :option="option"
                   :table-loading="loading"
                   :data="data"
                   :page="page"
                   ref="crud"
                   @row-del="rowDel"
                   v-model="form"
                   :permission="permissionList"
                   @row-update="rowUpdate"
                   @row-save="rowSave"
                   :before-open="beforeOpen"
                   @search-change="searchChange"
                   @search-reset="searchReset"
                   @selection-change="selectionChange"
                   @current-change="currentChange"
                   @size-change="sizeChange"
                   @on-load="onLoad">
            <template slot="menuLeft">
                <el-button type="danger"
                           size="small"
                           icon="el-icon-remove-outline"
                           plain
                           v-if="permission.message_delete"
                           @click="handleDelete">删 除
                </el-button>
                <el-button type="info"
                           size="small"
                           icon="el-icon-circle-check"
                           plain
                           v-if="permission.message_markRead"
                           @click="handleMarkRead">标记已读
                </el-button>
                <el-button type="info"
                           size="small"
                           icon="el-icon-success"
                           plain
                           v-if="permission.message_markReadAll"
                           @click="handleMarkReadAll">全部已读
                </el-button>
                <el-button type="danger"
                           size="small"
                           icon="el-icon-circle-close"
                           plain
                           v-if="permission.message_deleteAll"
                           @click="handleDeleteAll">全部删除
                </el-button>
            </template>
            <template slot-scope="{row}"
                      slot="content">
                <span class="state-unread ng-scope" v-if="row.status === 0">●</span>
                &nbsp;
                <span v-if="row.status === 0" style="font-size: 14px;color: black;">{{row.content}}</span>
                <span v-if="row.status === 1" style="font-size: 14px;color: #999;">&nbsp;&nbsp;&nbsp;{{row.content}}</span>
            </template>
            <template slot-scope="{row}"
                      slot="status">
                <span v-if="row.status === 0">
                    <el-tag type="warning">未读</el-tag>
                </span>
                <span v-if="row.status === 1">
                <el-tag type="info">已读</el-tag>
                </span>
            </template>
        </avue-crud>
    </basic-container>
</template>

<script>
    import {getList,markRead,remove} from "@/api/dept/message";
    import {mapGetters} from "vuex";
    export default {
        name: "message",
        data(){
            return{
                form: {},
                query: {},
                loading: true,
                page: {
                    pageSize: 10,
                    currentPage: 1,
                    total: 0
                },
                selectionList: [],
                option: {
                    height: 'auto',
                    calcHeight: 350,
                    dialogWidth: 300,
                    dialogHeight: 530,
                    tip: false,
                    border: true,
                    index: true,
                    viewBtn: true,
                    selection: true,
                    menu:false,
                    column: [
                        {
                            label: "消息内容",
                            prop: "content",
                           /* formslot: true,*/
                            span: 24,
                            slot: true,
                        },
                        {
                            label: "消息标题",
                            prop: "title",
                            span: 24,
                            row: true,
                            hide:true,
                            search: true,
                        },
                        {
                            width:180,
                            search: true,
                            label: "通知日期",
                            prop: "createTime",
                            type: "date",
                            format: "yyyy-MM-dd hh:mm:ss",
                            valueFormat: "yyyy-MM-dd hh:mm:ss",
                            rules: [{
                                required: true,
                                message: "请输入通知日期",
                                trigger: "blur"
                            }]
                        },
                        {
                            width:150,
                            label: "消息类型",
                            type: "select",
                            dicData: [
                                {
                                    label:'审批消息',
                                    value:"1"
                                },{
                                    label:'通知消息',
                                    value:"0"
                                }
                            ],
                            prop: "type",
                            search: false,
                            rules: [{
                                required: true,
                                message: "消息类型",
                                trigger: "blur"
                            }]
                        },
                        {
                            width:100,
                            label: "状态",
                            prop: "status",
                            span: 24,
                            row: true,
                            search: true,
                            slot:true
                        },

                    ]
                },
                data: []
            }
        },
        computed: {
            ...mapGetters(["permission"]),
            permissionList() {
                return {
                    addBtn: this.vaildData(this.permission.notice_add, false),
                    viewBtn: this.vaildData(this.permission.notice_view, false),
                    delBtn: this.vaildData(this.permission.notice_delete, false),
                    editBtn: this.vaildData(this.permission.notice_edit, false)
                };
            },
            ids() {
                let ids = [];
                this.selectionList.forEach(ele => {
                    ids.push(ele.id);
                });
                return ids.join(",");
            }
        },
        methods: {
            rowSave(row, loading, done) {
        /*        add(row).then(() => {
                    loading();
                    this.onLoad(this.page);
                    this.$message({
                        type: "success",
                        message: "操作成功!"
                    });
                }, error => {
                    done();
                    console.log(error);
                });*/
            },
            rowUpdate(row, index, loading, done) {
            /*    update(row).then(() => {
                    loading();
                    this.onLoad(this.page);
                    this.$message({
                        type: "success",
                        message: "操作成功!"
                    });
                }, error => {
                    done();
                    console.log(error);
                });*/
            },
            rowDel(row) {
     /*           this.$confirm("确定将选择数据删除?", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        return remove(row.id);
                    })
                    .then(() => {
                        this.onLoad(this.page);
                        this.$message({
                            type: "success",
                            message: "操作成功!"
                        });
                    });*/
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
            handleMarkRead(){
                if (this.selectionList.length === 0) {
                    this.$message.warning("请选择至少一条数据");
                    return;
                }
                markRead(this.ids).then(res => {
                    if (res.success === true){
                        this.onLoad(this.page);
                        this.$message({
                            type: "success",
                            message: "操作成功!"
                        });
                        this.$refs.crud.toggleSelection();
                    }
                })
            },
            handleMarkReadAll(){
                const result = this.data.filter(i => i.status === 0);
                if (result.length > 0){
                    const ids =  result.map(e => e.id).join(",");
                    markRead(ids).then(res => {
                        if (res.success === true){
                            this.onLoad(this.page);
                            this.$message({
                                type: "success",
                                message: "操作成功!"
                            });
                            this.$refs.crud.toggleSelection();
                        }
                    })
                }else {
                    return;
                }

            },
            handleDeleteAll() {
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
          /*      if (["edit", "view"].includes(type)) {
                    getNotice(this.form.id).then(res => {
                        this.form = res.data.data;
                    });
                }
                done();*/
            },
            currentChange(currentPage) {
                this.page.currentPage = currentPage;
            },
            sizeChange(pageSize) {
                this.page.pageSize = pageSize;
            },
            onLoad(page, params = {}) {
                const {releaseTimeRange} = params;
                let values = {
                    ...params,
                };
                if (releaseTimeRange) {
                    values = {
                        ...params,
                        releaseTime_gt: releaseTimeRange[0],
                        releaseTime_lt: releaseTimeRange[1],
                    };
                    values.releaseTimeRange = null;
                    this.query.releaseTimeRange = null;
                }
                this.loading = true;
                getList(page.currentPage, page.pageSize, Object.assign(values, this.query)).then(res => {
                    if (res.success === true) {
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
    .state-unread {
        font-size: 16px;
        color: #428bca;
    }
</style>