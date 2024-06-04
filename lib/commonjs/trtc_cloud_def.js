"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TXSystemVolumeType = exports.TXVoiceReverbType = exports.TXVoiceChangerType = exports.TRTCCloudDef = exports.TRTCParams = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// export class TRTCCloudDef {
//   static TRTCRoleAnchor: number = 20;
// }

/**
- 进房参数
-
- 作为 TRTC SDK 的进房参数，只有该参数填写正确，才能顺利进入 roomId 所指定的音视频房间
*/
class TRTCParams {
  /**
  - 【字段含义】应用标识 [必填]，腾讯视频云基于 sdkAppId 进行计费统计。
  -
  - 【推荐取值】在 实时音视频控制台 创建应用后可以在账号信息页面中得到该 ID
  */

  /**
  - 【字段含义】用户标识 [必填]，当前用户的 userId，相当于用户名。
  -
  - 推荐取值】限制长度为32字节，只允许包含大小写英文字母（a-zA-Z）、数字（0-9）及下划线和连词符。
  */

  /**
  - 【字段含义】用户签名 [必填]，当前 userId 对应的验证签名，相当于使用云服务的登录密码。
  -
  - 【推荐取值】具体计算方法请参见 [如何计算UserSig](https://cloud.tencent.com/document/product/647/17275)。
  */

  /**
  -【字段含义】房间号码 [必填] ，在同一个房间里的用户（userId）可以彼此看到对方并进行视频通话
  -
  - 【推荐取值】取值范围：1 - 4294967294。
  */

  /**
  - 字符串房间号码，在同一个房间内的用户（userId）可以看到彼此并进行视频通话。
  -
  - 推荐取值：限制长度为64字节。以下为支持的字符集范围（共 89 个字符）: -大小写英文字母（a-zA-Z）； -数字（0-9）； -空格、"!"、"#"、"$"、"%"、"&"、"("、")"、"+"、"-"、":"、";"、"<"、"="、"."、">"、"?"、"@"、"["、"]"、"^"、"_"、" {"、"}"、"|"、"~"、","。
  -
  - roomId 与 strRoomId 必填一个，若您选用 strRoomId，则 roomId 需要填写为0。若两者都填，将优先选用 roomId。 请注意，同一个 sdkAppId 互通时，请务必选用同一种房间号码类型，避免影响互通。
  */

  /**
  - 【字段含义】直播场景下的角色，SDK 用这个参数确定用户是主播还是观众[直播场景下必填，通话场景下不填写]。
  -
  - 【特别说明】仅适用于直播场景（TRTC_APP_SCENE_LIVE 和 TRTC_APP_SCENE_VOICE_CHATROOM），通话场景（AUDIOCALL 和 VIDEOCALL）下指定无效。
  -
  - 【推荐取值】默认值：主播（TRTCRoleAnchor）
  */

  /**
  - 【字段含义】绑定腾讯云直播 CDN 流 ID[非必填]，设置之后，您就可以在腾讯云直播 CDN 上通过标准直播方案（FLV或HLS）播放该用户的音视频流。
  -
  - 【推荐取值】限制长度为64字节，可以不填写，一种推荐的方案是使用 “sdkappid_roomid_userid_main” 作为 streamid，这样比较好辨认且不会在您的多个应用中发生冲突。
  -
  - 【特殊说明】要使用腾讯云直播 CDN，您需要先在控制台 中的功能配置页开启“启用旁路直播”开关。
  -
  - 【参考文档】[CDN 旁路直播](https://cloud.tencent.com/document/product/647/16826)。
  */

  /**
  - [字段含义】云端录制开关，用于指定是否要在云端将该用户的音视频流录制成指定格式的文件。
  -
  - 【推荐取值】限制长度为64字节，只允许包含大小写英文字母（a-zA-Z）、数字（0-9）及下划线和连词符。
  -
  - 【参考文档】[云端录制](https://cloud.tencent.com/document/product/647/16823)。
  */

  /**
  - 【字段含义】房间签名 [非必填]，当您希望某个房间只能让特定的 userId 进入时，需要使用 privateMapKey 进行权限保护。
  -
  - 【推荐取值】仅建议有高级别安全需求的客户使用，更多详情请参见 [进房权限保护](https://cloud.tencent.com/document/product/647/32240)。
  */

