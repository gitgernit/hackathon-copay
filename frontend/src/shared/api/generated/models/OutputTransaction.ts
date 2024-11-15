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
import type { Item } from './Item';
import {
    ItemFromJSON,
    ItemFromJSONTyped,
    ItemToJSON,
    ItemToJSONTyped,
} from './Item';
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
 * @interface OutputTransaction
 */
export interface OutputTransaction {
    /**
     * 
     * @type {string}
     * @memberof OutputTransaction
     */
    title: string;
    /**
     * 
     * @type {string}
     * @memberof OutputTransaction
     */
    id: string;
    /**
     * 
     * @type {User}
     * @memberof OutputTransaction
     */
    payer: User;
    /**
     * 
     * @type {string}
     * @memberof OutputTransaction
     */
    eventId: string;
    /**
     * 
     * @type {boolean}
     * @memberof OutputTransaction
     */
    closed: boolean;
    /**
     * 
     * @type {Array<Item>}
     * @memberof OutputTransaction
     */
    items: Array<Item>;
}

/**
 * Check if a given object implements the OutputTransaction interface.
 */
export function instanceOfOutputTransaction(value: object): value is OutputTransaction {
    if (!('title' in value) || value['title'] === undefined) return false;
    if (!('id' in value) || value['id'] === undefined) return false;
    if (!('payer' in value) || value['payer'] === undefined) return false;
    if (!('eventId' in value) || value['eventId'] === undefined) return false;
    if (!('closed' in value) || value['closed'] === undefined) return false;
    if (!('items' in value) || value['items'] === undefined) return false;
    return true;
}

export function OutputTransactionFromJSON(json: any): OutputTransaction {
    return OutputTransactionFromJSONTyped(json, false);
}

export function OutputTransactionFromJSONTyped(json: any, ignoreDiscriminator: boolean): OutputTransaction {
    if (json == null) {
        return json;
    }
    return {
        
        'title': json['title'],
        'id': json['id'],
        'payer': UserFromJSON(json['payer']),
        'eventId': json['event_id'],
        'closed': json['closed'],
        'items': ((json['items'] as Array<any>).map(ItemFromJSON)),
    };
}

  export function OutputTransactionToJSON(json: any): OutputTransaction {
      return OutputTransactionToJSONTyped(json, false);
  }

  export function OutputTransactionToJSONTyped(value?: OutputTransaction | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'title': value['title'],
        'id': value['id'],
        'payer': UserToJSON(value['payer']),
        'event_id': value['eventId'],
        'closed': value['closed'],
        'items': ((value['items'] as Array<any>).map(ItemToJSON)),
    };
}

