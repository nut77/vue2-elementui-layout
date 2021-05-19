<template>
  <div class="login-container">
    <div class="box">
      <div class="title">系统名</div>
      <div class="login">
        <el-form :model="loginData" label-width="0" :rules="loginDataRule" ref="loginForm">
          <el-form-item prop="username">
            <el-input
              maxlength=20
              placeholder="请输入用户名"
              v-model="loginData.username"
              @keyup.enter.native="submitForm"
              clearable
              @focus="focusInput('username')"
              class="user-name"
              :class="{'active': !!loginData.username}">
            </el-input>
          </el-form-item>
          <el-form-item prop="userPwd">
            <el-input
              maxlength=20
              type="password"
              placeholder="请输入密码"
              v-model="loginData.userPwd"
              @keyup.enter.native="submitForm"
              clearable
              @focus="focusInput('userPwd')"
              class="user-name password"
              :class="{'active': !!loginData.userPwd}"
              onpaste="return false">
            </el-input>
          </el-form-item>
          <el-form-item>
            <span class="fc-red">{{msg}}</span>
            <el-button @click="submitForm" plain :loading="loading" type="primary">
              {{`${loading?'登录中':'登录'}`}}
            </el-button>
          </el-form-item>
          <div class="tip">
            <p v-show="visibleViewport">当前分辨率过低会影响体验，推荐使用分辨率1366*768及以上版本终端。</p>
            <p v-if="visibleVersion">当前浏览器版本过低会影响体验，请升级到最新版本。</p>
            <p v-if="visibleRmd">推荐使用火狐或谷歌浏览器最新版，效果更佳。</p>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import SHA256 from 'js-sha256';
export default {
  name: 'Index',
  data() {
    return {
      loginData: {
        username: '',
        userPwd: ''
      },
      loginDataRule: {
        username: [{required: true, fieldType: ' * 请输入用户名'}],
        userPwd: [{required: true, message: ' * 请输入密码'}]
      },
      loading: false,
      msg: '',
      visibleViewport: false,
      visibleVersion: false,
      visibleRmd: false,
      focusType: ''
    };
  },
  methods: {
    submitForm() {
      this.$refs.loginForm.validate(async (valid) => {
        if (!valid) return;
        this.loading = true;
        const result = await this.$api.login.login({
          username: this.loginData.username,
          password: SHA256.hmac(this.loginData.username, this.loginData.userPwd)
        });
        this.loading = false;
        if (!!result && result.status === 200) {
          result.data.username = this.loginData.username;
          localStorage.setItem('token', `Bearer ${result.data.token}`);
          this.$store.dispatch('setUserInfo', {data: result.data || {}});
          this.$store.dispatch('setIsAdmin', {data: result.data.roleName === 'admin' || false});
          this.$store.dispatch('setIsRoot', {data: result.data.roleName === 'root' || false});
          this.$router.push('/home');
        } else {
          this.msg = result.message;
        }
      });
    },
    // 获取浏览器版本号
    getVersion(browser) {
      const arr = navigator.userAgent.split(' ');
      let chromeVersion = '';
      for (let i = 0; i < arr.length; i++) {
        if (new RegExp(browser, 'i').test(arr[i])) {
          chromeVersion = arr[i];
        }
      }
      if (chromeVersion) {
        return chromeVersion.split('/')[1];
      }
      return false;
    },
    // 检查是否低于规定版本 谷歌.2987.133  火狐.2
    isLessThan(browser, version) {
      const minChromeVersion = '57.0';
      const minFirefoxVersion = '59.0';
      const minVersionArr = browser === 'chrome' ? minChromeVersion.split('.') : minFirefoxVersion.split('.');
      const versionArr = version.split('.');
      for (let i = 0; i < versionArr.length; i++) {
        if (Number(versionArr[i]) < Number(minVersionArr[i])) {
          return true;
        }
      }
    },
    // 浏览器版本过低提示
    checkVersion() {
      const chromeVersion = this.getVersion('chrome');
      const firefoxVersion = this.getVersion('Firefox');
      if (chromeVersion) {
        this.visibleVersion = this.isLessThan('chrome', chromeVersion);
      } else if (firefoxVersion) {
        this.visibleVersion = this.isLessThan('Firefox', firefoxVersion);
      } else {
        this.visibleVersion = false;
        this.visibleRmd = true;
      }
    },
    // 分辨率提示
    checkViewPort() {
      const minWidth = 1300;
      const minHeight = 700;
      let pageWidth = window.innerWidth;
      let pageHeight = window.innerHeight;
      if (typeof pageWidth !== 'number') {
        if (document.compactMode === 'CSS1Compat') {
          pageWidth = document.documentElement.clientWidth;
          pageHeight = document.documentElement.clientHeight;
        } else {
          pageWidth = document.body.clientWidth;
          pageHeight = document.body.clientHeight;
        }
      }
      this.visibleViewport = (pageWidth < minWidth || pageHeight < minHeight);
    },
    focusInput(type) {
      this.msg = '';
      this.focusType = type;
    }
  },
  created() {
    this.checkViewPort();
    this.checkVersion();
    window.addEventListener('resize', this.checkViewPort);
  },
  destroyed() {
    window.removeEventListener('resize', this.checkViewPort);
  }
};
</script>

<style lang="less" scoped>
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  .box {
    width: 400px;
  }
  .tip {
    line-height: 20px;
  }
  .fc-red {
    line-height: 18px;
  }
  .el-button {
    width: 100%;
  }
</style>
