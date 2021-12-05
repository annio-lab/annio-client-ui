import * as React from "react";
import styled from "styled-components";
import { ILoader } from "./Loader";
import styles from "./Loader.module.scss";

const LoaderContainer = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    min-width: ${(props: any): any => `${props.size}px`};
    min-height: ${(props: any): any => `${props.size}px`};
    background: rgba(255, 255, 255, .8);
    cursor: progress;
    z-index: 999;

    div {
        overflow: hidden;
        width: ${(props: any): any => `${props.size}px`};
        div {
            border: ${(props: any): any => `4px solid ${props.color}`};
        }
    }
`;
export const Loader: React.FunctionComponent<ILoader.IProps> = (props): JSX.Element => {
    return <LoaderContainer {...props}>
        <div className={styles.loader}>
            <div></div><div></div>
        </div>
    </LoaderContainer>;
};

Loader.defaultProps = {
    color: '#000',
    size: 80,
}
