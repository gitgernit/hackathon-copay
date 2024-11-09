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
 * @interface BaseEvent
 */
export interface BaseEvent {
    /**
     * 
     * @type {string}
     * @memberof BaseEvent
     */
    name?: string;
}

/**
 * Check if a given object implements the BaseEvent interface.
 */
export function instanceOfBaseEvent(value: object): value is BaseEvent {
    return true;
}

export function BaseEventFromJSON(json: any): BaseEvent {
    return BaseEventFromJSONTyped(json, false);
}

export function BaseEventFromJSONTyped(json: any, ignoreDiscriminator: boolean): BaseEvent {
    if (json == null) {
        return json;
    }
    return {
        
        'name': json['name'] == null ? undefined : json['name'],
    };
}

  export function BaseEventToJSON(json: any): BaseEvent {
      return BaseEventToJSONTyped(json, false);
  }

  export function BaseEventToJSONTyped(value?: BaseEvent | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'name': value['name'],
    };
}

