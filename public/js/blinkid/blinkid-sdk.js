/*! ****************************************************************************
Copyright (c) Microblink. All rights reserved.

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.
***************************************************************************** */
(function (global, factory) {
typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
typeof define === 'function' && define.amd ? define(['exports'], factory) :
(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.BlinkIDSDK = {}));
}(this, (function (exports) { 'use strict';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
let nextMessageID = 0;
function getNextMessageID() {
    const msgId = nextMessageID;
    nextMessageID = nextMessageID + 1;
    return msgId;
}
class BaseRequestMessage {
    constructor(action) {
        this.action = action;
        this.messageID = getNextMessageID();
    }
}
class InitMessage extends BaseRequestMessage {
    constructor(wasmLoadSettings, userId) {
        super(InitMessage.action);
        this.wasmModuleName = wasmLoadSettings.wasmModuleName;
        this.licenseKey = wasmLoadSettings.licenseKey;
        this.userId = userId;
        this.registerLoadCallback = wasmLoadSettings.loadProgressCallback !== null;
        this.allowHelloMessage = wasmLoadSettings.allowHelloMessage;
        this.engineLocation = wasmLoadSettings.engineLocation;
        this.wasmType = wasmLoadSettings.wasmType;
        this.numberOfWorkers = wasmLoadSettings.numberOfWorkers;
    }
}
InitMessage.action = "init";
var ParameterType;
(function (ParameterType) {
    ParameterType[ParameterType["Any"] = 0] = "Any";
    ParameterType[ParameterType["Recognizer"] = 1] = "Recognizer";
    ParameterType[ParameterType["RecognizerSettings"] = 2] = "RecognizerSettings";
    ParameterType[ParameterType["Callback"] = 3] = "Callback";
})(ParameterType || (ParameterType = {}));
class InvokeFunction extends BaseRequestMessage {
    constructor(funcName, params) {
        super(InvokeFunction.action);
        this.funcName = funcName;
        this.params = params;
    }
}
InvokeFunction.action = "invokeFunction";
class CreateNewRecognizer extends BaseRequestMessage {
    constructor(className, params) {
        super(CreateNewRecognizer.action);
        this.className = className;
        this.params = params;
    }
}
CreateNewRecognizer.action = "createNewNativeObject";
class CreateRecognizerRunner extends BaseRequestMessage {
    constructor(recognizerHandles, allowMultipleResults, registeredMetadataCallbacks) {
        super(CreateRecognizerRunner.action);
        this.recognizerHandles = recognizerHandles;
        this.allowMultipleResults = allowMultipleResults;
        this.registeredMetadataCallbacks = registeredMetadataCallbacks;
    }
}
CreateRecognizerRunner.action = "createRecognizerRunner";
class ReconfigureRecognizerRunner extends BaseRequestMessage {
    constructor(recognizerHandles, allowMultipleResults) {
        super(ReconfigureRecognizerRunner.action);
        this.recognizerHandles = recognizerHandles;
        this.allowMultipleResults = allowMultipleResults;
    }
}
ReconfigureRecognizerRunner.action = "reconfigureRecognizerRunner";
class DeleteRecognizerRunner extends BaseRequestMessage {
    constructor() {
        super(DeleteRecognizerRunner.action);
    }
}
DeleteRecognizerRunner.action = "deleteRecognizerRunner";
class InvokeObjectMethod extends BaseRequestMessage {
    constructor(objectHandle, methodName, params) {
        super(InvokeObjectMethod.action);
        this.objectHandle = objectHandle;
        this.methodName = methodName;
        this.params = params;
    }
}
InvokeObjectMethod.action = "invokeObject";
class ProcessImage extends BaseRequestMessage {
    constructor(image) {
        super(ProcessImage.action);
        this.frame = image;
    }
    getTransferrables() {
        return [this.frame.imageData.data.buffer];
    }
}
ProcessImage.action = "processImage";
class ResetRecognizers extends BaseRequestMessage {
    constructor(hardReset) {
        super(ResetRecognizers.action);
        this.hardReset = hardReset;
    }
}
ResetRecognizers.action = "resetRecognizers";
class RegisteredMetadataCallbacks {
    constructor() {
        this.onDebugText = false;
        this.onDetectionFailed = false;
        this.onQuadDetection = false;
        this.onPointsDetection = false;
        this.onFirstSideResult = false;
        this.onGlare = false;
    }
}
class RegisterMetadataCallbacks extends BaseRequestMessage {
    constructor(registeredMetadataCallbacks) {
        super(RegisterMetadataCallbacks.action);
        this.registeredMetadataCallbacks = registeredMetadataCallbacks;
    }
}
RegisterMetadataCallbacks.action = "registerMetadataCallbacks";
class SetDetectionOnly extends BaseRequestMessage {
    constructor(detectionOnlyMode) {
        super(SetDetectionOnly.action);
        this.detectionOnlyMode = detectionOnlyMode;
    }
}
SetDetectionOnly.action = "setDetectionOnly";
class SetClearTimeoutCallback extends BaseRequestMessage {
    constructor(callbackNonEmpty) {
        super(SetClearTimeoutCallback.action);
        this.callbackNonEmpty = callbackNonEmpty;
    }
}
SetClearTimeoutCallback.action = "setClearTimeoutCallback";
class SetCameraPreviewMirrored extends BaseRequestMessage {
    constructor(cameraPreviewMirrored) {
        super(SetCameraPreviewMirrored.action);
        this.cameraPreviewMirrored = cameraPreviewMirrored;
    }
}
SetCameraPreviewMirrored.action = "setCameraPreviewMirrored";
// ===================================== /
// Metadata callback messages
// ===================================== /
var MetadataCallback;
(function (MetadataCallback) {
    MetadataCallback[MetadataCallback["onDebugText"] = 0] = "onDebugText";
    MetadataCallback[MetadataCallback["onDetectionFailed"] = 1] = "onDetectionFailed";
    MetadataCallback[MetadataCallback["onQuadDetection"] = 2] = "onQuadDetection";
    MetadataCallback[MetadataCallback["onPointsDetection"] = 3] = "onPointsDetection";
    MetadataCallback[MetadataCallback["onFirstSideResult"] = 4] = "onFirstSideResult";
    MetadataCallback[MetadataCallback["clearTimeoutCallback"] = 5] = "clearTimeoutCallback";
    MetadataCallback[MetadataCallback["onGlare"] = 6] = "onGlare";
    MetadataCallback[MetadataCallback["recognizerCallback"] = 7] = "recognizerCallback";
})(MetadataCallback || (MetadataCallback = {}));
/* eslint-enable @typescript-eslint/no-explicit-any */

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
/**
 * Defines the type of the WASM that will be loaded.
 */
exports.WasmType = void 0;
(function (WasmType) {
    /**
     * The WASM that will be loaded will be most compatible with all browsers that
     * support the WASM, but will lack features that could be used to improve performance.
     */
    WasmType["Basic"] = "BASIC";
    /**
     * The WASM that will be loaded will be built with advanced WASM features, such as
     * bulk memory, non-trapping floating point and sign extension. Such WASM can only
     * be executed in browsers that support those features. Attempting to run this
     * WASM in a non-compatible browser will crash your app.
     */
    WasmType["Advanced"] = "ADVANCED";
    /**
     * The WASM that will be loaded will be build with advanced WASM features, just
     * like above. Additionally, it will be also built with support for multi-threaded
     * processing. This feature requires a browser with support for both advanced WASM
     * features and `SharedArrayBuffer`
     */
    WasmType["AdvancedWithThreads"] = "ADVANCED_WITH_THREADS";
})(exports.WasmType || (exports.WasmType = {}));

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
function defaultEventHandler(resolve, reject) {
    return (msg) => {
        const resultMsg = msg;
        if (resultMsg.success) {
            resolve();
        }
        else {
            reject(resultMsg.error);
        }
    };
}
function defaultResultEventHandler(successResolver, reject) {
    return (msg) => {
        const resultMsg = msg;
        if (resultMsg.success) {
            successResolver(msg);
        }
        else {
            reject(resultMsg.error);
        }
    };
}
/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment */
function wrapParameters(params) {
    // convert params
    const wrappedPrameters = [];
    for (let param of params) {
        let paramType = ParameterType.Any;
        if (param instanceof RemoteRecognizer) {
            paramType = ParameterType.Recognizer;
            param = param.getRemoteObjectHandle();
        }
        wrappedPrameters.push({
            parameter: param,
            type: paramType
        });
    }
    return wrappedPrameters;
}
/* eslint-enable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment */
class RemoteRecognizer {
    /* eslint-enable lines-between-class-members */
    constructor(wasmWorker, recognizerName, remoteObjHandle) {
        this.wasmSDKWorker = wasmWorker;
        this.objectHandle = remoteObjHandle;
        this.recognizerName = recognizerName;
        this.callbacks = new Map();
    }
    /* eslint-enable @typescript-eslint/ban-types */
    getRemoteObjectHandle() {
        return this.objectHandle;
    }
    currentSettings() {
        return new Promise((resolve, reject) => {
            if (this.objectHandle < 0) {
                reject("Invalid object handle: " + this.objectHandle.toString());
                return;
            }
            const msg = new InvokeObjectMethod(this.objectHandle, "currentSettings", []);
            const handler = defaultResultEventHandler((msg) => {
                resolve(msg.result);
            }, reject);
            this.wasmSDKWorker.postMessage(msg, handler);
        });
    }
    clearAllCallbacks() {
        this.callbacks.clear();
        this.wasmSDKWorker.unregisterRecognizerCallbacks(this.objectHandle);
    }
    /* eslint-disable @typescript-eslint/no-explicit-any,
                      @typescript-eslint/no-unsafe-assignment,
                      @typescript-eslint/no-unsafe-member-access,
                      @typescript-eslint/no-unsafe-return
    */
    // convert each function member into wrapped parameter, containing address where callback needs to be delivered
    removeFunctions(settings) {
        // clear any existing callbacks
        this.clearAllCallbacks();
        const keys = Object.keys(settings);
        let needsRegistering = false;
        for (const key of keys) {
            const data = settings[key];
            if (typeof data === "function") {
                this.callbacks.set(key, data);
                const wrappedFunction = {
                    parameter: {
                        recognizerHandle: this.objectHandle,
                        callbackName: key
                    },
                    type: ParameterType.Callback
                };
                settings[key] = wrappedFunction;
                needsRegistering = true;
            }
        }
        if (needsRegistering) {
            this.wasmSDKWorker.registerRecognizerCallbacks(this.objectHandle, this);
        }
        return settings;
    }
    /* eslint-enable @typescript-eslint/no-explicit-any,
                     @typescript-eslint/no-unsafe-assignment,
                     @typescript-eslint/no-unsafe-member-access,
                     @typescript-eslint/no-unsafe-return
    */
    updateSettings(newSettings) {
        return new Promise((resolve, reject) => {
            if (this.objectHandle < 0) {
                reject("Invalid object handle: " + this.objectHandle.toString());
                return;
            }
            /* eslint-disable @typescript-eslint/no-unsafe-assignment */
            const msg = new InvokeObjectMethod(this.objectHandle, "updateSettings", [
                {
                    parameter: this.removeFunctions(newSettings),
                    type: ParameterType.RecognizerSettings
                }
            ]);
            /* eslint-enable @typescript-eslint/no-unsafe-assignment */
            const handler = defaultEventHandler(resolve, reject);
            this.wasmSDKWorker.postMessage(msg, handler);
        });
    }
    /* eslint-disable @typescript-eslint/no-explicit-any */
    invokeCallback(callbackName, args) {
        const callback = this.callbacks.get(callbackName);
        if (callback !== undefined) {
            callback(...args);
        }
        else {
            console.warn("Cannot find callback", callbackName);
        }
    }
    /* eslint-enable @typescript-eslint/no-explicit-any */
    getResult() {
        return new Promise((resolve, reject) => {
            if (this.objectHandle < 0) {
                reject("Invalid object handle: " + this.objectHandle.toString());
                return;
            }
            const msg = new InvokeObjectMethod(this.objectHandle, "getResult", []);
            const handler = defaultResultEventHandler((msg) => {
                resolve(msg.result);
            }, reject);
            this.wasmSDKWorker.postMessage(msg, handler);
        });
    }
    delete() {
        return new Promise((resolve, reject) => {
            if (this.objectHandle < 0) {
                reject("Invalid object handle: " + this.objectHandle.toString());
                return;
            }
            this.clearAllCallbacks();
            const msg = new InvokeObjectMethod(this.objectHandle, "delete", []);
            const handler = defaultEventHandler(() => {
                this.objectHandle = -1;
                resolve();
            }, reject);
            this.wasmSDKWorker.postMessage(msg, handler);
        });
    }
}
function createRegisteredCallbacks(metadataCallbacks) {
    const msg = new RegisteredMetadataCallbacks();
    // https://stackoverflow.com/a/20093686/213057
    msg.onDebugText = !!metadataCallbacks.onDebugText;
    msg.onDetectionFailed = !!metadataCallbacks.onDetectionFailed;
    msg.onPointsDetection = !!metadataCallbacks.onPointsDetection;
    msg.onQuadDetection = !!metadataCallbacks.onQuadDetection;
    msg.onFirstSideResult = !!metadataCallbacks.onFirstSideResult;
    msg.onGlare = !!metadataCallbacks.onGlare;
    return msg;
}
class RemoteRecognizerRunner {
    constructor(wasmWorker) {
        this.deleted = false;
        this.wasmSDKWorker = wasmWorker;
    }
    processImage(image) {
        return new Promise((resolve, reject) => {
            if (this.deleted) {
                reject("Recognizer runner is deleted. It cannot be used anymore!");
                return;
            }
            const msg = new ProcessImage(image);
            const handler = defaultResultEventHandler((response) => {
                const state = response.recognitionState;
                resolve(state);
            }, reject);
            this.wasmSDKWorker.postTransferrableMessage(msg, handler);
        });
    }
    reconfigureRecognizers(recognizers, allowMultipleResults) {
        return new Promise((resolve, reject) => {
            if (this.deleted) {
                reject("Recognizer runner is deleted. It cannot be used anymore!");
                return;
            }
            const recognizerHandles = getRecognizerHandles(recognizers);
            const msg = new ReconfigureRecognizerRunner(recognizerHandles, allowMultipleResults);
            const handler = defaultEventHandler(resolve, reject);
            this.wasmSDKWorker.postMessage(msg, handler);
        });
    }
    setMetadataCallbacks(metadataCallbacks) {
        return new Promise((resolve, reject) => {
            const msg = new RegisterMetadataCallbacks(createRegisteredCallbacks(metadataCallbacks));
            const handler = defaultEventHandler(resolve, reject);
            this.wasmSDKWorker.postMessageAndRegisterCallbacks(msg, metadataCallbacks, handler);
        });
    }
    resetRecognizers(hardReset) {
        return new Promise((resolve, reject) => {
            const msg = new ResetRecognizers(hardReset);
            const handler = defaultEventHandler(resolve, reject);
            this.wasmSDKWorker.postMessage(msg, handler);
        });
    }
    setDetectionOnlyMode(detectionOnly) {
        return new Promise((resolve, reject) => {
            const msg = new SetDetectionOnly(detectionOnly);
            const handler = defaultEventHandler(resolve, reject);
            this.wasmSDKWorker.postMessage(msg, handler);
        });
    }
    setClearTimeoutCallback(clearTimeoutCallback) {
        return new Promise((resolve, reject) => {
            const msg = new SetClearTimeoutCallback(clearTimeoutCallback !== null);
            const handler = defaultEventHandler(resolve, reject);
            this.wasmSDKWorker.registerClearTimeoutCallback(clearTimeoutCallback);
            this.wasmSDKWorker.postMessage(msg, handler);
        });
    }
    setCameraPreviewMirrored(mirrored) {
        return new Promise((resolve, reject) => {
            const msg = new SetCameraPreviewMirrored(mirrored);
            const handler = defaultEventHandler(resolve, reject);
            this.wasmSDKWorker.postMessage(msg, handler);
        });
    }
    delete() {
        if (this.deleted) {
            return Promise.reject("Recognizer runner is already deleted.");
        }
        return new Promise((resolve, reject) => {
            const msg = new DeleteRecognizerRunner();
            const handler = defaultEventHandler(() => {
                this.deleted = true;
                resolve();
            }, reject);
            this.wasmSDKWorker.postMessage(msg, handler);
        });
    }
}
function getRecognizerHandles(remoteRecognizers) {
    const recognizerHandles = [];
    for (const remoteRecognizer of remoteRecognizers) {
        recognizerHandles.push(remoteRecognizer.getRemoteObjectHandle());
    }
    return recognizerHandles;
}
class WasmModuleWorkerProxy {
    constructor(wasmSDKWorker) {
        this.wasmSDKWorker = wasmSDKWorker;
    }
    createRecognizerRunner(recognizers, allowMultipleResults = false, metadataCallbacks = {}) {
        return new Promise((resolve, reject) => {
            const recognizerHandles = getRecognizerHandles(recognizers);
            const msg = new CreateRecognizerRunner(recognizerHandles, allowMultipleResults, createRegisteredCallbacks(metadataCallbacks));
            const handler = defaultEventHandler(() => {
                resolve(new RemoteRecognizerRunner(this.wasmSDKWorker));
            }, reject);
            this.wasmSDKWorker.postMessageAndRegisterCallbacks(msg, metadataCallbacks, handler);
        });
    }
    /* eslint-disable @typescript-eslint/no-explicit-any */
    newRecognizer(className, ...constructorArgs) {
        return new Promise((resolve, reject) => {
            const msg = new CreateNewRecognizer(className, wrapParameters(constructorArgs));
            const handler = defaultResultEventHandler((msg) => {
                const remoteRecognizer = new RemoteRecognizer(this.wasmSDKWorker, className, msg.objectHandle);
                resolve(remoteRecognizer);
            }, reject);
            this.wasmSDKWorker.postMessage(msg, handler);
        });
    }
}
class WasmSDKWorker {
    /* eslint-enable lines-between-class-members */
    constructor(worker, loadProgressCallback, rejectHandler) {
        this.eventHandlers = {};
        this.metadataCallbacks = {};
        this.clearTimeoutCallback = null;
        this.loadedWasmType = exports.WasmType.Basic; // will be updated after WASM gets loaded
        this.mbWasmWorker = worker;
        this.mbWasmWorker.onmessage = (event) => { this.handleWorkerEvent(event); };
        this.mbWasmWorker.onerror = () => {
            rejectHandler("Problem during initialization of worker file!");
            return;
        };
        this.mbWasmModule = new WasmModuleWorkerProxy(this);
        this.loadCallback = loadProgressCallback;
        this.recognizersWithCallbacks = new Map();
        this.showOverlay = false;
    }
    postMessage(message, eventHandler) {
        this.eventHandlers[message.messageID] = eventHandler;
        this.mbWasmWorker.postMessage(message);
    }
    postTransferrableMessage(message, eventHandler) {
        this.eventHandlers[message.messageID] = eventHandler;
        this.mbWasmWorker.postMessage(message, message.getTransferrables());
    }
    postMessageAndRegisterCallbacks(message, metadataCallbacks, eventHandler) {
        this.eventHandlers[message.messageID] = eventHandler;
        this.metadataCallbacks = metadataCallbacks;
        this.mbWasmWorker.postMessage(message);
    }
    registerClearTimeoutCallback(callback) {
        this.clearTimeoutCallback = callback;
    }
    registerRecognizerCallbacks(remoteRecognizerHandle, recognizer) {
        this.recognizersWithCallbacks.set(remoteRecognizerHandle, recognizer);
    }
    unregisterRecognizerCallbacks(remoteRecognizerHandle) {
        this.recognizersWithCallbacks.delete(remoteRecognizerHandle);
    }
    /**
     * Clean up the active instance of the SDK.
     *
     * It's not possible to use the SDK after this method is called.
     */
    delete() {
        this.mbWasmWorker.terminate();
    }
    handleWorkerEvent(event) {
        if ("isCallbackMessage" in event.data) {
            const msg = event.data;
            switch (msg.callbackType) {
                case MetadataCallback.onDebugText:
                    if (typeof this.metadataCallbacks.onDebugText === "function") {
                        this.metadataCallbacks.onDebugText(msg.callbackParameters[0]);
                    }
                    break;
                case MetadataCallback.onDetectionFailed:
                    if (typeof this.metadataCallbacks.onDetectionFailed === "function") {
                        this.metadataCallbacks.onDetectionFailed();
                    }
                    break;
                case MetadataCallback.onPointsDetection:
                    if (typeof this.metadataCallbacks.onPointsDetection === "function") {
                        this.metadataCallbacks.onPointsDetection(msg.callbackParameters[0]);
                    }
                    break;
                case MetadataCallback.onQuadDetection:
                    if (typeof this.metadataCallbacks.onQuadDetection === "function") {
                        this.metadataCallbacks.onQuadDetection(msg.callbackParameters[0]);
                    }
                    break;
                case MetadataCallback.onFirstSideResult:
                    if (typeof this.metadataCallbacks.onFirstSideResult === "function") {
                        this.metadataCallbacks.onFirstSideResult();
                    }
                    break;
                case MetadataCallback.clearTimeoutCallback:
                    if (this.clearTimeoutCallback && typeof this.clearTimeoutCallback.onClearTimeout === "function") {
                        this.clearTimeoutCallback.onClearTimeout();
                    }
                    break;
                case MetadataCallback.onGlare:
                    if (typeof this.metadataCallbacks.onGlare === "function") {
                        this.metadataCallbacks.onGlare(msg.callbackParameters[0]);
                    }
                    break;
                case MetadataCallback.recognizerCallback:
                    {
                        // first parameter is address, other parameters are callback parameters
                        const address = msg.callbackParameters.shift();
                        const recognizer = this.recognizersWithCallbacks.get(address.recognizerHandle);
                        if (recognizer !== undefined) {
                            recognizer.invokeCallback(address.callbackName, msg.callbackParameters);
                        }
                        else {
                            console.warn("Cannot find recognizer to deliver callback message. Maybe it's destroyed?", address);
                        }
                        break;
                    }
                default:
                    throw new Error(`Unknown callback type: ${MetadataCallback[msg.callbackType]}`);
            }
        }
        else if ("isLoadProgressMessage" in event.data) {
            const msg = event.data;
            if (typeof this.loadCallback === "function") {
                this.loadCallback(msg.progress);
            }
        }
        else {
            const msg = event.data;
            const eventHandler = this.eventHandlers[msg.messageID];
            delete this.eventHandlers[msg.messageID];
            eventHandler(msg);
        }
    }
    static createWasmWorker(worker, wasmLoadSettings, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const wasmWorker = new WasmSDKWorker(worker, wasmLoadSettings.loadProgressCallback, reject);
                const initMessage = new InitMessage(wasmLoadSettings, userId);
                const initEventHandler = defaultResultEventHandler((msg) => {
                    const successMsg = msg;
                    wasmWorker.showOverlay = successMsg.showOverlay;
                    wasmWorker.loadedWasmType = successMsg.wasmType;
                    resolve(wasmWorker);
                }, 
                /* eslint-disable @typescript-eslint/no-explicit-any */
                (error) => {
                    if (wasmWorker && typeof wasmWorker.delete === "function") {
                        wasmWorker.delete();
                    }
                    reject(error);
                }
                /* eslint-enable @typescript-eslint/no-explicit-any */
                );
                wasmWorker.postMessage(initMessage, initEventHandler);
            });
        });
    }
}

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
// ============================================ /
// DATA STRUCTURES                              /
// ============================================ /
/**
 * Specifies the orientation of the contents of the image.
 * This is important for some recognizers, especially when
 * performing recognition on the mobile device.
 */