  /**
  - 业务数据 [非必填] 某些非常用的特殊需求才需要用到此字段。
  -
  - 【推荐取值】不建议使用
  */
  constructor(params) {
    _defineProperty(this, "sdkAppId", void 0);

    _defineProperty(this, "userId", void 0);

    _defineProperty(this, "userSig", void 0);

    _defineProperty(this, "roomId", void 0);

    _defineProperty(this, "strRoomId", void 0);

    _defineProperty(this, "role", void 0);

    _defineProperty(this, "streamId", void 0);

    _defineProperty(this, "userDefineRecordId", void 0);

    _defineProperty(this, "privateMapKey", void 0);

    _defineProperty(this, "businessInfo", void 0);

    this.sdkAppId = params.sdkAppId;
    this.userId = params.userId;
    this.userSig = params.userSig;
    this.roomId = params.roomId ? params.roomId : 0;
    this.strRoomId = params.strRoomId ? params.strRoomId : '';
    this.role = params.role ? params.role : TRTCCloudDef.TRTCRoleAnchor;
    this.streamId = params.streamId ? params.streamId : '';
    this.userDefineRecordId = params.userDefineRecordId ? params.userDefineRecordId : '';
    this.privateMapKey = params.privateMapKey ? params.privateMapKey : '';
    this.businessInfo = params.businessInfo ? params.businessInfo : '';
  }

}
/**
- 关键类型定义变量
*/


exports.TRTCParams = TRTCParams;

class TRTCCloudDef {}
/**
 - 切换房间参数
*/


exports.TRTCCloudDef = TRTCCloudDef;

_defineProperty(TRTCCloudDef, "TRTC_SDK_VERSION", '0.0.0.0');

_defineProperty(TRTCCloudDef, "TRTC_VIDEO_RESOLUTION_120_120", 1);

_defineProperty(TRTCCloudDef, "TRTC_VIDEO_RESOLUTION_160_160", 3);

_defineProperty(TRTCCloudDef, "TRTC_VIDEO_RESOLUTION_270_270", 5);

_defineProperty(TRTCCloudDef, "TRTC_VIDEO_RESOLUTION_480_480", 7);

_defineProperty(TRTCCloudDef, "TRTC_VIDEO_RESOLUTION_160_120", 50);

_defineProperty(TRTCCloudDef, "TRTC_VIDEO_RESOLUTION_240_180", 52);

_defineProperty(TRTCCloudDef, "TRTC_VIDEO_RESOLUTION_280_210", 54);

_defineProperty(TRTCCloudDef, "TRTC_VIDEO_RESOLUTION_320_240", 56);

_defineProperty(TRTCCloudDef, "TRTC_VIDEO_RESOLUTION_400_300", 58);

_defineProperty(TRTCCloudDef, "TRTC_VIDEO_RESOLUTION_480_360", 60);

_defineProperty(TRTCCloudDef, "TRTC_VIDEO_RESOLUTION_640_480", 62);

_defineProperty(TRTCCloudDef, "TRTC_VIDEO_RESOLUTION_960_720", 64);

_defineProperty(TRTCCloudDef, "TRTC_VIDEO_RESOLUTION_160_90", 100);

_defineProperty(TRTCCloudDef, "TRTC_VIDEO_RESOLUTION_256_144", 102);

_defineProperty(TRTCCloudDef, "TRTC_VIDEO_RESOLUTION_320_180", 104);

_defineProperty(TRTCCloudDef, "TRTC_VIDEO_RESOLUTION_480_270", 106);

_defineProperty(TRTCCloudDef, "TRTC_VIDEO_RESOLUTION_640_360", 108);

_defineProperty(TRTCCloudDef, "TRTC_VIDEO_RESOLUTION_960_540", 110);

_defineProperty(TRTCCloudDef, "TRTC_VIDEO_RESOLUTION_1280_720", 112);

_defineProperty(TRTCCloudDef, "TRTC_VIDEO_RESOLUTION_1920_1080", 114);

_defineProperty(TRTCCloudDef, "TRTC_VIDEO_RESOLUTION_MODE_LANDSCAPE", 0);

_defineProperty(TRTCCloudDef, "TRTC_VIDEO_RESOLUTION_MODE_PORTRAIT", 1);

_defineProperty(TRTCCloudDef, "TRTC_VIDEO_STREAM_TYPE_BIG", 0);

_defineProperty(TRTCCloudDef, "TRTC_VIDEO_STREAM_TYPE_SMALL", 1);

_defineProperty(TRTCCloudDef, "TRTC_VIDEO_STREAM_TYPE_SUB", 2);

_defineProperty(TRTCCloudDef, "TRTC_QUALITY_UNKNOWN", 0);

_defineProperty(TRTCCloudDef, "TRTC_QUALITY_Excellent", 1);

_defineProperty(TRTCCloudDef, "TRTC_QUALITY_Good", 2);

_defineProperty(TRTCCloudDef, "TRTC_QUALITY_Poor", 3);

