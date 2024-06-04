import { Component } from 'react';
import { ViewProps } from 'react-native';
export interface TXVideoViewProps {
    userId: string;
    viewType?: number;
    streamType: number;
    mirror?: boolean;
}
/**
 * @ignore
 */
export declare class RtcVideoView extends Component<ViewProps & TXVideoViewProps, {}> {
    render(): JSX.Element;
}