exports.ImageOrientation = void 0;
(function (ImageOrientation) {
    /**
     * Image contents are rotated 90 degrees left.
     * This usually happens on mobile devices when capturing image while
     * device is held in "portrait" orientation, while device camera sensor
     * is mounted horizontally (i.e. produced image is in "landscape" orienation).
     */
    ImageOrientation[ImageOrientation["RotatedLeft90"] = 0] = "RotatedLeft90";
    /**
     * Image contents are not rotated in any manner.
     * This is the default for images captured using HTML canvas, as
     * used in FrameCapture class.
     * This orientation also usually happens on mobile devices when capturing
     * image while device is held in "landscape" orientation, while device
     * camera sensor is mounted horizontally (i.e. also in same orientation).
     */
    ImageOrientation[ImageOrientation["NoRotation"] = 1] = "NoRotation";
    /**
     * Image contents are rotated 90 degrees right.
     * This usually happens on mobile devices when capturing image while
     * device is held in "reverse-portrait" orientation, while device camera sensor
     * is mounted horizontally (i.e. produced image is in "landscape" orienation).
     */
    ImageOrientation[ImageOrientation["RotatedRight90"] = 2] = "RotatedRight90";
    /**
     * Image contents are rotated 180 degrees, i.e. image contents are "upside down".
     * This usually happens on mobile devices when capturing image while
     * device is held in "reverse-landscape" orientation, while device camera sensor
     * is mounted horizontally (i.e. produced image is in "landscape" orienation).
     */
    ImageOrientation[ImageOrientation["Rotated180"] = 3] = "Rotated180";
})(exports.ImageOrientation || (exports.ImageOrientation = {}));
/**
 * Specifies the state of the recognition result.
 */
exports.RecognizerResultState = void 0;
(function (RecognizerResultState) {
    /** Nothing has been recognized. */
    RecognizerResultState[RecognizerResultState["Empty"] = 0] = "Empty";
    /** Something has been recognized, but some mandatory data is still missing. */
    RecognizerResultState[RecognizerResultState["Uncertain"] = 1] = "Uncertain";
    /** All required data has been recognized. */
    RecognizerResultState[RecognizerResultState["Valid"] = 2] = "Valid";
    /** Single stage of a multi-stage recognition is finished. */
    RecognizerResultState[RecognizerResultState["StageValid"] = 3] = "StageValid";
})(exports.RecognizerResultState || (exports.RecognizerResultState = {}));

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
/**
 * Detection status of the specific detected object.
 */
exports.DetectionStatus = void 0;
(function (DetectionStatus) {
    /** Detection failed, form not detected */
    DetectionStatus[DetectionStatus["Fail"] = 0] = "Fail";
    /** Object was successfully detected */
    DetectionStatus[DetectionStatus["Success"] = 1] = "Success";
    /** Object detected, but the camera is too far above it */
    DetectionStatus[DetectionStatus["CameraTooHigh"] = 2] = "CameraTooHigh";
    /** Fallback detection of an object was successful */
    DetectionStatus[DetectionStatus["FallbackSuccess"] = 3] = "FallbackSuccess";
    /** Object is detected, but parts of it are not in image */
    DetectionStatus[DetectionStatus["Partial"] = 4] = "Partial";
    /** Object detected, but camera is at too big angle */
    DetectionStatus[DetectionStatus["CameraAtAngle"] = 5] = "CameraAtAngle";
    /** Object detected, but the camera is too near to it */
    DetectionStatus[DetectionStatus["CameraTooNear"] = 6] = "CameraTooNear";
    /** Document detected, but document is too close to the edge of the frame */
    DetectionStatus[DetectionStatus["DocumentTooCloseToEdge"] = 7] = "DocumentTooCloseToEdge";
})(exports.DetectionStatus || (exports.DetectionStatus = {}));

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
// ============================================ /
// Frame capture and camera management support. /
// ============================================ /
let canvas;
/**
 * Represents a captured frame from HTMLVideoElement.
 */
class CapturedFrame {
    constructor(imageData, orientation, videoFrame) {
        this.imageData = imageData;
        this.orientation = orientation;
        this.videoFrame = videoFrame;
    }
}
/**
 * Captures a frame from any CanvasImageSource, such as HTMLVideoElement or HTMLImageElement.
 * @param imageSource image source from which frame should be captured
 * @returns instance of CapturedFrame
 */
function captureFrame(imageSource) {
    let imageWidth;
    let imageHeight;
    let videoFrame = false;
    if (imageSource instanceof HTMLVideoElement) {
        imageWidth = imageSource.videoWidth;
        imageHeight = imageSource.videoHeight;
        videoFrame = true;
    }
    else if (imageSource instanceof HTMLImageElement) {
        imageWidth = imageSource.naturalWidth;
        imageHeight = imageSource.naturalHeight;
    }
    else if (imageSource instanceof SVGImageElement) {
        throw new Error("Recognition of SVG elements not supported!");
    }
    else {
        imageWidth = imageSource.width;
        imageHeight = imageSource.height;
    }
    canvas = canvas || document.createElement("canvas");
    canvas.width = imageWidth;
    canvas.height = imageHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
        throw new Error("Could not get canvas 2d context!");
    }
    ctx.drawImage(imageSource, 0, 0, canvas.width, canvas.height);
    const pixelData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    return new CapturedFrame(pixelData, 
    // TODO: https://developer.mozilla.org/en-US/docs/Web/API/Screen/orientation
    // or https://developer.mozilla.org/en-US/docs/Web/API/Window/orientation
    exports.ImageOrientation.NoRotation, videoFrame);
}

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
/**
 * Preferred type of camera to be used when opening the camera feed.
 */
exports.PreferredCameraType = void 0;
(function (PreferredCameraType) {
    /** Prefer back facing camera */
    PreferredCameraType[PreferredCameraType["BackFacingCamera"] = 0] = "BackFacingCamera";
    /** Prefer front facing camera */
    PreferredCameraType[PreferredCameraType["FrontFacingCamera"] = 1] = "FrontFacingCamera";
})(exports.PreferredCameraType || (exports.PreferredCameraType = {}));
/**
 * Explanation why VideoRecognizer has failed to open the camera feed.
 */
exports.NotSupportedReason = void 0;
(function (NotSupportedReason) {
    /** navigator.mediaDevices.getUserMedia is not supported by current browser for current context. */
    NotSupportedReason["MediaDevicesNotSupported"] = "MediaDevicesNotSupported";
    /** Camera with requested features is not available on current device. */
    NotSupportedReason["CameraNotFound"] = "CameraNotFound";
    /** Camera access was not granted by the user. */
    NotSupportedReason["CameraNotAllowed"] = "CameraNotAllowed";
    /** Unable to start playing because camera is already in use. */
    NotSupportedReason["CameraInUse"] = "CameraInUse";
    /** Camera is currently not available due to a OS or hardware error. */
    NotSupportedReason["CameraNotAvailable"] = "CameraNotAvailable";
    /** There is no provided video element to which the camera feed should be redirected. */
    NotSupportedReason["VideoElementNotProvided"] = "VideoElementNotProvided";
})(exports.NotSupportedReason || (exports.NotSupportedReason = {}));
/**
 * The error object thrown when VideoRecognizer fails to open the camera feed.
 */
class VideoRecognizerError extends Error {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    constructor(reason, ...params) {
        super(...params);
        this.reason = reason;
        this.name = "VideoRecognizerError";
    }
}
/**
 * Indicates mode of recognition in VideoRecognizer.
 */
exports.VideoRecognitionMode = void 0;
(function (VideoRecognitionMode) {
    /** Normal recognition */
    VideoRecognitionMode[VideoRecognitionMode["Recognition"] = 0] = "Recognition";
    /** Indefinite scan. Useful for profiling the performance of scan (using onDebugText metadata callback) */
    VideoRecognitionMode[VideoRecognitionMode["RecognitionTest"] = 1] = "RecognitionTest";
    /** Only detection. Useful for profiling the performance of detection (using onDebugText metadata callback) */
    VideoRecognitionMode[VideoRecognitionMode["DetectionTest"] = 2] = "DetectionTest";
})(exports.VideoRecognitionMode || (exports.VideoRecognitionMode = {}));
/**
 * A wrapper around RecognizerRunner that can use it to perform recognition of video feeds - either from live camera or
 * from predefined video file.
 */
class VideoRecognizer {
    /**
     * **Use only if provided factory functions are not well-suited for your use case.**
     *
     * Creates a new VideoRecognizer with provided HTMLVideoElement.
     *
     * Keep in mind that HTMLVideoElement **must have** a video feed which is ready to use.
     *
     * - If you want to take advantage of provided camera management, use `createVideoRecognizerFromCameraStream`
     * - In case that static video file should be processed, use `createVideoRecognizerFromVideoPath`
     *
     * @param videoFeed HTMLVideoElement with video feed which is going to be processed
     * @param recognizerRunner RecognizerRunner that should be used for video stream recognition
     * @param cameraFlipped Whether the camera is flipped, e.g. if front-facing camera is used
     * @param allowManualVideoPlayout Whether to allow manual video playout. Default value is `false`
     */
    constructor(videoFeed, recognizerRunner, cameraFlipped = false, allowManualVideoPlayout = false) {
        /** *********************************************************************************************
         * PRIVATE AREA
         */
        this.videoFeed = null;
        this.cancelled = false;
        this.timedOut = false;
        this.recognitionPaused = false;
        this.recognitionTimeoutMs = 15000;
        this.timeoutID = 0;
        this.videoRecognitionMode = exports.VideoRecognitionMode.Recognition;
        this.onScanningDone = null;
        this.allowManualVideoPlayout = false;
        this.cameraFlipped = false;
        this.videoFeed = videoFeed;
        this.recognizerRunner = recognizerRunner;
        this.cameraFlipped = cameraFlipped;
        this.allowManualVideoPlayout = allowManualVideoPlayout;
    }
    /**
     * Creates a new VideoRecognizer by opening a camera stream and attaching it to given HTMLVideoElement. If camera
     * cannot be accessed, the returned promise will be rejected.
     *
     * @param cameraFeed HTMLVideoELement to which camera stream should be attached
     * @param recognizerRunner RecognizerRunner that should be used for video stream recognition
     * @param cameraId User can provide specific camera ID to be selected and used
     * @param preferredCameraType Whether back facing or front facing camera is preferred. Obeyed only if there is
     *        a choice (i.e. if device has only front-facing camera, the opened camera will be a front-facing camera,
     *        regardless of preference)
     */
    static createVideoRecognizerFromCameraStream(cameraFeed, recognizerRunner, cameraId = null, preferredCameraType = exports.PreferredCameraType.BackFacingCamera) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: refactor this function into async/await syntax, instead of reject use throw
            /* eslint-disable */
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                // Check for tag name intentionally left out, so it's possible to use VideoRecognizer with custom elements.
                if (!cameraFeed || !(cameraFeed instanceof Element)) {
                    const errorMessage = "Video element, i.e. camera feed is not provided!";
                    reject(new VideoRecognizerError(exports.NotSupportedReason.VideoElementNotProvided, errorMessage));
                    return;
                }
                if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                    try {
                        const selectedCamera = yield selectCamera(cameraId, preferredCameraType);
                        if (selectedCamera === null) {
                            reject(new VideoRecognizerError(exports.NotSupportedReason.CameraNotFound));
                            return;
                        }
                        const constraints = {
                            audio: false,
                            video: {
                                width: {
                                    min: 640,
                                    ideal: 1920,
                                    max: 1920
                                },
                                height: {
                                    min: 480,
                                    ideal: 1080,
                                    max: 1080
                                }
                            }
                        };
                        if (selectedCamera.deviceId === "") {
                            const isPreferredBackFacing = preferredCameraType === exports.PreferredCameraType.BackFacingCamera;
                            constraints.video.facingMode =
                                {
                                    ideal: isPreferredBackFacing ? "environment" : "user"
                                };
                        }
                        else {
                            constraints.video.deviceId =
                                {
                                    exact: selectedCamera.deviceId
                                };
                        }
                        const stream = yield navigator.mediaDevices.getUserMedia(constraints);
                        cameraFeed.controls = false;
                        cameraFeed.srcObject = stream;
                        let cameraFlipped = false;
                        // mirror the camera view for front-facing camera
                        if (selectedCamera.facing === exports.PreferredCameraType.FrontFacingCamera) {
                            cameraFeed.style.transform = "scaleX(-1)";
                            cameraFlipped = true;
                        }
                        // TODO: await maybe not needed here
                        yield recognizerRunner.setCameraPreviewMirrored(cameraFlipped);
                        resolve(new VideoRecognizer(cameraFeed, recognizerRunner, cameraFlipped));
                    }
                    catch (error) {
                        let errorReason = exports.NotSupportedReason.CameraInUse;
                        switch (error.name) {
                            case "NotFoundError":
                            case "OverconstrainedError":
                                errorReason = exports.NotSupportedReason.CameraNotFound;
                                break;
                            case "NotAllowedError":
                            case "SecurityError":
                                errorReason = exports.NotSupportedReason.CameraNotAllowed;
                                break;
                            case "AbortError":
                            case "NotReadableError":
                                errorReason = exports.NotSupportedReason.CameraNotAvailable;
                                break;
                            case "TypeError": // this should never happen. If it does, rethrow it
                                throw error;
                        }
                        reject(new VideoRecognizerError(errorReason, error.message));
                    }
                }
                else {
                    reject(new VideoRecognizerError(exports.NotSupportedReason.MediaDevicesNotSupported));
                }
            }));
            /* eslint-enable */
        });
    }
    /**
     * Creates a new VideoRecognizer by attaching the given URL to video to given HTMLVideoElement and using it to
     * display video frames while processing them.
     *
     * @param videoPath URL of the video file that should be recognized.
     * @param videoFeed HTMLVideoElement to which video file will be attached
     * @param recognizerRunner RecognizerRunner that should be used for video stream recognition.
     */
    static createVideoRecognizerFromVideoPath(videoPath, videoFeed, recognizerRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                videoFeed.src = videoPath;
                videoFeed.currentTime = 0;
                videoFeed.onended = () => {
                    videoRecognizer.cancelRecognition();
                };
                const videoRecognizer = new VideoRecognizer(videoFeed, recognizerRunner);
                resolve(videoRecognizer);
            });
        });
    }
    flipCamera() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.videoFeed) {
                if (!this.cameraFlipped) {
                    this.videoFeed.style.transform = "scaleX(-1)";
                    this.cameraFlipped = true;
                }
                else {
                    this.videoFeed.style.transform = "scaleX(1)";
                    this.cameraFlipped = false;
                }
                yield this.recognizerRunner.setCameraPreviewMirrored(this.cameraFlipped);
            }
        });
    }
    /**
     * Sets the video recognition mode to be used.
     *
     * @param videoRecognitionMode the video recognition mode to be used.
     */
    setVideoRecognitionMode(videoRecognitionMode) {
        return __awaiter(this, void 0, void 0, function* () {
            this.videoRecognitionMode = videoRecognitionMode;
            const isDetectionMode = this.videoRecognitionMode === exports.VideoRecognitionMode.DetectionTest;
            yield this.recognizerRunner.setDetectionOnlyMode(isDetectionMode);
        });
    }
    /**
     * Starts the recognition of the video stream associated with this VideoRecognizer. The stream will be unpaused and
     * recognition loop will start. After recognition completes, a onScanningDone callback will be invoked with state of
     * the recognition.
     *
     * NOTE: As soon as the execution of the callback completes, the recognition loop will continue and recognition
     *       state will be retained. To clear the recognition state, use resetRecognizers (within your callback). To
     *       pause the recognition loop, use pauseRecognition (within your callback) - to resume it later use
     *       resumeRecognition. To completely stop the recognition and video feed, while keeping the ability to use this
     *       VideoRecognizer later, use pauseVideoFeed. To completely stop the recognition and video feed and release
     *       all the resources involved with video stream, use releaseVideoFeed.
     *
     * @param onScanningDone Callback that will be invoked when recognition completes.
     * @param recognitionTimeoutMs Amount of time before returned promise will be resolved regardless of whether
     *        recognition was successful or not.
     */
    startRecognition(onScanningDone, recognitionTimeoutMs = 15000) {
        return new Promise((resolve, reject) => {
            if (this.videoFeed === null) {
                reject(new Error("The associated video feed has been released!"));
                return;
            }
            if (!this.videoFeed.paused) {
                reject(new Error("The associated video feed is not paused. Use resumeRecognition instead!"));
                return;
            }
            this.cancelled = false;
            this.recognitionPaused = false;
            this.clearTimeout();
            this.recognitionTimeoutMs = recognitionTimeoutMs;
            this.onScanningDone = onScanningDone;
            void this.recognizerRunner.setClearTimeoutCallback({ onClearTimeout: () => this.clearTimeout() });
            this.videoFeed.play().then(() => this.playPauseEvent().then(() => resolve()).catch((error) => reject(error)), 
            /* eslint-disable @typescript-eslint/no-explicit-any */
            (nativeError) => {
                if (!this.allowManualVideoPlayout) {
                    console.warn("Native error", nativeError);
                    reject(new Error("The play() request was interrupted or prevented by browser security rules!"));
                    return;
                }
                if (!this.videoFeed) {
                    return;
                }
                this.videoFeed.controls = true;
                this.videoFeed.addEventListener("play", () => void this.playPauseEvent().then().catch((error) => reject(error)));
                this.videoFeed.addEventListener("pause", () => void this.playPauseEvent().then().catch((error) => reject(error)));
            }
            /* eslint-enable @typescript-eslint/no-explicit-any */
            );
        });
    }
    /**
     * Performs the recognition of the video stream associated with this VideoRecognizer. The stream will be
     * unpaused, recognition will be performed and promise will be resolved with recognition status. After
     * the resolution of returned promise, the video stream will be paused, but not released. To release the
     * stream, use function releaseVideoFeed.
     * This is a simple version of startRecognition that should be used for most cases, like when you only need
     * to perform one scan per video session.
     *
     * @param recognitionTimeoutMs Amount of time before returned promise will be resolved regardless of whether
     *        recognition was successful or not.
     */
    recognize(recognitionTimeoutMs = 15000) {
        return new Promise((resolve, reject) => {
            try {
                void this.startRecognition((recognitionState) => {
                    this.pauseVideoFeed();
                    resolve(recognitionState);
                }, recognitionTimeoutMs).then(
                // Do nothing, callback is used for resolving
                ).catch((error) => reject(error));
            }
            catch (error) {
                reject(error);
            }
        });
    }
    /**
     * Cancels current ongoing recognition. Note that after cancelling the recognition, the callback given to
     * startRecognition will be immediately called. This also means that the promise returned from method
     * recognize will be resolved immediately.
     */
    cancelRecognition() {
        this.cancelled = true;
    }
    /**
     * Pauses the video feed. You can resume the feed by calling recognize or startRecognition.
     * Note that this pauses both the camera feed and recognition. If you just want to pause
     * recognition, while keeping the camera feed active, call method pauseRecognition.
     */
    pauseVideoFeed() {
        this.pauseRecognition();
        if (this.videoFeed) {
            this.videoFeed.pause();
        }
    }
    /**
     * Pauses the recognition. This means that video frames that arrive from given video source
     * will not be recognized. To resume recognition, call resumeRecognition(boolean).
     * Unlike cancelRecognition, the callback given to startRecognition will not be invoked after pausing
     * the recognition (unless there is already processing in-flight that may call the callback just before
     * pausing the actual recognition loop).
     */
    pauseRecognition() {
        this.recognitionPaused = true;
    }
    /**
     * Convenience method for invoking resetRecognizers on associated RecognizerRunner.
     * @param hardReset Same as in RecognizerRunner.resetRecognizers.
     */
    resetRecognizers(hardReset) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.recognizerRunner.resetRecognizers(hardReset);
        });
    }
    /**
     * Convenience method for accessing RecognizerRunner associated with this VideoRecognizer.
     * Sometimes it's useful to reconfigure RecognizerRunner while handling onScanningDone callback
     * and this method makes that much more convenient.
     */
    getRecognizerRunner() {
        return this.recognizerRunner;
    }
    /**
     * Resumes the recognition. The video feed must not be paused. If it is, an error will be thrown.
     * If video feed is paused, you should use recognize or startRecognition methods.
     * @param resetRecognizers Indicates whether resetRecognizers should be invoked while resuming the recognition
     */
    resumeRecognition(resetRecognizers) {
        return new Promise((resolve, reject) => {
            this.cancelled = false;
            this.timedOut = false;
            this.recognitionPaused = false;
            if (this.videoFeed && this.videoFeed.paused) {
                const msg = "Cannot resume recognition while video feed is paused! Use recognize or startRecognition";
                reject(new Error(msg));
                return;
            }
            setTimeout(() => {
                if (resetRecognizers) {
                    this.resetRecognizers(true).then(() => {
                        void this.recognitionLoop().then(() => resolve()).catch((error) => reject(error));
                    }).catch(() => {
                        reject(new Error("Could not reset recognizers!"));
                    });
                }
                else {
                    void this.recognitionLoop().then(() => resolve()).catch((error) => reject(error));
                }
            }, 1);
        });
    }
    /**
     * Stops all media stream tracks associated with current HTMLVideoElement and removes any references to it.
     * Note that after calling this method you can no longer use this VideoRecognizer for recognition.
     * This method should be called after you no longer plan on performing video recognition to let browser know
     * that it can release resources related to any media streams used.
     */
    releaseVideoFeed() {
        if (this.videoFeed !== null) {
            if (this.videoFeed.srcObject !== null) {
                if (!this.videoFeed.paused)
                    this.cancelRecognition();
                this.videoFeed.srcObject.getTracks().forEach(track => track.stop());
                this.videoFeed.srcObject = null;
            }
            this.videoFeed = null;
        }
    }
    playPauseEvent() {
        return new Promise((resolve, reject) => {
            if (this.videoFeed && this.videoFeed.paused) {
                this.cancelRecognition();
                resolve();
                return;
            }
            else {
                this.resumeRecognition(true).then(() => resolve()).catch((error) => reject(error));
            }
        });
    }
    recognitionLoop() {
        return new Promise((resolve, reject) => {
            if (!this.videoFeed) {
                reject(new Error("Missing video feed!"));
                return;
            }
            const cameraFrame = captureFrame(this.videoFeed);
            this.recognizerRunner.processImage(cameraFrame).then((processResult) => {
                const completeFn = () => {
                    if (!this.recognitionPaused) {
                        // ensure browser events are processed and then recognize another frame
                        setTimeout(() => {
                            this.recognitionLoop().then(() => resolve()).catch((error) => reject(error));
                        }, 1);
                    }
                    else {
                        resolve();
                    }
                };
                if (processResult === exports.RecognizerResultState.Valid || this.cancelled || this.timedOut) {
                    if (this.videoRecognitionMode === exports.VideoRecognitionMode.Recognition || this.cancelled) {
                        // valid results, clear the timeout and invoke the callback
                        this.clearTimeout();
                        if (this.onScanningDone) {
                            void this.onScanningDone(processResult);
                        }
                        // after returning from callback, resume scanning if not paused
                    }
                    else {
                        // in test mode - reset the recognizers and continue the loop indefinitely
                        this.recognizerRunner.resetRecognizers(true).then(() => {
                            // clear any time outs
                            this.clearTimeout();
                            completeFn();
                        }).catch((error) => reject(error));
                        return;
                    }
                }
                else if (processResult === exports.RecognizerResultState.Uncertain) {
                    if (this.timeoutID === 0) {
                        // first non-empty result - start timeout
                        this.timeoutID = window.setTimeout(() => { this.timedOut = true; }, this.recognitionTimeoutMs);
                    }
                    completeFn();
                    return;
                }
                else if (processResult === exports.RecognizerResultState.StageValid) {
                    // stage recognition is finished, clear timeout and resume recognition
                    this.clearTimeout();
                    completeFn();
                    return;
                }
                completeFn();
            }).catch((error) => reject(error));
        });
    }
    clearTimeout() {
        if (this.timeoutID > 0) {
            window.clearTimeout(this.timeoutID);
            this.timeoutID = 0;
        }
    }
}
// inspired by https://unpkg.com/browse/scandit-sdk@4.6.1/src/lib/cameraAccess.ts
const backCameraKeywords = [
    "rear",
    "back",
    "rück",
    "arrière",
    "trasera",
    "trás",
    "traseira",
    "posteriore",
    "后面",
    "後面",
    "背面",
    "后置",
    "後置",
    "背置",
    "задней",
    "الخلفية",
    "후",
    "arka",
    "achterzijde",
    "หลัง",
    "baksidan",
    "bagside",
    "sau",
    "bak",
    "tylny",
    "takakamera",
    "belakang",
    "אחורית",
    "πίσω",
    "spate",
    "hátsó",
    "zadní",
    "darrere",
    "zadná",
    "задня",
    "stražnja",
    "belakang",
    "बैक"
];
function isBackCameraLabel(label) {
    const lowercaseLabel = label.toLowerCase();
    return backCameraKeywords.some(keyword => lowercaseLabel.includes(keyword));
}
class SelectedCamera {
    constructor(mdi, facing) {
        this.deviceId = mdi.deviceId;
        this.facing = facing;
        this.groupId = mdi.groupId;
        this.label = mdi.label;
    }
}
function selectCamera(cameraId, preferredCameraType) {
    return __awaiter(this, void 0, void 0, function* () {
        const frontCameras = [];
        const backCameras = [];
        {
            let devices = yield navigator.mediaDevices.enumerateDevices();
            // if permission is not given, label of video devices will be empty string
            if (devices.filter(device => device.kind === "videoinput").every(device => device.label === "")) {
                const stream = yield navigator.mediaDevices.getUserMedia({
                    video: {
                        facingMode: { ideal: "environment" }
                    },
                    audio: false
                });
                // enumerate devices again - now the label field should be non-empty, as we have a stream active
                // (even if we didn't get persistent permission for camera)
                devices = yield navigator.mediaDevices.enumerateDevices();
                // close the stream, as we don't need it anymore
                stream.getTracks().forEach(track => track.stop());
            }
            const cameras = devices.filter(device => device.kind === "videoinput");
            for (const camera of cameras) {
                if (isBackCameraLabel(camera.label)) {
                    backCameras.push(new SelectedCamera(camera, exports.PreferredCameraType.BackFacingCamera));
                }
                else {
                    frontCameras.push(new SelectedCamera(camera, exports.PreferredCameraType.FrontFacingCamera));
                }
            }
        }
        if (frontCameras.length > 0 || backCameras.length > 0) {
            // decide from which array the camera will be selected
            let cameraPool = (backCameras.length > 0 ? backCameras : frontCameras);
            // if there is at least one back facing camera and user prefers back facing camera, use that as a selection pool
            if (preferredCameraType === exports.PreferredCameraType.BackFacingCamera && backCameras.length > 0) {
                cameraPool = backCameras;
            }
            // if there is at least one front facing camera and is preferred by user, use that as a selection pool
            if (preferredCameraType === exports.PreferredCameraType.FrontFacingCamera && frontCameras.length > 0) {
                cameraPool = frontCameras;
            }
            // otherwise use whichever pool is non-empty
            // sort camera pool by label
            cameraPool = cameraPool.sort((camera1, camera2) => camera1.label.localeCompare(camera2.label));
            // Check if cameras are labeled with resolution information, take the higher-resolution one in that case
            // Otherwise pick the first camera
            {
                let selectedCameraIndex = 0;
                const cameraResolutions = cameraPool.map(camera => {
                    const regExp = RegExp(/\b([0-9]+)MP?\b/, "i");
                    const match = regExp.exec(camera.label);
                    if (match !== null) {
                        return parseInt(match[1], 10);
                    }
                    else {
                        return NaN;
                    }
                });
                if (!cameraResolutions.some(cameraResolution => isNaN(cameraResolution))) {
                    selectedCameraIndex = cameraResolutions.lastIndexOf(Math.max(...cameraResolutions));
                }
                if (cameraId) {
                    let cameraDevice = null;
                    cameraDevice = frontCameras.filter(device => device.deviceId === cameraId)[0];
                    if (!cameraDevice) {
                        cameraDevice = backCameras.filter(device => device.deviceId === cameraId)[0];
                    }
                    return cameraDevice || null;
                }
                return cameraPool[selectedCameraIndex];
            }
        }
        else {
            // no cameras available on the device
            return null;
        }
    });
}

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
const defaultWasmModuleName = "BlinkIDWasmSDK";

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
/**
 * Settings object for function loadWasmModule.
 */
