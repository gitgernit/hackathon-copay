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

import { mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface OfdRequest
 */
export interface OfdRequest {
    /**
     * 
     * @type {string}
     * @memberof OfdRequest
     */
    ofdString: string;
    /**
     * 
     * @type {string}
     * @memberof OfdRequest
     */
    eventId: string;
}

/**
 * Check if a given object implements the OfdRequest interface.
 */
export function instanceOfOfdRequest(value: object): value is OfdRequest {
    if (!('ofdString' in value) || value['ofdString'] === undefined) return false;
    if (!('eventId' in value) || value['eventId'] === undefined) return false;
    return true;
}

export function OfdRequestFromJSON(json: any): OfdRequest {
    return OfdRequestFromJSONTyped(json, false);
}

export function OfdRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): OfdRequest {
    if (json == null) {
        return json;
    }
    return {
        
        'ofdString': json['ofd_string'],
        'eventId': json['event_id'],
    };
}

  export function OfdRequestToJSON(json: any): OfdRequest {
      return OfdRequestToJSONTyped(json, false);
  }

  export function OfdRequestToJSONTyped(value?: OfdRequest | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'ofd_string': value['ofdString'],
        'event_id': value['eventId'],
    };
}

