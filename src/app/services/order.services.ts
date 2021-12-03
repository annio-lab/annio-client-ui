import { HttpRequest } from '@shared/services';
import { ORDER_STATUS } from '@annio/core/business/order/order.common';
import {
    ICreateOrderPayload,
    IOrder,
} from '@annio/core/business/order/order.interface';

export class OrderServices {
    // user info
    static getAll(): Promise<IOrder[]> {
        return HttpRequest.Get('/orders');
    }

    static getDetail(id: string): Promise<IOrder> {
        return HttpRequest.Get(`/orders/${id}`);
    }

    static create(payload: ICreateOrderPayload): Promise<IOrder> {
        return HttpRequest.Post('/orders/create', payload);
    }

    static cancel(id: string): Promise<boolean> {
        return HttpRequest.Post(`/orders/${id}/cancel`);
    }

    static checkStatus(id: string): Promise<ORDER_STATUS> {
        return HttpRequest.Post(`/orders/${id}/check-status`);
    }
}
