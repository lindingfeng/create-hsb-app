const config = {
  AMC_LOGIN_HOST: 'http://api-amc.huishoubao.com.cn/login',
  AMC_API_HOST: 'api-amc.huishoubao.com.cn',
  DEVOPS_MOVE_HOST: 'http://devops-move.huishoubao.com/',
  JK_HOST: 'http://jk.www.huishoubao.com/api/',
  USER: {
    USERNAME: 'lindingfeng@huishoubao.com.cn',
    PASSWORD: 'wsjj1994',
    SYSTEM_ID: '44'
  },
  APP_CONFIG_ADMIN: {
    USERNAME: '18084621629',
    PASSWORD: 'wsjj1994'
  },
  VERSION_3: '3.0.0',
  MSG_TYPE: 'request',
  REMARK: '',
  TIMESTAMPS: '',
  HSB_TEMPLATE_GIT: 'https://lindingfeng:wsjj003.@github.com/lindingfeng/hsb_web_template.git',
  DEVOPS_ADMIN: 'http://devops.huishoubao.com/admin/#',
  TEMPLATE_LIST: [
    { name: '移动端', value: 'h5' },
    { name: 'pc端', value: 'pc' }
  ],
  CREATE_DEVOPS_LIST: [
    { name: '需要', value: 1 },
    { name: '不需要', value: 0 }
  ],
  DEVOPS_ADMIN_LIST: [
    { name: '浏览器打开', value: 1 },
    { name: '告诉我链接就行~', value: 0 }
  ],
  BASE_DEVOPS_ORDER_INFO: {
    USER: {
      SYSTEM_ID: "44",
      USERNAME: "lindingfeng@huishoubao.com.cn",
      PASSWORD: "wsjj1994"
    },
    successDing: {
      url: "https://oapi.dingtalk.com/robot/send?access_token=5bcca4f0515f15d981b3818f10473aea9f2693bc933b8471122542ac1bc1352f"
    },
    ORDER: {
      app_name: "hsb_web_zyb",
      ftid: "21923671",
      TL_ID: "1244",
      TL: "羊年",
      TE: {
        "1875": "胡育新"
      },
      push_cdn_type: 2,
      test_flag: 1,
      gray_publish_flag: 0,
      rolling_flag: 0,
      cdn_upload_dir: "/hsb_web_zyb/"
    }
  }
}

module.exports = config