import { Component } from 'react';
import type { ViewProps } from 'react-native';
export interface TXRemoteViewProps {
    userId: string;
    viewType?: number;
    streamType: number;
    mirror?: boolean;
    renderParams?: {
        rotation?: number;
        fillMode?: number;
        mirrorType?: number;
    };
}
export interface TXLocalViewProps {
    viewType?: number;
    mirror?: boolean;
    renderParams?: {
        rotation?: number;
        fillMode?: number;
        mirrorType?: number;
    };
}
/**
 * 本地视频渲染器，不需要传用户id
 */
declare class LocalView extends Component<ViewProps & TXLocalViewProps, {}> {
    render(): JSX.Element;
}
/**
 * 远端视频渲染器，需要传用户id
 */
declare class RemoteView extends Component<ViewProps & TXRemoteViewProps, {}> {
    render(): JSX.Element;
}
declare const _default: {
    LocalView: typeof LocalView;
    RemoteView: typeof RemoteView;
};
export default _default;
