/*
* source:https://github.com/node-weixin/node-weixin-message
*/
import wechatAuth from "./wechat_auth.js";
import wechatSettings from "./wechat_settings.js";

var setting = Meteor.settings.private.wechat_mp;
if (!setting) {
  console.log('error', 'Please Add amap setting.');
}

WechatMessage = {};

WechatMessage.send = function (to, templateId, link, data, cb) {
  var url = 'https://api.weixin.qq.com/cgi-bin/message/template/send';
  WechatMessage.sendRequest(setting, url, {
    touser: to,
    template_id: templateId,
    url: link,
    data: data
  }, cb);
}

WechatMessage.sendRequest = function (app, url, data, cb) {
  wechatAuth.determine(app, function () {
    wechatSettings.get(app.id, 'auth', function (authData) {
      var response = HTTP.post(url, {
        headers: {
          Accept: 'application/json'
        },
        params: {
          access_token: authData.accessToken,
        },
        data: data
      });

      response = JSON.parse(response.content);
      if (response.errcode) {
        throw new Error("Failed to complete sendding wechat message. " + JSON.stringify(response));
      } else {
        return response;
      }
    });
  });
}