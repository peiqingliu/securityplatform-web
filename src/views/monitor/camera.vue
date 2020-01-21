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
                           :disabled="disabled"
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
            <template slot="menuLeft">
                <el-button type="warning"
                           size="small"
                           icon="el-icon-circle-close"
                           plain
                           v-if="isShowLogoutBtn"
                           @click="cameraLogOut">设备登出
                </el-button>
            </template>
            <template slot-scope="scope" slot="menu">
                <el-popover
                        placement="bottom"
                        title="扫码截图"
                        width="100"
                        trigger="click"
                        >
                    <canvas class="canvas" :ref ="scope.row.id"></canvas>
                    <el-button slot="reference" icon="el-icon-full-screen" size="small" @click="useQrcode(scope.row)">二维码</el-button>
                </el-popover>
                <el-button icon="el-icon-video-camera" size="small" @click="remoteCapture(scope.row)">截图</el-button>
            </template>
            <template slot="loginHandle" slot-scope="scope" >
                <el-tag type="danger" v-if="scope.row.loginHandle === 0">未连接</el-tag>
                <el-tag    v-else >已连接</el-tag>
            </template>
        </avue-crud>
    </basic-container>
</template>

<script>
    import {
        getList,
        checkServiceOpened,
        startAutoRegisterService,
        stopService,
        remove,
        update,
        add,
        logout,
        getCamera,
        remoteCapture
    } from "@/api/monitor/camera";
    import {mapGetters} from "vuex";
    import QRCode from 'qrcode';
    export default {
        name: "camera",
        data(){
            return {
                form: {},
                disabled:false,
                loading:true,
                isShowLogoutBtn:false,
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
                            prop: "deviceIp",
                            width:150,
                            addDisplay:false,
                        },
                        {
                            label: "端口",
                            prop: "devicePort",
                            width:100,
                            addDisplay:false,
                        },
                        {
                            label: "登录名",
                            prop: "loginName",
                            rules: [{
                                required: true,
                                message: "请输入登录名",
                                trigger: "blur"
                            }]
                        },
                        {
                            label: '密码',
                            prop: 'password',
                            //hide: true,
                            editDisplay: true,
                            viewDisplay: false,
                            rules: [{
                                required: true,
                                message: "请输入密码",
                                trigger: "blur"
                            }]
                        },
                        {
                            label: "型号",
                            prop: "cameraModel",
                        },
                        {
                            label: '位置',
                            prop: 'position',
                            hide: true,
                            editDisplay: false,
                            viewDisplay: false,
                        },
                        {
                            label: "登录状态",
                            prop: "loginHandle",
                            slot:true,
                            addDisplay:false
                        },
                        {
                            label: "组别",
                            prop: "groupId",
                            rules: [{
                                required: true,
                                message: "请输入所属组",
                                trigger: "blur"
                            }]
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
            remoteCapture(row){
                if (row.loginHandle === 0){
                    this.$message.warning("设备未连接,请先保持设备连接");
                    return;
                }
                remoteCapture(row).then(res => {
                    if (res.success === true){
                        this.$message.success("截图成功");
                    }
                })
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
                        this.disabled = true;
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
                            message: "服务关闭成功!"
                        });
                        this.disabled = false;
                    }else {
                        this.$message.error('服务关闭失败，请查看日志信息或者联系管理员!');
                    }
                })
            },
            cameraLogOut(){
                if (this.selectionList.length === 0 ||  this.selectionList.length > 1) {
                    this.$message.warning("请选择一条数据");
                    return;
                }
                this.$confirm("确定将选择数据登出?", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        return logout(this.ids);
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
            checkService(){
                checkServiceOpened().then(res => {
                    if (res.success === true){
                        const data  = res.result;
                        if (data === "closed"){
                            this.disabled = false;
                        }else {
                            this.disabled = true
                        }
                    }
                })
            },
            useQrcode(row){
                debugger;
                let id = row.id;
                let canvas = this.$refs[id];
                let _data = `http://121.201.2.178:8088/us/api/qrCodeRemoteCapture?id=${id}`;
                QRCode.toCanvas(canvas, _data, function (error) {
                    if (error) console.error(error);
                    console.log('success!');
                })
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
        },
        mounted() {
            this.checkService();
        }
    }
</script>

<style scoped>
    .canvas{width:100px!important;height:100px!important;}
</style>