_defineProperty(TRTCCloudDef, "TRTC_QUALITY_Bad", 4);

_defineProperty(TRTCCloudDef, "TRTC_QUALITY_Vbad", 5);

_defineProperty(TRTCCloudDef, "TRTC_QUALITY_Down", 6);

_defineProperty(TRTCCloudDef, "TRTC_VIDEO_RENDER_MODE_FILL", 0);

_defineProperty(TRTCCloudDef, "TRTC_VIDEO_RENDER_MODE_FIT", 1);

_defineProperty(TRTCCloudDef, "TRTC_VIDEO_ROTATION_0", 0);

_defineProperty(TRTCCloudDef, "TRTC_VIDEO_ROTATION_90", 1);

_defineProperty(TRTCCloudDef, "TRTC_VIDEO_ROTATION_180", 2);

_defineProperty(TRTCCloudDef, "TRTC_VIDEO_ROTATION_270", 3);

_defineProperty(TRTCCloudDef, "TRTC_BEAUTY_STYLE_SMOOTH", 0);

_defineProperty(TRTCCloudDef, "TRTC_BEAUTY_STYLE_NATURE", 1);

_defineProperty(TRTCCloudDef, "TRTC_BEAUTY_STYLE_PITU", 2);

_defineProperty(TRTCCloudDef, "TRTC_VIDEO_PIXEL_FORMAT_UNKNOWN", 0);

_defineProperty(TRTCCloudDef, "TRTC_VIDEO_PIXEL_FORMAT_I420", 1);

_defineProperty(TRTCCloudDef, "TRTC_VIDEO_PIXEL_FORMAT_Texture_2D", 2);

_defineProperty(TRTCCloudDef, "TRTC_VIDEO_PIXEL_FORMAT_TEXTURE_EXTERNAL_OES", 3);

_defineProperty(TRTCCloudDef, "TRTC_VIDEO_PIXEL_FORMAT_NV21", 4);

_defineProperty(TRTCCloudDef, "TRTC_VIDEO_MIRROR_TYPE_AUTO", 0);

_defineProperty(TRTCCloudDef, "TRTC_VIDEO_MIRROR_TYPE_ENABLE", 1);

_defineProperty(TRTCCloudDef, "TRTC_VIDEO_MIRROR_TYPE_DISABLE", 2);

_defineProperty(TRTCCloudDef, "TRTC_APP_SCENE_VIDEOCALL", 0);

_defineProperty(TRTCCloudDef, "TRTC_APP_SCENE_LIVE", 1);

_defineProperty(TRTCCloudDef, "TRTC_APP_SCENE_AUDIOCALL", 2);

_defineProperty(TRTCCloudDef, "TRTC_APP_SCENE_VOICE_CHATROOM", 3);

_defineProperty(TRTCCloudDef, "TRTCRoleAnchor", 20);

_defineProperty(TRTCCloudDef, "TRTCRoleAudience", 21);

_defineProperty(TRTCCloudDef, "VIDEO_QOS_CONTROL_CLIENT", 0);

_defineProperty(TRTCCloudDef, "VIDEO_QOS_CONTROL_SERVER", 1);

_defineProperty(TRTCCloudDef, "TRTC_VIDEO_QOS_PREFERENCE_SMOOTH", 1);

_defineProperty(TRTCCloudDef, "TRTC_VIDEO_QOS_PREFERENCE_CLEAR", 2);

_defineProperty(TRTCCloudDef, "TRTCAudioSampleRate16000", 16000);

_defineProperty(TRTCCloudDef, "TRTCAudioSampleRate32000", 32000);

_defineProperty(TRTCCloudDef, "TRTCAudioSampleRate44100", 44100);

_defineProperty(TRTCCloudDef, "TRTCAudioSampleRate48000", 48000);

_defineProperty(TRTCCloudDef, "TRTC_AUDIO_QUALITY_SPEECH", 1);

_defineProperty(TRTCCloudDef, "TRTC_AUDIO_QUALITY_DEFAULT", 2);

_defineProperty(TRTCCloudDef, "TRTC_AUDIO_QUALITY_MUSIC", 3);

_defineProperty(TRTCCloudDef, "TRTC_AUDIO_ROUTE_SPEAKER", 0);

_defineProperty(TRTCCloudDef, "TRTC_AUDIO_ROUTE_EARPIECE", 1);

_defineProperty(TRTCCloudDef, "TRTC_REVERB_TYPE_0", 0);

_defineProperty(TRTCCloudDef, "TRTC_REVERB_TYPE_1", 1);

_defineProperty(TRTCCloudDef, "TRTC_REVERB_TYPE_2", 2);

