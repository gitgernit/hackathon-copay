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
  BasicResponse,
  BodyAddItemToTransactionApiTransactionEventIdTransactionIdItemsPost,
  HTTPValidationError,
  Item,
  OutputTransaction,
  Transaction,
} from '../models/index';
import {
    BasicResponseFromJSON,
    BasicResponseToJSON,
    BodyAddItemToTransactionApiTransactionEventIdTransactionIdItemsPostFromJSON,
    BodyAddItemToTransactionApiTransactionEventIdTransactionIdItemsPostToJSON,
    HTTPValidationErrorFromJSON,
    HTTPValidationErrorToJSON,
    ItemFromJSON,
    ItemToJSON,
    OutputTransactionFromJSON,
    OutputTransactionToJSON,
    TransactionFromJSON,
    TransactionToJSON,
} from '../models/index';

export interface AddItemToTransactionApiTransactionEventIdTransactionIdItemsPostRequest {
    eventId: string;
    transactionId: string;
    bodyAddItemToTransactionApiTransactionEventIdTransactionIdItemsPost: BodyAddItemToTransactionApiTransactionEventIdTransactionIdItemsPost;
}

export interface CreateTransactionApiTransactionEventIdPostRequest {
    eventId: string;
    body: string;
}

export interface GetTransactionApiTransactionEventIdTransactionIdGetRequest {
    eventId: string;
    transactionId: string;
}

/**
 * 
 */
export class TransactionsApi extends runtime.BaseAPI {

    /**
     * Create a transaction by a event id
     * Add Item To Transaction
     */
    async addItemToTransactionApiTransactionEventIdTransactionIdItemsPostRaw(requestParameters: AddItemToTransactionApiTransactionEventIdTransactionIdItemsPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Item>> {
        if (requestParameters['eventId'] == null) {
            throw new runtime.RequiredError(
                'eventId',
                'Required parameter "eventId" was null or undefined when calling addItemToTransactionApiTransactionEventIdTransactionIdItemsPost().'
            );
        }

        if (requestParameters['transactionId'] == null) {
            throw new runtime.RequiredError(
                'transactionId',
                'Required parameter "transactionId" was null or undefined when calling addItemToTransactionApiTransactionEventIdTransactionIdItemsPost().'
            );
        }

        if (requestParameters['bodyAddItemToTransactionApiTransactionEventIdTransactionIdItemsPost'] == null) {
            throw new runtime.RequiredError(
                'bodyAddItemToTransactionApiTransactionEventIdTransactionIdItemsPost',
                'Required parameter "bodyAddItemToTransactionApiTransactionEventIdTransactionIdItemsPost" was null or undefined when calling addItemToTransactionApiTransactionEventIdTransactionIdItemsPost().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("BearerAuth", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/transaction/{event_id}/{transaction_id}/items`.replace(`{${"event_id"}}`, encodeURIComponent(String(requestParameters['eventId']))).replace(`{${"transaction_id"}}`, encodeURIComponent(String(requestParameters['transactionId']))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: BodyAddItemToTransactionApiTransactionEventIdTransactionIdItemsPostToJSON(requestParameters['bodyAddItemToTransactionApiTransactionEventIdTransactionIdItemsPost']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ItemFromJSON(jsonValue));
    }

    /**
     * Create a transaction by a event id
     * Add Item To Transaction
     */
    async addItemToTransactionApiTransactionEventIdTransactionIdItemsPost(requestParameters: AddItemToTransactionApiTransactionEventIdTransactionIdItemsPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Item> {
        const response = await this.addItemToTransactionApiTransactionEventIdTransactionIdItemsPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Create a transaction by a event id
     * Create Transaction
     */
    async createTransactionApiTransactionEventIdPostRaw(requestParameters: CreateTransactionApiTransactionEventIdPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Transaction>> {
        if (requestParameters['eventId'] == null) {
            throw new runtime.RequiredError(
                'eventId',
                'Required parameter "eventId" was null or undefined when calling createTransactionApiTransactionEventIdPost().'
            );
        }

        if (requestParameters['body'] == null) {
            throw new runtime.RequiredError(
                'body',
                'Required parameter "body" was null or undefined when calling createTransactionApiTransactionEventIdPost().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("BearerAuth", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/transaction/{event_id}`.replace(`{${"event_id"}}`, encodeURIComponent(String(requestParameters['eventId']))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters['body'] as any,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TransactionFromJSON(jsonValue));
    }

    /**
     * Create a transaction by a event id
     * Create Transaction
     */
    async createTransactionApiTransactionEventIdPost(requestParameters: CreateTransactionApiTransactionEventIdPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Transaction> {
        const response = await this.createTransactionApiTransactionEventIdPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get a transaction by its event and transaction id
     * Get Transaction
     */
    async getTransactionApiTransactionEventIdTransactionIdGetRaw(requestParameters: GetTransactionApiTransactionEventIdTransactionIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<OutputTransaction>> {
        if (requestParameters['eventId'] == null) {
            throw new runtime.RequiredError(
                'eventId',
                'Required parameter "eventId" was null or undefined when calling getTransactionApiTransactionEventIdTransactionIdGet().'
            );
        }

        if (requestParameters['transactionId'] == null) {
            throw new runtime.RequiredError(
                'transactionId',
                'Required parameter "transactionId" was null or undefined when calling getTransactionApiTransactionEventIdTransactionIdGet().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("BearerAuth", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/transaction/{event_id}/{transaction_id}`.replace(`{${"event_id"}}`, encodeURIComponent(String(requestParameters['eventId']))).replace(`{${"transaction_id"}}`, encodeURIComponent(String(requestParameters['transactionId']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => OutputTransactionFromJSON(jsonValue));
    }

    /**
     * Get a transaction by its event and transaction id
     * Get Transaction
     */
    async getTransactionApiTransactionEventIdTransactionIdGet(requestParameters: GetTransactionApiTransactionEventIdTransactionIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<OutputTransaction> {
        const response = await this.getTransactionApiTransactionEventIdTransactionIdGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
