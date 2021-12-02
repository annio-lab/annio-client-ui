import * as React from "react";
import styled from "styled-components";
import styles from "./ProgressBar.module.scss";
import { IProgressBar } from "./ProgressBar";

const Bar = styled.div`
    display: flex;
    width: 100%;
    height: 5px;
    background-color: #fa541c;
`;

const ProgressBar: React.FunctionComponent<IProgressBar.IProps> = (props): JSX.Element => {
    return <Bar className={props.animation ? styles.progress : ''}></Bar>;
};

export { ProgressBar };
