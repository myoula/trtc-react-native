//
//  TrtcEvents.swift
//  trtc-react-native

import Foundation
import TXLiteAVSDK_TRTC


class TrtcEvents: RCTEventEmitter, TRTCCloudDelegate {
	override func supportedEvents() -> [String]! {
		return ["onListener"]
	}
}
