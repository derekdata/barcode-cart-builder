describe('Controller: ScanCtrl', function () {

    // load the controller's module
    beforeEach(module('barcodeCartBuilder', 'ionic', 'barcodeCartBuilder.services'));

    var ScanCtrl,
        scope,
        itemMock = {},
        barcodeScannerServiceMock = {},
        windowMock,
        stateMock = {};

    var fakeBarcode1 = "123456789012";
    var fakeBarcode2 = "888888888888";
    var sampleItems = [
        {itemId: "Yoohoo-1", itemGroupId: "1", itemDescription: "Yoohoo, 10 count", imageUrl: "http://upload.wikimedia.org/wikipedia/commons/b/b9/Yoohoo-boxes.jpg", quantity: 3}
    ];

    // Initialize variables & mocks before each test
    beforeEach(function () {
            barcodeScannerServiceMock = {};
            stateMock.go = jasmine.createSpy('go');
            itemMock.clear = jasmine.createSpy('clear');
            itemMock.all = jasmine.createSpy('all').andReturn(sampleItems);
            itemMock.save = jasmine.createSpy('save');
            windowMock = { prompt: function (msg) {
                return fakeBarcode1;
            } };
        }
    );

    it('should not invoke the barcode scanner when it is not available', function () {

        inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();

            barcodeScannerServiceMock.scanBarcode = jasmine.createSpy('scanBarcode');
            barcodeScannerServiceMock.isAvailable = jasmine.createSpy('isAvailable').andReturn(false);

            //$scope, $timeout, Items, $state, SubmitCartService, $window
            ScanCtrl = $controller('ScanCtrl', {
                $scope: scope,
                $window: windowMock,
                Items: itemMock,
                BarcodeScannerService: barcodeScannerServiceMock,
                $state: stateMock
            });

        });

        expect(barcodeScannerServiceMock.isAvailable).toHaveBeenCalled();
        expect(barcodeScannerServiceMock.scanBarcode).not.toHaveBeenCalled();
        expect(stateMock.go).toHaveBeenCalledWith('enterQuantity', { barcodeId: fakeBarcode1 });

    });

    it('should invoke the barcode scanner when it is available', function () {

        inject(function ($controller, $rootScope, $q) {
            scope = $rootScope.$new();
            var deferred = $q.defer();

            barcodeScannerServiceMock.scanBarcode = jasmine.createSpy('scanBarcode').andReturn(deferred.promise);
            deferred.resolve({"error": false, "barcode": fakeBarcode2});

            barcodeScannerServiceMock.isAvailable = jasmine.createSpy('isAvailable').andReturn(true);

            //$scope, $timeout, Items, $state, SubmitCartService, $window
            ScanCtrl = $controller('ScanCtrl', {
                $scope: scope,
                $window: windowMock,
                Items: itemMock,
                BarcodeScannerService: barcodeScannerServiceMock,
                $state: stateMock
            });

        });

        scope.$digest();
        expect(barcodeScannerServiceMock.isAvailable).toHaveBeenCalled();
        expect(barcodeScannerServiceMock.scanBarcode).toHaveBeenCalled();
        expect(stateMock.go).toHaveBeenCalledWith('enterQuantity', { barcodeId: fakeBarcode2 });

    });

    it('should handle errors from the barcode scanner and scan again', function () {

        inject(function ($controller, $rootScope, $q) {
            scope = $rootScope.$new();

            var deferred = $q.defer();

            barcodeScannerServiceMock.scanBarcode = jasmine.createSpy('scanBarcode').andReturn(deferred.promise);
            deferred.resolve({"error": true});

            barcodeScannerServiceMock.isAvailable = jasmine.createSpy('isAvailable').andReturn(true);
            windowMock = {confirm: function (msg) {
                return true;
            }};

            //$scope, $timeout, Items, $state, SubmitCartService, $window
            ScanCtrl = $controller('ScanCtrl', {
                $scope: scope,
                $window: windowMock,
                Items: itemMock,
                BarcodeScannerService: barcodeScannerServiceMock,
                $state: stateMock
            });

        });

        scope.$digest();
        expect(barcodeScannerServiceMock.isAvailable).toHaveBeenCalled();
        expect(barcodeScannerServiceMock.scanBarcode).toHaveBeenCalled();
        expect(stateMock.go).toHaveBeenCalledWith('scan');

    });

    it('should handle errors from the barcode scanner and not scan again', function () {

        inject(function ($controller, $rootScope, $q) {
            scope = $rootScope.$new();

            var deferred = $q.defer();

            barcodeScannerServiceMock.scanBarcode = jasmine.createSpy('scanBarcode').andReturn(deferred.promise);
            deferred.resolve({"error": true});

            barcodeScannerServiceMock.isAvailable = jasmine.createSpy('isAvailable').andReturn(true);
            windowMock = {confirm: function (msg) {
                return false;
            }};

            //$scope, $timeout, Items, $state, SubmitCartService, $window
            ScanCtrl = $controller('ScanCtrl', {
                $scope: scope,
                $window: windowMock,
                Items: itemMock,
                BarcodeScannerService: barcodeScannerServiceMock,
                $state: stateMock
            });

        });

        scope.$digest();
        expect(barcodeScannerServiceMock.isAvailable).toHaveBeenCalled();
        expect(barcodeScannerServiceMock.scanBarcode).toHaveBeenCalled();
        expect(stateMock.go).toHaveBeenCalledWith('home');

    });

});