_defineProperty(TRTCCloudDef, "TRTC_REVERB_TYPE_3", 3);

_defineProperty(TRTCCloudDef, "TRTC_REVERB_TYPE_4", 4);

_defineProperty(TRTCCloudDef, "TRTC_REVERB_TYPE_5", 5);

_defineProperty(TRTCCloudDef, "TRTC_REVERB_TYPE_6", 6);

_defineProperty(TRTCCloudDef, "TRTC_REVERB_TYPE_7", 7);

_defineProperty(TRTCCloudDef, "TRTC_VOICE_CHANGER_TYPE_0", 0);

_defineProperty(TRTCCloudDef, "TRTC_VOICE_CHANGER_TYPE_1", 1);

_defineProperty(TRTCCloudDef, "TRTC_VOICE_CHANGER_TYPE_2", 2);

_defineProperty(TRTCCloudDef, "TRTC_VOICE_CHANGER_TYPE_3", 3);

_defineProperty(TRTCCloudDef, "TRTC_VOICE_CHANGER_TYPE_4", 4);

_defineProperty(TRTCCloudDef, "TRTC_VOICE_CHANGER_TYPE_5", 5);

_defineProperty(TRTCCloudDef, "TRTC_VOICE_CHANGER_TYPE_6", 6);

_defineProperty(TRTCCloudDef, "TRTC_VOICE_CHANGER_TYPE_7", 7);

_defineProperty(TRTCCloudDef, "TRTC_VOICE_CHANGER_TYPE_8", 8);

_defineProperty(TRTCCloudDef, "TRTC_VOICE_CHANGER_TYPE_9", 9);

_defineProperty(TRTCCloudDef, "TRTC_VOICE_CHANGER_TYPE_10", 10);

_defineProperty(TRTCCloudDef, "TRTC_VOICE_CHANGER_TYPE_11", 11);

_defineProperty(TRTCCloudDef, "TRTC_AUDIO_FRAME_FORMAT_PCM", 1);

_defineProperty(TRTCCloudDef, "TRTCSystemVolumeTypeAuto", 0);

_defineProperty(TRTCCloudDef, "TRTCSystemVolumeTypeMedia", 1);

_defineProperty(TRTCCloudDef, "TRTCSystemVolumeTypeVOIP", 2);

_defineProperty(TRTCCloudDef, "TRTC_DEBUG_VIEW_LEVEL_GONE", 0);

_defineProperty(TRTCCloudDef, "TRTC_DEBUG_VIEW_LEVEL_STATUS", 1);

_defineProperty(TRTCCloudDef, "TRTC_DEBUG_VIEW_LEVEL_ALL", 2);

_defineProperty(TRTCCloudDef, "TRTC_LOG_LEVEL_VERBOSE", 0);

_defineProperty(TRTCCloudDef, "TRTC_LOG_LEVEL_DEBUG", 1);

_defineProperty(TRTCCloudDef, "TRTC_LOG_LEVEL_INFO", 2);

_defineProperty(TRTCCloudDef, "TRTC_LOG_LEVEL_WARN", 3);

_defineProperty(TRTCCloudDef, "TRTC_LOG_LEVEL_ERROR", 4);

_defineProperty(TRTCCloudDef, "TRTC_LOG_LEVEL_FATAL", 5);

_defineProperty(TRTCCloudDef, "TRTC_LOG_LEVEL_NULL", 6);

_defineProperty(TRTCCloudDef, "TRTC_GSENSOR_MODE_DISABLE", 0);

_defineProperty(TRTCCloudDef, "TRTC_GSENSOR_MODE_UIAUTOLAYOUT", 1);

_defineProperty(TRTCCloudDef, "TRTC_GSENSOR_MODE_UIFIXLAYOUT", 2);

_defineProperty(TRTCCloudDef, "TRTC_TranscodingConfigMode_Unknown", 0);

_defineProperty(TRTCCloudDef, "TRTC_TranscodingConfigMode_Manual", 1);

_defineProperty(TRTCCloudDef, "TRTC_TranscodingConfigMode_Template_PureAudio", 2);

_defineProperty(TRTCCloudDef, "TRTC_TranscodingConfigMode_Template_PresetLayout", 3);

_defineProperty(TRTCCloudDef, "TRTC_TranscodingConfigMode_Template_ScreenSharing", 4);

_defineProperty(TRTCCloudDef, "TRTC_VideoView_TextureView", 1);

_defineProperty(TRTCCloudDef, "TRTC_VideoView_SurfaceView", 2);

