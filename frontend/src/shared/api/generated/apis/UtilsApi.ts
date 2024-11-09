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
  AppModelsOfdItem,
  HTTPValidationError,
  OfdRequest,
} from '../models/index';
import {
    AppModelsOfdItemFromJSON,
    AppModelsOfdItemToJSON,
    HTTPValidationErrorFromJSON,
    HTTPValidationErrorToJSON,
    OfdRequestFromJSON,
    OfdRequestToJSON,
} from '../models/index';

export interface OfdApiUtilsOfdPostRequest {
    ofdRequest: OfdRequest;
}

/**
 * 
 */
export class UtilsApi extends runtime.BaseAPI {

    /**
     * Health Check
     */
    async healthCheckApiUtilsHealthCheckGetRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<{ [key: string]: string; }>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/utils/health-check`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse<any>(response);
    }

    /**
     * Health Check
     */
    async healthCheckApiUtilsHealthCheckGet(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<{ [key: string]: string; }> {
        const response = await this.healthCheckApiUtilsHealthCheckGetRaw(initOverrides);
        return await response.value();
    }

    /**
     * Get items info from OFD bare string
     * Ofd
     */
    async ofdApiUtilsOfdPostRaw(requestParameters: OfdApiUtilsOfdPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<AppModelsOfdItem>>> {
        if (requestParameters['ofdRequest'] == null) {
            throw new runtime.RequiredError(
                'ofdRequest',
                'Required parameter "ofdRequest" was null or undefined when calling ofdApiUtilsOfdPost().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/api/utils/ofd`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: OfdRequestToJSON(requestParameters['ofdRequest']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(AppModelsOfdItemFromJSON));
    }

    /**
     * Get items info from OFD bare string
     * Ofd
     */
    async ofdApiUtilsOfdPost(requestParameters: OfdApiUtilsOfdPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<AppModelsOfdItem>> {
        const response = await this.ofdApiUtilsOfdPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
