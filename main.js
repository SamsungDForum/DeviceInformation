(function() {
    'use strict';

    /**
     * Displays logging information on the screen and in the
     * @param {string} msg - Message to log.
     */
    function log(msg) {
        var logsEl = document.getElementById('logs');

        if (msg) {
            // Update logs
            console.log('[DeviceInfo]: ', msg);
            logsEl.innerHTML += msg + '<br />';
        } else {
            // Clear logs
            logsEl.innerHTML = '';
        }

        logsEl.scrollTop = logsEl.scrollHeight;
    }

    /**
     * Register keys used in this application
     */
    function registerKeys() {
        var usedKeys = ['0', '1', '2', '3', '4', '5', '7', '8', '9'];

        usedKeys.forEach(
            function (keyName) {
                tizen.tvinputdevice.registerKey(keyName);
            }
        );
    }


    /**
     * Handle input from remote
     */
    function registerKeyHandler() {
        document.addEventListener(
            'keydown', function (e) {
                switch (e.keyCode) {
                    //key 0
                    case 48:
                        reset();
                        break;
                    //key 1
                    case 49:
                        getSystemInfo();
                        break;
                    //key 2
                    case 50:
                        addSystemInfoListener();
                        break;
                    //key 3
                    case 51:
                        removeSystemInfoListener();
                        break;
                    //key 4
                    case 52:
                        getProductInfo();
                        addProductInfoListeners();
                        break;
                    //key 5
                    case 53:
                        removeProductInfoListeners();
                        break;
                    //key 7
                    case 55:
                        getTvInfo();
                        addTvInfoListeners();
                        break;
                    //key 8
                    case 56:
                        removeTvInfoListeners();
                        break;
                    case 10009:
                        tizen.application.getCurrentApplication().exit();
                        break;
                }
            }
        );
    }

    /**
     * Display application version
     */
    function displayVersion() {
        var el = document.createElement('div');
        el.id = 'version';
        el.innerHTML = 'ver: ' + tizen.application.getAppInfo().version;
        document.body.appendChild(el);
    }

    /*
     * clear all logs and remove all listeners
     * @private
     */
    function reset () {
        removeProductInfoListeners();
        removeTvInfoListeners();
        removeSystemInfoListener();

        log();
    }

    var arrayListenerID,
        listenerID;

    /**
     * docs me
     */
    function addPropertyChangeListener () {
        try {
            listenerID = tizen.systeminfo.addPropertyValueChangeListener('STORAGE', function (data) {
                log('tizen.systeminfo.addPropertyValueChangeListener STORAGE changed:<br/>' + JSON.stringify(data));
            }, null, function (error) {
                log(error);
            });
            log('tizen.systeminfo.addPropertyValueChangeListener added listener: ' + listenerID);
        } catch (e) {
            log('tizen.systeminfo.addPropertyValueChangeListener couldn\'t add listener:<br/>' + JSON.srtringify(e.message));
        }
    }

    /**
     * docs me
     */
    function removePropertyChangeListener () {
        if (listenerID > 0) {
            try {
                tizen.systeminfo.removePropertyValueChangeListener(listenerID);
                log('tizen.systeminfo.removePropertyValueChangeListener: ' + 'removed listener: ' + listenerID);
                listenerID = 0;
            } catch(e) {
                log('tizen.systeminfo.removePropertyValueChangeListener: ' + 'couldn\'t remove listener');
            }
        }
    }

    /**
     * docs me
     */
    function addPropertyArrayChangeListener () {
        try {
            arrayListenerID = tizen.systeminfo.addPropertyValueArrayChangeListener('STORAGE', function (data) {
                log('tizen.systeminfo.addPropertyValueArrayChangeListener STORAGE changed:<br/>' + JSON.stringify(data));
            }, null, function (error) {
                log(error);
            });
            log('tizen.systeminfo.addPropertyValueArrayChangeListener added listener: ' + arrayListenerID);
        } catch (e) {
            log('tizen.systeminfo.addPropertyValueArrayChangeListener couldn\'t add listener:<br/>' + JSON.srtringify(e.message));
        }
    }

    /**
     * docs me
     */
    function removePropertyArrayChangeListener () {
        if (arrayListenerID > 0) {
            try {
                tizen.systeminfo.removePropertyValueArrayChangeListener(arrayListenerID);
                log('tizen.systeminfo.removePropertyValueArrayChangeListener: ' + 'removed listener: ' + arrayListenerID);
                arrayListenerID = 0;
            } catch(e) {
                log('tizen.systeminfo.removePropertyValueArrayChangeListener: ' + 'couldn\'t remove listener');
            }
        }
    }

    /**
     * get tizen.systeminfo data
     */
    function getSystemInfo ()  {
        log('tizen.systeminfo.getAvailableMemory: ' + tizen.systeminfo.getAvailableMemory());
        log('tizen.systeminfo.getTotalMemory: ' + tizen.systeminfo.getTotalMemory());
        log('tizen.systeminfo.getCapability: ' + 'value for property "http://tizen.org/feature/network.wifi)": ' + tizen.systeminfo.getCapability('http://tizen.org/feature/network.wifi'));
        log('tizen.systeminfo.getCount: ' + 'value for property "DISPLAY": ' + tizen.systeminfo.getCount("DISPLAY"));
        tizen.systeminfo.getPropertyValue('DISPLAY', function (data) {
            log('tizen.systeminfo.getPropertyValue("DISPLAY"): ' + 'value for property "DISPLAY":<br/> ' + JSON.stringify(data));
        }, function () {});
        tizen.systeminfo.getPropertyValueArray('DISPLAY', function (data) {
            log('tizen.systeminfo.getPropertyValueArray: ' + 'value for property "DISPLAY":<br/>' + JSON.stringify(data));
        });
    }

    /**
     * add tizen.systeminfo listeners
     */
    function addSystemInfoListener () {
        removeSystemInfoListener();
        addPropertyChangeListener();
        addPropertyArrayChangeListener();
    }

    /**
     * remove tizen.systeminfo listeners
     */
    function removeSystemInfoListener () {
        removePropertyChangeListener();
        removePropertyArrayChangeListener();
    }


    /**
     * get webapis.productinfo data
     */
    function getProductInfo () {
        log('webapis.productinfo.ProductInfoConfigKey: ' + JSON.stringify(webapis.productinfo.ProductInfoConfigKey));
        log('webapis.productinfo.ProductInfoNoGlass3dSupport: ' + JSON.stringify(webapis.productinfo.ProductInfoNoGlass3dSupport));
        log('webapis.productinfo.ProductInfoSiServerType: ' + JSON.stringify(webapis.productinfo.ProductInfoSiServerType));
        log('webapis.productinfo.getDuid: ' + webapis.productinfo.getDuid());
        log('webapis.productinfo.getFirmware: ' + webapis.productinfo.getFirmware());
        log('webapis.productinfo.getLocalSet: ' + webapis.productinfo.getLocalSet());
        log('webapis.productinfo.getModel: ' + webapis.productinfo.getModel());
        log('webapis.productinfo.getModelCode: ' + webapis.productinfo.getModelCode());
        log('webapis.productinfo.getNoGlass3dSupport: ' + webapis.productinfo.getNoGlass3dSupport());
        log('webapis.productinfo.getPsid: ' + webapis.productinfo.getPsid());
        log('webapis.productinfo.getRealModel: ' + webapis.productinfo.getRealModel());
        log('webapis.productinfo.getSmartTVServerType: ' + webapis.productinfo.getSmartTVServerType());
        log('webapis.productinfo.getSmartTVServerVersion: ' + webapis.productinfo.getSmartTVServerVersion());
        log('webapis.productinfo.getSystemConfig: ' + webapis.productinfo.getSystemConfig(webapis.productinfo.ProductInfoConfigKey.CONFIG_KEY_SERVICE_COUNTRY));
        log('webapis.productinfo.getTunerEpop: ' + webapis.productinfo.getTunerEpop());
        log('webapis.productinfo.getVersion: ' + webapis.productinfo.getVersion());
        log('webapis.productinfo.isSoccerModeEnabled: ' + webapis.productinfo.isSoccerModeEnabled());
        log('webapis.productinfo.isTtvSupported: ' + webapis.productinfo.isTtvSupported());
        log('webapis.productinfo.isUdPanelSupported: ' + webapis.productinfo.isUdPanelSupported());
    }

    /**
     * show a list of webapis.productinfo listeners
     */
    function showProductInfoListeners () {
        log('webapis.productinfo.keyListenerArr: ' + 'list of system config listeners:<br/>' + JSON.stringify(webapis.productinfo.keylistenerArr));
    }

    /**
     * add system config change listener
     */
    function addProductInfoListeners () {
        var listenerID,
            i;

        removeProductInfoListeners();

        for (i in webapis.tvinfo.TvInfoMenuKey) {
            listenerID = webapis.productinfo.addSystemConfigChangeListener(webapis.tvinfo.TvInfoMenuKey[i], function (data) {
                log('webapis.productinfo.addSystemConfigChangeListener: ' + 'data has been changed for ' + i + ':<br/>' + JSON.stringify(data));
            }) ;
            log('webapis.productinfo.addSystemConfigChangeListener: ' + 'added listener for ' + i + ' - ' + listenerID);
        }
        showProductInfoListeners();
    }


    /**
     * remove system config change listeners
     */
    function removeProductInfoListeners () {
        var i,
            listeners = webapis.productinfo.keylistenerArr || [],
            length = listeners.length,
            listener;

        if (length > 0) {
            for (i = length - 1; i >= 0; i--) {
                listener = listeners[i];
                try {
                    webapis.productinfo.removeSystemConfigChangeListener(listener.listenerId, listener.key);
                    log('webapis.productinfo.removeSystemConfigChangeListener: ' + 'removed system config listener ' + listener.listenerId);
                } catch (e) {
                    log('webapis.productinfo.removeSystemConfigChangeListener: ' + 'couldn\'t remove system config listener ' + listener.listenerId);
                }
            }
            showProductInfoListeners();
        } else {
            log('no system config listeners to remove');
        }
    }

    /**
     * get webapis.tvinfo data
     */
    function getTvInfo () {
        var i;

        log('webapis.tvinfo.TvInfoMenuKey: ' + JSON.stringify(webapis.tvinfo.TvInfoMenuKey));
        log('webapis.tvinfo.TvInfoMenuValue: ' + JSON.stringify(webapis.tvinfo.TvInfoMenuValue));
        log('webapis.tvinfo.getVersion: ' + webapis.tvinfo.getVersion());
        log('webapis.tvinfo.isTvsPicSizeResized: ' + webapis.tvinfo.isTvsPicSizeResized());
        for (i in webapis.tvinfo.TvInfoMenuKey) {
            log('webapis.tvinfo.getMenuValue: ' + "menu value for " + i + ": " + webapis.tvinfo.getMenuValue(webapis.tvinfo.TvInfoMenuKey[i]));
        }
        showTvInfoListeners();
    }

    /**
     * show webapis.tvinfo change listeners
     */
    function showTvInfoListeners () {
        log('webapis.tvinfo.keylistenerArr: ' + "list of caption change listeners:<br/>" + JSON.stringify(webapis.tvinfo.keylistenerArr));
    }

    /**
     * add webapis.tvinfo change listeners
     */
    function addTvInfoListeners () {
        var listenerID,
            state,
            i;

        removeTvInfoListeners();

        for (i in webapis.tvinfo.TvInfoMenuKey) {
            state = i;
            listenerID = webapis.tvinfo.addCaptionChangeListener(webapis.tvinfo.TvInfoMenuKey[i], function (data) {
                log('webapis.tvinfo.addCaptionChangeListener: ' + 'data has been changed for ' + state + ':<br/>' + JSON.stringify(data));
            }) ;
            log('webapis.tvinfo.addCaptionChangeListener: ' + 'added listener for ' + state + ' - ' + listenerID);
        }
        showTvInfoListeners();
    }

    /**
     * remove webapis.tvinfo change listeners
     */
    function removeTvInfoListeners () {
        var listeners = webapis.tvinfo.keylistenerArr,
            length = listeners.length,
            listener,
            i;

        if (length > 0) {
            for (i = length - 1; i >= 0; i--) {
                listener = listeners[i];
                try {
                    webapis.tvinfo.removeCaptionChangeListener(listener.listenerId);
                    log('webapis.tvinfo.removeCaptionChangeListener: ' + 'removed system config listener ' + listener.listenerId);
                } catch (e) {
                    log('webapis.tvinfo.removeCaptionChangeListener: ' + 'couldn\'t remove system config listener ' + listener.listenerId);
                }
            }
            showTvInfoListeners();
        } else {
            log('no caption change listeners to remove');
        }
    }


    /**
     * Start the application once loading is finished
     */
    window.onload = function () {
        if (window.tizen === undefined) {
            log('This application needs to be run on Tizen device');
            return;
        }

        displayVersion();
        registerKeys();
        registerKeyHandler();

        removeProductInfoListeners();
        removeTvInfoListeners();
        removeSystemInfoListener();
    }

})();


