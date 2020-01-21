<template>
  <div>
    <div class="wel__header">
      <div class="wel__info">
        <img :src="userInfo.avatar"
             alt=""
             class="wel__info-img">
        <div class="wel__info-content">
          <div class="wel__info-title">
            {{$t('wel.info')}}
          </div>
          <div class="wel__info-subtitle">
            {{$t('wel.dept')}}
          </div>
        </div>
      </div>
      <div class="wel__extra">
        <div class="wel__extra-item">
          <p class="wel__extra-title">
            {{ $t('wel.loginTotal')}}
          </p>
          <p class="wel__extra-subtitle">
            {{loginTotal}}
          </p>
        </div>
        <div class="wel__extra-item">
          <p class="wel__extra-title">
            {{ $t('wel.device')}}
          </p>
          <p class="wel__extra-subtitle">
            {{deviceOnlineTotal}} <span>/ {{deviceTotal}}</span>
          </p>
        </div>
        <div class="wel__extra-item">
          <p class="wel__extra-title">

            {{ $t('wel.interfaceUseTotal')}}
          </p>
          <p class="wel__extra-subtitle">
            {{interfaceUseTotal}}
          </p>
        </div>
      </div>
    </div>
    <basic-container>
    </basic-container>

  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import {getWelStatistics} from "@/api/wel.js"

  export default {
    name: "wel",
    data() {
      return {
        deviceTotal:0,
        deviceOnlineTotal:0,
        interfaceUseTotal:0,
        loginTotal:0
      };
    },
    computed: {
      ...mapGetters(["userInfo"])
    },
    created() {
    },
    mounted(){
      this.init();
    },
    methods: {
      init(){
        getWelStatistics().then(res => {
          if (res.success === true){
            const data = res.result;
            this.loginTotal = data.loginTotal;
            this.deviceTotal = data.deviceTotal;
            this.deviceOnlineTotal = data.deviceOnlineTotal;
            this.interfaceUseTotal = data.interfaceUseTotal;
          }
        })
      }
    }
  };
</script>

<style scoped="scoped" lang="scss">
  .wel {
    &__header {
      padding: 25px 40px;
      border-bottom: 1px solid #e8e8e8;
      background-color: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &__info {
      display: flex;
      align-items: center;

      &-img {
        border-radius: 72px;
        display: block;
        width: 72px;
        height: 72px;

        img {
          width: 100%;
          height: 100%;
          display: block;
        }
      }

      &-content {
        position: relative;
        margin-left: 24px;
        color: rgba(0, 0, 0, 0.45);
        line-height: 22px;
      }

      &-title {
        font-size: 20px;
        line-height: 28px;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.85);
        margin-bottom: 12px;
      }

      &-subtitle {
        position: relative;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.45);
        line-height: 22px;
      }
    }

    &__extra {
      &-item {
        position: relative;
        padding: 0 32px;
        display: inline-block;

        &:last-child {
          &::after {
            display: none;
          }
        }

        &:after {
          background-color: #e8e8e8;
          position: absolute;
          top: 30px;
          right: 0;
          width: 1px;
          height: 40px;
          content: "";
        }
      }

      &-title {
        color: rgba(0, 0, 0, 0.45);
        font-size: 14px;
        line-height: 22px;
        margin-bottom: 4px;
      }

      &-subtitle {
        color: rgba(0, 0, 0, 0.85);
        font-size: 30px;
        line-height: 38px;
        margin: 0;

        span {
          color: rgba(0, 0, 0, 0.45);
          font-size: 20px;
        }
      }
    }
  }
</style>
