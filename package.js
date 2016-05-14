Package.describe({
  name: 'roadshr:wechat',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function (api) {
  api.versionsFrom('1.3.2.4');
  api.use('ecmascript');
  api.use('http');
  api.export('WechatMessage', 'server');
  api.export('WechatJSSDK', 'server');
  api.export('WechatOAuth', 'server');
  api.addFiles('wechat_message.js', 'server');
  api.addFiles('wechat_jssdk.js', 'server');
  api.addFiles('wechat_oauth.js', 'server');
});

Package.onTest(function (api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('http');
  api.use('roadshr:wechat-mp', 'server');
  api.mainModule('wechat-mp-tests.js', 'server');
});
