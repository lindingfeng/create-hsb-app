# hsb-devops-move: a command-line tools

`hsb-devops-move` is a simple tools to devops...

#### Running on-demand:

Using `npx` you can run the script without installing it first:

    npx hsb-devops-move git+http://gitlab.huishoubao.com/web_team/ziyou/hsb-devops-move.git init
     

## Usage:

     hsb-devops-move init


## hsb.devops.json配置文件:
```javascript
{
  "USER": {
    "SYSTEM_ID": "44",  // 发版系统ID
    "USERNAME": "lindingfeng@huishoubao.com.cn",  // AMC账号
    "PASSWORD": "xxxxxx"  // AMC密码
  },
  "ORDER": {
    "app_name": "ka.huishoubao.com.dist",  // 应用名称
    "ftid": "21923671",  // 所属FT
    "TL_ID": "1244",  // TL id
    "TL": "羊年",  // TL name
    "TE": {
      "1875": "胡育新"  // 测试人员信息
    },
    "push_cdn_type": 1,  // CDN类型 1：不上传CDN 2：静态资源上传 3：全量上传
    "test_flag": 1,  // 发布测试 0：不需要 1：需要
    "gray_publish_flag": 0,  // 灰度发布 0：不需要 1：需要
    "rolling_flag": 0,  // 滚动发布 0：不需要 1：需要
    "cdn_upload_dir": "",  // CDN目录，push_cdn_type等于2、3时需填写
  }
}
```

## 提交工单所需字段:
```javascript
{
  "_head": {
    "_version": "3.0.0",
    "_msgType": "request",
    "_remark": "",
    "_timestamps": ""
  },
  "_param": {
    "app_name": "hsb_web_hsbpc",
    "iteration_id": "1121923671001001531",
    "iteration_name": "【免设】【免测】自有sprint 28",
    "TL": "林定锋",
    "TL_ID": "1845",
    "publish_desc": "hsbpc test",
    "ftid": "21923671",
    "tag": "hsb_web_hsbpc_v0.0.6",
    "push_cdn_type": 2,
    "publish_env": 1,
    "cdn_upload_dir": "/hsb_web/",
    "test_server_uid_set": "server-5991995c2ff",
    "pre_server_uid_set": "server-61173d84747",
    "production_server_uid_set": "server-60551d79b2d#server-6055157dea7",
    "gray_publish_flag": 0,
    "rolling_flag": 0,
    "TE": {
      "1845": "林定锋"
    },
    "test_flag": 1,
    "publish_type": "",
    "token": "46f919689b690efa943868ca479d61e9",
    "uid": "1845"
  }
}
```