class WasmSDKLoadSettings {
    /**
     * @param licenseKey License key for unlocking the WebAssembly module.
     */
    constructor(licenseKey) {
        /**
         * Write a hello message to the browser console when license check is successfully performed.
         *
         * Hello message will contain the name and version of the SDK, which are required information for all support
         * tickets.
         *
         * The default value is true.
         */
        this.allowHelloMessage = true;
        /**
         * Absolute location of WASM and related JS/data files. Useful when resource files should be loaded over CDN, or
         * when web frameworks/libraries are used which store resources in specific locations, e.g. inside "assets" folder.
         *
         * Important: if the engine is hosted on another origin, CORS must be enabled between two hosts. That is, server
         * where engine is hosted must have 'Access-Control-Allow-Origin' header for the location of the web app.
         *
         * Important: SDK and WASM resources must be from the same version of a package.
         *
         * Default value is empty string, i.e. "". In case of empty string, value of "window.location.origin" property is
         * going to be used.
         */
        this.engineLocation = "";
        /**
         * Type of the WASM that will be loaded. By default, if not set, the SDK will automatically determine the best WASM
         * to load.
         */
        this.wasmType = null;
        /**
         * Defines the number of workers that will be used for multi-threaded processing of the images. If not set, the
         * number of worker used will match the number of detected CPU cores on a device.
         *
         * If the browser does not support multi-threaded processing or it was deliberately disabled using the `wasmType`
         * property, then this property will be ignored.
         */
        this.numberOfWorkers = null;
        /**
         * Optional callback function that will report the SDK loading progress.
         *
         * This can be useful for displaying progress bar to users with slow connections.
         *
         * The default value is null.
         */
        this.loadProgressCallback = null;
        /**
         * Name of the file containing the WebAssembly module.
         *
         * Change this only if you have renamed the original WASM and its support JS file for your purposes.
         */
        this.wasmModuleName = defaultWasmModuleName;
        if (!licenseKey) {
            throw new Error("Missing license key!");
        }
        this.licenseKey = licenseKey;
    }
}

const bulkMemory = async () => WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 5, 3, 1, 0, 1, 10, 14, 1, 12, 0, 65, 0, 65, 0, 65, 0, 252, 10, 0, 0, 11])),
      saturatedFloatToInt = async () => WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 10, 12, 1, 10, 0, 67, 0, 0, 0, 0, 252, 0, 26, 11])),
      signExtensions = async () => WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 10, 8, 1, 6, 0, 65, 0, 192, 26, 11])),
      threads = () => (async e => {
  try {
    return "undefined" != typeof MessageChannel && new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)), WebAssembly.validate(e);
  } catch (e) {
    return !1;
  }
})(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 5, 4, 1, 3, 1, 1, 10, 11, 1, 9, 0, 65, 0, 254, 16, 2, 0, 26, 11]));

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
function detectWasmType(engineLocation) {
    return __awaiter(this, void 0, void 0, function* () {
        // determine if all features required for advanced WASM are available
        // currently, advanced wasm requires bulk memory, non-trapping floating point
        // and sign extension (this may change in the future).
        const haveBulkMemory = yield bulkMemory();
        const haveNonTrappingFloatingPoint = yield saturatedFloatToInt();
        const haveSignExtension = yield signExtensions();
        const haveThreads = yield threads();
        if (haveBulkMemory && haveNonTrappingFloatingPoint && haveSignExtension) {
            if (haveThreads) {
                /* The external worker files are loaded by the Emscripten’s thread support code - each
                 * worker represents a thread. It’s not currently possible to put all those workers
                 * inline.
                 *
                 * Also, due to browser security rules, it's not possible to load external worker files
                 * from a different origin.
                 *
                 * Therefore, we need to ensure that remote workers are accessible. For that reason,
                 * there is a dummy `Worker.test.js` file. If that file is loaded successfully, we can
                 * say that `AdvancedWithThreads` bundle is available.
                 */
                try {
                    const worker = new Worker(`${engineLocation}/Worker.test.js`);
                    worker.terminate();
                    return exports.WasmType.AdvancedWithThreads;
                }
                catch (_a) {
                    return exports.WasmType.Advanced;
                }
            }
            else {
                return exports.WasmType.Advanced;
            }
        }
        else {
            return exports.WasmType.Basic;
        }
    });
}
function wasmFolder(wasmType) {
    switch (wasmType) {
        case exports.WasmType.AdvancedWithThreads: return "advanced-threads";
        case exports.WasmType.Advanced: return "advanced";
        case exports.WasmType.Basic: return "basic";
    }
}

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
// taken from https://stackoverflow.com/a/2117523/213057
/* eslint-disable */
function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));
}
/* eslint-enable */
function getUserID() {
    try {
        let userId = localStorage.getItem("mb-user-id");
        if (userId === null) {
            userId = uuidv4();
            localStorage.setItem("mb-user-id", userId);
        }
        return userId;
    }
    catch (error) {
        // local storage is disabled, generate new user ID every time
        return uuidv4();
    }
}
/**
 * Check if browser supports ES6, which is prerequisite for this SDK to execute.
 *
 * IMPORTANT: it's not possible to run this function from MicroblinkSDK if browser doesn't support
 * ES6 since this file won't be able to load.
 *
 * This function is here as a placeholder so it can be copied to standalone JS file or directly into 'index.html'.
 */
// export function isES6Supported(): boolean
// {
//     if ( typeof Symbol === "undefined" )
//     {
//         return false;
//     }
//     try
//     {
//         eval( "class Foo {}" );
//         eval( "var bar = (x) => x+1" );
//     }
//     catch ( e )
//     {
//         return false;
//     }
//     return true;
// }
/**
 * Checks if browser is supported by the SDK. The minimum requirements for the browser is
 * the support for WebAssembly. If your browser does not support executing WebAssembly,
 * this function will return `false`.
 */
function isBrowserSupported() {
    // based on https://stackoverflow.com/a/47880734
    try {
        if (typeof WebAssembly === "object" && typeof WebAssembly.instantiate === "function") {
            const module = new WebAssembly.Module(Uint8Array.of(0x0, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00));
            if (module instanceof WebAssembly.Module)
                return new WebAssembly.Instance(module) instanceof WebAssembly.Instance;
        }
    }
    catch (ignored) {
        return false;
    }
    return false;
}
/**
 * Asynchronously loads and compiles the WebAssembly module.
 * @param loadSettings Object defining the settings for loading the WebAssembly module.
 * @returns Promise that resolves if WebAssembly module was successfully loaded and rejects if not.
 */
/* eslint-disable @typescript-eslint/no-explicit-any,
                  @typescript-eslint/no-unsafe-assignment,
                  @typescript-eslint/no-unsafe-member-access,
                  @typescript-eslint/no-unsafe-call */
