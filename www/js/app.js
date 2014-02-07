angular.module('barcodeCartBuilder', ['ionic', 'barcodeCartBuilder.services'])

    .constant("SUBMIT_CART_URL", "http://headers.jsontest.com/")

    .config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('home', {
                url: "/home",
                templateUrl: "templates/home.html",
                controller: 'HomeCtrl'
            })
            .state('scan', {
                url: "/scan",
                templateUrl: "templates/scan.html",
                controller: 'ScanCtrl'
            })
            .state('enterQuantity', {
                url: "/enterQuantity/:barcodeId",
                templateUrl: "templates/enterQuantity.html",
                controller: 'QuantityCtrl'
            })
            .state('edit', {
                url: "/edit/:itemIndex",
                templateUrl: "templates/enterQuantity.html",
                controller: 'EditItemCtrl'
            })

        // if none of the above are matched, go to this one
        $urlRouterProvider.otherwise("/home");
    })

    .controller('HomeCtrl', function ($scope, $timeout, Items, $state, SubmitCartService, $window) {

        // Load or initialize items
        var items = $scope.items = Items.all();

        $scope.scan = function () {
            $state.go('scan');
        }

        $scope.submitCart = function () {
            var items = Items.all();
            SubmitCartService.submitCart(items);
        };

        $scope.$watch('items', function (newValue, oldValue) {
            if (newValue !== oldValue) { // This prevents unneeded calls to the local storage
                Items.save(items);
            }
        }, true);

        $scope.clearCart = function () {
            var r = $window.confirm("Are you sure you want to clear your cart?");
            if (r == true) {
                Items.clear();
                items = $scope.items = [];
            }
        }

    })

    .controller('ScanCtrl', function ($scope, $timeout, $ionicModal, $state, BarcodeScannerService, $window) {

        console.log("Scanner Avaialble?" + BarcodeScannerService.isAvailable());
        if (BarcodeScannerService.isAvailable() === true) {

            var result = BarcodeScannerService.scanBarcode();

            if (result['error'] === false) {
                $state.go('enterQuantity', {barcodeId: result.barcode});
            }
            else {
                var r = $window.confirm("Scanning failed.  Try again?");
                if (r == true) {
                    $state.go('scan');
                }
                else {
                    $state.go('home');
                }
            }
        }
        //else, if barcode scanner is not available ask them to key it in
        else {
            var tempBarcode = $window.prompt('Enter barcode:');
            $state.go('enterQuantity', {barcodeId: tempBarcode});
        }


    }
)
    .controller('EditItemCtrl', function ($scope, Items, $state, $stateParams) {

        var items = $scope.items = Items.all();

        if (items[$stateParams.itemIndex] !== undefined) {
            $scope.currentItem = items[$stateParams.itemIndex];
        }
        else {
            $state.go('home');
        }

        $scope.processItem = function (currentItem, scanAgain) {

            console.log("saving item:", currentItem);

            Items.save(items);

            console.log("all items:", Items.all());

            if (scanAgain === true) {
                $state.go('scan');
            }
            else {
                $state.go('home');
            }
        };

    })
    .controller('QuantityCtrl', function ($scope, Items, $stateParams, $state, BarcodeItemService, $window) {

        var barcodeId = $stateParams.barcodeId;
        console.log("Barcode id:", barcodeId);
        console.log(BarcodeItemService.get(parseInt(barcodeId, 10)));
        $scope.currentItem = angular.copy(BarcodeItemService.get(parseInt(barcodeId, 10)));

        if ($scope.currentItem == undefined || $scope.currentItem == null || $scope.currentItem.itemId == undefined || $scope.currentItem.itemId == null) {
            var r = $window.confirm("Item not found.  Try again?");
            if (r == true) {
                $state.go('scan');
            }
            else {
                $state.go('home');
            }

        }

        $scope.processItem = function (currentItem, scanAgain) {
            Items.add(currentItem);
            if (scanAgain === true) {
                $state.go('scan');
            }
            else {
                $state.go('home');
            }
        };
    });
