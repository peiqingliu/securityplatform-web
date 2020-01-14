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
            <template slot="menuLeft">
                <el-button type="info"
                           size="small"
                           icon="el-icon-switch-button"
                           plain
                           v-if="permission.camera_autoRegister"
                           @click="cameraAutoRegister">开启服务
                </el-button>
            </template>
            <template slot="menuLeft">
                <el-button type="warning"
                           size="small"
                           icon="el-icon-circle-close"
                           plain
                           v-if="permission.camera_stopServer"
                           @click="cameraStopServer">关闭服务
                </el-button>
            </template>
            <template slot-scope="scope" slot="menu">
                <el-button icon="el-icon-video-camera" size="small" @click="handleView">连接</el-button>
            </template>
            <template slot-scope="scope" slot="menu">
                <el-button icon="el-icon-video-camera" size="small" @click="remoteCapture">截图</el-button>
            </template>
            <template slot="loginHandle" slot-scope="scope" >
                <el-tag v-if="scope.row.loginHandle === 0">未连接</el-tag>
                <el-tag  v-else >已连接</el-tag>
            </template>
        </avue-crud>
    </basic-container>
</template>

<script>
    import {
        getList,
        startAutoRegisterService,
        stopService,
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
                query: {},
                option:{
                    title:'',
                    align:'center',
                    menuAlign:'center',
                    menuWidth:300,
                    calcHeight: 350,
                    tip: false,
                    border: true,
                    index: true,
                    selection: true,
                    delBtn:false,
                    viewBtn: false,
                    dialogHeight: 350,
                    dialogType: 'dialog',
                    column:[
                        {
                            label: "设备ID",
                            prop: "devcieId",
                            search: true,
                            rules: [{
                                required: true,
                                message: "请输入设备Id",
                                trigger: "blur"
                            }]
                        },
                        {
                            label: "名称",
                            prop: "cameraName",
                            search: true,
                            rules: [{
                                required: true,
                                message: "请输入名称",
                                trigger: "blur"
                            }]
                        },
                        {
                            label: "IP",
                            prop: "ip",
                            width:150,
                            labelSpan:1
                        },
                        {
                            label: "型号",
                            prop: "cameraModel",
                        },
                        {
                            label: "登录名",
                            prop: "loginName",
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
                            editDisplay: true,
                            viewDisplay: false,
                            rules: [{
                                required: true,
                                message: "请输入密码",
                                trigger: "blur"
                            }]
                        },
                        {
                            label: '位置',
                            prop: 'position',
                            hide: true,
                            editDisplay: false,
                            viewDisplay: false,
                        },
                        {
                            label: "账号状态",
                            prop: "loginHandle",
                            slot:true,
                            addDisplay:false
                        },
                        {
                            label: "创建时间",
                            type: "date",
                            width:150,
                            prop: "createTime",
                            format: "yyyy-MM-dd hh:mm:ss",
                            valueFormat: "yyyy-MM-dd hh:mm:ss",
                            addDisplay:false,
                            editDisplay: false
                        },
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
                    addBtn: this.vaildData(this.permission.camera_add, false),
                    viewBtn: this.vaildData(this.permission.camera_view, false),
                    delBtn: this.vaildData(this.permission.camera_delete, false),
                    editBtn: this.vaildData(this.permission.camera_edit, false)
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
            handleView(){

            },
            remoteCapture(){

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
            cameraAutoRegister(){
                startAutoRegisterService().then(res => {
                    if (res.success === true){
                        this.$message({
                            type: "success",
                            message: "服务开启成功!"
                        });
                    }else {
                        this.$message.error('服务开启失败，请查看日志信息或者联系管理员!');
                    }
                })
            },
            cameraStopServer(){
                stopService().then(res => {
                    if (res.success === true){
                        this.$message({
                            type: "success",
                            message: "服务开启成功!"
                        });
                    }else {
                        this.$message.error('服务开启失败，请查看日志信息或者联系管理员!');
                    }
                })
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

</style>