function loadWasmModule(loadSettings) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            if (!loadSettings || typeof loadSettings !== "object") {
                reject("Missing WASM load settings!");
                return;
            }
            if (typeof loadSettings.licenseKey !== "string") {
                reject("Missing license key!");
                return;
            }
            if (!loadSettings.wasmModuleName) {
                reject("Missing WASM module name!");
                return;
            }
            if (typeof loadSettings.engineLocation !== "string") {
                reject("Setting property 'engineLocation' must be a string!");
                return;
            }
            // obtain user ID from local storage
            const userId = getUserID();
            try {
                const blob = new Blob([String.raw `!function(){"use strict";
/*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */function e(e,t,s,r){return new(s||(s=Promise))((function(n,i){function o(e){try{c(r.next(e))}catch(e){i(e)}}function a(e){try{c(r.throw(e))}catch(e){i(e)}}function c(e){var t;e.done?n(e.value):(t=e.value,t instanceof s?t:new s((function(e){e(t)}))).then(o,a)}c((r=r.apply(e,t||[])).next())}))}let t=0;class s{constructor(e){this.action=e,this.messageID=function(){const e=t;return t+=1,e}()}}class r extends s{constructor(e,t){super(r.action),this.wasmModuleName=e.wasmModuleName,this.licenseKey=e.licenseKey,this.userId=t,this.registerLoadCallback=null!==e.loadProgressCallback,this.allowHelloMessage=e.allowHelloMessage,this.engineLocation=e.engineLocation,this.wasmType=e.wasmType,this.numberOfWorkers=e.numberOfWorkers}}var n,i;r.action="init",function(e){e[e.Any=0]="Any",e[e.Recognizer=1]="Recognizer",e[e.RecognizerSettings=2]="RecognizerSettings",e[e.Callback=3]="Callback"}(n||(n={}));class o extends s{constructor(e,t){super(o.action),this.funcName=e,this.params=t}}o.action="invokeFunction";class a extends s{constructor(e,t){super(a.action),this.className=e,this.params=t}}a.action="createNewNativeObject";class c extends s{constructor(e,t,s){super(c.action),this.recognizerHandles=e,this.allowMultipleResults=t,this.registeredMetadataCallbacks=s}}c.action="createRecognizerRunner";class l extends s{constructor(e,t){super(l.action),this.recognizerHandles=e,this.allowMultipleResults=t}}l.action="reconfigureRecognizerRunner";class u extends s{constructor(){super(u.action)}}u.action="deleteRecognizerRunner";class h extends s{constructor(e,t,s){super(h.action),this.objectHandle=e,this.methodName=t,this.params=s}}h.action="invokeObject";class d extends s{constructor(e){super(d.action),this.frame=e}getTransferrables(){return[this.frame.imageData.data.buffer]}}d.action="processImage";class g extends s{constructor(e){super(g.action),this.hardReset=e}}g.action="resetRecognizers";class m extends s{constructor(e){super(m.action),this.registeredMetadataCallbacks=e}}m.action="registerMetadataCallbacks";class f extends s{constructor(e){super(f.action),this.detectionOnlyMode=e}}f.action="setDetectionOnly";class y extends s{constructor(e){super(y.action),this.callbackNonEmpty=e}}y.action="setClearTimeoutCallback";class p extends s{constructor(e){super(p.action),this.cameraPreviewMirrored=e}}p.action="setCameraPreviewMirrored";class b{constructor(e,t,s){this.success=!0,this.error=null,this.messageID=e,this.success=t,this.error=s}}class R{constructor(e,t,s,r){this.success=!0,this.showOverlay=!0,this.messageID=e,this.showOverlay=s,this.wasmType=r}}class k extends b{constructor(e,t){super(e,!0,null),this.result=t}}class w extends b{constructor(e,t){super(e,!0,null),this.objectHandle=t}}class v extends b{constructor(e,t){super(e,!0,null),this.recognitionState=t}}class C{constructor(e){this.isLoadProgressMessage=!0,this.progress=e}}!function(e){e[e.onDebugText=0]="onDebugText",e[e.onDetectionFailed=1]="onDetectionFailed",e[e.onQuadDetection=2]="onQuadDetection",e[e.onPointsDetection=3]="onPointsDetection",e[e.onFirstSideResult=4]="onFirstSideResult",e[e.clearTimeoutCallback=5]="clearTimeoutCallback",e[e.onGlare=6]="onGlare",e[e.recognizerCallback=7]="recognizerCallback"}(i||(i={}));class E{constructor(e,t){this.isCallbackMessage=!0,this.callbackType=e,this.callbackParameters=t}}function z(e,t){return t=t||"",""===(e=e||"")?t:e.endsWith("/")?t.startsWith("/")?e+t.substring(1):e+t:t.startsWith("/")?e+t:e+"/"+t}var M,T,S;function I(t){return e(this,void 0,void 0,(function*(){const e=yield(async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,3,1,0,1,10,14,1,12,0,65,0,65,0,65,0,252,10,0,0,11])))(),s=yield(async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,12,1,10,0,67,0,0,0,0,252,0,26,11])))(),r=yield(async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,8,1,6,0,65,0,192,26,11])))(),n=yield(async e=>{try{return"undefined"!=typeof MessageChannel&&(new MessageChannel).port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(e)}catch(e){return!1}})(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]));if(!(e&&s&&r))return M.Basic;if(!n)return M.Advanced;try{return new Worker(t+"/Worker.test.js").terminate(),M.AdvancedWithThreads}catch(e){return M.Advanced}}))}!function(e){e.Basic="BASIC",e.Advanced="ADVANCED",e.AdvancedWithThreads="ADVANCED_WITH_THREADS"}(M||(M={})),function(e){e[e.Invalid=0]="Invalid",e[e.RequiresServerPermission=1]="RequiresServerPermission",e[e.Valid=2]="Valid"}(T||(T={})),function(e){e.LicenseTokenStateInvalid="LICENSE_TOKEN_STATE_INVALID",e.NetworkError="NETWORK_ERROR",e.RemoteLock="REMOTE_LOCK",e.PermissionExpired="PERMISSION_EXPIRED",e.PayloadCorrupted="PAYLOAD_CORRUPTED",e.PayloadSignatureVerificationFailed="PAYLOAD_SIGNATURE_VERIFICATION_FAILED",e.IncorrectTokenState="INCORRECT_TOKEN_STATE"}(S||(S={}));class x{constructor(e,t){this.code="UNLOCK_LICENSE_ERROR",this.message=null,this.type=e,t&&(this.message=t)}}function D(e){return{licenseId:e.licenseId,licensee:e.licensee,packageName:e.packageName,platform:"Browser",sdkName:e.sdkName,sdkVersion:e.sdkVersion}}var P;function O(t,s){return e(this,void 0,void 0,(function*(){try{const e=yield fetch("https://baltazar.microblink.com/api/v1/status/check",{method:"POST",headers:{"Content-Type":"application/json"},cache:"no-cache",body:JSON.stringify(D(t))});if(e.ok){const t=""+(yield e.text());return s.submitServerPermission(t)}return{status:P.NetworkError,lease:0,networkErrorDescription:"Server responded with status "+e.status}}catch(e){return{status:P.NetworkError,lease:0,networkErrorDescription:"Unexpected error: "+JSON.stringify(e)}}}))}function N(e){return e===M.AdvancedWithThreads}!function(e){e[e.Ok=0]="Ok",e[e.NetworkError=1]="NetworkError",e[e.RemoteLock=2]="RemoteLock",e[e.PermissionExpired=3]="PermissionExpired",e[e.PayloadCorrupted=4]="PayloadCorrupted",e[e.PayloadSignatureVerificationFailed=5]="PayloadSignatureVerificationFailed",e[e.IncorrectTokenState=6]="IncorrectTokenState"}(P||(P={}));new class{constructor(){this.context=self,this.wasmModule=null,this.nativeRecognizerRunner=null,this.objects={},this.nextObjectHandle=0,this.metadataCallbacks={},this.clearTimeoutCallback=null,this.context.onmessage=e=>{const t=e.data;switch(t.action){case r.action:this.processInitMessage(t);break;case o.action:this.processInvokeFunction(t);break;case a.action:this.processCreateNewRecognizer(t);break;case h.action:this.processInvokeObject(t);break;case c.action:this.processCreateRecognizerRunner(t);break;case l.action:this.processReconfigureRecognizerRunner(t);break;case u.action:this.processDeleteRecognizerRunner(t);break;case d.action:this.processImage(t);break;case g.action:this.resetRecognizers(t);break;case f.action:this.setDetectionOnly(t);break;case p.action:this.setCameraPreviewMirrored(t);break;case m.action:this.registerMetadataCallbacks(t);break;case y.action:this.registerClearTimeoutCallback(t);break;default:throw Error("Unknown message action: "+JSON.stringify(t.action))}}}getNextObjectHandle(){const e=this.nextObjectHandle;return this.nextObjectHandle=this.nextObjectHandle+1,e}notifyError(e,t){this.context.postMessage(new b(e.messageID,!1,t))}notifySuccess(e){this.context.postMessage(new b(e.messageID,!0,null))}notifyInitSuccess(e,t,s){this.context.postMessage(new R(e.messageID,!0,t,s))}unwrapParameters(e){const t=[];for(const s of e.params){let r=s.parameter;s.type===n.Recognizer?(r=this.objects[r],void 0===r&&this.notifyError(e,"Cannot find object with handle: undefined")):s.type===n.RecognizerSettings&&(r=this.restoreFunctions(r)),t.push(r)}return t}restoreFunctions(e){const t=Object.keys(e);for(const s of t){const t=e[s];"object"==typeof t&&null!==t&&"parameter"in t&&"type"in t&&t.type===n.Callback&&(e[s]=(...e)=>{const s=new E(i.recognizerCallback,[t.parameter].concat(e));this.context.postMessage(s)})}return e}scanForTransferrables(e){if("object"==typeof e){const t=Object.keys(e),s=[];for(const r of t){const t=e[r];t instanceof ImageData?s.push(t.data.buffer):t instanceof Uint8Array?s.push(t.buffer):null!==t&&"object"==typeof t&&s.push(...this.scanForTransferrables(t))}return s}return[]}registerHeartBeat(e){this.unregisterHeartBeat(),this.lease=e;let t=e-Math.floor(Date.now()/1e3);t>120?t-=120:t/=2,this.inFlightHeartBeatTimeoutId=setTimeout(()=>{this.obtainNewServerPermission(!0)},1e3*t)}unregisterHeartBeat(){this.lease&&delete this.lease,this.inFlightHeartBeatTimeoutId&&(clearTimeout(this.inFlightHeartBeatTimeoutId),delete this.inFlightHeartBeatTimeoutId)}obtainNewServerPermission(t){return e(this,void 0,void 0,(function*(){if(this.wasmModule){const e=this.wasmModule.getActiveLicenseTokenInfo(),s=yield O(e,this.wasmModule);switch(s.status){case P.Ok:case P.RemoteLock:this.registerHeartBeat(s.lease);break;case P.NetworkError:case P.PayloadSignatureVerificationFailed:case P.PayloadCorrupted:t?(console.warn("Problem with obtaining server permission. Will attempt in 10 seconds "+P[s.status]),this.inFlightHeartBeatTimeoutId=setTimeout(()=>{this.obtainNewServerPermission(!1)},1e4)):console.error("Problem with obtaining server permission. "+P[s.status]);break;case P.IncorrectTokenState:case P.PermissionExpired:console.error("Internal error: "+P[s.status])}return s.status}return console.error("Internal inconsistency! Wasm module not initialized where it's expected to be!"),P.IncorrectTokenState}))}willSoonExpire(){if(this.lease){if(this.wasmModule.getActiveLicenseTokenInfo().unlockResult===T.Valid){const e=Math.floor(Date.now()/1e3);return 30>this.lease-e}return!0}return!1}calculateWasmType(t){return e(this,void 0,void 0,(function*(){return null!==t.wasmType?t.wasmType:yield I(t.engineLocation)}))}calculateEngineLocationPrefix(e,t){const s=z(""===e.engineLocation?self.location.origin:e.engineLocation,function(e){switch(e){case M.AdvancedWithThreads:return"advanced-threads";case M.Advanced:return"advanced";case M.Basic:return"basic"}}(t));return e.allowHelloMessage&&console.log("Engine location prefix is:",s),s}processInitMessage(t){return e(this,void 0,void 0,(function*(){const s=yield this.calculateWasmType(t),r=this.calculateEngineLocationPrefix(t,s);let n={locateFile:e=>z(r,e)};t.registerLoadCallback&&(n=Object.assign(n,{setStatus:e=>{const t=new C(function(e){if("Running..."===e)return 100;if(0===e.length)return 0;const t=/([^(]+)\((\d+(\.\d+)?)\/(\d+)\)/.exec(e);if(t){return 100*parseInt(t[2])/parseInt(t[4])}return NaN}(e));this.context.postMessage(t)}}));try{const i=z(r,t.wasmModuleName+".js");N(s)&&(n=function(e,t,s){return t&&t>0&&(e=Object.assign(e,{allowedThreads:t})),null!==s&&(e=Object.assign(e,{mainScriptUrlOrBlob:s})),e}(n,t.numberOfWorkers,i)),importScripts(i);(0,self[t.wasmModuleName])(n).then(r=>e(this,void 0,void 0,(function*(){N(s)&&(t.allowHelloMessage&&console.log("Waiting for thread workers to boot..."),yield function(t){return e(this,void 0,void 0,(function*(){t.threadWorkersReadyPromise&&(yield t.threadWorkersReadyPromise)}))}(r));const n=yield function(t,s,r,n){return e(this,void 0,void 0,(function*(){const e=n.initializeWithLicenseKey(t,r,s);switch(e.unlockResult){case T.Invalid:return{error:new x(S.LicenseTokenStateInvalid,e.licenseError)};case T.Valid:return{error:null,showOverlay:(i=e.isTrial,o=e.allowRemoveDemoOverlay,a=e.allowRemoveProductionOverlay,!(i&&o||!i&&a))};case T.RequiresServerPermission:{const t=yield O(e,n);switch(t.status){case P.Ok:return{error:null,lease:t.lease};case P.NetworkError:{let e="";return t.networkErrorDescription&&(e=" "+t.networkErrorDescription),{error:new x(S.NetworkError,"There has been a network error while obtaining the server permission!"+e)}}case P.RemoteLock:return{error:new x(S.RemoteLock,"Provided license key has been remotely locked.Please contact support for more information!"),lease:t.lease};case P.PermissionExpired:return{error:new x(S.PermissionExpired,"Internal error (server permission expired)"),lease:t.lease};case P.PayloadCorrupted:return{error:new x(S.PayloadCorrupted,"Server permission payload is corrupted!"),lease:t.lease};case P.PayloadSignatureVerificationFailed:return{error:new x(S.PayloadSignatureVerificationFailed,"Failed to verify server permission's digital signature!"),lease:t.lease};case P.IncorrectTokenState:return{error:new x(S.IncorrectTokenState,"Internal error (Incorrect token state)"),lease:t.lease}}}}var i,o,a}))}(t.licenseKey,t.allowHelloMessage,t.userId,r);null===n.error?(this.wasmModule=r,n.lease?this.registerHeartBeat(n.lease):this.unregisterHeartBeat(),this.notifyInitSuccess(t,!!n.showOverlay,s)):this.notifyError(t,n.error)})),e=>{this.notifyError(t,e)})}catch(e){this.notifyError(t,e)}}))}processInvokeFunction(e){if(null===this.wasmModule)return void this.notifyError(e,"WASM module is not initialized!");const t=e.funcName,s=this.unwrapParameters(e);try{const r=this.wasmModule[t](...s);this.context.postMessage(new k(e.messageID,r))}catch(t){this.notifyError(e,t)}}processCreateNewRecognizer(e){if(null===this.wasmModule)return void this.notifyError(e,"WASM module is not initialized!");const t=e.className,s=this.unwrapParameters(e);try{const r=new this.wasmModule[t](...s),n=this.getNextObjectHandle();this.objects[n]=r,this.context.postMessage(new w(e.messageID,n))}catch(t){this.notifyError(e,t)}}getRecognizers(e){const t=[];for(const s of e){t.push(this.objects[s])}return t}processCreateRecognizerRunner(t){return e(this,void 0,void 0,(function*(){if(null===this.wasmModule)this.notifyError(t,"WASM module is not initialized!");else if(null!==this.nativeRecognizerRunner)this.notifyError(t,"Recognizer runner is already created! Multiple instances are not allowed!");else{this.setupMetadataCallbacks(t.registeredMetadataCallbacks);try{if(this.willSoonExpire()){const e=yield this.obtainNewServerPermission(!1);if(e!==P.Ok){const s=P[e];return void this.notifyError(t,new x(S[s],"Cannot initialize recognizers because of invalid server permission: "+s))}}const e=this.getRecognizers(t.recognizerHandles);this.nativeRecognizerRunner=new this.wasmModule.RecognizerRunner(e,t.allowMultipleResults,this.metadataCallbacks),this.notifySuccess(t)}catch(e){this.notifyError(t,e)}}}))}processReconfigureRecognizerRunner(e){if(null===this.wasmModule)this.notifyError(e,"WASM module is not initialized!");else if(null===this.nativeRecognizerRunner)this.notifyError(e,"Recognizer runner is not created! There is nothing to reconfigure!");else try{const t=this.getRecognizers(e.recognizerHandles);this.nativeRecognizerRunner.reconfigureRecognizers(t,e.allowMultipleResults),this.notifySuccess(e)}catch(t){this.notifyError(e,t)}}processDeleteRecognizerRunner(e){if(null!==this.nativeRecognizerRunner)try{this.nativeRecognizerRunner.delete(),this.nativeRecognizerRunner=null,this.notifySuccess(e)}catch(t){this.notifyError(e,t)}else this.notifyError(e,"Recognizer runner is already deleted!")}processInvokeObject(e){try{const t=e.objectHandle,s=e.methodName,r=this.unwrapParameters(e),n=this.objects[t];if(void 0===n)this.notifyError(e,"Cannot find object with handle: "+t);else{const i=n[s](...r),o=this.scanForTransferrables(i);"delete"===s&&delete this.objects[t],this.context.postMessage(new k(e.messageID,i),o)}}catch(t){this.notifyError(e,t)}}processImage(e){if(null!==this.nativeRecognizerRunner)try{const t=this.nativeRecognizerRunner.processImage(e.frame);this.context.postMessage(new v(e.messageID,t))}catch(t){this.notifyError(e,t)}else this.notifyError(e,"Recognizer runner is not initialized! Cannot process image!")}resetRecognizers(e){if(null!==this.nativeRecognizerRunner)try{this.nativeRecognizerRunner.resetRecognizers(e.hardReset),this.notifySuccess(e)}catch(t){this.notifyError(e,t)}else this.notifyError(e,"Recognizer runner is not initialized! Cannot process image!")}setDetectionOnly(e){if(null!==this.nativeRecognizerRunner)try{this.nativeRecognizerRunner.setDetectionOnlyMode(e.detectionOnlyMode),this.notifySuccess(e)}catch(t){this.notifyError(e,t)}else this.notifyError(e,"Recognizer runner is not initialized! Cannot process image!")}setCameraPreviewMirrored(e){if(null!==this.nativeRecognizerRunner)try{this.nativeRecognizerRunner.setCameraPreviewMirrored(e.cameraPreviewMirrored),this.notifySuccess(e)}catch(t){this.notifyError(e,t)}else this.notifyError(e,"Recognizer runner is not initialized! Cannot process image!")}setupMetadataCallbacks(e){e.onDebugText?this.metadataCallbacks.onDebugText=e=>{const t=new E(i.onDebugText,[e]);this.context.postMessage(t)}:delete this.metadataCallbacks.onDebugText,e.onDetectionFailed?this.metadataCallbacks.onDetectionFailed=()=>{const e=new E(i.onDetectionFailed,[]);this.context.postMessage(e)}:delete this.metadataCallbacks.onDetectionFailed,e.onPointsDetection?this.metadataCallbacks.onPointsDetection=e=>{const t=new E(i.onPointsDetection,[e]);this.context.postMessage(t)}:delete this.metadataCallbacks.onPointsDetection,e.onQuadDetection?this.metadataCallbacks.onQuadDetection=e=>{const t=new E(i.onQuadDetection,[e]);this.context.postMessage(t)}:delete this.metadataCallbacks.onQuadDetection,e.onFirstSideResult?this.metadataCallbacks.onFirstSideResult=()=>{const e=new E(i.onFirstSideResult,[]);this.context.postMessage(e)}:delete this.metadataCallbacks.onFirstSideResult,e.onGlare?this.metadataCallbacks.onGlare=e=>{const t=new E(i.onGlare,[e]);this.context.postMessage(t)}:delete this.metadataCallbacks.onGlare}registerMetadataCallbacks(e){if(null!==this.nativeRecognizerRunner){this.setupMetadataCallbacks(e.registeredMetadataCallbacks);try{this.nativeRecognizerRunner.setJSDelegate(this.metadataCallbacks),this.notifySuccess(e)}catch(t){this.notifyError(e,t)}}else this.notifyError(e,"Recognizer runner is not initialized! Cannot process image!")}registerClearTimeoutCallback(e){if(null!==this.nativeRecognizerRunner){this.clearTimeoutCallback=e.callbackNonEmpty?{onClearTimeout:()=>{const e=new E(i.clearTimeoutCallback,[]);this.context.postMessage(e)}}:null;try{this.nativeRecognizerRunner.setClearTimeoutCallback(this.clearTimeoutCallback),this.notifySuccess(e)}catch(t){this.notifyError(e,t)}}else this.notifyError(e,"Recognizer runner is not initialized! Cannot process image!")}}}();
`], { type: "application/javascript" });
                const url = URL.createObjectURL(blob);
                const worker = new Worker(url);
                WasmSDKWorker.createWasmWorker(worker, loadSettings, userId).then(wasmSDK => {
                    resolve(wasmSDK);
                }, reject);
            }
            catch (initError) {
                reject(initError);
            }
        });
    });
}
/* eslint-enable @typescript-eslint/no-explicit-any,
                 @typescript-eslint/no-unsafe-assignment,
                 @typescript-eslint/no-unsafe-member-access,
                 @typescript-eslint/no-unsafe-call */
/**
 * Function for creating a new RecognizerRunner.
 * Note that it is currently not possible to have multiple instances of RecognizerRunner per instance of WasmSDK.
 * Attempt to create new instance of RecognizerRunner prior deleting the previous one will fail.
 * @param wasmSDK Instance of WasmSDK which will be used to communicate with the WebAssembly module.
 * @param recognizers Array of recognizers that will be used by RecognizerRunner.
 * @param allowMultipleResults Whether or not it is allowed to return multiple results from single recognition session.
 *        See README.md for more information.
 * @param metadataCallbacks
 */
function createRecognizerRunner(wasmSDK, recognizers, allowMultipleResults = false, metadataCallbacks = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        if (typeof wasmSDK !== "object") {
            throw new Error("SDK is not provided!");
        }
        if (typeof recognizers !== "object" || recognizers.length < 1) {
            throw new Error("To create RecognizerRunner at least 1 recognizer is required.");
        }
        return wasmSDK.mbWasmModule.createRecognizerRunner(recognizers, allowMultipleResults, metadataCallbacks);
    });
}

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
/**
 * Creates a new instance of `SuccessFrameGrabberRecognizer`.
 * @param wasmSDK Instance of WasmSDK which will be used to communicate with the
 *        WebAssembly module.
 * @param slaveRecognizer Instance of Recognizer that will be wrapped.
 */
function createSuccessFrameGrabberRecognizer(wasmSDK, slaveRecognizer) {
    return __awaiter(this, void 0, void 0, function* () {
        // taken from https://stackoverflow.com/a/53615996
        const sfgr = yield wasmSDK.mbWasmModule.newRecognizer("SuccessFrameGrabberRecognizer", slaveRecognizer);
        const mutableSFGR = sfgr;
        mutableSFGR.wrappedRecognizer = slaveRecognizer;
        return sfgr;
    });
}

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
/**
 * Possible formats of barcodes that can be detected. This enum will be returned
 * as part of BarcodeRecognizerResult interface.
 */
exports.BarcodeFormat = void 0;
(function (BarcodeFormat) {
    /** Indicates that no barcode has been detected. */
    BarcodeFormat[BarcodeFormat["NONE"] = 0] = "NONE";
    /** Indicates that QR code has been detected. */
    BarcodeFormat[BarcodeFormat["QR_CODE"] = 1] = "QR_CODE";
    /** Indicates that Data Matrix 2D barcode has been detected. */
    BarcodeFormat[BarcodeFormat["DATA_MATRIX"] = 2] = "DATA_MATRIX";
    /** Indicates that UPC E 1D barcode has been detected. */
    BarcodeFormat[BarcodeFormat["UPC_E"] = 3] = "UPC_E";
    /** Indicates that UPC A 1D barcode has been detected. */
    BarcodeFormat[BarcodeFormat["UPC_A"] = 4] = "UPC_A";
    /** Indicates that EAN 8 1D barcode has been detected. */
    BarcodeFormat[BarcodeFormat["EAN_8"] = 5] = "EAN_8";
    /** Indicates that EAN 13 1D barcode has been detected. */
    BarcodeFormat[BarcodeFormat["EAN_13"] = 6] = "EAN_13";
    /** Indicates that Code 128 1D barcode has been detected. */
    BarcodeFormat[BarcodeFormat["CODE_128"] = 7] = "CODE_128";
    /** Indicates that Code 39 1D barcode has been detected. */
    BarcodeFormat[BarcodeFormat["CODE_39"] = 8] = "CODE_39";
    /** Indicates that ITF 1D barcode has been detected. */
    BarcodeFormat[BarcodeFormat["ITF"] = 9] = "ITF";
    /** Indicates that Aztec 2D barcode has been detected. */
    BarcodeFormat[BarcodeFormat["AZTEC_BARCODE"] = 10] = "AZTEC_BARCODE";
    /** Indicates that PDF417 2D barcode has been detected. */
    BarcodeFormat[BarcodeFormat["PDF417_BARCODE"] = 11] = "PDF417_BARCODE";
})(exports.BarcodeFormat || (exports.BarcodeFormat = {}));

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
/**
 * AnonymizationMode is used to define level of anonymization
 * performed on recognizer result.
 */
exports.AnonymizationMode = void 0;
(function (AnonymizationMode) {
    /**
     * Anonymization will not be performed.
     */
    AnonymizationMode[AnonymizationMode["None"] = 0] = "None";
    /**
     * FullDocumentImage is anonymized with black boxes
     * covering sensitive data.
     */
    AnonymizationMode[AnonymizationMode["ImageOnly"] = 1] = "ImageOnly";
    /**
     * Result fields containing sensitive data are removed from result.
     */
    AnonymizationMode[AnonymizationMode["ResultFieldsOnly"] = 2] = "ResultFieldsOnly";
    /**
     * This mode is combination of ImageOnly and ResultFieldsOnly modes.
     */
    AnonymizationMode[AnonymizationMode["FullResult"] = 3] = "FullResult";
})(exports.AnonymizationMode || (exports.AnonymizationMode = {}));

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
/**
 * Extension factors relative to corresponding dimension of the full image. For example,
 * {@code upFactor} and {@code downFactor} define extensions relative to image height, e.g.
 * when {@code upFactor} is 0.5, upper image boundary will be extended for half of image's full
 * height.
 *
 *                      ._______________________________________.
 *                      |                   ↑                   |
 *                      |                upFactor               |
 *   .________.         |              .________.               |
 *   |        |   -->   |  ⃖ leftFactor |        | rightFactor  ⃗ |
 *   |________|         |              |________|               |
 *                      |                   ↓                   |
 *                      |               downFactor              |
 *                      |_______________________________________|
 *
 */
