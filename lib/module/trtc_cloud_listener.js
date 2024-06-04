/**
 * 监听器类型枚举
 */
export let TRTCCloudListener;

(function (TRTCCloudListener) {
  TRTCCloudListener["onError"] = "onError";
  TRTCCloudListener["onWarning"] = "onWarning";
  TRTCCloudListener["onEnterRoom"] = "onEnterRoom";
  TRTCCloudListener["onExitRoom"] = "onExitRoom";
  TRTCCloudListener["onSwitchRole"] = "onSwitchRole";
  TRTCCloudListener["onRemoteUserEnterRoom"] = "onRemoteUserEnterRoom";
  TRTCCloudListener["onRemoteUserLeaveRoom"] = "onRemoteUserLeaveRoom";
  TRTCCloudListener["onConnectOtherRoom"] = "onConnectOtherRoom";
  TRTCCloudListener["onDisConnectOtherRoom"] = "onDisConnectOtherRoom";
  TRTCCloudListener["onSwitchRoom"] = "onSwitchRoom";
  TRTCCloudListener["onUserVideoAvailable"] = "onUserVideoAvailable";
  TRTCCloudListener["onUserSubStreamAvailable"] = "onUserSubStreamAvailable";
  TRTCCloudListener["onUserAudioAvailable"] = "onUserAudioAvailable";
  TRTCCloudListener["onUserVideoSizeChanged"] = "onUserVideoSizeChanged";
  TRTCCloudListener["onFirstVideoFrame"] = "onFirstVideoFrame";
  TRTCCloudListener["onFirstAudioFrame"] = "onFirstAudioFrame";
  TRTCCloudListener["onSendFirstLocalVideoFrame"] = "onSendFirstLocalVideoFrame";
  TRTCCloudListener["onSendFirstLocalAudioFrame"] = "onSendFirstLocalAudioFrame";
  TRTCCloudListener["onNetworkQuality"] = "onNetworkQuality";
  TRTCCloudListener["onStatistics"] = "onStatistics";
  TRTCCloudListener["onConnectionLost"] = "onConnectionLost";
  TRTCCloudListener["onTryToReconnect"] = "onTryToReconnect";
  TRTCCloudListener["onConnectionRecovery"] = "onConnectionRecovery";
  TRTCCloudListener["onSpeedTest"] = "onSpeedTest";
  TRTCCloudListener["onCameraDidReady"] = "onCameraDidReady";
  TRTCCloudListener["onMicDidReady"] = "onMicDidReady";
  TRTCCloudListener["onUserVoiceVolume"] = "onUserVoiceVolume";
  TRTCCloudListener["onRecvCustomCmdMsg"] = "onRecvCustomCmdMsg";
  TRTCCloudListener["onMissCustomCmdMsg"] = "onMissCustomCmdMsg";
  TRTCCloudListener["onRecvSEIMsg"] = "onRecvSEIMsg";
  TRTCCloudListener["onStartPublishing"] = "onStartPublishing";
  TRTCCloudListener["onStopPublishing"] = "onStopPublishing";
  TRTCCloudListener["onStartPublishCDNStream"] = "onStartPublishCDNStream";
  TRTCCloudListener["onStopPublishCDNStream"] = "onStopPublishCDNStream";
  TRTCCloudListener["onSetMixTranscodingConfig"] = "onSetMixTranscodingConfig";
  TRTCCloudListener["onMusicObserverStart"] = "onMusicObserverStart";
  TRTCCloudListener["onMusicObserverPlayProgress"] = "onMusicObserverPlayProgress";
  TRTCCloudListener["onMusicObserverComplete"] = "onMusicObserverComplete";
  TRTCCloudListener["onSnapshotComplete"] = "onSnapshotComplete";
  TRTCCloudListener["onScreenCaptureStarted"] = "onScreenCaptureStarted";
  TRTCCloudListener["onScreenCapturePaused"] = "onScreenCapturePaused";
  TRTCCloudListener["onScreenCaptureResumed"] = "onScreenCaptureResumed";
  TRTCCloudListener["onScreenCaptureStoped"] = "onScreenCaptureStoped";
  TRTCCloudListener["onDeviceChange"] = "onDeviceChange";
  TRTCCloudListener["onTestMicVolume"] = "onTestMicVolume";
  TRTCCloudListener["onTestSpeakerVolume"] = "onTestSpeakerVolume";
})(TRTCCloudListener || (TRTCCloudListener = {}));
//# sourceMappingURL=trtc_cloud_listener.js.map