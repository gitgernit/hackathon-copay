/* tslint:disable */
/* eslint-disable */
/**
 * FastAPI
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  AppModelsItemItem,
  BaseEvent,
  Event,
  HTTPValidationError,
  OutputEvent,
  Transaction,
} from '../models/index';
import {
    AppModelsItemItemFromJSON,
    AppModelsItemItemToJSON,
    BaseEventFromJSON,
    BaseEventToJSON,
    EventFromJSON,
    EventToJSON,
    HTTPValidationErrorFromJSON,
    HTTPValidationErrorToJSON,
    OutputEventFromJSON,
    OutputEventToJSON,
    TransactionFromJSON,
    TransactionToJSON,
} from '../models/index';

export interface AddItemToTransactionApiEventsEventIdTransactionsTransactionIdItemsPostRequest {
    eventId: string;
    transactionId: string;
    title: string;
    price: number;
    addAllUsers?: boolean;
}

export interface CreateEventApiEventsPostRequest {
    baseEvent: BaseEvent;
}

export interface CreateTransactionApiEventsEventIdTransactionsPostRequest {
    eventId: string;
    title: string;
}

export interface DeleteEventApiEventsEventIdDeleteRequest {
    eventId: string;
}

export interface EventByIdApiEventsEventIdGetRequest {
    eventId: string;
}

/**
 * 
 */
export class EventsApi extends runtime.BaseAPI {

