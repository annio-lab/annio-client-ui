// @flow
import { NextPage } from "next";
import { LOCALES_NAMESPACE, useTranslation } from "@server/i18n";
import { useState, useEffect, useMemo, useCallback } from "react";
import { Alert, Badge, Button } from "reactstrap";
import BootstrapTable from 'react-bootstrap-table-next';
import { ORDER_STATUS } from "@annio/core/business/order/order.common";
import { IOrder } from "@annio/core/business/order/order.interface";
import { OrderServices } from "@app/services";
import { CreateOrderModal } from "@app/components";
import { BodyLayout } from "@shared/components";
import { toast } from "react-toastify";
import { HttpRequest } from "@shared/services";

const FeedPage: NextPage<any> = () => {
    const { t } = useTranslation();
    const [data, setData] = useState<IOrder[]>([]);
    const [loading, setLoading] = useState(false);


    const fetchAllOrders = (): Promise<any> => {
        setLoading(true);
        return OrderServices.getAll().then((res: IOrder[]) => {
            setData([]);
            setData(res);
        }).finally(() => setLoading(false));
    };

    const cancelOrder = (id: string): Promise<any> => {
        setLoading(true);
        return OrderServices.cancel(id).then((res: boolean) => {
            res && toast.success(`cancel order (${id}) successfully !`);
            fetchAllOrders();
        }).finally(() => setLoading(false));
    };

    const checkOrderStatus = (id: string): Promise<any> => {
        setLoading(true);
        return OrderServices.checkStatus(id).then((res: ORDER_STATUS) => {
            res && toast.success(`Status of id (${id}): ${res}`);
        }).finally(() => setLoading(false));
    };

    const resetHerokuService = useCallback(() => {

        const pingUrl = async (url: string): Promise<any> => {
            await HttpRequest.Get(url, { baseURL: '' }).then(() => {
                toast.success(`ping success to ${url}`);
            }).catch((err) => {
                if (err.statusCode === 404) {
                    toast.success(`ping success to ${url}`);
                    return;
                }
                toast.error(`ping failed to ${url}`);
            });
        }

        setLoading(true);
        const hosts = ['https://annio-payment-service.herokuapp.com', 'https://annio-order-service.herokuapp.com', 'https://annio-api-services.herokuapp.com'];
        const pingUrls = hosts.map((url) => pingUrl(url));
        Promise.all(pingUrls).finally(() => setLoading(false));
    }, []);

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
                return <div className="d-flex justify-content-around">
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
            <Alert color="danger">
                When you cannot fetch data from API (503). Please click to
                <Button color="link" className="ml-2 px-0" onClick={resetHerokuService}>link</Button> for restart service (wakeup heroku services)
            </Alert>
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
