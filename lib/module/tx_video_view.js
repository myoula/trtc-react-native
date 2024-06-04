function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { Component } from 'react';
import { RtcVideoView } from './common/tx_video_view_native';

/**
 * 本地视频渲染器，不需要传用户id
 */
class LocalView extends Component {
  render() {
    return /*#__PURE__*/React.createElement(RtcVideoView, _extends({}, this.props, {
      userId: "",
      streamType: 0
    }));
  }

}
/**
 * 远端视频渲染器，需要传用户id
 */


class RemoteView extends Component {
  render() {
    return /*#__PURE__*/React.createElement(RtcVideoView, this.props);
  }

}

export default {
  LocalView,
  RemoteView
};
//# sourceMappingURL=tx_video_view.js.map