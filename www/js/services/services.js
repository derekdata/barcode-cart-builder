angular.module('barcodeCartBuilder.services', [])

    .factory('BarcodeItemService', function () {
        // Might use a resource here that returns a JSON array

        return {
            all: function () {
                return barcodeItems;
            },
            get: function (barcodeId) {
                // Simple index lookup

                if (barcodeItems[barcodeId] !== undefined && barcodeItems[barcodeId][0] !== undefined) {
                    return barcodeItems[barcodeId][0];
                }
                else {
                    return;
                }
            }
        };
    }
)
    .factory('Items', function () {
        return {
            all: function () {
                var itemString = window.localStorage['items'];
                if (itemString) {
                    return angular.fromJson(itemString);
                }
                return [];
            },
            add: function (item) {
                var items = this.all();
                items.push(item);
                window.localStorage['items'] = angular.toJson(items);
            },
            save: function (items) {
                window.localStorage['items'] = angular.toJson(items);
            },
            clear: function () {
                window.localStorage['items'] = "[]";
            }
        };
    }
)
    .factory('BarcodeScannerService', function () {
        return {
            scanBarcode: function () {
                plugins.barcodeScanner.scan(
                    function (result) {
                        console.log("We got a barcode\n" +
                            "Result: " + result.text + "\n" +
                            "Format: " + result.format + "\n" +
                            "Cancelled: " + result.cancelled);
                        return {"error": false, "barcode": result.text};
                    },
                    function (error) {
                        return {"error": true};
                    });
            },
            isAvailable: function () {
                if (typeof plugins !== 'undefined' &&
                    typeof plugins.barcodeScanner !== 'undefined' &&
                    typeof plugins.barcodeScanner.scan === 'function') {
                    return true;
                }
                return false;
            }
        };
    }
)
    .factory('SubmitCartService', function ($window, SUBMIT_CART_URL) {
        return {
            submitCart: function (items) {

                var url = SUBMIT_CART_URL;

                for (var i = 0; i < items.length; i++) {

                    var item = items[i];
                    if (item !== undefined && item !== null && item.quantity !== null && item.quantity > 0) {
                        console.log(item);
                        url += "&item" + (i + 1) + "=";
                        url += encodeURIComponent(item.itemId);
                        url += "&desc" + (i + 1) + "=";
                        url += encodeURIComponent(item.itemDescription);
                        url += "&qty" + (i + 1) + "=";
                        url += encodeURIComponent(item.quantity);
                    }
                }

                console.log("Redirecting to ", url);
                //$window.location.href = url;
                //open in an new window to make navigation easier.  No chrome makes it difficult to work in the system that the cart is submitted to.
                var ref = $window.open(url, '_blank', '');

                return true;
            }
        };
    }
);