class ExtensionFactors {
    /**
     * Constructor which accepts image extension factors which must be in range [-1.0f, 1.0f].
     * @param upFactor image extension factor relative to full image height in UP direction
     * @param downFactor image extension factor relative to full image height in DOWN direction
     * @param leftFactor image extension factor relative to full image width in LEFT direction
     * @param rightFactor image extension factor relative to full image width in RIGHT direction
     */
    constructor(upFactor = 0.0, downFactor = 0.0, leftFactor = 0.0, rightFactor = 0.0) {
        /**
         * Currently used image extension factor relative to full image height in UP direction.
         */
        this.upFactor = 0.0;
        /**
         * Currently used image extension factor relative to full image height in DOWN direction.
         */
        this.downFactor = 0.0;
        /**
         * Currently used image extension factor relative to full image height in LEFT direction.
         */
        this.leftFactor = 0.0;
        /**
         * Currently used image extension factor relative to full image height in RIGHT direction.
         */
        this.rightFactor = 0.0;
        this.checkExtensionFactor(upFactor);
        this.checkExtensionFactor(downFactor);
        this.checkExtensionFactor(leftFactor);
        this.checkExtensionFactor(rightFactor);
        this.upFactor = upFactor;
        this.downFactor = downFactor;
        this.leftFactor = leftFactor;
        this.rightFactor = rightFactor;
    }
    checkExtensionFactor(factor) {
        if (factor > 1.0 || factor < -1.0) {
            throw new Error("Extension factor must be in range [-1.0, 1.0]");
        }
    }
}
function validateDpi(dpi) {
    if (dpi < 100 || dpi > 400) {
        throw new Error("DPI must be from interval [100, 400]");
    }
}

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
/**
* Enum defining additional fields present in the barcode.
* Currently this is only used for AAMVACompliant documents.
*/
exports.BarcodeElementKey = void 0;
(function (BarcodeElementKey) {
    // ==============================================================/
    // ============== 1. DETERMINING BARCODE VERSION ================/
    // ==============================================================/
    /**
     Mandatory on all driver's licenses. All barcodes which are using 3-track magnetic
     stripe encoding used in the interest of smoothing a transition from legacy documents
     shall be designated as "Magnetic". All barcodes which are using compact encoding
     compliant with ISO/IEC 18013-2 shall be designated as "Compact". All barcodes (majority)
     compliant with Mandatory PDF417 Bar Code of the American Association of Motor Vehicle
     Administrators (AAMVA) Card Design Standard from AAMVA DL/ID-2000 standard to DL/ID-2013
     shall be designated as "AAMVA".
     */
    BarcodeElementKey[BarcodeElementKey["DocumentType"] = 0] = "DocumentType";
    /**
     Mandatory on all driver's licenses.

     AAMVA Version Number: This is a decimal value between 0 and 99 that
     specifies the version level of the PDF417 bar code format. Version "0" and "00"
     is reserved for bar codes printed to the specification of the American Association
     of Motor Vehicle Administrators (AAMVA) prior to the adoption of the AAMVA DL/ID-2000
     standard.

     - All barcodes compliant with AAMVA DL/ID-2000 standard shall be designated Version "01."
     - All barcodes compliant with AAMVA Card Design Specification version 1.0, dated 09-2003
       shall be designated Version "02."
     - All barcodes compliant with AAMVA Card Design Specification version 2.0, dated 03-2005
       shall be designated Version "03."
     - All barcodes compliant with AAMVA Card Design Standard version 1.0, dated 07-2009
       shall be designated Version "04."
     - All barcodes compliant with AAMVA Card Design Standard version 1.0, dated 07-2010
       shall be designated Version "05."
     - All barcodes compliant with AAMVA Card Design Standard version 1.0, dated 07-2011
       shall be designated Version "06".
     - All barcodes compliant with AAMVA Card Design Standard version 1.0, dated 06-2012
       shall be designated Version "07".
     - All barcodes compliant with this current AAMVA standard shall be designated "08".

     Should a need arise requiring major revision to the format, this field provides the
     means to accommodate additional revision.

     If the document type is not "AAMVA", this field defines the version number of the
     given document type's standard.
     */
    BarcodeElementKey[BarcodeElementKey["StandardVersionNumber"] = 1] = "StandardVersionNumber";
    // ==============================================================/
    // ==========          2. PERSONAL DATA KEYS          ===========/
    // ==============================================================/
    /**
     Mandatory on all AAMVA, Magnetic and Compact barcodes.

     Family name of the cardholder. (Family name is sometimes also called "last name" or "surname.")
     Collect full name for record, print as many characters as possible on portrait side of DL/ID.
     */
    BarcodeElementKey[BarcodeElementKey["CustomerFamilyName"] = 2] = "CustomerFamilyName";
    /**
     Mandatory on all AAMVA, Magnetic and Compact barcodes.

     First name of the cardholder.
     */
    BarcodeElementKey[BarcodeElementKey["CustomerFirstName"] = 3] = "CustomerFirstName";
    /**
     Mandatory on all AAMVA, Magnetic and Compact barcodes.

     Full name of the individual holding the Driver's License or ID.

     The Name field contains up to four portions, separated with the "," delimiter:
     Last Name (required)
     , (required)
     First Name (required)
     , (required if other name portions follow, otherwise optional)
     Middle Name(s) (optional)
     , (required if other name portions follow, otherwise optional)
     Suffix (optional)
     , (optional)

     If the individual has more than one middle name they are separated with space.
     */
    BarcodeElementKey[BarcodeElementKey["CustomerFullName"] = 4] = "CustomerFullName";
    /**
     Mandatory on all AAMVA, Magnetic and Compact barcodes.

     Date on which the cardholder was born. (MMDDCCYY format)
     */
    BarcodeElementKey[BarcodeElementKey["DateOfBirth"] = 5] = "DateOfBirth";
    /**
     Mandatory on all AAMVA, Magnetic barcodes.
     Optional on Compact barcodes.

     Gender of the cardholder. 1 = male, 2 = female.
     */
    BarcodeElementKey[BarcodeElementKey["Sex"] = 6] = "Sex";
    /**
     Mandatory on AAMVA 02, 03, 04, 05, 06, 07, 08 barcodes.
     Optional on AAMVA 01, Magnetic and Compact barcodes.

     Color of cardholder's eyes. (ANSI D-20 codes)

     Code   Description
     BLK    Black
     BLU    Blue
     BRO    Brown
     GRY    Gray
     GRN    Green
     HAZ    Hazel
     MAR    Maroon
     PNK    Pink
     DIC    Dichromatic
     UNK    Unknown
     */
    BarcodeElementKey[BarcodeElementKey["EyeColor"] = 7] = "EyeColor";
    /**
     Mandatory on all AAMVA and Magnetic barcodes.

     On compact barcodes, use kFullAddress.

     Street portion of the cardholder address.
     The place where the registered driver of a vehicle (individual or corporation)
     may be contacted such as a house number, street address, etc.
     */
    BarcodeElementKey[BarcodeElementKey["AddressStreet"] = 8] = "AddressStreet";
    /**
     Mandatory on all AAMVA and Magnetic barcodes.

     On compact barcodes, use kFullAddress.

     City portion of the cardholder address.
     */
    BarcodeElementKey[BarcodeElementKey["AddressCity"] = 9] = "AddressCity";
    /**
     Mandatory on all AAMVA and Magnetic barcodes.

     On compact barcodes, use kFullAddress.

     State portion of the cardholder address.
     */
    BarcodeElementKey[BarcodeElementKey["AddressJurisdictionCode"] = 10] = "AddressJurisdictionCode";
    /**
     Mandatory on all AAMVA and Magnetic barcodes.

     On compact barcodes, use FullAddress.

     Postal code portion of the cardholder address in the U.S. and Canada. If the
     trailing portion of the postal code in the U.S. is not known, zeros can be used
     to fill the trailing set of numbers up to nine (9) digits.
     */
    BarcodeElementKey[BarcodeElementKey["AddressPostalCode"] = 11] = "AddressPostalCode";
    /**
     Mandatory on all AAMVA and Magnetic barcodes.
     Optional on Compact barcodes.

     Full address of the individual holding the Driver's License or ID.

     The full address field contains up to four portions, separated with the "," delimiter:
     Street Address (required)
     , (required if other address portions follow, otherwise optional)
     City (optional)
     , (required if other address portions follow, otherwise optional)
     Jurisdiction Code (optional)
     , (required if other address portions follow, otherwise optional)
     ZIP - Postal Code (optional)

     */
    BarcodeElementKey[BarcodeElementKey["FullAddress"] = 12] = "FullAddress";
    /**
     Mandatory on AAMVA 02, 03, 04, 05, 06, 07, 08 and Compact barcodes.
     Optional on AAMVA 01 and Magnetic barcodes.

     Height of cardholder, either in Inches or in Centimeters.

     Inches (in): number of inches followed by " in"
     example: 6'1'' = "73 in"

     Centimeters (cm): number of centimeters followed by " cm"
     example: 181 centimeters = "181 cm"
     */
    BarcodeElementKey[BarcodeElementKey["Height"] = 13] = "Height";
    /**
     Mandatory on AAMVA 02, 03, 04, 05, 06, 07, 08 and Compact barcodes.
     Optional on AAMVA 01 and Magnetic barcodes.

     Height of cardholder in Inches.
     Example: 5'9'' = "69".
     */
    BarcodeElementKey[BarcodeElementKey["HeightIn"] = 14] = "HeightIn";
    /**
     Mandatory on AAMVA 02, 03, 04, 05, 06, 07, 08 Compact barcodes.
     Optional on AAMVA 01 and Magnetic barcodes.

     Height of cardholder in Centimeters.
     Example: 180 Centimeters = "180".
     */
    BarcodeElementKey[BarcodeElementKey["HeightCm"] = 15] = "HeightCm";
    /**
     Mandatory on AAMVA 04, 05, 06, 07, 08 barcodes.
     Optional on AAMVA 01, 02, 03, Magnetic and Compcat barcodes.

     Middle name(s) of the cardholder. In the case of multiple middle names they
     shall be separated by space " ".
     */
    BarcodeElementKey[BarcodeElementKey["CustomerMiddleName"] = 16] = "CustomerMiddleName";
    /**
     Optional on all AAMVA, Magnetic and Compact barcodes.

     Bald, black, blonde, brown, gray, red/auburn, sandy, white, unknown. If the issuing
     jurisdiction wishes to abbreviate colors, the three-character codes provided in ANSI D20 must be
     used.

     Code   Description
     BAL    Bald
     BLK    Black
     BLN    Blond
     BRO    Brown
     GRY    Grey
     RED    Red/Auburn
     SDY    Sandy
     WHI    White
     UNK    Unknown
     */
    BarcodeElementKey[BarcodeElementKey["HairColor"] = 17] = "HairColor";
    /**
     Mandatory on AAMVA 02 barcodes.
     Optional on AAMVA 01, 03, 04, 05, 06, 07, 08, Magnetic and Compact barcodes.

     Name Suffix (If jurisdiction participates in systems requiring name suffix (PDPS, CDLIS, etc.),
     the suffix must be collected and displayed on the DL/ID and in the MRT).
     - JR (Junior)
     - SR (Senior)
     - 1ST or I (First)
     - 2ND or II (Second)
     - 3RD or III (Third)
     - 4TH or IV (Fourth)
     - 5TH or V (Fifth)
     - 6TH or VI (Sixth)
     - 7TH or VII (Seventh)
     - 8TH or VIII (Eighth)
     - 9TH or IX (Ninth)
     */
    BarcodeElementKey[BarcodeElementKey["NameSuffix"] = 18] = "NameSuffix";
    /**
     Optional on all AAMVA and Compact barcodes.

     Other name by which the cardholder is known. ALTERNATIVE NAME(S) of the individual
     holding the Driver License or ID.

     The Name field contains up to four portions, separated with the "," delimiter:
     AKA Last Name (required)
     , (required)
     AKA First Name (required)
     , (required if other name portions follow, otherwise optional)
     AKA Middle Name(s) (optional)
     , (required if other name portions follow, otherwise optional)
     AKA Suffix (optional)
     , (optional)

     If the individual has more than one AKA middle name they are separated with space.
     */
    BarcodeElementKey[BarcodeElementKey["AKAFullName"] = 19] = "AKAFullName";
    /**
     Optional on all AAMVA and Compact barcodes.

     Other family name by which the cardholder is known.
     */
    BarcodeElementKey[BarcodeElementKey["AKAFamilyName"] = 20] = "AKAFamilyName";
    /**
     Optional on all AAMVA and Compact barcodes.

     Other given name by which the cardholder is known
     */
    BarcodeElementKey[BarcodeElementKey["AKAGivenName"] = 21] = "AKAGivenName";
    /**
     Optional on all AAMVA and Compact barcodes.

     Other suffix by which the cardholder is known.

     The Suffix Code Portion, if submitted, can contain only the Suffix Codes shown in the following
     table (e.g., Andrew Johnson, III = JOHNSON@ANDREW@@3RD):

     Suffix     Meaning or Synonym
     JR         Junior
     SR         Senior or Esquire 1ST First
     2ND        Second
     3RD        Third
     4TH        Fourth
     5TH        Fifth
     6TH        Sixth
     7TH        Seventh
     8TH        Eighth
     9TH        Ninth
     */
    BarcodeElementKey[BarcodeElementKey["AKASuffixName"] = 22] = "AKASuffixName";
    /**
     Mandatory on AAMVA 02 barcodes.
     Optional on AAMVA 01, 03, 04, 05, 06, 07, 08, Magnetic and Compact barcodes.

     Indicates the approximate weight range of the cardholder:
     0 = up to 31 kg (up to 70 lbs)
     1 = 32 – 45 kg (71 – 100 lbs)
     2 = 46 - 59 kg (101 – 130 lbs)
     3 = 60 - 70 kg (131 – 160 lbs)
     4 = 71 - 86 kg (161 – 190 lbs)
     5 = 87 - 100 kg (191 – 220 lbs)
     6 = 101 - 113 kg (221 – 250 lbs)
     7 = 114 - 127 kg (251 – 280 lbs)
     8 = 128 – 145 kg (281 – 320 lbs)
     9 = 146+ kg (321+ lbs)
     */
    BarcodeElementKey[BarcodeElementKey["WeightRange"] = 23] = "WeightRange";
    /**
     Mandatory on AAMVA 02 barcodes.
     Optional on AAMVA 01, 03, 04, 05, 06, 07, 08, Magnetic and Compact barcodes.

     Cardholder weight in pounds Example: 185 lb = "185"
     */
    BarcodeElementKey[BarcodeElementKey["WeightPounds"] = 24] = "WeightPounds";
    /**
     Mandatory on AAMVA 02 barcodes.
     Optional on AAMVA 01, 03, 04, 05, 06, 07, 08, Magnetic and Compact barcodes.

     Cardholder weight in kilograms Example: 84 kg = "084"
     */
    BarcodeElementKey[BarcodeElementKey["WeightKilograms"] = 25] = "WeightKilograms";
    /**
     Mandatory on all AAMVA and Compact barcodes.

     The number assigned or calculated by the issuing authority.
     */
    BarcodeElementKey[BarcodeElementKey["CustomerIdNumber"] = 26] = "CustomerIdNumber";
    /**
     Mandatory on AAMVA 04, 05, 06, 07, 08 barcodes.
     Optional on Compact barcodes.

     A code that indicates whether a field has been truncated (T), has not been
     truncated (N), or – unknown whether truncated (U).
     */
    BarcodeElementKey[BarcodeElementKey["FamilyNameTruncation"] = 27] = "FamilyNameTruncation";
    /**
     Mandatory on AAMVA 04, 05, 06, 07, 08 barcodes.
     Optional on Compact barcodes.

     A code that indicates whether a field has been truncated (T), has not been
     truncated (N), or – unknown whether truncated (U).
     */
    BarcodeElementKey[BarcodeElementKey["FirstNameTruncation"] = 28] = "FirstNameTruncation";
    /**
     Mandatory on AAMVA 04, 05, 06, 07, 08 barcodes.

     A code that indicates whether a field has been truncated (T), has not been
     truncated (N), or – unknown whether truncated (U).
     */
    BarcodeElementKey[BarcodeElementKey["MiddleNameTruncation"] = 29] = "MiddleNameTruncation";
    /**
     Optional on AAMVA 02, 03, 04, 05, 06, 07, 08 and Compact barcodes.

     Country and municipality and/or state/province.
     */
    BarcodeElementKey[BarcodeElementKey["PlaceOfBirth"] = 30] = "PlaceOfBirth";
    /**
     Optional on all AAMVA barcodes.

     On Compact barcodes, use kFullAddress.

     Second line of street portion of the cardholder address.
     */
    BarcodeElementKey[BarcodeElementKey["AddressStreet2"] = 31] = "AddressStreet2";
    /**
     Optional on AAMVA 02, 03, 04, 05, 06, 07, 08 and Compact barcodes.

     Codes for race or ethnicity of the cardholder, as defined in ANSI D20.

     Race:
     Code   Description
     AI     Alaskan or American Indian (Having Origins in Any of The Original Peoples of
            North America, and Maintaining Cultural Identification Through Tribal
            Affiliation of Community Recognition)
     AP     Asian or Pacific Islander (Having Origins in Any of the Original Peoples of
            the Far East, Southeast Asia, or Pacific Islands. This Includes China, India,
            Japan, Korea, the Philippines Islands, and Samoa)
     BK     Black (Having Origins in Any of the Black Racial Groups of Africa)
     W      White (Having Origins in Any of The Original Peoples of Europe, North Africa,
            or the Middle East)

     Ethnicity:
     Code   Description
     H      Hispanic Origin (A Person of Mexican, Puerto Rican, Cuban, Central or South
            American or Other Spanish Culture or Origin, Regardless of Race)
     O      Not of Hispanic Origin (Any Person Other Than Hispanic)
     U      Unknown

     */
    BarcodeElementKey[BarcodeElementKey["RaceEthnicity"] = 32] = "RaceEthnicity";
    /**
     Optional on AAMVA 01 barcodes.

     PREFIX to Driver Name. Freeform as defined by issuing jurisdiction.
     */
    BarcodeElementKey[BarcodeElementKey["NamePrefix"] = 33] = "NamePrefix";
    /**
     Mandatory on AAMVA 02, 03, 04, 05, 06, 07, 08 and Compact barcodes.

     Country in which DL/ID is issued. U.S. = USA, Canada = CAN.
     */
    BarcodeElementKey[BarcodeElementKey["CountryIdentification"] = 34] = "CountryIdentification";
    /**
     Optional on AAMVA version 01.

     Driver Residence Street Address 1.
     */
    BarcodeElementKey[BarcodeElementKey["ResidenceStreetAddress"] = 35] = "ResidenceStreetAddress";
    /**
     Optional on AAMVA version 01.

     Driver Residence Street Address 2.
     */
    BarcodeElementKey[BarcodeElementKey["ResidenceStreetAddress2"] = 36] = "ResidenceStreetAddress2";
    /**
     Optional on AAMVA version 01.

     Driver Residence City
     */
    BarcodeElementKey[BarcodeElementKey["ResidenceCity"] = 37] = "ResidenceCity";
    /**
     Optional on AAMVA version 01.

     Driver Residence Jurisdiction Code.
     */
    BarcodeElementKey[BarcodeElementKey["ResidenceJurisdictionCode"] = 38] = "ResidenceJurisdictionCode";
    /**
     Optional on AAMVA 01 barcodes.

     Driver Residence Postal Code.
     */
    BarcodeElementKey[BarcodeElementKey["ResidencePostalCode"] = 39] = "ResidencePostalCode";
    /**
     Optional on AAMVA 01 barcodes.

     Full residence address of the individual holding the Driver's License or ID.

     The full address field contains up to four portions, separated with the "," delimiter:
     Residence Street Address (required)
     , (required if other address portions follow, otherwise optional)
     Residence City (optional)
     , (required if other address portions follow, otherwise optional)
     Residence Jurisdiction Code (optional)
     , (required if other address portions follow, otherwise optional)
     Residence ZIP - Residence Postal Code (optional)
     */
    BarcodeElementKey[BarcodeElementKey["ResidenceFullAddress"] = 40] = "ResidenceFullAddress";
    /**
     Optional on AAMVA 05, 06, 07, 08 barcodes.

     Date on which the cardholder turns 18 years old. (MMDDCCYY format)
     */
    BarcodeElementKey[BarcodeElementKey["Under18"] = 41] = "Under18";
    /**
     Optional on AAMVA 05, 06, 07, 08 barcodes.

     Date on which the cardholder turns 19 years old. (MMDDCCYY format)
     */
    BarcodeElementKey[BarcodeElementKey["Under19"] = 42] = "Under19";
    /**
     Optional on AAMVA 05, 06, 07, 08 barcodes.

     Date on which the cardholder turns 21 years old. (MMDDCCYY format)
     */
    BarcodeElementKey[BarcodeElementKey["Under21"] = 43] = "Under21";
    /**
     Optional on AAMVA version 01.

     The number assigned to the individual by the Social Security Administration.
     */
    BarcodeElementKey[BarcodeElementKey["SocialSecurityNumber"] = 44] = "SocialSecurityNumber";
    /**
     Optional on AAMVA version 01.

     Driver "AKA" Social Security Number. FORMAT SAME AS DRIVER SOC SEC NUM. ALTERNATIVE NUMBERS(S) used as SS NUM.
     */
    BarcodeElementKey[BarcodeElementKey["AKASocialSecurityNumber"] = 45] = "AKASocialSecurityNumber";
    /**
     Optional on AAMVA 01 barcodes.

     ALTERNATIVE MIDDLE NAME(s) or INITIALS of the individual holding the Driver License or ID.
     Hyphenated names acceptable, spaces between names acceptable, but no other
     use of special symbols.
     */
    BarcodeElementKey[BarcodeElementKey["AKAMiddleName"] = 46] = "AKAMiddleName";
    /**
     Optional on AAMVA 01 barcodes.

     ALTERNATIVE PREFIX to Driver Name. Freeform as defined by issuing jurisdiction.
     */
    BarcodeElementKey[BarcodeElementKey["AKAPrefixName"] = 47] = "AKAPrefixName";
    /**
     Optional on AAMVA 01, 06, 07, 08 barcodes.

     Field that indicates that the cardholder is an organ donor = "1".
     */
    BarcodeElementKey[BarcodeElementKey["OrganDonor"] = 48] = "OrganDonor";
    /**
     Optional on AAMVA 07, 08 barcodes.

     Field that indicates that the cardholder is a veteran = "1"
     */
    BarcodeElementKey[BarcodeElementKey["Veteran"] = 49] = "Veteran";
    /**
     Optional on AAMVA 01. (MMDDCCYY format)

     ALTERNATIVE DATES(S) given as date of birth.
     */
    BarcodeElementKey[BarcodeElementKey["AKADateOfBirth"] = 50] = "AKADateOfBirth";
    // ==============================================================/
    // ==========          3. LICENSE DATA KEYS          ============/
    // ==============================================================/
    /**
     Mandatory on all AAMVA, Magnetic and Compact barcodes.

     This number uniquely identifies the issuing jurisdiction and can
     be obtained by contacting the ISO Issuing Authority (AAMVA)
     */
    BarcodeElementKey[BarcodeElementKey["IssuerIdentificationNumber"] = 51] = "IssuerIdentificationNumber";
    /**
     Mandatory on all AAMVA, Magnetic and Compact barcodes.

     If the document is non expiring then "Non expiring" is written in this field.

     Date on which the driving and identification privileges granted by the document are
     no longer valid. (MMDDCCYY format)
     */
    BarcodeElementKey[BarcodeElementKey["DocumentExpirationDate"] = 52] = "DocumentExpirationDate";
    /**
     Mandatory on all AAMVA and Compact barcodes.
     Optional on Magnetic barcodes.

     Jurisdiction Version Number: This is a decimal value between 0 and 99 that
     specifies the jurisdiction version level of the PDF417 barcode format.
     Notwithstanding iterations of this standard, jurisdictions implement incremental
     changes to their barcodes, including new jurisdiction-specific data, compression
     algorithms for digitized images, digital signatures, or new truncation
     conventions used for names and addresses. Each change to the barcode format
     within each AAMVA version (above) must be noted, beginning with Jurisdiction
     Version 00.
     */
    BarcodeElementKey[BarcodeElementKey["JurisdictionVersionNumber"] = 53] = "JurisdictionVersionNumber";
    /**
     Mandatory on all AAMVA and Magnetic barcodes.

     Jurisdiction-specific vehicle class / group code, designating the type
     of vehicle the cardholder has privilege to drive.
     */
    BarcodeElementKey[BarcodeElementKey["JurisdictionVehicleClass"] = 54] = "JurisdictionVehicleClass";
    /**
     Mandatory on all AAMVA barcodes.
     Optional on Magnetic barcodes.

     Jurisdiction-specific codes that represent restrictions to driving
     privileges (such as airbrakes, automatic transmission, daylight only, etc.).
     */
    BarcodeElementKey[BarcodeElementKey["JurisdictionRestrictionCodes"] = 55] = "JurisdictionRestrictionCodes";
    /**
     Mandatory on all AAMVA barcodes.
     Optional on Magnetic barcodes.

     Jurisdiction-specific codes that represent additional privileges
     granted to the cardholder beyond the vehicle class (such as transportation of
     passengers, hazardous materials, operation of motorcycles, etc.).
     */
    BarcodeElementKey[BarcodeElementKey["JurisdictionEndorsementCodes"] = 56] = "JurisdictionEndorsementCodes";
    /**
     Mandatory on all AAMVA and Compact barcodes.

     Date on which the document was issued. (MMDDCCYY format)
     */
    BarcodeElementKey[BarcodeElementKey["DocumentIssueDate"] = 57] = "DocumentIssueDate";
    /**
     Mandatory on AAMVA versions 02 and 03.

     Federally established codes for vehicle categories, endorsements, and restrictions
     that are generally applicable to commercial motor vehicles. If the vehicle is not a
     commercial vehicle, "NONE" is to be entered.
     */
    BarcodeElementKey[BarcodeElementKey["FederalCommercialVehicleCodes"] = 58] = "FederalCommercialVehicleCodes";
    /**
     Optional on all AAMVA barcodes.
     Mandatory on Compact barcodes.

     Jurisdictions may define a subfile to contain jurisdiction-specific information.
     These subfiles are designated with the first character of “Z” and the second
     character is the first letter of the jurisdiction's name. For example, "ZC" would
     be the designator for a California or Colorado jurisdiction-defined subfile, "ZQ"
     would be the designator for a Quebec jurisdiction-defined subfile. In the case of
     a jurisdiction-defined subfile that has a first letter that could be more than
     one jurisdiction (e.g. California, Colorado, Connecticut) then other data, like
     the IIN or address, must be examined to determine the jurisdiction.
     */
    BarcodeElementKey[BarcodeElementKey["IssuingJurisdiction"] = 59] = "IssuingJurisdiction";
    /**
     Optional on all AAMVA barcodes.
     Mandatory on Compact barcodes.

     Standard vehicle classification code(s) for cardholder. This data element is a
     placeholder for future efforts to standardize vehicle classifications.
     */
    BarcodeElementKey[BarcodeElementKey["StandardVehicleClassification"] = 60] = "StandardVehicleClassification";
    /**
      Optional on all AAMVA and Magnetic barcodes.

      Name of issuing jurisdiction, for example: Alabama, Alaska ...
      */
    BarcodeElementKey[BarcodeElementKey["IssuingJurisdictionName"] = 61] = "IssuingJurisdictionName";
    /**
     Optional on all AAMVA barcodes.

     Standard endorsement code(s) for cardholder. See codes in D20. This data element is a
     placeholder for future efforts to standardize endorsement codes.

     Code   Description
     H      Hazardous Material - This endorsement is required for the operation of any vehicle
            transporting hazardous materials requiring placarding, as defined by U.S.
            Department of Transportation regulations.
     L      Motorcycles – Including Mopeds/Motorized Bicycles.
     N      Tank - This endorsement is required for the operation of any vehicle transporting,
            as its primary cargo, any liquid or gaseous material within a tank attached to the vehicle.
     O      Other Jurisdiction Specific Endorsement(s) - This code indicates one or more
            additional jurisdiction assigned endorsements.
     P      Passenger - This endorsement is required for the operation of any vehicle used for
            transportation of sixteen or more occupants, including the driver.
     S      School Bus - This endorsement is required for the operation of a school bus. School bus means a
            CMV used to transport pre-primary, primary, or secondary school students from home to school,
            from school to home, or to and from school sponsored events. School bus does not include a
            bus used as common carrier (49 CRF 383.5).
     T      Doubles/Triples - This endorsement is required for the operation of any vehicle that would be
            referred to as a double or triple.
     X      Combined Tank/HAZ-MAT - This endorsement may be issued to any driver who qualifies for
            both the N and H endorsements.
     */
    BarcodeElementKey[BarcodeElementKey["StandardEndorsementCode"] = 62] = "StandardEndorsementCode";
    /**
     Optional on all AAMVA barcodes.

     Standard restriction code(s) for cardholder. See codes in D20. This data element is a placeholder
     for future efforts to standardize restriction codes.

     Code   Description
     B      Corrective Lenses
     C      Mechanical Devices (Special Brakes, Hand Controls, or Other Adaptive Devices)
     D      Prosthetic Aid
     E      Automatic Transmission
     F      Outside Mirror
     G      Limit to Daylight Only
     H      Limit to Employment
     I      Limited Other
     J      Other
     K      CDL Intrastate Only
     L      Vehicles without air brakes
     M      Except Class A bus
     N      Except Class A and Class B bus
     O      Except Tractor-Trailer
     V      Medical Variance Documentation Required
     W      Farm Waiver
     */
    BarcodeElementKey[BarcodeElementKey["StandardRestrictionCode"] = 63] = "StandardRestrictionCode";
    /**
     Optional on AAMVA 02, 03, 04, 05, 06, 07, 08 and Compact barcodes.

     Text that explains the jurisdiction-specific code(s) for classifications
     of vehicles cardholder is authorized to drive.
     */
    BarcodeElementKey[BarcodeElementKey["JurisdictionVehicleClassificationDescription"] = 64] = "JurisdictionVehicleClassificationDescription";
    /**
     Optional on AAMVA 02, 03, 04, 05, 06, 07, 08 and Compact barcodes.

     Text that explains the jurisdiction-specific code(s) that indicates additional
     driving privileges granted to the cardholder beyond the vehicle class.
     */
    BarcodeElementKey[BarcodeElementKey["JurisdictionEndorsmentCodeDescription"] = 65] = "JurisdictionEndorsmentCodeDescription";
    /**
     Optional on AAMVA 02, 03, 04, 05, 06, 07, 08 and Compact barcodes.

     Text describing the jurisdiction-specific restriction code(s) that curtail driving privileges.
     */
    BarcodeElementKey[BarcodeElementKey["JurisdictionRestrictionCodeDescription"] = 66] = "JurisdictionRestrictionCodeDescription";
    /**
     Optional on AAMVA 02, 03, 04, 05, 06, 07, 08 barcodes.

     A string of letters and/or numbers that is affixed to the raw materials (card stock,
     laminate, etc.) used in producing driver's licenses and ID cards. (DHS recommended field)
     */
    BarcodeElementKey[BarcodeElementKey["InventoryControlNumber"] = 67] = "InventoryControlNumber";
    /**
     Optional on AAMVA 04, 05, 06, 07, 08 and Compact barcodes.

     DHS required field that indicates date of the most recent version change or
     modification to the visible format of the DL/ID. (MMDDCCYY format)
     */
    BarcodeElementKey[BarcodeElementKey["CardRevisionDate"] = 68] = "CardRevisionDate";
    /**
     Mandatory on AAMVA 02, 03, 04, 05, 06, 07, 08 and Magnetic barcodes.
     Optional and Compact barcodes.

     Number must uniquely identify a particular document issued to that customer
     from others that may have been issued in the past. This number may serve multiple
     purposes of document discrimination, audit information number, and/or inventory control.
     */
    BarcodeElementKey[BarcodeElementKey["DocumentDiscriminator"] = 69] = "DocumentDiscriminator";
    /**
     Optional on AAMVA 04, 05, 06, 07, 08 and Compact barcodes.

     DHS required field that indicates that the cardholder has temporary lawful status = "1".
     */
    BarcodeElementKey[BarcodeElementKey["LimitedDurationDocument"] = 70] = "LimitedDurationDocument";
    /**
     Optional on AAMVA 02, 03, 04, 05, 06, 07, 08 and Compact barcodes.

     A string of letters and/or numbers that identifies when, where, and by whom a driver's
     license/ID card was made. If audit information is not used on the card or the MRT, it
     must be included in the driver record.
     */
    BarcodeElementKey[BarcodeElementKey["AuditInformation"] = 71] = "AuditInformation";
    /**
     Optional on AAMVA 04, 05, 06, 07, 08 and Compact barcodes.

     DHS required field that indicates compliance: "M" = materially compliant,
     "F" = fully compliant, and, "N" = non-compliant.
     */
    BarcodeElementKey[BarcodeElementKey["ComplianceType"] = 72] = "ComplianceType";
    /**
     Optional on AAMVA version 01 barcodes.

     Issue Timestamp. A string used by some jurisdictions to validate the document against their data base.
     */
    BarcodeElementKey[BarcodeElementKey["IssueTimestamp"] = 73] = "IssueTimestamp";
    /**
     Optional on AAMVA version 01 barcodes.

     Driver Permit Expiration Date. MMDDCCYY format. Date permit expires.
     */
    BarcodeElementKey[BarcodeElementKey["PermitExpirationDate"] = 74] = "PermitExpirationDate";
    /**
     Optional on AAMVA version 01 barcodes..

     Type of permit.
     */
    BarcodeElementKey[BarcodeElementKey["PermitIdentifier"] = 75] = "PermitIdentifier";
    /**
     Optional on AAMVA version 01 barcodes..

     Driver Permit Issue Date. MMDDCCYY format. Date permit was issued.
     */
    BarcodeElementKey[BarcodeElementKey["PermitIssueDate"] = 76] = "PermitIssueDate";
    /**
     Optional on AAMVA version 01.

     Number of duplicate cards issued for a license or ID if any.
     */
    BarcodeElementKey[BarcodeElementKey["NumberOfDuplicates"] = 77] = "NumberOfDuplicates";
    /**
     Optional on AAMVA 04, 05, 06, 07, 08 and Compact barcodes.

     Date on which the hazardous material endorsement granted by the document is
     no longer valid. (MMDDCCYY format)
     */
    BarcodeElementKey[BarcodeElementKey["HAZMATExpirationDate"] = 78] = "HAZMATExpirationDate";
    /**
     Optional on AAMVA version 01.

     Medical Indicator/Codes.
     STATE SPECIFIC. Freeform, Standard "TBD"
     */
    BarcodeElementKey[BarcodeElementKey["MedicalIndicator"] = 79] = "MedicalIndicator";
    /**
     Optional on AAMVA version 01.

     Non-Resident Indicator. "Y". Used by some jurisdictions to indicate holder of the document is a non-resident.
     */
    BarcodeElementKey[BarcodeElementKey["NonResident"] = 80] = "NonResident";
    /**
     Optional on AAMVA version 01.

     A number or alphanumeric string used by some jurisdictions to identify a "customer" across multiple data bases.
     */
    BarcodeElementKey[BarcodeElementKey["UniqueCustomerId"] = 81] = "UniqueCustomerId";
    /**
     Optional on compact barcodes.

     Document discriminator.
     */
    BarcodeElementKey[BarcodeElementKey["DataDiscriminator"] = 82] = "DataDiscriminator";
    /**
     Optional on Magnetic barcodes.

     Month on which the driving and identification privileges granted by the document are
     no longer valid. (MMYY format)
     */
    BarcodeElementKey[BarcodeElementKey["DocumentExpirationMonth"] = 83] = "DocumentExpirationMonth";
    /**
     Optional on Magnetic barcodes.

     Field that indicates that the driving and identification privileges granted by the
     document are nonexpiring = "1".
     */
    BarcodeElementKey[BarcodeElementKey["DocumentNonexpiring"] = 84] = "DocumentNonexpiring";
    /**
      Optional on Magnetic barcodes.

      Security version beeing used.
    */
    BarcodeElementKey[BarcodeElementKey["SecurityVersion"] = 85] = "SecurityVersion";
    /**
      Number of keys in enum.
    */
    BarcodeElementKey[BarcodeElementKey["Count"] = 86] = "Count";
})(exports.BarcodeElementKey || (exports.BarcodeElementKey = {}));

