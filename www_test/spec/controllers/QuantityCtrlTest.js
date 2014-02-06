describe('Controller: QuantityCtrl', function () {

    // load the controller's module
    beforeEach(module('barcodeCartBuilder', 'ionic', 'barcodeCartBuilder.services'));

    var QuantityCtrl,
        scope,
        itemMock = {},
        windowMock,
        stateMock = {},
        stateParamsMock = {},
        barcodeItemServiceMock = {};

    var fakeBarcode1 = "123456789012";
    var fakeBarcode2 = "888888888888";
    var sampleItems = [
        {itemId: "Yoohoo-1", itemGroupId: "1", itemDescription: "Yoohoo, 10 count", imageUrl: "http://upload.wikimedia.org/wikipedia/commons/b/b9/Yoohoo-boxes.jpg", quantity: 3}
    ];
    var sampleBarcodeItem = {itemId: "Honey-1", itemGroupId: "1", itemDescription: "Honey, 24oz jar", imageUrl: "http://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Runny_hunny.jpg/395px-Runny_hunny.jpg"};

    // Initialize variables & mocks before each test
    beforeEach(function () {
            barcodeScannerServiceMock = {};
            stateMock.go = jasmine.createSpy('go');
            itemMock.add = jasmine.createSpy('add');
            itemMock.all = jasmine.createSpy('all').andReturn(sampleItems);
            itemMock.save = jasmine.createSpy('save');
            barcodeItemServiceMock.get = jasmine.createSpy('get').andReturn(sampleBarcodeItem);
            stateParamsMock.barcodeId = fakeBarcode1;
        }
    );

    it('should lookup the barcode', function () {

        inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();

            //$scope, $timeout, Items, $state, SubmitCartService, $window
            QuantityCtrl = $controller('QuantityCtrl', {
                $scope: scope,
                $window: windowMock,
                Items: itemMock,
                $state: stateMock,
                $stateParams: stateParamsMock,
                BarcodeItemService: barcodeItemServiceMock
            });

        })

        expect(barcodeItemServiceMock.get).toHaveBeenCalled();
        expect(scope.currentItem).toEqual(angular.copy(sampleBarcodeItem));

    });

    it('should handle no barcode being found', function () {

        inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();

            barcodeItemServiceMock.get = jasmine.createSpy('get').andReturn(null);

            windowMock = { confirm: function (msg) {
                return true
            } };

            //$scope, $timeout, Items, $state, SubmitCartService, $window
            QuantityCtrl = $controller('QuantityCtrl', {
                $scope: scope,
                $window: windowMock,
                Items: itemMock,
                $state: stateMock,
                $stateParams: stateParamsMock,
                BarcodeItemService: barcodeItemServiceMock
            });

        })

        expect(barcodeItemServiceMock.get).toHaveBeenCalled();
        expect(scope.currentItem).toEqual(null);
        expect(stateMock.go).toHaveBeenCalledWith('scan');

    });

    it('should handle no barcode being found and let the user go back home', function () {

        inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();

            barcodeItemServiceMock.get = jasmine.createSpy('get').andReturn(null);

            windowMock = { confirm: function (msg) {
                return false
            } };

            //$scope, $timeout, Items, $state, SubmitCartService, $window
            QuantityCtrl = $controller('QuantityCtrl', {
                $scope: scope,
                $window: windowMock,
                Items: itemMock,
                $state: stateMock,
                $stateParams: stateParamsMock,
                BarcodeItemService: barcodeItemServiceMock
            });

        })

        expect(barcodeItemServiceMock.get).toHaveBeenCalled();
        expect(scope.currentItem).toEqual(null);
        expect(stateMock.go).toHaveBeenCalledWith('home');

    });

    it('should lookup the barcode and process it', function () {

        inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();

            //$scope, $timeout, Items, $state, SubmitCartService, $window
            QuantityCtrl = $controller('QuantityCtrl', {
                $scope: scope,
                $window: windowMock,
                Items: itemMock,
                $state: stateMock,
                $stateParams: stateParamsMock,
                BarcodeItemService: barcodeItemServiceMock
            });

        })

        expect(barcodeItemServiceMock.get).toHaveBeenCalled();
        expect(scope.currentItem).toEqual(angular.copy(sampleBarcodeItem));
        scope.processItem(scope.currentItem, false);
        expect(stateMock.go).toHaveBeenCalledWith('home');


        scope.processItem(scope.currentItem, true);
        expect(stateMock.go).toHaveBeenCalledWith('scan');

    });

});