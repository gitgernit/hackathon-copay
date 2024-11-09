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
import type { User } from './User';
import {
    UserFromJSON,
    UserFromJSONTyped,
    UserToJSON,
    UserToJSONTyped,
} from './User';

/**
 * 
 * @export
 * @interface OutputItem
 */
export interface OutputItem {
    /**
     * 
     * @type {string}
     * @memberof OutputItem
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof OutputItem
     */
    title: string;
    /**
     * 
     * @type {number}
     * @memberof OutputItem
     */
    price: number;
    /**
     * 
     * @type {Array<User>}
     * @memberof OutputItem
     */
    assignedTo: Array<User>;
    /**
     * 
     * @type {string}
     * @memberof OutputItem
     */
    transactionId: string;
}

/**
 * Check if a given object implements the OutputItem interface.
 */
export function instanceOfOutputItem(value: object): value is OutputItem {
    if (!('id' in value) || value['id'] === undefined) return false;
    if (!('title' in value) || value['title'] === undefined) return false;
    if (!('price' in value) || value['price'] === undefined) return false;
    if (!('assignedTo' in value) || value['assignedTo'] === undefined) return false;
    if (!('transactionId' in value) || value['transactionId'] === undefined) return false;
    return true;
}

export function OutputItemFromJSON(json: any): OutputItem {
    return OutputItemFromJSONTyped(json, false);
}

export function OutputItemFromJSONTyped(json: any, ignoreDiscriminator: boolean): OutputItem {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'],
        'title': json['title'],
        'price': json['price'],
        'assignedTo': ((json['assigned_to'] as Array<any>).map(UserFromJSON)),
        'transactionId': json['transaction_id'],
    };
}

  export function OutputItemToJSON(json: any): OutputItem {
      return OutputItemToJSONTyped(json, false);
  }

  export function OutputItemToJSONTyped(value?: OutputItem | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'id': value['id'],
        'title': value['title'],
        'price': value['price'],
        'assigned_to': ((value['assignedTo'] as Array<any>).map(UserToJSON)),
        'transaction_id': value['transactionId'],
    };
}

