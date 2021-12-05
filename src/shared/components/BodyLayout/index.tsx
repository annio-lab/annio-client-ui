import * as React from "react";
import classNames from 'classnames';

import { IBodyLayout } from "./BodyLayout";
import styled from "styled-components";
import { Loader } from "..";

export const BodyFixedChild = styled.div`
    overflow-y: hidden;
    top: var(--header-height);
    position: sticky;

    @media (min-width: 576px) {
        height: calc(100vh - var(--header-height)) !important;
    }
`;


export const BodyLayout: React.FunctionComponent<IBodyLayout.IProps> = ({
    children,
    loading,
    className,
}): JSX.Element => {

    return (
        <div className={classNames('d-flex flex-column container px-3 py-5 flex-1 position-relative', className)}>
            {loading && <Loader />}
            {children}
        </div>
    );
};
BodyLayout.defaultProps = {
    loading: false,
    className: '',
}
