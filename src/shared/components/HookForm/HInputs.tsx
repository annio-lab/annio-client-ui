// @flow
import { useState } from 'react';
import { CustomInput, FormGroup, Label, Col, Input, FormFeedback } from 'reactstrap';
import { useFormContext, Controller } from 'react-hook-form';
import classNames from 'classnames';
import type { InputProps, LabelProps, CustomInputProps } from 'reactstrap';
import type { ColumnProps } from 'reactstrap/lib/Col';
import type { FunctionComponent, PropsWithChildren } from 'react';
import { useTranslation, LOCALES_NAMESPACE } from '@server/i18n';
import { uuid } from '@shared/utils';

export const HRadio = (props: CustomInputProps) => {
    const [id] = useState(uuid());
    const { register } = useFormContext();
    const { t } = useTranslation(LOCALES_NAMESPACE.COMMON);

    const { name, label } = props;

    return (
        <div>
            <CustomInput {...props} id={id} innerRef={register} type="radio" label={label === true ? t(name!) : label} />
        </div>
    );
};

export const Switch = (props: CustomInputProps) => {
    const [id] = useState(uuid());
    const { register } = useFormContext();
    const { t } = useTranslation(LOCALES_NAMESPACE.COMMON);

    const { name, label } = props;

    return (
        <CustomInput {...props} id={id} innerRef={register} label={label === true ? t(name!) : t(label!.toString())} type="switch" />
    );
};

export type HFieldProps = PropsWithChildren<{
    rules?: {
        required:
        | string
        | boolean
        | {
            value: boolean,
            message: string,
        },
        min:
        | string
        | number
        | {
            value: string | number,
            message: string,
        },
        max:
        | string
        | number
        | {
            value: string | number,
            message: string,
        },
        maxLength:
        | string
        | number
        | {
            value: string | number,
            message: string,
        },
        minLength:
        | string
        | number
        | {
            value: string | number,
            message: string,
        },
        pattern:
        | RegExp
        | {
            value: RegExp,
            message: string,
        },
        validate: (value: string | number | object) => string,
    } & any,
    xs?: [ColumnProps] & any,
    sm?: [ColumnProps] & any,
    md?: [ColumnProps] & any,
    lg?: [ColumnProps] & any,
    xl?: [ColumnProps] & any,
    inputProps?: InputProps,
    name: string,
    row?: boolean,
    label?: boolean | string | any,
    helpText?: string,
    labelProps?: LabelProps,
    tag?: any,
    as?: any,
    render?: any,
    pandingInput?: any,
    className?: string,
}>;

export const HField: FunctionComponent<HFieldProps> = ({
    children,
    row,
    name,
    label,
    labelProps,
    tag: Tag,
    rules,
    as,
    render,
    inputProps,
    xs,
    sm,
    md,
    lg,
    xl,
    helpText,
    pandingInput,
    ...restProps
}) => {
    const [id] = useState(uuid());
    const { t } = useTranslation(LOCALES_NAMESPACE.COMMON);
    const { register, errors, control, formState } = useFormContext();
    const { isSubmitting } = formState;

    let input = null;
    if (as || render) {
        input = <Controller rules={rules} name={name} id={id} as={as} render={render} {...inputProps} control={control} onFocus={() => null}
            disabled={isSubmitting} />;
    } else {
        input = (
            <Tag
                innerRef={register(rules)}
                invalid={!!errors[name]}
                {...inputProps}
                required={!!rules?.required}
                name={name}
                id={id}
                disabled={isSubmitting}
            />
        );
    }

    const helpElem = helpText ? <small className="form-text text-muted">{helpText}</small> : null;

    let feedbackText = null;
    if (errors[name] && errors[name].message !== null) {
        const { [name]: error } = errors;

        const rule = rules[error.type];

        if (error.message) feedbackText = t(error.message);
        else if (rule) {
            const ruleValues = rule.value !== undefined ? rule : { value: rule };

            feedbackText = t(error.type, ruleValues);
        } else {
            feedbackText = t(error.type);
        }
    }

    const feedback = feedbackText && <FormFeedback className="d-block">{feedbackText}</FormFeedback>;

    if (!label)
        return (
            <>
                {input}
                {feedback}
                {helpElem}
            </>
        );

    if (row) {
        return (
            <FormGroup {...restProps} className={classNames('form-row', restProps.className)}>
                <Label
                    {...labelProps}
                    className={classNames(labelProps?.className || '', { required: rules.required })}
                    xs={xs[0]}
                    sm={sm[0]}
                    md={md[0]}
                    lg={lg[0]}
                    xl={xl[0]}
                    for={id}
                >
                    {t(label === true ? name : label)}
                </Label>

                <Col xs={xs[1]} sm={sm[1]} md={md[1]} lg={lg[1]} xl={xl[1]} className={pandingInput}>
                    {input}
                    {feedback}
                    {helpElem}
                </Col>

                {children}
            </FormGroup>
        );
    }

    return (
        <FormGroup>
            <Label {...labelProps} for={id} className={classNames(labelProps?.className || '', { required: rules.required })}>
                {t(label === true ? name : label)}
            </Label>
            {input}
            {feedback}
            {helpElem}
            {children}
        </FormGroup>
    );
};
HField.defaultProps = {
    rules: undefined,
    tag: Input,
    row: false,
    label: false,
    helpText: undefined,
    labelProps: undefined,
    inputProps: undefined,
    xs: [],
    sm: [],
    md: [],
    lg: [],
    xl: [],
};

export const HFeedback = ({ name, rules }: { name: string, rules?: any[] }) => {
    const { t } = useTranslation(LOCALES_NAMESPACE.COMMON);
    const { errors } = useFormContext();

    const error = errors[name];

    if (!error) return null;

    let feedbackText = null;
    const rule = !!rules && rules[error.type];

    if (error.message) feedbackText = t(error.message);
    else {
        const ruleValues = rule?.value !== undefined ? rule : { value: rule };

        feedbackText = t(error.type, ruleValues);
    }

    if (!feedbackText) return null;

    return <div className="d-block invalid-feedback">{t(feedbackText)}</div>;
};
HFeedback.defaultProps = {
    rules: {},
};
