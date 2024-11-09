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
  BaseEvent,
  Event,
  HTTPValidationError,
  OutputEvent,
} from '../models/index';
import {
    BaseEventFromJSON,
    BaseEventToJSON,
    EventFromJSON,
    EventToJSON,
    HTTPValidationErrorFromJSON,
    HTTPValidationErrorToJSON,
    OutputEventFromJSON,
    OutputEventToJSON,
} from '../models/index';

export interface CreateEventApiEventsPostRequest {
    baseEvent: BaseEvent;
}

export interface CreateEventApiTransactionPostRequest {
    baseEvent: BaseEvent;
}

export interface DeleteEventApiEventsEventIdDeleteRequest {
    eventId: string;
}

export interface DeleteEventApiTransactionEventIdDeleteRequest {
    eventId: string;
}

export interface EventByIdApiEventsEventIdGetRequest {
    eventId: string;
}

export interface EventByIdApiTransactionEventIdGetRequest {
    eventId: string;
}

/**
 * 
 */
export class EventsApi extends runtime.BaseAPI {

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
     * Create event
     * Create Event
     */
    async createEventApiTransactionPostRaw(requestParameters: CreateEventApiTransactionPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Event>> {
        if (requestParameters['baseEvent'] == null) {
            throw new runtime.RequiredError(
                'baseEvent',
                'Required parameter "baseEvent" was null or undefined when calling createEventApiTransactionPost().'
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
            path: `/api/transaction/`,
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
    async createEventApiTransactionPost(requestParameters: CreateEventApiTransactionPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Event> {
        const response = await this.createEventApiTransactionPostRaw(requestParameters, initOverrides);
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
     * Delete an event
     * Delete Event
     */
    async deleteEventApiTransactionEventIdDeleteRaw(requestParameters: DeleteEventApiTransactionEventIdDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<any>> {
        if (requestParameters['eventId'] == null) {
            throw new runtime.RequiredError(
                'eventId',
                'Required parameter "eventId" was null or undefined when calling deleteEventApiTransactionEventIdDelete().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            // oauth required
            headerParameters["Authorization"] = await this.configuration.accessToken("OAuth2PasswordBearer", []);
        }

        const response = await this.request({
            path: `/api/transaction/{event_id}`.replace(`{${"event_id"}}`, encodeURIComponent(String(requestParameters['eventId']))),
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
    async deleteEventApiTransactionEventIdDelete(requestParameters: DeleteEventApiTransactionEventIdDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<any> {
        const response = await this.deleteEventApiTransactionEventIdDeleteRaw(requestParameters, initOverrides);
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
     * Event By Id
     */
    async eventByIdApiTransactionEventIdGetRaw(requestParameters: EventByIdApiTransactionEventIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<OutputEvent>> {
        if (requestParameters['eventId'] == null) {
            throw new runtime.RequiredError(
                'eventId',
                'Required parameter "eventId" was null or undefined when calling eventByIdApiTransactionEventIdGet().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/transaction/{event_id}`.replace(`{${"event_id"}}`, encodeURIComponent(String(requestParameters['eventId']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => OutputEventFromJSON(jsonValue));
    }

    /**
     * Event By Id
     */
    async eventByIdApiTransactionEventIdGet(requestParameters: EventByIdApiTransactionEventIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<OutputEvent> {
        const response = await this.eventByIdApiTransactionEventIdGetRaw(requestParameters, initOverrides);
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

    /**
     * Return events containing given user (by token)
     * List Events
     */
    async listEventsApiTransactionGetRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<Event>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            // oauth required
            headerParameters["Authorization"] = await this.configuration.accessToken("OAuth2PasswordBearer", []);
        }

        const response = await this.request({
            path: `/api/transaction/`,
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
    async listEventsApiTransactionGet(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<Event>> {
        const response = await this.listEventsApiTransactionGetRaw(initOverrides);
        return await response.value();
    }

}
