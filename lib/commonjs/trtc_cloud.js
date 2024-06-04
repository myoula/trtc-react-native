"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "TRTCCloudListener", {
  enumerable: true,
  get: function () {
    return _trtc_cloud_listener.TRTCCloudListener;
  }
});
Object.defineProperty(exports, "TRTCParams", {
  enumerable: true,
  get: function () {
    return _trtc_cloud_def.TRTCParams;
  }
});
Object.defineProperty(exports, "TRTCVideoEncParam", {
  enumerable: true,
  get: function () {
    return _trtc_cloud_def.TRTCVideoEncParam;
  }
});
Object.defineProperty(exports, "TRTCSwitchRoomConfig", {
  enumerable: true,
  get: function () {
    return _trtc_cloud_def.TRTCSwitchRoomConfig;
  }
});
Object.defineProperty(exports, "AudioMusicParam", {
  enumerable: true,
  get: function () {
    return _trtc_cloud_def.AudioMusicParam;
  }
});
Object.defineProperty(exports, "TRTCAudioRecordingParams", {
  enumerable: true,
  get: function () {
    return _trtc_cloud_def.TRTCAudioRecordingParams;
  }
});
Object.defineProperty(exports, "TRTCPublishCDNParam", {
  enumerable: true,
  get: function () {
    return _trtc_cloud_def.TRTCPublishCDNParam;
  }
});
Object.defineProperty(exports, "TRTCCloudDef", {
  enumerable: true,
  get: function () {
    return _trtc_cloud_def.TRTCCloudDef;
  }
});
Object.defineProperty(exports, "TXVoiceChangerType", {
  enumerable: true,
  get: function () {
    return _trtc_cloud_def.TXVoiceChangerType;
  }
});
Object.defineProperty(exports, "TXVoiceReverbType", {
  enumerable: true,
  get: function () {
    return _trtc_cloud_def.TXVoiceReverbType;
  }
});
Object.defineProperty(exports, "TXSystemVolumeType", {
  enumerable: true,
  get: function () {
    return _trtc_cloud_def.TXSystemVolumeType;
  }
});
Object.defineProperty(exports, "TRTCNetworkQosParam", {
  enumerable: true,
  get: function () {
    return _trtc_cloud_def.TRTCNetworkQosParam;
  }
});
Object.defineProperty(exports, "TRTCTranscodingConfig", {
  enumerable: true,
  get: function () {
    return _trtc_cloud_def.TRTCTranscodingConfig;
  }
});
Object.defineProperty(exports, "TXVideoView", {
  enumerable: true,
  get: function () {
    return _tx_video_view.default;
  }
});
exports.default = void 0;

var _reactNative = require("react-native");

var _tx_audio_effect_manager = _interopRequireDefault(require("./tx_audio_effect_manager"));

var _tx_device_manager = _interopRequireDefault(require("./tx_device_manager"));

var _tx_beauty_manager = _interopRequireDefault(require("./tx_beauty_manager"));

var _trtc_cloud_listener = require("./trtc_cloud_listener");

var _trtc_cloud_def = require("./trtc_cloud_def");

