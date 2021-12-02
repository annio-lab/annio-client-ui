export enum ORDER_STATUS {
    CREATED = 'OS_CREATED',
    CONFIRMED = 'OS_CONFIRMED',
    DELIVERED = 'OS_DELIVERED',
    CANCELLED = 'OS_CANCELLED',
}

export enum ORDER_REQUEST_ACTION {
    GET_ALL = 'ACTION_ORDER_GET_ALL',
    GET_BY_ID = 'ACTION_ORDER_GET_BY_ID',
    CREATE = 'ACTION_ORDER_CREATE',
    CANCEL_BY_ID = 'ACTION_ORDER_CANCEL_BY_ID',
    CHECK_STATUS_BY_ID = 'ACTION_ORDER_GET_STATUS',
}

export interface IBase {
    id: string;
}

export interface IOrder extends IBase {
    productId: string;
    quantity: number;
    status: ORDER_STATUS;
}

export interface ICreateOrderPayload {
    productId: string;
    quantity: number;
}
