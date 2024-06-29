/**
 * The default URL that will be used for the API.
 */
export const API = "https://api.adapt.chat";

/**
 * The default URL that will be used for the CDN.
 */
export const CDN = "https://convey.adapt.chat";

/**
 * The default URL that will be used for the WS connection.
 */
export const GATEWAY = "https://harmony.adapt.chat";

/**
 * List of opcodes used for interacting with Adapt.
 */
export enum OpCodes {
  /**
   * Op code received from Harmony.
   */
  HELLO = "hello",
  /**
   * Op code used for sending an identify payload to Harmony.
   */
  IDENTIFY = "identify",

  /**
   * Op code used for sending a heartbeat to Harmony.
   */
  PING = "ping",
  /**
   * Op code used for sending a heartbeat to Harmony.
   */
  PONG = "pong",
  /**
   * Op code used for sending a heartbeat to Harmony.
   */
  READY = "ready",
  /**
   * Op code used for sending a heartbeat to Harmony.
   */
  MESSAGE_CREATE = "message_create",
}

/**
 * List of error codes from the API.
 */
export enum ErrorCodes {}