exports.Country = void 0;
(function (Country) {
    Country[Country["NONE"] = 0] = "NONE";
    Country[Country["ALBANIA"] = 1] = "ALBANIA";
    Country[Country["ALGERIA"] = 2] = "ALGERIA";
    Country[Country["ARGENTINA"] = 3] = "ARGENTINA";
    Country[Country["AUSTRALIA"] = 4] = "AUSTRALIA";
    Country[Country["AUSTRIA"] = 5] = "AUSTRIA";
    Country[Country["AZERBAIJAN"] = 6] = "AZERBAIJAN";
    Country[Country["BAHRAIN"] = 7] = "BAHRAIN";
    Country[Country["BANGLADESH"] = 8] = "BANGLADESH";
    Country[Country["BELGIUM"] = 9] = "BELGIUM";
    Country[Country["BOSNIA_AND_HERZEGOVINA"] = 10] = "BOSNIA_AND_HERZEGOVINA";
    Country[Country["BRUNEI"] = 11] = "BRUNEI";
    Country[Country["BULGARIA"] = 12] = "BULGARIA";
    Country[Country["CAMBODIA"] = 13] = "CAMBODIA";
    Country[Country["CANADA"] = 14] = "CANADA";
    Country[Country["CHILE"] = 15] = "CHILE";
    Country[Country["COLOMBIA"] = 16] = "COLOMBIA";
    Country[Country["COSTA_RICA"] = 17] = "COSTA_RICA";
    Country[Country["CROATIA"] = 18] = "CROATIA";
    Country[Country["CYPRUS"] = 19] = "CYPRUS";
    Country[Country["CZECHIA"] = 20] = "CZECHIA";
    Country[Country["DENMARK"] = 21] = "DENMARK";
    Country[Country["DOMINICAN_REPUBLIC"] = 22] = "DOMINICAN_REPUBLIC";
    Country[Country["EGYPT"] = 23] = "EGYPT";
    Country[Country["ESTONIA"] = 24] = "ESTONIA";
    Country[Country["FINLAND"] = 25] = "FINLAND";
    Country[Country["FRANCE"] = 26] = "FRANCE";
    Country[Country["GEORGIA"] = 27] = "GEORGIA";
    Country[Country["GERMANY"] = 28] = "GERMANY";
    Country[Country["GHANA"] = 29] = "GHANA";
    Country[Country["GREECE"] = 30] = "GREECE";
    Country[Country["GUATEMALA"] = 31] = "GUATEMALA";
    Country[Country["HONG_KONG"] = 32] = "HONG_KONG";
    Country[Country["HUNGARY"] = 33] = "HUNGARY";
    Country[Country["INDIA"] = 34] = "INDIA";
    Country[Country["INDONESIA"] = 35] = "INDONESIA";
    Country[Country["IRELAND"] = 36] = "IRELAND";
    Country[Country["ISRAEL"] = 37] = "ISRAEL";
    Country[Country["ITALY"] = 38] = "ITALY";
    Country[Country["JORDAN"] = 39] = "JORDAN";
    Country[Country["KAZAKHSTAN"] = 40] = "KAZAKHSTAN";
    Country[Country["KENYA"] = 41] = "KENYA";
    Country[Country["KOSOVO"] = 42] = "KOSOVO";
    Country[Country["KUWAIT"] = 43] = "KUWAIT";
    Country[Country["LATVIA"] = 44] = "LATVIA";
    Country[Country["LITHUANIA"] = 45] = "LITHUANIA";
    Country[Country["MALAYSIA"] = 46] = "MALAYSIA";
    Country[Country["MALDIVES"] = 47] = "MALDIVES";
    Country[Country["MALTA"] = 48] = "MALTA";
    Country[Country["MAURITIUS"] = 49] = "MAURITIUS";
    Country[Country["MEXICO"] = 50] = "MEXICO";
    Country[Country["MOROCCO"] = 51] = "MOROCCO";
    Country[Country["NETHERLANDS"] = 52] = "NETHERLANDS";
    Country[Country["NEW_ZEALAND"] = 53] = "NEW_ZEALAND";
    Country[Country["NIGERIA"] = 54] = "NIGERIA";
    Country[Country["PAKISTAN"] = 55] = "PAKISTAN";
    Country[Country["PANAMA"] = 56] = "PANAMA";
    Country[Country["PARAGUAY"] = 57] = "PARAGUAY";
    Country[Country["PHILIPPINES"] = 58] = "PHILIPPINES";
    Country[Country["POLAND"] = 59] = "POLAND";
    Country[Country["PORTUGAL"] = 60] = "PORTUGAL";
    Country[Country["PUERTO_RICO"] = 61] = "PUERTO_RICO";
    Country[Country["QATAR"] = 62] = "QATAR";
    Country[Country["ROMANIA"] = 63] = "ROMANIA";
    Country[Country["RUSSIA"] = 64] = "RUSSIA";
    Country[Country["SAUDI_ARABIA"] = 65] = "SAUDI_ARABIA";
    Country[Country["SERBIA"] = 66] = "SERBIA";
    Country[Country["SINGAPORE"] = 67] = "SINGAPORE";
    Country[Country["SLOVAKIA"] = 68] = "SLOVAKIA";
    Country[Country["SLOVENIA"] = 69] = "SLOVENIA";
    Country[Country["SOUTH_AFRICA"] = 70] = "SOUTH_AFRICA";
    Country[Country["SPAIN"] = 71] = "SPAIN";
    Country[Country["SWEDEN"] = 72] = "SWEDEN";
    Country[Country["SWITZERLAND"] = 73] = "SWITZERLAND";
    Country[Country["TAIWAN"] = 74] = "TAIWAN";
    Country[Country["THAILAND"] = 75] = "THAILAND";
    Country[Country["TUNISIA"] = 76] = "TUNISIA";
    Country[Country["TURKEY"] = 77] = "TURKEY";
    Country[Country["UAE"] = 78] = "UAE";
    Country[Country["UGANDA"] = 79] = "UGANDA";
    Country[Country["UK"] = 80] = "UK";
    Country[Country["UKRAINE"] = 81] = "UKRAINE";
    Country[Country["USA"] = 82] = "USA";
    Country[Country["VIETNAM"] = 83] = "VIETNAM";
    Country[Country["BRAZIL"] = 84] = "BRAZIL";
    Country[Country["NORWAY"] = 85] = "NORWAY";
    Country[Country["OMAN"] = 86] = "OMAN";
    Country[Country["ECUADOR"] = 87] = "ECUADOR";
    Country[Country["EL_SALVADOR"] = 88] = "EL_SALVADOR";
    Country[Country["SRI_LANKA"] = 89] = "SRI_LANKA";
    Country[Country["PERU"] = 90] = "PERU";
    Country[Country["URUGUAY"] = 91] = "URUGUAY";
    Country[Country["BAHAMAS"] = 92] = "BAHAMAS";
    Country[Country["BERMUDA"] = 93] = "BERMUDA";
    Country[Country["BOLIVIA"] = 94] = "BOLIVIA";
    Country[Country["CHINA"] = 95] = "CHINA";
    Country[Country["EUROPEAN_UNION"] = 96] = "EUROPEAN_UNION";
    Country[Country["HAITI"] = 97] = "HAITI";
    Country[Country["HONDURAS"] = 98] = "HONDURAS";
    Country[Country["ICELAND"] = 99] = "ICELAND";
    Country[Country["JAPAN"] = 100] = "JAPAN";
    Country[Country["LUXEMBOURG"] = 101] = "LUXEMBOURG";
    Country[Country["MONTENEGRO"] = 102] = "MONTENEGRO";
    Country[Country["NICARAGUA"] = 103] = "NICARAGUA";
    Country[Country["SOUTH_KOREA"] = 104] = "SOUTH_KOREA";
    Country[Country["VENEZUELA"] = 105] = "VENEZUELA";
    Country[Country["AFGHANISTAN"] = 106] = "AFGHANISTAN";
    Country[Country["ALAND_ISLANDS"] = 107] = "ALAND_ISLANDS";
    Country[Country["AMERICAN_SAMOA"] = 108] = "AMERICAN_SAMOA";
    Country[Country["ANDORRA"] = 109] = "ANDORRA";
    Country[Country["ANGOLA"] = 110] = "ANGOLA";
    Country[Country["ANGUILLA"] = 111] = "ANGUILLA";
    Country[Country["ANTARCTICA"] = 112] = "ANTARCTICA";
    Country[Country["ANTIGUA_AND_BARBUDA"] = 113] = "ANTIGUA_AND_BARBUDA";
    Country[Country["ARMENIA"] = 114] = "ARMENIA";
    Country[Country["ARUBA"] = 115] = "ARUBA";
    Country[Country["BAILIWICK_OF_GUERNSEY"] = 116] = "BAILIWICK_OF_GUERNSEY";
    Country[Country["BAILIWICK_OF_JERSEY"] = 117] = "BAILIWICK_OF_JERSEY";
    Country[Country["BARBADOS"] = 118] = "BARBADOS";
    Country[Country["BELARUS"] = 119] = "BELARUS";
    Country[Country["BELIZE"] = 120] = "BELIZE";
    Country[Country["BENIN"] = 121] = "BENIN";
    Country[Country["BHUTAN"] = 122] = "BHUTAN";
    Country[Country["BONAIRE_SAINT_EUSTATIUS_AND_SABA"] = 123] = "BONAIRE_SAINT_EUSTATIUS_AND_SABA";
    Country[Country["BOTSWANA"] = 124] = "BOTSWANA";
    Country[Country["BOUVET_ISLAND"] = 125] = "BOUVET_ISLAND";
    Country[Country["BRITISH_INDIAN_OCEAN_TERRITORY"] = 126] = "BRITISH_INDIAN_OCEAN_TERRITORY";
    Country[Country["BURKINA_FASO"] = 127] = "BURKINA_FASO";
    Country[Country["BURUNDI"] = 128] = "BURUNDI";
    Country[Country["CAMEROON"] = 129] = "CAMEROON";
    Country[Country["CAPE_VERDE"] = 130] = "CAPE_VERDE";
    Country[Country["CARIBBEAN_NETHERLANDS"] = 131] = "CARIBBEAN_NETHERLANDS";
    Country[Country["CAYMAN_ISLANDS"] = 132] = "CAYMAN_ISLANDS";
    Country[Country["CENTRAL_AFRICAN_REPUBLIC"] = 133] = "CENTRAL_AFRICAN_REPUBLIC";
    Country[Country["CHAD"] = 134] = "CHAD";
    Country[Country["CHRISTMAS_ISLAND"] = 135] = "CHRISTMAS_ISLAND";
    Country[Country["COCOS_ISLANDS"] = 136] = "COCOS_ISLANDS";
    Country[Country["COMOROS"] = 137] = "COMOROS";
    Country[Country["CONGO"] = 138] = "CONGO";
    Country[Country["COOK_ISLANDS"] = 139] = "COOK_ISLANDS";
    Country[Country["CUBA"] = 140] = "CUBA";
    Country[Country["CURACAO"] = 141] = "CURACAO";
    Country[Country["DEMOCRATIC_REPUBLIC_OF_THE_CONGO"] = 142] = "DEMOCRATIC_REPUBLIC_OF_THE_CONGO";
    Country[Country["DJIBOUTI"] = 143] = "DJIBOUTI";
    Country[Country["DOMINICA"] = 144] = "DOMINICA";
    Country[Country["EAST_TIMOR"] = 145] = "EAST_TIMOR";
    Country[Country["EQUATORIAL_GUINEA"] = 146] = "EQUATORIAL_GUINEA";
    Country[Country["ERITREA"] = 147] = "ERITREA";
    Country[Country["ETHIOPIA"] = 148] = "ETHIOPIA";
    Country[Country["FALKLAND_ISLANDS"] = 149] = "FALKLAND_ISLANDS";
    Country[Country["FAROE_ISLANDS"] = 150] = "FAROE_ISLANDS";
    Country[Country["FEDERATED_STATES_OF_MICRONESIA"] = 151] = "FEDERATED_STATES_OF_MICRONESIA";
    Country[Country["FIJI"] = 152] = "FIJI";
    Country[Country["FRENCH_GUIANA"] = 153] = "FRENCH_GUIANA";
    Country[Country["FRENCH_POLYNESIA"] = 154] = "FRENCH_POLYNESIA";
    Country[Country["FRENCH_SOUTHERN_TERRITORIES"] = 155] = "FRENCH_SOUTHERN_TERRITORIES";
    Country[Country["GABON"] = 156] = "GABON";
    Country[Country["GAMBIA"] = 157] = "GAMBIA";
    Country[Country["GIBRALTAR"] = 158] = "GIBRALTAR";
    Country[Country["GREENLAND"] = 159] = "GREENLAND";
    Country[Country["GRENADA"] = 160] = "GRENADA";
    Country[Country["GUADELOUPE"] = 161] = "GUADELOUPE";
    Country[Country["GUAM"] = 162] = "GUAM";
    Country[Country["GUINEA"] = 163] = "GUINEA";
    Country[Country["GUINEA_BISSAU"] = 164] = "GUINEA_BISSAU";
    Country[Country["GUYANA"] = 165] = "GUYANA";
    Country[Country["HEARD_ISLAND_AND_MCDONALD_ISLANDS"] = 166] = "HEARD_ISLAND_AND_MCDONALD_ISLANDS";
    Country[Country["IRAN"] = 167] = "IRAN";
    Country[Country["IRAQ"] = 168] = "IRAQ";
    Country[Country["ISLE_OF_MAN"] = 169] = "ISLE_OF_MAN";
    Country[Country["IVORY_COAST"] = 170] = "IVORY_COAST";
    Country[Country["JAMAICA"] = 171] = "JAMAICA";
    Country[Country["KIRIBATI"] = 172] = "KIRIBATI";
    Country[Country["KYRGYZSTAN"] = 173] = "KYRGYZSTAN";
    Country[Country["LAOS"] = 174] = "LAOS";
    Country[Country["LEBANON"] = 175] = "LEBANON";
    Country[Country["LESOTHO"] = 176] = "LESOTHO";
    Country[Country["LIBERIA"] = 177] = "LIBERIA";
    Country[Country["LIBYA"] = 178] = "LIBYA";
    Country[Country["LIECHTENSTEIN"] = 179] = "LIECHTENSTEIN";
    Country[Country["MACAU"] = 180] = "MACAU";
    Country[Country["MADAGASCAR"] = 181] = "MADAGASCAR";
    Country[Country["MALAWI"] = 182] = "MALAWI";
    Country[Country["MALI"] = 183] = "MALI";
    Country[Country["MARSHALL_ISLANDS"] = 184] = "MARSHALL_ISLANDS";
    Country[Country["MARTINIQUE"] = 185] = "MARTINIQUE";
    Country[Country["MAURITANIA"] = 186] = "MAURITANIA";
    Country[Country["MAYOTTE"] = 187] = "MAYOTTE";
    Country[Country["MOLDOVA"] = 188] = "MOLDOVA";
    Country[Country["MONACO"] = 189] = "MONACO";
    Country[Country["MONGOLIA"] = 190] = "MONGOLIA";
    Country[Country["MONTSERRAT"] = 191] = "MONTSERRAT";
    Country[Country["MOZAMBIQUE"] = 192] = "MOZAMBIQUE";
    Country[Country["MYANMAR"] = 193] = "MYANMAR";
    Country[Country["NAMIBIA"] = 194] = "NAMIBIA";
    Country[Country["NAURU"] = 195] = "NAURU";
    Country[Country["NEPAL"] = 196] = "NEPAL";
    Country[Country["NEW_CALEDONIA"] = 197] = "NEW_CALEDONIA";
    Country[Country["NIGER"] = 198] = "NIGER";
    Country[Country["NIUE"] = 199] = "NIUE";
    Country[Country["NORFOLK_ISLAND"] = 200] = "NORFOLK_ISLAND";
    Country[Country["NORTHERN_CYPRUS"] = 201] = "NORTHERN_CYPRUS";
    Country[Country["NORTHERN_MARIANA_ISLANDS"] = 202] = "NORTHERN_MARIANA_ISLANDS";
    Country[Country["NORTH_KOREA"] = 203] = "NORTH_KOREA";
    Country[Country["NORTH_MACEDONIA"] = 204] = "NORTH_MACEDONIA";
    Country[Country["PALAU"] = 205] = "PALAU";
    Country[Country["PALESTINE"] = 206] = "PALESTINE";
    Country[Country["PAPUA_NEW_GUINEA"] = 207] = "PAPUA_NEW_GUINEA";
    Country[Country["PITCAIRN"] = 208] = "PITCAIRN";
    Country[Country["REUNION"] = 209] = "REUNION";
    Country[Country["RWANDA"] = 210] = "RWANDA";
    Country[Country["SAINT_BARTHELEMY"] = 211] = "SAINT_BARTHELEMY";
    Country[Country["SAINT_HELENA_ASCENSION_AND_TRISTIAN_DA_CUNHA"] = 212] = "SAINT_HELENA_ASCENSION_AND_TRISTIAN_DA_CUNHA";
    Country[Country["SAINT_KITTS_AND_NEVIS"] = 213] = "SAINT_KITTS_AND_NEVIS";
    Country[Country["SAINT_LUCIA"] = 214] = "SAINT_LUCIA";
    Country[Country["SAINT_MARTIN"] = 215] = "SAINT_MARTIN";
    Country[Country["SAINT_PIERRE_AND_MIQUELON"] = 216] = "SAINT_PIERRE_AND_MIQUELON";
    Country[Country["SAINT_VINCENT_AND_THE_GRENADINES"] = 217] = "SAINT_VINCENT_AND_THE_GRENADINES";
    Country[Country["SAMOA"] = 218] = "SAMOA";
    Country[Country["SAN_MARINO"] = 219] = "SAN_MARINO";
    Country[Country["SAO_TOME_AND_PRINCIPE"] = 220] = "SAO_TOME_AND_PRINCIPE";
    Country[Country["SENEGAL"] = 221] = "SENEGAL";
    Country[Country["SEYCHELLES"] = 222] = "SEYCHELLES";
    Country[Country["SIERRA_LEONE"] = 223] = "SIERRA_LEONE";
    Country[Country["SINT_MAARTEN"] = 224] = "SINT_MAARTEN";
    Country[Country["SOLOMON_ISLANDS"] = 225] = "SOLOMON_ISLANDS";
    Country[Country["SOMALIA"] = 226] = "SOMALIA";
    Country[Country["SOUTH_GEORGIA_AND_THE_SOUTH_SANDWICH_ISLANDS"] = 227] = "SOUTH_GEORGIA_AND_THE_SOUTH_SANDWICH_ISLANDS";
    Country[Country["SOUTH_SUDAN"] = 228] = "SOUTH_SUDAN";
    Country[Country["SUDAN"] = 229] = "SUDAN";
    Country[Country["SURINAME"] = 230] = "SURINAME";
    Country[Country["SVALBARD_AND_JAN_MAYEN"] = 231] = "SVALBARD_AND_JAN_MAYEN";
    Country[Country["SWAZILAND"] = 232] = "SWAZILAND";
    Country[Country["SYRIA"] = 233] = "SYRIA";
    Country[Country["TAJIKISTAN"] = 234] = "TAJIKISTAN";
    Country[Country["TANZANIA"] = 235] = "TANZANIA";
    Country[Country["TOGO"] = 236] = "TOGO";
    Country[Country["TOKELAU"] = 237] = "TOKELAU";
    Country[Country["TONGA"] = 238] = "TONGA";
    Country[Country["TRINIDAD_AND_TOBAGO"] = 239] = "TRINIDAD_AND_TOBAGO";
    Country[Country["TURKMENISTAN"] = 240] = "TURKMENISTAN";
    Country[Country["TURKS_AND_CAICOS_ISLANDS"] = 241] = "TURKS_AND_CAICOS_ISLANDS";
    Country[Country["TUVALU"] = 242] = "TUVALU";
    Country[Country["UNITED_STATES_MINOR_OUTLYING_ISLANDS"] = 243] = "UNITED_STATES_MINOR_OUTLYING_ISLANDS";
    Country[Country["UZBEKISTAN"] = 244] = "UZBEKISTAN";
    Country[Country["VANUATU"] = 245] = "VANUATU";
    Country[Country["VATICAN_CITY"] = 246] = "VATICAN_CITY";
    Country[Country["VIRGIN_ISLANDS_BRITISH"] = 247] = "VIRGIN_ISLANDS_BRITISH";
    Country[Country["VIRGIN_ISLANDS_US"] = 248] = "VIRGIN_ISLANDS_US";
    Country[Country["WALLIS_AND_FUTUNA"] = 249] = "WALLIS_AND_FUTUNA";
    Country[Country["WESTERN_SAHARA"] = 250] = "WESTERN_SAHARA";
    Country[Country["YEMEN"] = 251] = "YEMEN";
    Country[Country["YUGOSLAVIA"] = 252] = "YUGOSLAVIA";
    Country[Country["ZAMBIA"] = 253] = "ZAMBIA";
    Country[Country["ZIMBABWE"] = 254] = "ZIMBABWE";
    Country[Country["COUNT"] = 255] = "COUNT";
})(exports.Country || (exports.Country = {}));
exports.Region = void 0;
(function (Region) {
    Region[Region["NONE"] = 0] = "NONE";
    Region[Region["ALABAMA"] = 1] = "ALABAMA";
    Region[Region["ALASKA"] = 2] = "ALASKA";
    Region[Region["ALBERTA"] = 3] = "ALBERTA";
    Region[Region["ARIZONA"] = 4] = "ARIZONA";
    Region[Region["ARKANSAS"] = 5] = "ARKANSAS";
    Region[Region["AUSTRALIAN_CAPITAL_TERRITORY"] = 6] = "AUSTRALIAN_CAPITAL_TERRITORY";
    Region[Region["BRITISH_COLUMBIA"] = 7] = "BRITISH_COLUMBIA";
    Region[Region["CALIFORNIA"] = 8] = "CALIFORNIA";
    Region[Region["COLORADO"] = 9] = "COLORADO";
    Region[Region["CONNECTICUT"] = 10] = "CONNECTICUT";
    Region[Region["DELAWARE"] = 11] = "DELAWARE";
    Region[Region["DISTRICT_OF_COLUMBIA"] = 12] = "DISTRICT_OF_COLUMBIA";
    Region[Region["FLORIDA"] = 13] = "FLORIDA";
    Region[Region["GEORGIA"] = 14] = "GEORGIA";
    Region[Region["HAWAII"] = 15] = "HAWAII";
    Region[Region["IDAHO"] = 16] = "IDAHO";
    Region[Region["ILLINOIS"] = 17] = "ILLINOIS";
    Region[Region["INDIANA"] = 18] = "INDIANA";
    Region[Region["IOWA"] = 19] = "IOWA";
    Region[Region["KANSAS"] = 20] = "KANSAS";
    Region[Region["KENTUCKY"] = 21] = "KENTUCKY";
    Region[Region["LOUISIANA"] = 22] = "LOUISIANA";
    Region[Region["MAINE"] = 23] = "MAINE";
    Region[Region["MANITOBA"] = 24] = "MANITOBA";
    Region[Region["MARYLAND"] = 25] = "MARYLAND";
    Region[Region["MASSACHUSETTS"] = 26] = "MASSACHUSETTS";
    Region[Region["MICHIGAN"] = 27] = "MICHIGAN";
    Region[Region["MINNESOTA"] = 28] = "MINNESOTA";
    Region[Region["MISSISSIPPI"] = 29] = "MISSISSIPPI";
    Region[Region["MISSOURI"] = 30] = "MISSOURI";
    Region[Region["MONTANA"] = 31] = "MONTANA";
    Region[Region["NEBRASKA"] = 32] = "NEBRASKA";
    Region[Region["NEVADA"] = 33] = "NEVADA";
    Region[Region["NEW_BRUNSWICK"] = 34] = "NEW_BRUNSWICK";
    Region[Region["NEW_HAMPSHIRE"] = 35] = "NEW_HAMPSHIRE";
    Region[Region["NEW_JERSEY"] = 36] = "NEW_JERSEY";
    Region[Region["NEW_MEXICO"] = 37] = "NEW_MEXICO";
    Region[Region["NEW_SOUTH_WALES"] = 38] = "NEW_SOUTH_WALES";
    Region[Region["NEW_YORK"] = 39] = "NEW_YORK";
    Region[Region["NORTHERN_TERRITORY"] = 40] = "NORTHERN_TERRITORY";
    Region[Region["NORTH_CAROLINA"] = 41] = "NORTH_CAROLINA";
    Region[Region["NORTH_DAKOTA"] = 42] = "NORTH_DAKOTA";
    Region[Region["NOVA_SCOTIA"] = 43] = "NOVA_SCOTIA";
    Region[Region["OHIO"] = 44] = "OHIO";
    Region[Region["OKLAHOMA"] = 45] = "OKLAHOMA";
    Region[Region["ONTARIO"] = 46] = "ONTARIO";
    Region[Region["OREGON"] = 47] = "OREGON";
    Region[Region["PENNSYLVANIA"] = 48] = "PENNSYLVANIA";
    Region[Region["QUEBEC"] = 49] = "QUEBEC";
    Region[Region["QUEENSLAND"] = 50] = "QUEENSLAND";
    Region[Region["RHODE_ISLAND"] = 51] = "RHODE_ISLAND";
    Region[Region["SASKATCHEWAN"] = 52] = "SASKATCHEWAN";
    Region[Region["SOUTH_AUSTRALIA"] = 53] = "SOUTH_AUSTRALIA";
    Region[Region["SOUTH_CAROLINA"] = 54] = "SOUTH_CAROLINA";
    Region[Region["SOUTH_DAKOTA"] = 55] = "SOUTH_DAKOTA";
    Region[Region["TASMANIA"] = 56] = "TASMANIA";
    Region[Region["TENNESSEE"] = 57] = "TENNESSEE";
    Region[Region["TEXAS"] = 58] = "TEXAS";
    Region[Region["UTAH"] = 59] = "UTAH";
    Region[Region["VERMONT"] = 60] = "VERMONT";
    Region[Region["VICTORIA"] = 61] = "VICTORIA";
    Region[Region["VIRGINIA"] = 62] = "VIRGINIA";
    Region[Region["WASHINGTON"] = 63] = "WASHINGTON";
    Region[Region["WESTERN_AUSTRALIA"] = 64] = "WESTERN_AUSTRALIA";
    Region[Region["WEST_VIRGINIA"] = 65] = "WEST_VIRGINIA";
    Region[Region["WISCONSIN"] = 66] = "WISCONSIN";
    Region[Region["WYOMING"] = 67] = "WYOMING";
    Region[Region["YUKON"] = 68] = "YUKON";
    Region[Region["CIUDAD_DE_MEXICO"] = 69] = "CIUDAD_DE_MEXICO";
    Region[Region["JALISCO"] = 70] = "JALISCO";
    Region[Region["NEWFOUNDLAND_AND_LABRADOR"] = 71] = "NEWFOUNDLAND_AND_LABRADOR";
    Region[Region["NUEVO_LEON"] = 72] = "NUEVO_LEON";
    Region[Region["BAJA_CALIFORNIA"] = 73] = "BAJA_CALIFORNIA";
    Region[Region["CHIHUAHUA"] = 74] = "CHIHUAHUA";
    Region[Region["GUANAJUATO"] = 75] = "GUANAJUATO";
    Region[Region["GUERRERO"] = 76] = "GUERRERO";
    Region[Region["MEXICO"] = 77] = "MEXICO";
    Region[Region["MICHOACAN"] = 78] = "MICHOACAN";
    Region[Region["NEW_YORK_CITY"] = 79] = "NEW_YORK_CITY";
    Region[Region["TAMAULIPAS"] = 80] = "TAMAULIPAS";
    Region[Region["VERACRUZ"] = 81] = "VERACRUZ";
    Region[Region["CHIAPAS"] = 82] = "CHIAPAS";
    Region[Region["COAHUILA"] = 83] = "COAHUILA";
    Region[Region["DURANGO"] = 84] = "DURANGO";
    Region[Region["GUERRERO_COCULA"] = 85] = "GUERRERO_COCULA";
    Region[Region["GUERRERO_JUCHITAN"] = 86] = "GUERRERO_JUCHITAN";
    Region[Region["GUERRERO_TEPECOACUILCO"] = 87] = "GUERRERO_TEPECOACUILCO";
    Region[Region["GUERRERO_TLACOAPA"] = 88] = "GUERRERO_TLACOAPA";
    Region[Region["GUJARAT"] = 89] = "GUJARAT";
    Region[Region["HIDALGO"] = 90] = "HIDALGO";
    Region[Region["KARNATAKA"] = 91] = "KARNATAKA";
    Region[Region["KERALA"] = 92] = "KERALA";
    Region[Region["KHYBER_PAKHTUNKHWA"] = 93] = "KHYBER_PAKHTUNKHWA";
    Region[Region["MADHYA_PRADESH"] = 94] = "MADHYA_PRADESH";
    Region[Region["MAHARASHTRA"] = 95] = "MAHARASHTRA";
    Region[Region["MORELOS"] = 96] = "MORELOS";
    Region[Region["NAYARIT"] = 97] = "NAYARIT";
    Region[Region["OAXACA"] = 98] = "OAXACA";
    Region[Region["PUEBLA"] = 99] = "PUEBLA";
    Region[Region["PUNJAB"] = 100] = "PUNJAB";
    Region[Region["QUERETARO"] = 101] = "QUERETARO";
    Region[Region["SAN_LUIS_POTOSI"] = 102] = "SAN_LUIS_POTOSI";
    Region[Region["SINALOA"] = 103] = "SINALOA";
    Region[Region["SONORA"] = 104] = "SONORA";
    Region[Region["TABASCO"] = 105] = "TABASCO";
    Region[Region["TAMIL_NADU"] = 106] = "TAMIL_NADU";
    Region[Region["YUCATAN"] = 107] = "YUCATAN";
    Region[Region["ZACATECAS"] = 108] = "ZACATECAS";
    Region[Region["AGUASCALIENTES"] = 109] = "AGUASCALIENTES";
    Region[Region["BAJA_CALIFORNIA_SUR"] = 110] = "BAJA_CALIFORNIA_SUR";
    Region[Region["CAMPECHE"] = 111] = "CAMPECHE";
    Region[Region["COLIMA"] = 112] = "COLIMA";
    Region[Region["QUINTANA_ROO_BENITO_JUAREZ"] = 113] = "QUINTANA_ROO_BENITO_JUAREZ";
    Region[Region["COUNT"] = 114] = "COUNT";
})(exports.Region || (exports.Region = {}));
exports.DocumentType = void 0;
(function (DocumentType) {
    DocumentType[DocumentType["NONE"] = 0] = "NONE";
    DocumentType[DocumentType["CONSULAR_ID"] = 1] = "CONSULAR_ID";
    DocumentType[DocumentType["DL"] = 2] = "DL";
    DocumentType[DocumentType["DL_PUBLIC_SERVICES_CARD"] = 3] = "DL_PUBLIC_SERVICES_CARD";
    DocumentType[DocumentType["EMPLOYMENT_PASS"] = 4] = "EMPLOYMENT_PASS";
    DocumentType[DocumentType["FIN_CARD"] = 5] = "FIN_CARD";
    DocumentType[DocumentType["ID"] = 6] = "ID";
    DocumentType[DocumentType["MULTIPURPOSE_ID"] = 7] = "MULTIPURPOSE_ID";
    DocumentType[DocumentType["MyKad"] = 8] = "MyKad";
    DocumentType[DocumentType["MyKid"] = 9] = "MyKid";
    DocumentType[DocumentType["MyPR"] = 10] = "MyPR";
    DocumentType[DocumentType["MyTentera"] = 11] = "MyTentera";
    DocumentType[DocumentType["PAN_CARD"] = 12] = "PAN_CARD";
    DocumentType[DocumentType["PROFESSIONAL_ID"] = 13] = "PROFESSIONAL_ID";
    DocumentType[DocumentType["PUBLIC_SERVICES_CARD"] = 14] = "PUBLIC_SERVICES_CARD";
    DocumentType[DocumentType["RESIDENCE_PERMIT"] = 15] = "RESIDENCE_PERMIT";
    DocumentType[DocumentType["RESIDENT_ID"] = 16] = "RESIDENT_ID";
    DocumentType[DocumentType["TEMPORARY_RESIDENCE_PERMIT"] = 17] = "TEMPORARY_RESIDENCE_PERMIT";
    DocumentType[DocumentType["VOTER_ID"] = 18] = "VOTER_ID";
    DocumentType[DocumentType["WORK_PERMIT"] = 19] = "WORK_PERMIT";
    DocumentType[DocumentType["iKAD"] = 20] = "iKAD";
    DocumentType[DocumentType["MILITARY_ID"] = 21] = "MILITARY_ID";
    DocumentType[DocumentType["MyKAS"] = 22] = "MyKAS";
    DocumentType[DocumentType["SOCIAL_SECURITY_CARD"] = 23] = "SOCIAL_SECURITY_CARD";
    DocumentType[DocumentType["HEALTH_INSURANCE_CARD"] = 24] = "HEALTH_INSURANCE_CARD";
    DocumentType[DocumentType["PASSPORT"] = 25] = "PASSPORT";
    DocumentType[DocumentType["S_PASS"] = 26] = "S_PASS";
    DocumentType[DocumentType["ADDRESS_CARD"] = 27] = "ADDRESS_CARD";
    DocumentType[DocumentType["ALIEN_ID"] = 28] = "ALIEN_ID";
    DocumentType[DocumentType["ALIEN_PASSPORT"] = 29] = "ALIEN_PASSPORT";
    DocumentType[DocumentType["GREEN_CARD"] = 30] = "GREEN_CARD";
    DocumentType[DocumentType["MINORS_ID"] = 31] = "MINORS_ID";
    DocumentType[DocumentType["POSTAL_ID"] = 32] = "POSTAL_ID";
    DocumentType[DocumentType["PROFESSIONAL_DL"] = 33] = "PROFESSIONAL_DL";
    DocumentType[DocumentType["TAX_ID"] = 34] = "TAX_ID";
    DocumentType[DocumentType["WEAPON_PERMIT"] = 35] = "WEAPON_PERMIT";
    DocumentType[DocumentType["VISA"] = 36] = "VISA";
    DocumentType[DocumentType["BORDER_CROSSING_CARD"] = 37] = "BORDER_CROSSING_CARD";
    DocumentType[DocumentType["DRIVER_CARD"] = 38] = "DRIVER_CARD";
    DocumentType[DocumentType["GLOBAL_ENTRY_CARD"] = 39] = "GLOBAL_ENTRY_CARD";
    DocumentType[DocumentType["MyPolis"] = 40] = "MyPolis";
    DocumentType[DocumentType["NEXUS_CARD"] = 41] = "NEXUS_CARD";
    DocumentType[DocumentType["PASSPORT_CARD"] = 42] = "PASSPORT_CARD";
    DocumentType[DocumentType["PROOF_OF_AGE_CARD"] = 43] = "PROOF_OF_AGE_CARD";
    DocumentType[DocumentType["REFUGEE_ID"] = 44] = "REFUGEE_ID";
    DocumentType[DocumentType["TRIBAL_ID"] = 45] = "TRIBAL_ID";
    DocumentType[DocumentType["VETERAN_ID"] = 46] = "VETERAN_ID";
    DocumentType[DocumentType["CITIZENSHIP_CERTIFICATE"] = 47] = "CITIZENSHIP_CERTIFICATE";
    DocumentType[DocumentType["COUNT"] = 48] = "COUNT";
})(exports.DocumentType || (exports.DocumentType = {}));

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
/**
 * DocumentImageColorStatus enum defines possible color statuses determined from scanned image.
 */
