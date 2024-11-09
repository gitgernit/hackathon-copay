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
import type { TelegramWebUser } from './TelegramWebUser';
import {
    TelegramWebUserFromJSON,
    TelegramWebUserFromJSONTyped,
    TelegramWebUserToJSON,
    TelegramWebUserToJSONTyped,
} from './TelegramWebUser';

/**
 * 
 * @export
 * @interface TelegramInputData
 */
export interface TelegramInputData {
    /**
     * 
     * @type {string}
     * @memberof TelegramInputData
     */
    queryId?: string | null;
    /**
     * 
     * @type {TelegramWebUser}
     * @memberof TelegramInputData
     */
    user: TelegramWebUser;
    /**
     * 
     * @type {any}
     * @memberof TelegramInputData
     */
    receiver?: any | null;
    /**
     * 
     * @type {any}
     * @memberof TelegramInputData
     */
    chat?: any | null;
    /**
     * 
     * @type {string}
     * @memberof TelegramInputData
     */
    chatType?: string | null;
    /**
     * 
     * @type {string}
     * @memberof TelegramInputData
     */
    chatInstance?: string | null;
    /**
     * 
     * @type {string}
     * @memberof TelegramInputData
     */
    startParam?: string | null;
    /**
     * 
     * @type {number}
     * @memberof TelegramInputData
     */
    canSendAfter?: number | null;
    /**
     * 
     * @type {number}
     * @memberof TelegramInputData
     */
    authDate: number;
    /**
     * 
     * @type {string}
     * @memberof TelegramInputData
     */
    hash: string;
}

/**
 * Check if a given object implements the TelegramInputData interface.
 */
export function instanceOfTelegramInputData(value: object): value is TelegramInputData {
    if (!('user' in value) || value['user'] === undefined) return false;
    if (!('authDate' in value) || value['authDate'] === undefined) return false;
    if (!('hash' in value) || value['hash'] === undefined) return false;
    return true;
}

export function TelegramInputDataFromJSON(json: any): TelegramInputData {
    return TelegramInputDataFromJSONTyped(json, false);
}

export function TelegramInputDataFromJSONTyped(json: any, ignoreDiscriminator: boolean): TelegramInputData {
    if (json == null) {
        return json;
    }
    return {
        
        'queryId': json['query_id'] == null ? undefined : json['query_id'],
        'user': TelegramWebUserFromJSON(json['user']),
        'receiver': json['receiver'] == null ? undefined : json['receiver'],
        'chat': json['chat'] == null ? undefined : json['chat'],
        'chatType': json['chat_type'] == null ? undefined : json['chat_type'],
        'chatInstance': json['chat_instance'] == null ? undefined : json['chat_instance'],
        'startParam': json['start_param'] == null ? undefined : json['start_param'],
        'canSendAfter': json['can_send_after'] == null ? undefined : json['can_send_after'],
        'authDate': json['auth_date'],
        'hash': json['hash'],
    };
}

  export function TelegramInputDataToJSON(json: any): TelegramInputData {
      return TelegramInputDataToJSONTyped(json, false);
  }

  export function TelegramInputDataToJSONTyped(value?: TelegramInputData | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'query_id': value['queryId'],
        'user': TelegramWebUserToJSON(value['user']),
        'receiver': value['receiver'],
        'chat': value['chat'],
        'chat_type': value['chatType'],
        'chat_instance': value['chatInstance'],
        'start_param': value['startParam'],
        'can_send_after': value['canSendAfter'],
        'auth_date': value['authDate'],
        'hash': value['hash'],
    };
}