var _tx_video_view = _interopRequireDefault(require("./tx_video_view"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const {
  TrtcReactNativeSdk
} = _reactNative.NativeModules;
const TRTCEventEmitter = new _reactNative.NativeEventEmitter(TrtcReactNativeSdk);

class TRTCCloud {
  constructor() {
    _defineProperty(this, "_listeners", void 0);

    this._listeners = new Map();
  }
  /**
  创建 TRTCCloud 单例。
  */


  static sharedInstance() {
    if (!this._trtcCloud) {
      this._trtcCloud = new TRTCCloud();
      TrtcReactNativeSdk.sharedInstance();
    }

    return this._trtcCloud;
  }
  /**
  销毁 TRTCCloud 单例。
  */


  static destroySharedInstance() {
    this._trtcCloud = undefined;
    TrtcReactNativeSdk.destroySharedInstance();
  }
  /**
   * 添加事件
   * @param event
   * @param listener
   * @returns {{remove: remove}}
   */


  registerListener(listener) {
    const callback = args => {
      let params;

      if (_reactNative.Platform.OS === 'android') {
        try {
          params = JSON.parse(args.params);
        } catch (e) {
          console.log(e);
        }
      } else {
        params = args.params;
      }

      listener(args.type, params);
    };

    TRTCEventEmitter.addListener('onListener', callback);

    this._listeners.set(listener, callback);

    return {
      remove: () => {
        this.unRegisterListener(listener);
      }
    };
  }
  /**
   * 移除事件
   * @param event
   * @param listener
   */


  unRegisterListener(listener) {
    const callback = this._listeners.get(listener);

    if (!callback) {
      return;
    }

    TRTCEventEmitter.removeListener('onListener', callback);
  }
  /**
   * 移除所有事件
   * @param event
   * @param listener
   */


  unRegisterAllListener() {
    this._listeners.clear();

    TRTCEventEmitter.removeAllListeners('onListener');
  }
  /**
  - 进入房间
  - 调用接口后，您会收到来自 TRTCCloudListener 中的 onEnterRoom(result) 回调：
  - 如果加入成功，result 会是一个正数（result > 0），表示加入房间所消耗的时间，单位是毫秒（ms）。
  - 如果加入失败，result 会是一个负数（result < 0），表示进房失败的错误码。
  @param param	进房参数，请参考 trtc_cloud_def.dart文件中的TRTCParams参数定义
  @param scene	应用场景，目前支持视频通话（VideoCall）、在线直播（Live）、语音通话（AudioCall）、语音聊天室（VoiceChatRoom）四种场景。
  - 注意：
  - 1.当 scene 选择为 TRTC_APP_SCENE_LIVE 或 TRTC_APP_SCENE_VOICE_CHATROOM 时，您必须通过 TRTCParams 中的 role 字段指定当前用户的角色。
  - 2.不管进房是否成功，enterRoom 都必须与 exitRoom 配对使用，在调用 exitRoom 前再次调用 enterRoom 函数会导致不可预期的错误问题。
  */


  enterRoom(params, scene) {
    if (_reactNative.Platform.OS === 'android') {
      return TrtcReactNativeSdk.enterRoom({
        sdkAppId: params.sdkAppId,
        userId: params.userId,
        userSig: params.userSig,
        roomId: params.roomId.toString(),
        strRoomId: params.strRoomId,
        role: params.role,
        streamId: params.streamId,
        userDefineRecordId: params.userDefineRecordId,
        privateMapKey: params.privateMapKey,
        businessInfo: params.businessInfo,
        scene: scene
      }, scene);
    }

    return TrtcReactNativeSdk.enterRoom(params, scene);
  }
  /**
  - 离开房间。
  - 调用 exitRoom() 接口会执行退出房间的相关逻辑，例如释放音视频设备资源和编解码器资源等。 待资源释放完毕，SDK 会通过 onExitRoom() 回调通知到您。
  - 如果您要再次调用 enterRoom() 或者切换到其他的音视频 SDK，请等待 onExitRoom() 回调到来之后再执行相关操作。 否则可能会遇到摄像头或麦克风被占用等各种异常问题，例如常见的 Android 媒体音量和通话音量切换问题等等。
  */


  exitRoom() {
    return TrtcReactNativeSdk.exitRoom();
  }
  /**
  - 获取音效管理类 TXAudioEffectManager。
  @return TXAudioEffectManager
  */


  getAudioEffectManager() {
    TrtcReactNativeSdk.getAudioEffectManager();
    return new _tx_audio_effect_manager.default();
  }
  /**
  - 获取美颜管理类 TXBeautyManager
  @return TXBeautyManager
  */


  getBeautyManager() {
    TrtcReactNativeSdk.getBeautyManager();
    return new _tx_beauty_manager.default();
  }
  /**
  - 获取设备管理模块。
  @return TXDeviceManager
  */


  getDeviceManager() {
    TrtcReactNativeSdk.getDeviceManager();
    return new _tx_device_manager.default();
  }
  /**
  - 获取 SDK 版本信息
  @return 版本号信息
  */


  getSDKVersion() {
    return TrtcReactNativeSdk.getSDKVersion();
  }
  /**
  - 请求跨房通话（主播 PK）
  - TRTC 中两个不同音视频房间中的主播，可以通过“跨房通话”功能拉通连麦通话功能。使用此功能时， 两个主播无需退出各自原来的直播间即可进行“连麦 PK”。
  - 例如：当房间“001”中的主播 A 通过 connectOtherRoom() 跟房间“002”中的主播 B 拉通跨房通话后， 房间“001”中的用户都会收到主播 B 的 onRemoteUserEnterRoom(B) 回调和 onUserVideoAvailable(B,true) 回调。 房间“002”中的用户都会收到主播 A 的 onRemoteUserEnterRoom(A) 回调和 onUserVideoAvailable(A,true) 回调。
  - 简言之，跨房通话的本质，就是把两个不同房间中的主播相互分享，让每个房间里的观众都能看到两个主播。
  - 跨房通话的参数考虑到后续扩展字段的兼容性问题，暂时采用了 JSON 格式的参数，要求至少包含两个字段：
  - roomId：房间“001”中的主播 A 要跟房间“002”中的主播 B 连麦，主播 A 调用 ConnectOtherRoom() 时 roomId 应指定为“002”。
  - userId：房间“001”中的主播 A 要跟房间“002”中的主播 B 连麦，主播 A 调用 ConnectOtherRoom() 时 userId 应指定为 B 的 userId。
  - 跨房通话的请求结果会通过 onConnectOtherRoom() 回调通知给您。
  - 调用示例：
  - var object = new Map();
  - object['roomId'] = 155;
  - object['userId'] = '57890';
  - trtcCloud.connectOtherRoom(jsonEncode(object));
  @param param	JSON 字符串连麦参数，roomId 代表目标房间号，userId 代表目标用户 ID。
  */


  connectOtherRoom(param) {
    return TrtcReactNativeSdk.connectOtherRoom({
      param: param
    });
  }
  /**
  - 退出跨房通话
  - 跨房通话的退出结果会通过onDisconnectOtherRoom 回调通知给您。
  */


  disconnectOtherRoom() {
    return TrtcReactNativeSdk.disconnectOtherRoom();
  }
  /**
  - 切换角色，仅适用于直播场景（TRTC_APP_SCENE_LIVE 和 TRTC_APP_SCENE_VOICE_CHATROOM）。
  - 在直播场景下，一个用户可能需要在“观众”和“主播”之间来回切换。 您可以在进房前通过 TRTCParams 中的 role 字段确定角色，也可以通过 switchRole 在进房后切换角色。
  @param role	目标角色，默认为主播：TRTCCloudDef.TRTCRoleAnchor 主播，可以上行视频和音频，一个房间里最多支持50个主播同时上行音视频。TRTCCloudDef.TRTCRoleAudience 观众，只能观看，不能上行视频和音频，一个房间里的观众人数没有上限。
  */


  switchRole(role) {
    return TrtcReactNativeSdk.switchRole({
      role: role
    });
  }
  /**
  - 设置音视频数据接收模式（需要在进房前设置才能生效）。
  - 为实现进房秒开的绝佳体验，SDK 默认进房后自动接收音视频。即在您进房成功的同时，您将立刻收到远端所有用户的音视频数据。 若您没有调用 startRemoteView，视频数据将自动超时取消。 若您主要用于语音聊天等没有自动接收视频数据需求的场景，您可以根据实际需求选择接收模式。
  @param autoRecvAudio	true：自动订阅音频；false：需手动调用 muteRemoteAudio(false) 订阅音频。默认值：true。
  @param autoRecvVideo true：自动订阅视频；false：需手动调用 startRemoteView 订阅视频。默认值：true。
  */


  setDefaultStreamRecvMode(autoRecvAudio, autoRecvVideo) {
    return TrtcReactNativeSdk.setDefaultStreamRecvMode({
      autoRecvAudio: autoRecvAudio,
      autoRecvVideo: autoRecvVideo
    });
  }
  /**
  - 切换房间
  - 调用接口后，会退出原来的房间，并且停止原来房间的音视频数据发送和所有远端用户的音视频播放，但不会停止本地视频的预览。 进入新房间成功后，会自动恢复原来的音视频数据发送状态。
  - 接口调用结果会通过onSwitchRoom(errCode, errMsg) 回调。
  @param config	房间参数，详情请参考 TRTCSwitchRoomConfig
  */


  switchRoom(config) {
    return TrtcReactNativeSdk.switchRoom({
      config: JSON.stringify(config)
    });
  }
  /**
  - 设置暂停推送本地视频时要推送的图片
  - 当暂停推送本地视频后，会继续推送该接口设置的图片
  - 暂时只支持传递网络图片
  - @param image 设置要推送的图片。 "" 表示不推送
  - @param fps	设置推送图片帧率，最小值为5，最大值为20，默认10
  */


  setVideoMuteImage(image, fps) {
    return TrtcReactNativeSdk.setVideoMuteImage({
      imageUrl: image,
      fps
    });
  }
  /**
  - 添加水印
  - 水印的位置是通过 rect 参数来指定的，rect 是一个四元组参数，其格式为 (x，y，width，height)
  - x：水印的坐标，取值范围为0 - 1的浮点数。
  - y：水印的坐标，取值范围为0 - 1的浮点数。
  - width：水印的宽度，取值范围为0 - 1的浮点数。
  - height：是不用设置的，SDK 内部会根据水印图片的宽高比自动计算一个合适的高度。
  - 参数设置举例： 如果当前视频的编码分辨率是 540 × 960，且 rect 参数被您设置为（0.1，0.1，0.2，0.0）， 那么水印的左上坐标点就是（540 × 0.1，960 × 0.1）即（54，96），水印的宽度是 540 × 0.2 = 108px，水印的高度会根据水印图片的宽高比由 SDK 自动算出。
  - @param image 水印图片，**必须使用透明底色的 png 格式**
  - @param streamType	指定给哪一路画面设置水印
  - @param rect 水印相对于编码分辨率的归一化坐标，x，y，width，height 取值范围0 - 1。
  - 注意：如果您要给主画面（一般为摄像头）和辅路画面（一般用作屏幕分享）同时设置水印，需要调用该接口两次，并设定不同的 streamType。
  */


  setWatermark(image, streamType, x, y, width) {
    return TrtcReactNativeSdk.setWatermark({
      imageUrl: image,
      streamType,
      x: x.toString(),
      y: y.toString(),
      width: width.toString()
    });
  }
  /**
  - 开始向腾讯云的直播 CDN 推流
  - 该接口会指定当前用户的音视频流在腾讯云 CDN 所对应的 StreamId，进而可以指定当前用户的 CDN 播放地址。
  - 例如：如果我们采用如下代码设置当前用户的主画面 StreamId 为 user_stream_001，那么该用户主画面对应的 CDN 播放地址为： “http://yourdomain/live/user_stream_001.flv”，其中 yourdomain 为您自己备案的播放域名， 您可以在[直播控制台](https://console.cloud.tencent.com/live) 配置您的播放域名，腾讯云不提供默认的播放域名。
  - 您也可以在设置 enterRoom 的参数 TRTCParams 时指定 streamId, 而且我们更推荐您采用这种方案。
  @param streamId	自定义流 ID。
  @param streamType	仅支持 TRTCCloudDef.TRTC_VIDEO_STREAM_TYPE_BIG 和 TRTCCloudDef.TRTC_VIDEO_STREAM_TYPE_SUB。
  - 注意：
  - 您需要先在实时音视频 [控制台](https://console.cloud.tencent.com/trtc) 中的功能配置页开启“启用旁路推流”才能生效。
  - *若您选择“指定流旁路”，则您可以通过该接口将对应音视频流推送到腾讯云 CDN 且指定为填写的流 ID。
  - *若您选择“全局自动旁路”，则您可以通过该接口调整默认的流 ID。
  */


  startPublishing(streamId, streamType) {
    return TrtcReactNativeSdk.startPublishing({
      streamId: streamId,
      streamType: streamType
    });
  }
  /**
  停止向腾讯云的直播 CDN 推流
  */


  stopPublishing() {
    return TrtcReactNativeSdk.stopPublishing();
  }
  /**
  - 开始向友商云的直播 CDN 转推
  - 该接口跟 startPublishing() 类似，但 startPublishCDNStream() 支持向非腾讯云的直播 CDN 转推。
  - @param	CDN 转推参数，请参考 TRTCPublishCDNParam
  - 注意：
  - 使用 startPublishing() 绑定腾讯云直播 CDN 不收取额外的费用，但使用 startPublishCDNStream() 绑定非腾讯云直播 CDN 需要收取转推费用。
  */


  startPublishCDNStream(param) {
    return TrtcReactNativeSdk.startPublishCDNStream({
      param: JSON.stringify(param)
    });
  }
  /**
  停止向非腾讯云地址转推
  */


  stopPublishCDNStream() {
    return TrtcReactNativeSdk.stopPublishCDNStream();
  }
  /**
  - 设置云端混流的排版布局和转码参数
  - 如果您在实时音视频 控制台 中的功能配置页开启了“启用旁路推流”功能， 房间里的每一路画面都会有一个默认的直播 CDN 地址。
  - 一个直播间中可能有不止一位主播，而且每个主播都有自己的画面和声音，但对于 CDN 观众来说，他们只需要一路直播流， 所以您需要将多路音视频流混成一路标准的直播流，这就需要混流转码。
  - 当您调用 setMixTranscodingConfig() 接口时，SDK 会向腾讯云的转码服务器发送一条指令，目的是将房间里的多路音视频流混合为一路, 您可以通过 mixUsers 参数来调整每一路画面的位置，以及是否只混合声音，也可以通过 videoWidth、videoHeight、videoBitrate 等参数控制混合音视频流的编码参数。
  - 参考文档：[云端混流转码](https://cloud.tencent.com/document/product/647/16827)。
  - @param	如果 config 不为空，则开启云端混流，如果 config 为空则停止云端混流。详情请参考 TRTCTranscodingConfig
  */


  setMixTranscodingConfig(config) {
    return TrtcReactNativeSdk.setMixTranscodingConfig({
      config: JSON.stringify(config)
    });
  }
  /**
  - 暂停/恢复推送本地的视频数据。
  - 当暂停推送本地视频后，房间里的其它成员将会收到 onUserVideoAvailable(userId, false) 回调通知 当恢复推送本地视频后，房间里的其它成员将会收到 onUserVideoAvailable(userId, true) 回调通知。
  */


  muteLocalVideo(mute) {
    return TrtcReactNativeSdk.muteLocalVideo({
      mute: mute
    });
  }
  /**
  - 暂停/恢复接收指定的远端视频流。
  - 该接口仅暂停/恢复接收指定的远端用户的视频流，但并不释放显示资源，视频画面会冻屏在 mute 前的最后一帧。
  - 您在 enterRoom 之前或之后调用此 API 均能生效，在您调用 exitRoom 之后会被重置为 False。
  @param userId	指定远端用户的 ID。
  @param mute	是否暂停接收。
  */


  muteRemoteVideoStream(userId, mute) {
    return TrtcReactNativeSdk.muteRemoteVideoStream({
      userId,
      mute
    });
  }
  /**
  - 设置远端画面的渲染模式。
  - 可设置的参数包括有：画面的旋转角度、填充模式以及左右镜像等。
  @param userId	指定远端用户的 ID。
  @param streamType	可以设置为主路画面（TRTCCloudDef.TRTC_VIDEO_STREAM_TYPE_BIG）或辅路画面（TRTCCloudDef.TRTC_VIDEO_STREAM_TYPE_SUB）
  @param param	画面渲染参数。
  */


  setRemoteRenderParams(userId, streamType, param) {
    return TrtcReactNativeSdk.setRemoteRenderParams({
      userId,
      streamType,
      param: JSON.stringify(param)
    });
  }
  /**
  - 设置视频编码器相关参数
  - 该设置决定了远端用户看到的画面质量（同时也是云端录制出的视频文件的画面质量）
  @param param	用于设置视频编码器的相关参数，详情请参考 TRTCVideoEncParam。
  */


  setVideoEncoderParam(param) {
    return TrtcReactNativeSdk.setVideoEncoderParam({
      param: JSON.stringify(param)
    });
  }
  /**
  - 设置网络流控相关参数
  - 该设置决定 SDK 在各种网络环境下的调控策略（例如弱网下选择“保清晰”或“保流畅”）
  @param 用于设置网络质量控制的相关参数，详情请参考 TRTCNetworkQosParam
  */


  setNetworkQosParam(param) {
    return TrtcReactNativeSdk.setNetworkQosParam({
      param: JSON.stringify(param)
    });
  }
  /**
  - 设置视频编码输出的画面方向，即设置远端用户观看到的和服务器录制的画面方向
  - 当用户的手机或者 Android Pad 做了一个180度旋转时，由于摄像头的采集方向没有变，所以另一边的用户看到的画面是上下颠倒的， 在这种情况下，您可以通过该接口将 SDK 输出到对方的画面旋转180度，这样可以可以确保对方看到的画面依然正常。
  - TRTCCloudDef.TRTC_VIDEO_ROTATION_0，不旋转（默认值）
  - TRTCCloudDef.TRTC_VIDEO_ROTATION_180，顺时针旋转180度
  @param rotation	目前支持0和180两个旋转角度，默认值：TRTCVideoRotation_0，即不旋转。
  */


  setVideoEncoderRotation(rotation) {
    return TrtcReactNativeSdk.setVideoEncoderRotation({
      rotation
    });
  }
  /**
  - 设置编码器输出的画面镜像模式
  - 该接口不改变本地摄像头的预览画面，但会改变另一端用户看到的（以及服务器录制下来的）画面效果。
  @param mirror	true：镜像；false：不镜像；默认值：false
  */


  setVideoEncoderMirror(mirror) {
    return TrtcReactNativeSdk.setVideoEncoderMirror({
      mirror
    });
  }
  /**
  - 设置重力感应的适应模式
  @param 参数 mode	重力感应模式：
  - TRTCCloudDef.TRTC_GSENSOR_MODE_DISABLE ：关闭重力感应
  - TRTCCloudDef.TRTC_GSENSOR_MODE_UIFIXLAYOUT ：开启重力感应，SDK 会自动调整远端用户和本地 View 的画面旋转方向。
  - TRTCCloudDef.TRTC_GSENSOR_MODE_UIAUTOLAYOUT：关闭重力感应，SDK 会自动调整远端用户看到的画面方向，但不会调整本地 View 的画面旋转方向。 如果您的 App 界面开启了重力感应适配选项，推荐选择该模式，否则 SDK 的方向调整逻辑会跟系统的发生冲突。
  */


  setGSensorMode(mode) {
    return TrtcReactNativeSdk.setGSensorMode({
      mode
    });
  }
  /**
  - 暂停/恢复接收所有远端视频流。
  - 该接口仅暂停/恢复接收所有远端用户的视频流，但并不释放显示资源，视频画面会冻屏在 mute 前的最后一帧。
  - 您在 enterRoom 之前或之后调用此 API 均能生效，在您调用 exitRoom 之后会被重置为 False。
  @param mute	是否暂停接收
  */


  muteAllRemoteVideoStreams(mute) {
    return TrtcReactNativeSdk.muteAllRemoteVideoStreams({
      mute
    });
  }
  /**
  - 开启本地音频的采集和上行,并设置音频质量。
  - 该函数会启动麦克风采集，并将音频数据传输给房间里的其他用户。 SDK 不会默认开启本地音频采集和上行，您需要调用该函数开启，否则房间里的其他用户将无法听到您的声音。
  - 主播端的音质越高，观众端的听感越好，但传输所依赖的带宽也就越高，在带宽有限的场景下也更容易出现卡顿。
  @param quality	声音音质
  - TRTCAudioQualitySpeech，流畅：采样率：16k；单声道；音频裸码率：16kbps；适合语音通话为主的场景，比如在线会议，语音通话。
  - TRTCAudioQualityDefault，默认：采样率：48k；单声道；音频裸码率：50kbps；SDK 默认的音频质量，如无特殊需求推荐选择之。
  - TRTCAudioQualityMusic，高音质：采样率：48k；双声道 + 全频带；音频裸码率：128kbps；适合需要高保真传输音乐的场景，比如在线K歌、音乐直播等。
  */


  startLocalAudio(quality) {
    return TrtcReactNativeSdk.startLocalAudio({
      quality: quality
    });
  }
  /**
  - 关闭本地音频的采集和上行。
  - 当关闭本地音频的采集和上行，房间里的其它成员会收到 onUserAudioAvailable(false) 回调通知。
  */


  stopLocalAudio() {
    return TrtcReactNativeSdk.stopLocalAudio();
  }
  /**
  - 关闭本地视频的采集和上行。
  */


  stopLocalPreview() {
    return TrtcReactNativeSdk.stopLocalPreview();
  }
  /**
  - 取消订阅远端视频
  @param streamType	仅支持 TRTCCloudDef.TRTC_VIDEO_STREAM_TYPE_BIG 和 TRTCCloudDef.TRTC_VIDEO_STREAM_TYPE_SUB。
  */


  stopRemoteView(userId, streamType) {
    return TrtcReactNativeSdk.stopRemoteView({
      userId: userId,
      streamType: streamType
    });
  }
  /**
  - 静音/取消静音本地的音频。
  - 当静音本地音频后，房间里的其它成员会收到 onUserAudioAvailable(userId, false) 回调通知。 当取消静音本地音频后，房间里的其它成员会收到 onUserAudioAvailable(userId, true) 回调通知。
  - 与 stopLocalAudio 不同之处在于，muteLocalAudio(true) 并不会停止发送音视频数据，而是继续发送码率极低的静音包。 由于 MP4 等视频文件格式，对于音频的连续性是要求很高的，使用 stopLocalAudio 会导致录制出的 MP4 不易播放。 因此在对录制质量要求很高的场景中，建议选择 muteLocalAudio，从而录制出兼容性更好的 MP4 文件。
  @param mute	true：静音；false：取消静音
  */


  muteLocalAudio(mute) {
    return TrtcReactNativeSdk.muteLocalAudio({
      mute: mute
    });
  }
  /**
  - 静音/取消静音指定的远端用户的声音。
  @param userId	对方的用户 ID
  @param mute	true：静音；false：取消静音
  - 注意：静音时会停止接收该用户的远端音频流并停止播放，取消静音时会自动拉取该用户的远端音频流并进行播放。
  */


  muteRemoteAudio(userId, mute) {
    return TrtcReactNativeSdk.muteRemoteAudio({
      userId: userId,
      mute: mute
    });
  }
  /**
  - 静音/取消静音所有用户的声音。
  @param mute	true：静音；false：取消静音
  - 注意：静音时会停止接收所有用户的远端音频流并停止播放，取消静音时会自动拉取所有用户的远端音频流并进行播放。
  */


  muteAllRemoteAudio(mute) {
    return TrtcReactNativeSdk.muteAllRemoteAudio({
      mute: mute
    });
  }
  /**
  - 设置某个远程用户的播放音量
  @param userId	远程用户 ID
  - volume	音量大小，取值0 - 100
  */


  setRemoteAudioVolume(userId, volume) {
    return TrtcReactNativeSdk.setRemoteAudioVolume({
      userId: userId,
      volume: volume
    });
  }
  /**
  - 设置 SDK 采集音量。
  @param volume	音量大小，取值0 - 100
  */


  setAudioCaptureVolume(volume) {
    return TrtcReactNativeSdk.setAudioCaptureVolume({
      volume: volume
    });
  }
  /**
  获取 SDK 采集音量。
  */


  getAudioCaptureVolume() {
    return TrtcReactNativeSdk.getAudioCaptureVolume();
  }
  /**
  - 设置 SDK 播放音量。
  - 该函数会控制最终交给系统播放的声音音量，会影响录制本地音频文件的音量大小，但不会影响耳返的音量。
  @param volume	音量大小，取值0 - 100
  */


  setAudioPlayoutVolume(volume) {
    return TrtcReactNativeSdk.setAudioPlayoutVolume({
      volume: volume
    });
  }
  /**
  获取 SDK 播放音量
  */


  getAudioPlayoutVolume() {
    return TrtcReactNativeSdk.getAudioPlayoutVolume();
  }
  /**
  - 启用音量大小提示。
  - 开启后会在 onUserVoiceVolume 中获取到 SDK 对音量大小值的评估。如需打开此功能，请在 startLocalAudio() 之前调用。
  @param intervalMs	决定了 onUserVoiceVolume 回调的触发间隔，单位为ms，最小间隔为100ms，如果小于等于0则会关闭回调，建议设置为300ms；详细的回调规则请参考 onUserVoiceVolume 的注释说明
  */


  enableAudioVolumeEvaluation(intervalMs) {
    return TrtcReactNativeSdk.enableAudioVolumeEvaluation({
      intervalMs: intervalMs
    });
  }
  /**
  - 开始录音。
  - 该方法调用后， SDK 会将通话过程中的所有音频（包括本地音频，远端音频，BGM 等）录制到一个文件里。 无论是否进房，调用该接口都生效。 如果调用 exitRoom 时还在录音，录音会自动停止。
  @param TRTCAudioRecordingParams	录音参数
  @return 0：成功；-1：录音已开始；-2：文件或目录创建失败；-3：后缀指定的音频格式不支持; -1001:参数错误
  */


  startAudioRecording(param) {
    return TrtcReactNativeSdk.startAudioRecording({
      param: param
    });
  }
  /**
  - 停止录音。
  - 如果调用 exitRoom 时还在录音，录音会自动停止。
  */


  stopAudioRecording() {
    return TrtcReactNativeSdk.stopAudioRecording();
  }
  /**
  - 启用 3D 音效。
  - 启用 3D 音效。注意需使用流畅音质 TRTCAudioQualitySpeech 或默认音质 TRTCAudioQualityDefault。
  @param enabled	是否启用 3D 音效，默认为关闭状态。
  */


  enable3DSpatialAudioEffect(enabled) {
    return TrtcReactNativeSdk.enable3DSpatialAudioEffect({
      enabled: enabled
    });
  }
  /**
  - 设置 3D 音效中自身坐标及朝向信息。
  - 更新自身在世界坐标系中的位置和朝向， SDK 会根据该方法参数计算自身和远端用户之间的相对位置，进而渲染出空间音效。注意各参数应分别传入长度为 3 的数组。
  @param position	自身在世界坐标系中的坐标，三个值依次表示前、右、上坐标值。
  @param axisForward	自身坐标系前轴在世界坐标系中的单位向量，三个值依次表示前、右、上坐标值。
  @param axisRight	自身坐标系右轴在世界坐标系中的单位向量，三个值依次表示前、右、上坐标值。
  @param axisUp	自身坐标系上轴在世界坐标系中的单位向量，三个值依次表示前、右、上坐标值。
  */


  updateSelf3DSpatialPosition(position, axisForward, axisRight, axisUp) {
    return TrtcReactNativeSdk.updateSelf3DSpatialPosition({
      position: position.map(p => p.toString()),
      axisForward: axisForward.map(a => a.toString()),
      axisRight: axisRight.map(a => a.toString()),
      axisUp: axisUp.map(a => a.toString())
    });
  }
  /**
  - 设置 3D 音效中远端用户坐标信息。
  - 更新远端用户在世界坐标系中的位置，SDK 会根据自身和远端用户之间的相对位置，进而渲染出空间音效。注意参数为长度等于 3 的数组。
  @param userId	指定远端用户的 ID。
  @param position	该远端用户在世界坐标系中的坐标，三个值依次表示前、右、上坐标值。
  */


  updateRemote3DSpatialPosition(userId, position) {
    return TrtcReactNativeSdk.updateRemote3DSpatialPosition({
      userId: userId,
      position: position.map(p => p.toString())
    });
  }
  /**
  - 设置指定用户所发出声音的可被接收范围。
  - 设置该范围大小之后，该指定用户的声音将在该范围内可被听见，超出该范围将被衰减为 0。
  @param userId	指定远端用户的 ID。
  @param range	声音最大可被接收范围。
  */


  set3DSpatialReceivingRange(userId, range) {
    return TrtcReactNativeSdk.set3DSpatialReceivingRange({
      userId: userId,
      range: range
    });
  }
  /**
  - 开始进行网络测速（视频通话期间请勿测试，以免影响通话质量）
  - 测速结果将会用于优化 SDK 接下来的服务器选择策略，因此推荐您在用户首次通话前先进行一次测速，这将有助于我们选择最佳的服务器。 同时，如果测试结果非常不理想，您可以通过醒目的 UI 提示用户选择更好的网络。 测试结果通过 TRTCCloudListener.onSpeedTest 回调出来。
  - 注意：测速本身会消耗一定的流量，所以也会产生少量额外的流量费用。
  @param sdkAppId	应用标识
  @param userId	用户标识
  @param userSig	用户签名
  */


  startSpeedTest(sdkAppId, userId, userSig) {
    return TrtcReactNativeSdk.startSpeedTest({
      sdkAppId: sdkAppId,
      userId: userId,
      userSig: userSig
    });
  }
  /**
  停止服务器测速。
  */


  stopSpeedTest() {
    return TrtcReactNativeSdk.stopSpeedTest();
  }
  /**
  - 设置 Log 输出级别
  @param level	请参见 TRTC_LOG_LEVEL，默认值：TRTCCloudDef.TRTC_LOG_LEVEL_NULL
  */


  setLogLevel(level) {
    return TrtcReactNativeSdk.setLogLevel({
      level: level
    });
  }
  /**
  - 启用或禁用控制台日志打印
  @param enabled	指定是否启用，默认为禁止状态
  */


  setConsoleEnabled(enabled) {
    return TrtcReactNativeSdk.setConsoleEnabled({
      enabled: enabled
    });
  }
  /**
  - 启用或禁用 Log 的本地压缩。
  - 开启压缩后，log　存储体积明显减小，但需要腾讯云提供的 Python 脚本解压后才能阅读。 禁用压缩后，log　采用明文存储，可以直接用记事本打开阅读，但占用空间较大。
  @param enabled	指定是否启用，默认为启用状态
  */


  setLogCompressEnabled(enabled) {
    return TrtcReactNativeSdk.setLogCompressEnabled({
      enabled: enabled
    });
  }
  /**
  - 修改日志保存路径
  - 日志文件默认保存在 /app私有目录/files/log/tencent/liteav/ 下，如需修改, 必须在所有方法前调用，并且保证目录存在及应用有目录的读写权限。
  @param path 存储日志路径
  */


  setLogDirPath(path) {
    return TrtcReactNativeSdk.setLogDirPath({
      path: path
    });
  }
  /**
  - 调用实验性 API 接口
  - 注意：该接口用于调用一些实验性功能
  @param jsonStr	接口及参数描述的 JSON 字符串
  */


  callExperimentalAPI(jsonStr) {
    return TrtcReactNativeSdk.callExperimentalAPI({
      jsonStr: jsonStr
    });
  }

}

exports.default = TRTCCloud;

_defineProperty(TRTCCloud, "_trtcCloud", void 0);
//# sourceMappingURL=trtc_cloud.js.map