exports.DocumentImageColorStatus = void 0;
(function (DocumentImageColorStatus) {
    /** Determining image color status was not performed */
    DocumentImageColorStatus[DocumentImageColorStatus["NotAvailable"] = 0] = "NotAvailable";
    /** Black-and-white image scanned */
    DocumentImageColorStatus[DocumentImageColorStatus["BlackAndWhite"] = 1] = "BlackAndWhite";
    /** Color image scanned */
    DocumentImageColorStatus[DocumentImageColorStatus["Color"] = 2] = "Color";
})(exports.DocumentImageColorStatus || (exports.DocumentImageColorStatus = {}));
/**
 *  ImageAnalysisDetectionStatus enum defines possible states of specific image object detection.
 */
exports.ImageAnalysisDetectionStatus = void 0;
(function (ImageAnalysisDetectionStatus) {
    /** Detection was not performed */
    ImageAnalysisDetectionStatus[ImageAnalysisDetectionStatus["NotAvailable"] = 0] = "NotAvailable";
    /** Object not detected on input image */
    ImageAnalysisDetectionStatus[ImageAnalysisDetectionStatus["NotDetected"] = 1] = "NotDetected";
    /** Object detected on input image */
    ImageAnalysisDetectionStatus[ImageAnalysisDetectionStatus["Detected"] = 2] = "Detected";
})(exports.ImageAnalysisDetectionStatus || (exports.ImageAnalysisDetectionStatus = {}));

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
/** Detailed information about the recognition process. */
exports.ProcessingStatus = void 0;
(function (ProcessingStatus) {
    /** Recognition was successful. */
    ProcessingStatus[ProcessingStatus["Success"] = 0] = "Success";
    /** Detection of the document failed. */
    ProcessingStatus[ProcessingStatus["DetectionFailed"] = 1] = "DetectionFailed";
    /** Preprocessing of the input image has failed. */
    ProcessingStatus[ProcessingStatus["ImagePreprocessingFailed"] = 2] = "ImagePreprocessingFailed";
    /** Recognizer has inconsistent results. */
    ProcessingStatus[ProcessingStatus["StabilityTestFailed"] = 3] = "StabilityTestFailed";
    /** Wrong side of the document has been scanned. */
    ProcessingStatus[ProcessingStatus["ScanningWrongSide"] = 4] = "ScanningWrongSide";
    /** Identification of the fields present on the document has failed. */
    ProcessingStatus[ProcessingStatus["FieldIdentificationFailed"] = 5] = "FieldIdentificationFailed";
    /** Mandatory field for the specific document is missing. */
    ProcessingStatus[ProcessingStatus["MandatoryFieldMissing"] = 6] = "MandatoryFieldMissing";
    /** Result contains invalid characters in some of the fields. */
    ProcessingStatus[ProcessingStatus["InvalidCharactersFound"] = 7] = "InvalidCharactersFound";
    /** Failed to return a requested image. */
    ProcessingStatus[ProcessingStatus["ImageReturnFailed"] = 8] = "ImageReturnFailed";
    /** Reading or parsing of the barcode has failed. */
    ProcessingStatus[ProcessingStatus["BarcodeRecognitionFailed"] = 9] = "BarcodeRecognitionFailed";
    /** Parsing of the MRZ has failed. */
    ProcessingStatus[ProcessingStatus["MrzParsingFailed"] = 10] = "MrzParsingFailed";
    /** Document class has been filtered out. */
    ProcessingStatus[ProcessingStatus["ClassFiltered"] = 11] = "ClassFiltered";
    /** Document currently not supported by the recognizer. */
    ProcessingStatus[ProcessingStatus["UnsupportedClass"] = 12] = "UnsupportedClass";
    /** License for the detected document is missing. */
    ProcessingStatus[ProcessingStatus["UnsupportedByLicense"] = 13] = "UnsupportedByLicense";
    /**
     * Front side recognition has completed successfully, and recognizer is waiting for the other
     * side to be scanned.
     */
    ProcessingStatus[ProcessingStatus["AwaitingOtherSide"] = 14] = "AwaitingOtherSide";
    /** Number of possible processing statuses. */
    ProcessingStatus[ProcessingStatus["Count"] = 15] = "Count";
})(exports.ProcessingStatus || (exports.ProcessingStatus = {}));

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
/**
 * RecognitionMode enum defines possible recognition modes by BlinkID(Combined)Recognizer.
 */
