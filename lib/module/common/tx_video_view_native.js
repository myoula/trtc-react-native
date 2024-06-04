function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { Component } from 'react';
import { Platform, requireNativeComponent } from 'react-native';
import { TRTCCloudDef } from '../trtc_cloud_def';

/**
 * @ignore
 */
const TXSurfaceView = requireNativeComponent('TXVideoView');
/**
 * @ignore
 */

export class RtcVideoView extends Component {
  render() {
    const {
      viewType,
      userId,
      streamType,
      ...otherProps
    } = this.props; // @ts-ignore

    let renderParams = this.props.renderParams;

    if (renderParams) {
      if (!renderParams.fillMode) {
        renderParams.fillMode = TRTCCloudDef.TRTC_VIDEO_RENDER_MODE_FILL;
      }

      if (!renderParams.rotation) {
        renderParams.rotation = TRTCCloudDef.TRTC_VIDEO_ROTATION_0;
      }

      if (!renderParams.mirrorType) {
        renderParams.mirrorType = TRTCCloudDef.TRTC_VIDEO_MIRROR_TYPE_AUTO;
      }

      renderParams.streamType = streamType;
      renderParams.userId = userId;
    }

    if (Platform.OS === 'android' && viewType === TRTCCloudDef.TRTC_VideoView_TextureView) {
      return /*#__PURE__*/React.createElement(TXTextureView, _extends({
        data: {
          userId,
          streamType
        },
        renderParams: renderParams
      }, otherProps));
    } else {
      return /*#__PURE__*/React.createElement(TXSurfaceView, _extends({
        data: {
          userId,
          streamType
        },
        renderParams: renderParams
      }, otherProps));
    }
  }

}
/**
 * @ignore
 */

const TXTextureView = requireNativeComponent('TXVideoTextureView');
//# sourceMappingURL=tx_video_view_native.js.map