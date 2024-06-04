"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RtcVideoView = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _trtc_cloud_def = require("../trtc_cloud_def");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/**
 * @ignore
 */
const TXSurfaceView = (0, _reactNative.requireNativeComponent)('TXVideoView');
/**
 * @ignore
 */

class RtcVideoView extends _react.Component {
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
        renderParams.fillMode = _trtc_cloud_def.TRTCCloudDef.TRTC_VIDEO_RENDER_MODE_FILL;
      }

      if (!renderParams.rotation) {
        renderParams.rotation = _trtc_cloud_def.TRTCCloudDef.TRTC_VIDEO_ROTATION_0;
      }

      if (!renderParams.mirrorType) {
        renderParams.mirrorType = _trtc_cloud_def.TRTCCloudDef.TRTC_VIDEO_MIRROR_TYPE_AUTO;
      }

      renderParams.streamType = streamType;
      renderParams.userId = userId;
    }

    if (_reactNative.Platform.OS === 'android' && viewType === _trtc_cloud_def.TRTCCloudDef.TRTC_VideoView_TextureView) {
      return /*#__PURE__*/_react.default.createElement(TXTextureView, _extends({
        data: {
          userId,
          streamType
        },
        renderParams: renderParams
      }, otherProps));
    } else {
      return /*#__PURE__*/_react.default.createElement(TXSurfaceView, _extends({
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


exports.RtcVideoView = RtcVideoView;
const TXTextureView = (0, _reactNative.requireNativeComponent)('TXVideoTextureView');
//# sourceMappingURL=tx_video_view_native.js.map