exports.RecognitionMode = void 0;
(function (RecognitionMode) {
    /** No recognition performed. */
    RecognitionMode[RecognitionMode["None"] = 0] = "None";
    /** Recognition of mrz document (does not include visa and passport) */
    RecognitionMode[RecognitionMode["MrzId"] = 1] = "MrzId";
    /** Recognition of visa mrz. */
    RecognitionMode[RecognitionMode["MrzVisa"] = 2] = "MrzVisa";
    /** Recognition of passport mrz. */
    RecognitionMode[RecognitionMode["MrzPassport"] = 3] = "MrzPassport";
    /** Recognition of documents that have face photo on the front. */
    RecognitionMode[RecognitionMode["PhotoId"] = 4] = "PhotoId";
    /** Detailed document recognition. */
    RecognitionMode[RecognitionMode["FullRecognition"] = 5] = "FullRecognition";
    /** Recognition of barcode document. */
    RecognitionMode[RecognitionMode["BarcodeId"] = 6] = "BarcodeId";
    /** Number of possible values */
    RecognitionMode[RecognitionMode["Count"] = 7] = "Count";
})(exports.RecognitionMode || (exports.RecognitionMode = {}));

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
/**
* RecognitionModeFilter is used to enable/disable recognition of specific document groups.
* Setting is taken into account only if the right for that document is purchased.
*/
class RecognitionModeFilter {
    constructor() {
        /** Enable scanning of MRZ IDs. Setting is taken into account only if the mrz_id right is purchased. */
        this.enableMrzId = true;
        /** Enable scanning of Passport MRZ. Setting is taken into account only if the passport right is purchased. */
        this.enableMrzPassport = true;
        /** Enable scanning of visa MRZ. Setting is taken into account only if the visa right is purchased. */
        this.enableMrzVisa = true;
        /** Enable scanning of Photo ID. Setting is taken into account only if the photo_id right is purchased. */
        this.enablePhotoId = true;
        /**
         * Enable scanning of barcode IDs. Setting is taken into account only if the barcode right to
         * scan that barcode is purchased.
        */
        this.enableBarcodeId = true;
        /**
         * Enable full document recognition. Setting is taken into account only if the document right to
         * scan that document is purchased.
         */
        this.enableFullDocumentRecognition = true;
    }
}
/**
 * A settings object that is used for configuring the BlinkIdRecognizer.
 */
class BlinkIdRecognizerSettings {
    constructor() {
        /**
         *  Defines whether blured frames filtering is allowed"
         */
        this.allowBlurFilter = true;
        /**
         * Defines whether returning of unparsed MRZ (Machine Readable Zone) results is allowed.
         */
        this.allowUnparsedMrzResults = false;
        /**
         * Defines whether returning unverified MRZ (Machine Readable Zone) results is allowed.
         * Unverified MRZ is parsed, but check digits are incorrect.
         */
        this.allowUnverifiedMrzResults = true;
        /**
         * Enable or disable recognition of specific document groups supported by the current license.
         * By default all modes are enabled.
         */
        this.recognitionModeFilter = new RecognitionModeFilter();
        /**
         * Configure the recognizer to only work on already cropped and dewarped images.
         * This only works for still images - video feeds will ignore this setting.
         */
        this.scanCroppedDocumentImage = false;
        /**
         * Whether result characters validatation is performed.
         * If a result member contains invalid character, the result state cannot be valid.
         */
        this.validateResultCharacters = true;
        /**
         * Whether sensitive data should be removed from images, result fields or both.
         * The setting only applies to certain documents.
         */
        this.anonymizationMode = exports.AnonymizationMode.FullResult;
        /**
         * Called when barcode scanning step starts.
         */
        this.barcodeScanningStartedCallback = null;
        /**
         * Called when recognizer classifies a document.
         */
        this.classifierCallback = null;
        /**
         * If set to `null`, all supported documents will be recognized.
         * Otherwise, only classes from given array will be recognized and all other
         * documents will be treated as "not supported" (observable via classifierCallback).
         */
        this.allowedDocumentClasses = null;
        /**
         * Padding is a minimum distance from the edge of the frame and it is defined
         * as a percentage of the frame width. Recommended value is '0.02'.
         * By default, this is set to '0.0' which means that padding edge and image edge are the same.
         */
        this.paddingEdge = 0.0;
        // implementation of the FullDocumentImageOptions interface
        this.returnFullDocumentImage = false;
        this.returnEncodedFullDocumentImage = false;
        this._fullDocumentImageDpi = 250;
        this.fullDocumentImageExtensionFactors = new ExtensionFactors();
        // implementation of the FaceImageOptions interface
        this.returnFaceImage = false;
        this.returnEncodedFaceImage = false;
        this._faceImageDpi = 250;
        // implementation of the SignatureImageOptions interface
        this.returnSignatureImage = false;
        this.returnEncodedSignatureImage = false;
        this._signatureImageDpi = 250;
    }
    get fullDocumentImageDpi() { return this._fullDocumentImageDpi; }
    set fullDocumentImageDpi(value) {
        validateDpi(value);
        this._fullDocumentImageDpi = value;
    }
    get faceImageDpi() { return this._faceImageDpi; }
    set faceImageDpi(value) {
        validateDpi(value);
        this._faceImageDpi = value;
    }
    get signatureImageDpi() { return this._signatureImageDpi; }
    set signatureImageDpi(value) {
        validateDpi(value);
        this._signatureImageDpi = value;
    }
}
/**
 * This function is used to create a new instance of `BlinkIdRecognizer`.
 * @param wasmSDK Instance of WasmSDK which will be used to communicate with the WebAssembly module.
 */
function createBlinkIdRecognizer(wasmSDK) {
    return __awaiter(this, void 0, void 0, function* () {
        return wasmSDK.mbWasmModule.newRecognizer("BlinkIdRecognizer");
    });
}

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
/**
 * A settings object that is used for configuring the BlinkIdCombinedRecognizer.
 */
class BlinkIdCombinedRecognizerSettings extends BlinkIdRecognizerSettings {
    constructor() {
        super(...arguments);
        /**
         * Proceed with scanning the back side even if the front side result is uncertain.
         * This only works for still images - video feeds will ignore this setting.
         */
        this.allowUncertainFrontSideScan = false;
        /**
         * Configure the number of characters per field that are allowed to be inconsistent in data match.
         */
        this.maxAllowedMismatchesPerField = 0;
        // implementation od the DigitalSignatureOptions interface
        this.allowSignature = false;
    }
}
/**
 * This function is used to create a new instance of `BlinkIdCombinedRecognizer`.
 * @param wasmSDK Instance of WasmSDK which will be used to communicate with the WebAssembly module.
 */
function createBlinkIdCombinedRecognizer(wasmSDK) {
    return __awaiter(this, void 0, void 0, function* () {
        return wasmSDK.mbWasmModule.newRecognizer("BlinkIdCombinedRecognizer");
    });
}

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
/**
 * A settings object that is used for configuring the IdBarcodeRecognizer.
 */
class IdBarcodeRecognizerSettings {
}
/**
 * This function is used to create a new instance of `IdBarcodeRecognizer`.
 * @param wasmSDK Instance of WasmSDK which will be used to communicate with the WebAssembly module.
 */
function createIdBarcodeRecognizer(wasmSDK) {
    return __awaiter(this, void 0, void 0, function* () {
        return wasmSDK.mbWasmModule.newRecognizer("IdBarcodeRecognizer");
    });
}
/**
 * Represents the type of scanned document
 */
exports.IdBarcodeDocumentType = void 0;
(function (IdBarcodeDocumentType) {
    /**
     * No document was scanned
     */
    IdBarcodeDocumentType[IdBarcodeDocumentType["None"] = 0] = "None";
    /**
     * AAMVACompliant document was scanned
     */
    IdBarcodeDocumentType[IdBarcodeDocumentType["AAMVACompliant"] = 1] = "AAMVACompliant";
    /**
     * ArgentinaID document was scanned
     */
    IdBarcodeDocumentType[IdBarcodeDocumentType["ArgentinaID"] = 2] = "ArgentinaID";
    /**
     * ArgentinaDL document was scanned
     */
    IdBarcodeDocumentType[IdBarcodeDocumentType["ArgentinaDL"] = 3] = "ArgentinaDL";
    /**
     * ColombiaID document was scanned
     */
    IdBarcodeDocumentType[IdBarcodeDocumentType["ColombiaID"] = 4] = "ColombiaID";
    /**
     * ColombiaDL document was scanned
     */
    IdBarcodeDocumentType[IdBarcodeDocumentType["ColombiaDL"] = 5] = "ColombiaDL";
    /**
     * NigeriaVoterID document was scanned
     */
    IdBarcodeDocumentType[IdBarcodeDocumentType["NigeriaVoterID"] = 6] = "NigeriaVoterID";
    /**
     * NigeriaDL document was scanned
     */
    IdBarcodeDocumentType[IdBarcodeDocumentType["NigeriaDL"] = 7] = "NigeriaDL";
    /**
     * PanamaID document was scanned
     */
    IdBarcodeDocumentType[IdBarcodeDocumentType["PanamaID"] = 8] = "PanamaID";
    /**
     * SouthAfricaID document was scanned
     */
    IdBarcodeDocumentType[IdBarcodeDocumentType["SouthAfricaID"] = 9] = "SouthAfricaID";
})(exports.IdBarcodeDocumentType || (exports.IdBarcodeDocumentType = {}));

exports.BlinkIdCombinedRecognizerSettings = BlinkIdCombinedRecognizerSettings;
exports.BlinkIdRecognizerSettings = BlinkIdRecognizerSettings;
exports.CapturedFrame = CapturedFrame;
exports.ExtensionFactors = ExtensionFactors;
exports.IdBarcodeRecognizerSettings = IdBarcodeRecognizerSettings;
exports.RecognitionModeFilter = RecognitionModeFilter;
exports.VideoRecognizer = VideoRecognizer;
exports.VideoRecognizerError = VideoRecognizerError;
exports.WasmSDKLoadSettings = WasmSDKLoadSettings;
exports.captureFrame = captureFrame;
exports.createBlinkIdCombinedRecognizer = createBlinkIdCombinedRecognizer;
exports.createBlinkIdRecognizer = createBlinkIdRecognizer;
exports.createIdBarcodeRecognizer = createIdBarcodeRecognizer;
exports.createRecognizerRunner = createRecognizerRunner;
exports.createSuccessFrameGrabberRecognizer = createSuccessFrameGrabberRecognizer;
exports.detectWasmType = detectWasmType;
exports.isBrowserSupported = isBrowserSupported;
exports.loadWasmModule = loadWasmModule;
exports.validateDpi = validateDpi;
exports.wasmFolder = wasmFolder;

Object.defineProperty(exports, '__esModule', { value: true });

})));