/**
- 变声类型定义（萝莉、大叔、重金属、外国人...）
*/
let TXVoiceChangerType;
/**
- 变声类型定义（KTV、小房间、大会堂、低沉、洪亮...）
*/

exports.TXVoiceChangerType = TXVoiceChangerType;

(function (TXVoiceChangerType) {
  TXVoiceChangerType[TXVoiceChangerType["TXLiveVoiceChangerType_0"] = 0] = "TXLiveVoiceChangerType_0";
  TXVoiceChangerType[TXVoiceChangerType["TXLiveVoiceChangerType_1"] = 1] = "TXLiveVoiceChangerType_1";
  TXVoiceChangerType[TXVoiceChangerType["TXLiveVoiceChangerType_2"] = 2] = "TXLiveVoiceChangerType_2";
  TXVoiceChangerType[TXVoiceChangerType["TXLiveVoiceChangerType_3"] = 3] = "TXLiveVoiceChangerType_3";
  TXVoiceChangerType[TXVoiceChangerType["TXLiveVoiceChangerType_4"] = 4] = "TXLiveVoiceChangerType_4";
  TXVoiceChangerType[TXVoiceChangerType["TXLiveVoiceChangerType_5"] = 5] = "TXLiveVoiceChangerType_5";
  TXVoiceChangerType[TXVoiceChangerType["TXLiveVoiceChangerType_6"] = 6] = "TXLiveVoiceChangerType_6";
  TXVoiceChangerType[TXVoiceChangerType["TXLiveVoiceChangerType_7"] = 7] = "TXLiveVoiceChangerType_7";
  TXVoiceChangerType[TXVoiceChangerType["TXLiveVoiceChangerType_8"] = 8] = "TXLiveVoiceChangerType_8";
  TXVoiceChangerType[TXVoiceChangerType["TXLiveVoiceChangerType_9"] = 9] = "TXLiveVoiceChangerType_9";
  TXVoiceChangerType[TXVoiceChangerType["TXLiveVoiceChangerType_10"] = 10] = "TXLiveVoiceChangerType_10";
  TXVoiceChangerType[TXVoiceChangerType["TXLiveVoiceChangerType_11"] = 11] = "TXLiveVoiceChangerType_11";
})(TXVoiceChangerType || (exports.TXVoiceChangerType = TXVoiceChangerType = {}));

let TXVoiceReverbType;
exports.TXVoiceReverbType = TXVoiceReverbType;

(function (TXVoiceReverbType) {
  TXVoiceReverbType[TXVoiceReverbType["TXLiveVoiceReverbType_0"] = 0] = "TXLiveVoiceReverbType_0";
  TXVoiceReverbType[TXVoiceReverbType["TXLiveVoiceReverbType_1"] = 1] = "TXLiveVoiceReverbType_1";
  TXVoiceReverbType[TXVoiceReverbType["TXLiveVoiceReverbType_2"] = 2] = "TXLiveVoiceReverbType_2";
  TXVoiceReverbType[TXVoiceReverbType["TXLiveVoiceReverbType_3"] = 3] = "TXLiveVoiceReverbType_3";
  TXVoiceReverbType[TXVoiceReverbType["TXLiveVoiceReverbType_4"] = 4] = "TXLiveVoiceReverbType_4";
  TXVoiceReverbType[TXVoiceReverbType["TXLiveVoiceReverbType_5"] = 5] = "TXLiveVoiceReverbType_5";
  TXVoiceReverbType[TXVoiceReverbType["TXLiveVoiceReverbType_6"] = 6] = "TXLiveVoiceReverbType_6";
  TXVoiceReverbType[TXVoiceReverbType["TXLiveVoiceReverbType_7"] = 7] = "TXLiveVoiceReverbType_7";
})(TXVoiceReverbType || (exports.TXVoiceReverbType = TXVoiceReverbType = {}));

let TXSystemVolumeType;
/**
- 音乐和人声设置接口参数
*/

exports.TXSystemVolumeType = TXSystemVolumeType;

(function (TXSystemVolumeType) {
  TXSystemVolumeType[TXSystemVolumeType["TXSystemVolumeTypeAuto"] = 0] = "TXSystemVolumeTypeAuto";
  TXSystemVolumeType[TXSystemVolumeType["TXSystemVolumeTypeMedia"] = 1] = "TXSystemVolumeTypeMedia";
  TXSystemVolumeType[TXSystemVolumeType["TXSystemVolumeTypeVOIP"] = 2] = "TXSystemVolumeTypeVOIP";
})(TXSystemVolumeType || (exports.TXSystemVolumeType = TXSystemVolumeType = {}));
//# sourceMappingURL=trtc_cloud_def.js.map