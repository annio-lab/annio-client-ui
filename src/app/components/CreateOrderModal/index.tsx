import React, { FunctionComponent, useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody, Button, ModalFooter } from 'reactstrap';
import { useForm } from "react-hook-form";
import { HField, HForm, Loader } from "@shared/components";
import { LOCALES_NAMESPACE, useTranslation } from "@server/i18n";
import { IProfileSectionModal } from "./CreateOrderModal";
import { OrderServices } from "@app/services";
import { toast } from 'react-toastify';

export const CreateOrderModal: FunctionComponent<IProfileSectionModal.IProps> = ({
    onUpdateSuccess,
}: IProfileSectionModal.IProps): JSX.Element => {
    const { t } = useTranslation(LOCALES_NAMESPACE.COMMON);
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState(false);
    const toggleModal = () => setModal(!modal);

    const methods = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onBlur',
        defaultValues: {
            productId: '',
            quantity: 1,
        },
    });

    const { reset } = methods;

    const submitForm = (values: any): void => {
        setLoading(true);
        const payload = {
            productId: values.productId,
            quantity: +values.quantity,
        };
        OrderServices.create(payload)
            .then((data) => onUpdateSuccess && onUpdateSuccess(data))
            .catch((err) => toast.error(err))
            .finally(() => setLoading(false));
    }

    // MIDDLEWARES
    useEffect(() => {
        if (!modal) {
            reset({
                productId: '',
                quantity: 1,
            });
        }
    }, [modal]);

    return (
        <>
            <Button color="primary" onClick={toggleModal}>{t('Create Order')}</Button>
            <Modal isOpen={modal} toggle={toggleModal} size="md">
                {loading && <Loader />}
                <HForm methods={methods} onSubmit={submitForm}>
                    <ModalHeader toggle={toggleModal}>{t('Create Order')}</ModalHeader>
                    <ModalBody>
                        <HField
                            label="Product ID"
                            name="productId"
                            rules={{ required: true }}
                            className="loading-item"
                        />
                        <HField
                            label="Quantity"
                            name="quantity"
                            rules={{ required: true }}
                            className="loading-item"
                            inputProps={{
                                type: 'number',
                                rows: 20,
                                min: 1,
                                step: 1,
                                defaultValue: 1,
                            }}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success" type="submit">
                            {t('Create')}
                        </Button>
                    </ModalFooter>
                </HForm>
            </Modal>
        </>
    );

};

CreateOrderModal.defaultProps = {
    className: '',
};
