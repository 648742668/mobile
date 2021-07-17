<template>
  <div>
    <div id="head">
      <van-nav-bar
          title="个人信息"
          left-arrow
          @click-left="onClickLeft"
      />
    </div>
    <div id="main">
      <div
          class="pic"
          @click="show = true">
        <span class="title">头像</span>
        <van-image
            class="img"
            round
            width="15vw"
            height="15vw"
            :src="imgUrl">
        </van-image>
        <van-icon size="20px" class="arrow" style="margin-top: 18px" name="arrow"/>
      </div>
      <div
          class="raw"
          @click="changeUserName">
        <span class="title">用户名</span>
        <span style="float:right;">{{ this.form.username }}</span>
      </div>
      <div
          class="raw"
          @click="onNickName">
        <span class="title">昵称</span>
        <van-icon size="20px" class="arrow" style="float:right;margin-top: 18px" name="arrow"/>
        <span style="float:right;">{{ this.form.nickname }}</span>
      </div>
      <van-action-sheet
          v-model="show"
          :actions="actions"
          cancel-text="取消"
          close-on-click-action
          @cancel="onCancel"
          @select="onSelect"
      />
      <van-dialog
          style="text-align:center;"
          v-model="dialogShow"
          :title="titleShow"
          @confirm="upload"
          show-cancel-button>
        <van-uploader
            v-if="messageShow"
            style="margin-top: 20px;margin-bottom: 20px"
            :preview-size="150"
            v-model="filelist"
            :max-count="1"/>
        <van-field
            v-if="!messageShow"
            size="large"
            clearable
            v-model="nickName" label="昵称"
            placeholder="请输入昵称"/>
      </van-dialog>
    </div>
  </div>
</template>

<script>
import {Toast} from 'vant';
import {IMG_URL} from "@/config/config";

export default {
  name: "userEdit",
  data() {
    const module = '/consumer'
    return {
      url: {
        getone: module + '/getone',
        update: module + '/update',
      },
      nickName: '',
      titleShow: '',
      messageShow: true,
      form: {
        id: '',
        nickname: '',
        phone: '',
        username: '',
        file: null
      },
      imgUrl: '',
      show: false,
      dialogShow: false,
      actions: [{name: '上传照片'}],
      filelist: [
        {url: ''},
      ]
    }
  },
  created() {
    if (this.$store.getters.GET_TOKEN) {
      this.form.id = this.$route.query.id
      this.getone();
    } else {
      this.$router.push({
        path: '/login'
      })
    }
  },
  methods: {
    onClickLeft() {
      this.$router.back()
    },
    onCancel() {
      Toast('取消')
    },
    onNickName() {
      this.titleShow = '修改昵称'
      this.messageShow = false
      this.dialogShow = true
    },
    onSelect() {
      this.titleShow = '上传头像'
      this.messageShow = true
      this.dialogShow = true
    },
    getone() {
      this.get(this.url.getone, {id: this.form.id}, response => {
        this.$store.commit('SET_CONSUMER', response)
        this.nickName = response.nickname
        this.form = response
        this.imgUrl = IMG_URL + response.img
        this.filelist[0].url = IMG_URL + response.img
        this.filelist[0].name = response.img
      })
    },
    changeUserName() {
      Toast({
        message: '用户名禁止修改',
        position: 'bottom',
      });
    },
    upload() {
      if (this.messageShow) {
        if (this.filelist.length === 0) {
          this.filelist.push({
            url: ''
          })
          this.form.file = null;
        } else {
          this.form.file = this.filelist[0].file
        }
      } else {
        if (this.nickName.length !== 0) {
          if(this.form.nickname !== this.nickName){
            this.form.nickname = this.nickName
          }else {
            return
          }
        }else{
          Toast.fail('修改失败');
          this.nickName=this.form.nickname
          return
        }
      }
      this.post(this.url.update, this.form, response => {
        this.getone()
      })
    },

  }
}
</script>

<style scoped lang="less">

.title {
  margin-left: 5vw;
  font-size: 15px;
  display: inline-block;
  vertical-align: middle;
}

.arrow {
  display: inline-block;
  vertical-align: middle;
}

.raw {
  height: 15vw;
  width: 100vw;
  line-height: 15vw;
}

.pic {
  display: flex;
  height: 15vw;
  width: 100vw;
  line-height: 15vw;
  .img {
    margin-left: 65vw;
    text-align: right;
  }
}
</style>
