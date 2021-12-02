import { HTMLAttributes } from 'react';
import { FormProvider, SubmitErrorHandler, UseFormMethods } from 'react-hook-form';

type Props = HTMLAttributes<HTMLFormElement> & {
    innerRef?: any,
    methods: UseFormMethods<any>,
    onSubmit: (values: any) => void,
    onError?: (err: object) => SubmitErrorHandler<any>,
};

export const HForm = ({ methods, onSubmit, onError, innerRef, ...props }: Props) => {
    return (
        <FormProvider {...methods}>
            <form
                noValidate
                onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    return methods.handleSubmit(onSubmit, onError)(e);
                }}
                {...props}
                ref={innerRef}
            />
        </FormProvider>
    );
};
