// @flow
import { NextPage } from "next";
import { LOCALES_NAMESPACE, useTranslation } from "@server/i18n";
import { useState, useEffect, useMemo } from "react";
import { Badge, Button } from "reactstrap";
import BootstrapTable from 'react-bootstrap-table-next';
import { ORDER_STATUS } from "@annio/core/business/order/order.common";
import { IOrder } from "@annio/core/business/order/order.interface";
import { OrderServices } from "@app/services";
import { CreateOrderModal } from "@app/components";
import { BodyLayout } from "@shared/components";

const FeedPage: NextPage<any> = () => {
    const { t } = useTranslation();
    const [data, setData] = useState<IOrder[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchAllOrders = (): Promise<any> => {
        setLoading(true);
        return OrderServices.getAll().then((res: IOrder[]) => {
            setData(res ?? []);
        }).finally(() => setLoading(false));
    };

    const cancelOrder = (id: string): Promise<any> => {
        setLoading(true);
        return OrderServices.cancel(id).then((res: boolean) => {
            res && alert(`cancel order (${id}) successfully !`);
            fetchAllOrders();
        }).finally(() => setLoading(false));
    };

    const checkOrderStatus = (id: string): Promise<any> => {
        setLoading(true);
        return OrderServices.checkStatus(id).then((res: ORDER_STATUS) => {
            res && alert(`Status of id (${id}): ${res}`);
        }).finally(() => setLoading(false));
    };

    const orderColumns = useMemo(() => [
        {
            dataField: 'id',
            text: t('Id'),
            sort: true,
        },
        {
            dataField: 'productId',
            text: t('Product Id'),
            sort: true,
        },
        {
            dataField: 'quantity',
            text: t('Quantity'),
            sort: true,
        },
        {
            dataField: 'status',
            text: t('Status'),
            sort: true,
            formatter: (c: ORDER_STATUS): any => {
                switch (c) {
                    case ORDER_STATUS.CREATED:
                        return <Badge color="primary">{t('CREATED')}</Badge>;
                    case ORDER_STATUS.CONFIRMED:
                        return <Badge color="success">{t('CONFIRMED')}</Badge>;
                    case ORDER_STATUS.DELIVERED:
                        return <Badge color="warning">{t('DELIVERED')}</Badge>;
                    case ORDER_STATUS.CANCELLED:
                        return <Badge color="dark">{t('CANCELLED')}</Badge>;
                    default:
                        return "_";
                }
            }
        },
        {
            dataField: 'action',
            text: t('Action'),
            headerStyle: (): any => ({ width: "100px" }),
            formatter: (_c: any, row: IOrder): any => {
                return <div className="d-flex flex-column justify-content-around">
                    {row.status !== ORDER_STATUS.CANCELLED && <Button color="danger" outline className="mr-2" onClick={(): any => cancelOrder(row.id)}>{t('Cancel')}</Button>}
                    {<Button color="dark" outline onClick={(): any => checkOrderStatus(row.id)}>{t('Check Status')}</Button>}
                </div>;
            }
        },
    ], [t]);

    useEffect(() => {
        fetchAllOrders();
    }, []);

    return (
        <BodyLayout loading={loading}>
            <h2>{t('Orders')}</h2>
            <div className="d-flex justify-content-between action">
                <Button color="danger" onClick={fetchAllOrders}>{t('Refresh Latest Orders')}</Button>
                <CreateOrderModal onUpdateSuccess={(data) => {
                    if (data) {
                        setTimeout(() => {
                            fetchAllOrders();
                        }, 500);
                    }
                }} />
            </div>
            <div className="w-100 overflow-auto mt-3">
                <BootstrapTable bootstrap4
                    keyField="orders"
                    data={data}
                    columns={orderColumns}
                    noDataIndication={(): any => <>{t('Empty data')}</>}
                    classes="bg-white"
                    search
                />
            </div>
        </BodyLayout>
    );
};

FeedPage.getInitialProps = async (): Promise<any> => {
    return { namespacesRequired: [LOCALES_NAMESPACE.COMMON] };
}

export default FeedPage;