    /**
     * Add Item To Transaction
     */
    async addItemToTransactionApiEventsEventIdTransactionsTransactionIdItemsPostRaw(requestParameters: AddItemToTransactionApiEventsEventIdTransactionsTransactionIdItemsPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<AppModelsItemItem>> {
        if (requestParameters['eventId'] == null) {
            throw new runtime.RequiredError(
                'eventId',
                'Required parameter "eventId" was null or undefined when calling addItemToTransactionApiEventsEventIdTransactionsTransactionIdItemsPost().'
            );
        }

        if (requestParameters['transactionId'] == null) {
            throw new runtime.RequiredError(
                'transactionId',
                'Required parameter "transactionId" was null or undefined when calling addItemToTransactionApiEventsEventIdTransactionsTransactionIdItemsPost().'
            );
        }

        if (requestParameters['title'] == null) {
            throw new runtime.RequiredError(
                'title',
                'Required parameter "title" was null or undefined when calling addItemToTransactionApiEventsEventIdTransactionsTransactionIdItemsPost().'
            );
        }

        if (requestParameters['price'] == null) {
            throw new runtime.RequiredError(
                'price',
                'Required parameter "price" was null or undefined when calling addItemToTransactionApiEventsEventIdTransactionsTransactionIdItemsPost().'
            );
        }

        const queryParameters: any = {};

        if (requestParameters['title'] != null) {
            queryParameters['title'] = requestParameters['title'];
        }

        if (requestParameters['price'] != null) {
            queryParameters['price'] = requestParameters['price'];
        }

        if (requestParameters['addAllUsers'] != null) {
            queryParameters['add_all_users'] = requestParameters['addAllUsers'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            // oauth required
            headerParameters["Authorization"] = await this.configuration.accessToken("OAuth2PasswordBearer", []);
        }

        const response = await this.request({
            path: `/api/events/{event_id}/transactions/{transaction_id}/items`.replace(`{${"event_id"}}`, encodeURIComponent(String(requestParameters['eventId']))).replace(`{${"transaction_id"}}`, encodeURIComponent(String(requestParameters['transactionId']))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => AppModelsItemItemFromJSON(jsonValue));
    }

    /**
     * Add Item To Transaction
     */
    async addItemToTransactionApiEventsEventIdTransactionsTransactionIdItemsPost(requestParameters: AddItemToTransactionApiEventsEventIdTransactionsTransactionIdItemsPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<AppModelsItemItem> {
        const response = await this.addItemToTransactionApiEventsEventIdTransactionsTransactionIdItemsPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Create event
     * Create Event
     */
    async createEventApiEventsPostRaw(requestParameters: CreateEventApiEventsPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Event>> {
        if (requestParameters['baseEvent'] == null) {
            throw new runtime.RequiredError(
                'baseEvent',
                'Required parameter "baseEvent" was null or undefined when calling createEventApiEventsPost().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            // oauth required
            headerParameters["Authorization"] = await this.configuration.accessToken("OAuth2PasswordBearer", []);
        }

        const response = await this.request({
            path: `/api/events/`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: BaseEventToJSON(requestParameters['baseEvent']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => EventFromJSON(jsonValue));
    }

    /**
     * Create event
     * Create Event
     */
    async createEventApiEventsPost(requestParameters: CreateEventApiEventsPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Event> {
        const response = await this.createEventApiEventsPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Create Transaction
     */
    async createTransactionApiEventsEventIdTransactionsPostRaw(requestParameters: CreateTransactionApiEventsEventIdTransactionsPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Transaction>> {
        if (requestParameters['eventId'] == null) {
            throw new runtime.RequiredError(
                'eventId',
                'Required parameter "eventId" was null or undefined when calling createTransactionApiEventsEventIdTransactionsPost().'
            );
        }

        if (requestParameters['title'] == null) {
            throw new runtime.RequiredError(
                'title',
                'Required parameter "title" was null or undefined when calling createTransactionApiEventsEventIdTransactionsPost().'
            );
        }

        const queryParameters: any = {};

        if (requestParameters['title'] != null) {
            queryParameters['title'] = requestParameters['title'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            // oauth required
            headerParameters["Authorization"] = await this.configuration.accessToken("OAuth2PasswordBearer", []);
        }

        const response = await this.request({
            path: `/api/events/{event_id}/transactions`.replace(`{${"event_id"}}`, encodeURIComponent(String(requestParameters['eventId']))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TransactionFromJSON(jsonValue));
    }

    /**
     * Create Transaction
     */
    async createTransactionApiEventsEventIdTransactionsPost(requestParameters: CreateTransactionApiEventsEventIdTransactionsPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Transaction> {
        const response = await this.createTransactionApiEventsEventIdTransactionsPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Delete an event
     * Delete Event
     */
    async deleteEventApiEventsEventIdDeleteRaw(requestParameters: DeleteEventApiEventsEventIdDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<any>> {
        if (requestParameters['eventId'] == null) {
            throw new runtime.RequiredError(
                'eventId',
                'Required parameter "eventId" was null or undefined when calling deleteEventApiEventsEventIdDelete().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            // oauth required
            headerParameters["Authorization"] = await this.configuration.accessToken("OAuth2PasswordBearer", []);
        }

        const response = await this.request({
            path: `/api/events/{event_id}`.replace(`{${"event_id"}}`, encodeURIComponent(String(requestParameters['eventId']))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        if (this.isJsonMime(response.headers.get('content-type'))) {
            return new runtime.JSONApiResponse<any>(response);
        } else {
            return new runtime.TextApiResponse(response) as any;
        }
    }

    /**
     * Delete an event
     * Delete Event
     */
    async deleteEventApiEventsEventIdDelete(requestParameters: DeleteEventApiEventsEventIdDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<any> {
        const response = await this.deleteEventApiEventsEventIdDeleteRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Event By Id
     */
    async eventByIdApiEventsEventIdGetRaw(requestParameters: EventByIdApiEventsEventIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<OutputEvent>> {
        if (requestParameters['eventId'] == null) {
            throw new runtime.RequiredError(
                'eventId',
                'Required parameter "eventId" was null or undefined when calling eventByIdApiEventsEventIdGet().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/events/{event_id}`.replace(`{${"event_id"}}`, encodeURIComponent(String(requestParameters['eventId']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => OutputEventFromJSON(jsonValue));
    }

    /**
     * Event By Id
     */
    async eventByIdApiEventsEventIdGet(requestParameters: EventByIdApiEventsEventIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<OutputEvent> {
        const response = await this.eventByIdApiEventsEventIdGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Return events containing given user (by token)
     * List Events
     */
    async listEventsApiEventsGetRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<Event>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            // oauth required
            headerParameters["Authorization"] = await this.configuration.accessToken("OAuth2PasswordBearer", []);
        }

        const response = await this.request({
            path: `/api/events/`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(EventFromJSON));
    }

    /**
     * Return events containing given user (by token)
     * List Events
     */
    async listEventsApiEventsGet(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<Event>> {
        const response = await this.listEventsApiEventsGetRaw(initOverrides);
        return await response.value();
    }

}
