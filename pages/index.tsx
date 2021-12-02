// @flow
import { NextPage } from "next";
import { LOCALES_NAMESPACE, useTranslation } from "@server/i18n";
import { BodyLayout } from "@shared/components";
import { useState, useEffect, useMemo } from "react";
import { OrderServices } from "@app/services";
import { IOrder, ORDER_STATUS } from "@app/business/order.business";
import { Badge, Button } from "reactstrap";
import BootstrapTable from 'react-bootstrap-table-next';

const FeedPage: NextPage<any> = () => {
    const { t } = useTranslation();
    const [data, setData] = useState<IOrder[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchResumeInfo = (): Promise<any> => {
        setLoading(true);
        return OrderServices.getAll().then((res: IOrder[]) => {
            console.log('res', res);
            setData(res);
        }).finally(() => setLoading(false));
    };

    const cancelOrder = (id: string): Promise<any> => {
        setLoading(true);
        return OrderServices.cancel(id).then((res: boolean) => {
            res && alert(`cancel order (${id}) successfully !`);
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
                        return <Badge color="primary">{c}</Badge>;
                    case ORDER_STATUS.CONFIRMED:
                        return <Badge color="success">{c}</Badge>;
                    case ORDER_STATUS.DELIVERED:
                        return <Badge color="warning">{c}</Badge>;
                    case ORDER_STATUS.CANCELLED:
                        return <Badge color="dark">{c}</Badge>;
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
                return <div className="d-flex justify-content-around">
                    {row.status !== ORDER_STATUS.CANCELLED && <Button color="secondary" outline className="mr-2" onClick={(): any => cancelOrder(row.id)}>{t('Cancel')}</Button>}
                    {<Button className="danger" outline onClick={(): any => checkOrderStatus(row.id)}>{t('Check Status')}</Button>}
                </div>;
            }
        },
    ], [t]);

    useEffect(() => {
        fetchResumeInfo();
    }, []);

    return (
        <BodyLayout loading={loading}>
            <h2>Orders</h2>
            <div className="d-flex action">
                <Button color="danger" onClick={fetchResumeInfo}>Refresh Latest Orders</Button>
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
