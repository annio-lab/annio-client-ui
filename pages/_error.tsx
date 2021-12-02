import * as React from "react";
import { NextPage } from "next";
import styled from "styled-components";
import { IErrorPage } from "@shared/interfaces";
import { useTranslation, LOCALES_NAMESPACE } from "@server/i18n";
import { BodyFixedChild, BodyLayout } from "@shared/components";

const ErrorContainer = styled.div`
    margin-top: 200px;

    .nf-icon {
        font-size: 2rem;
        font-weight: bolder;
        color: var(--text-color-dark) !important;
    }

    .nf-description {
        color: var(--text-color-disabled) !important;
    }
`;

const Error: NextPage<IErrorPage.IProps, IErrorPage.IProps> = ({
    statusCode,
}) => {
    const { t } = useTranslation(LOCALES_NAMESPACE.COMMON);

    return (
        <BodyLayout className="d-flex flex-column flex-sm-row">
            <BodyFixedChild className="d-flex flex-column col-md-12 py-3 h-100">
                <ErrorContainer className="d-flex flex-column justify-content-center align-items-center">
                    <h1 className="nf-icon">{statusCode}</h1>
                    <p className="nf-description">{t('UNEXPECTED_ERROR')}</p>
                </ErrorContainer>
            </BodyFixedChild>
        </BodyLayout>
    );
};

Error.getInitialProps = ({ res, err }): object => {
    let statusCode;

    if (res) {
        ({ statusCode } = res);
    } else if (err) {
        ({ statusCode } = err);
    }

    return { statusCode };
};

export default Error;
