// @flow
import { Button, ButtonProps } from 'reactstrap';
import { useFormContext } from 'react-hook-form';
import { LOCALES_NAMESPACE, useTranslation } from '@server/i18n';
import { FunctionComponent } from 'react';

export const HButton: FunctionComponent<ButtonProps> = (props: ButtonProps): any => {
    const { saveTitle, disabled, children } = props;
    const { t } = useTranslation(LOCALES_NAMESPACE.COMMON);
    const { formState } = useFormContext();
    const { isDirty, isSubmitting } = formState;

    return (
        <Button id="btnHButton" color="success" {...props} disabled={!isDirty || isSubmitting || disabled}>
            {isSubmitting && `${t('PROCESSING')}...`}
            {!isSubmitting && (children || saveTitle)}
        </Button>
    );
};
HButton.defaultProps = {
    saveTitle: 'Save',
};
