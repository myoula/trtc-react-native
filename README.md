# 该SDK已经不再维护,请选择使用其它平台的SDK,如[Flutter](https://pub.dev/packages/tencent_trtc_cloud)

该 React Native SDK 是基于 腾讯云 iOS/Android 平台的 SDK 进行封装，目前已支持音视频通话。

### 文档指引

[快速跑通 Demo 文档](https://cloud.tencent.com/document/product/647/63790)，[快速集成 SDK](https://cloud.tencent.com/document/product/647/63791)

[API 详细文档-中文](https://comm.qq.com/trtc-react-native/api/index.html)，[API 详细文档-英文](https://comm.qq.com/trtc-react-native-en/api2/index.html)

### SDK 类文件说明

- trtc_cloud - 腾讯云视频通话功能的主要接口类
- tx_video_view - 视频渲染 view
- tx_beauty_manager - 美颜管理类
- tx_audio_effect_manager - 腾讯云音视频通话功能音乐和人声设置接口
- tx_device_manager - 设备管理类
- trtc_cloud_def - 腾讯云音视频通话功能的关键类型定义
- trtc_cloud_listener - 腾讯云音视频通话功能的事件回调监听接口

### 调用示例

1. 初始化

   ```javascript
   // 创建 TRTCCloud 单例
   const trtcCloud = TRTCCloud.sharedInstance();
   // 获取设备管理模块
   const txDeviceManager = trtcCloud.getDeviceManager();
   // 获取音效管理类
   const txAudioManager = trtcCloud.getAudioEffectManager();
   // 获取美颜管理类
   const txBeautyManager = trtcCloud.getBeautyManager();
   ```

2. 进退房

   ```javascript
   const params = new TRTCParams({
     sdkAppId: SDKAPPID, // 应用 ID
     userId, // 用户 ID
     userSig, // 用户签名
     roomId: 2366, // 房间 ID
   });
   // 进房
   trtcCloud.enterRoom(params, TRTCCloudDef.TRTC_APP_SCENE_VIDEOCALL);
   // 退房
   trtcCloud.exitRoom();
   ```

3. 事件监听

   ```javascript
   // 设置事件监听
   trtcCloud.registerListener(onRtcListener);

   function onRtcListener(type: TRTCCloudListener, params: any) {
     // 进房回调事件
     if (type === TRTCCloudListener.onEnterRoom) {
       if (params.result > 0) {
         // 进房成功
       }
     }
     // 远端用户进房
     if (type === TRTCCloudListener.onRemoteUserEnterRoom) {
       // params.userId 参数为远端用户 userId
     }
     // 远端用户是否打开麦克风
     if (type === TRTCCloudListener.onUserAudioAvailable) {
       // param.userId 表示远端用户 userId
       // param.visible true 表示打开麦克风
     }
   }
   // 移除事件监听
   trtcCloud.unRegisterListener(onRtcListener);
   ```

4. 显示本地视频

   ```xml
   <TXVideoView.LocalView />
   ```

5. 显示远端视频

   ```xml
   <TXVideoView.RemoteView
     userId={remoteUserId}
     streamType={TRTCCloudDef.TRTC_VIDEO_STREAM_TYPE_BIG}
   />
   ```

6. 显示远端屏幕分享

   ```xml
   <TXVideoView.RemoteView
     userId={remoteUserId}
     streamType={TRTCCloudDef.TRTC_VIDEO_STREAM_TYPE_SUB}
   />
   ```

### Android 接入环境说明

根据官网文档指引搭建 Android 开发环境。[文档指引](https://reactnative.dev/docs/environment-setup)

**注意：Android 仅支持真机调试**

#### 配置 App 权限

1. 在 `AndroidManifest.xml` 中配置 App 的权限，TRTC SDK 需要以下权限：

   ```xml
   <uses-permission android:name="android.permission.INTERNET" />
   <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
   <uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
   <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
   <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
   <uses-permission android:name="android.permission.RECORD_AUDIO" />
   <uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS" />
   <uses-permission android:name="android.permission.BLUETOOTH" />
   <uses-permission android:name="android.permission.CAMERA" />
   <uses-permission android:name="android.permission.READ_PHONE_STATE" />
   <uses-feature android:name="android.hardware.camera" />
   <uses-feature android:name="android.hardware.camera.autofocus" />
   ```

   > ! 请勿设置 `android:hardwareAccelerated="false"`，关闭硬件加速之后，会导致对方的视频流无法渲染。

2. 安卓音视频权限需要手动申请：

   ```javascript
   // 安卓音视频权限需要手动申请
   if (Platform.OS === 'android') {
     await PermissionsAndroid.requestMultiple([
       PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, // 音频需要
       PermissionsAndroid.PERMISSIONS.CAMERA, // 视频需要
     ]);
   }
   ```

#### Android 开发调试

1. 在 Demo 目录下启动 Metro

   ```sh
   npx react-native start
   ```

2. 在 Demo 目录下新开窗口，启动开发调试

   ```sh
   npx react-native run-android
   ```

### iOS 接入环境说明

根据官网文档指引搭建 iOS 开发环境。[文档指引](https://reactnative.dev/docs/environment-setup)

#### 配置 App 权限

1. 在 `Info.plist` 中配置 App 的权限，TRTC SDK 需要以下权限：

   ```plist
   <key>NSCameraUsageDescription</key>
   <string>授权摄像头权限才能正常视频通话</string>
   <key>NSMicrophoneUsageDescription</key>
   <string>授权麦克风权限才能正常语音通话</string>
   ```

#### iOS 开发调试

1. 在 Demo ios 目录里安装依赖

   ```sh
   pod install
   ```

2. 在 Demo 目录下启动 Metro

   ```sh
   npx react-native start
   ```

3. 在 Demo 目录下新开窗口，启动开发调试

   ```sh
   npx react-native run-ios
   ```
# trtc-react-native
