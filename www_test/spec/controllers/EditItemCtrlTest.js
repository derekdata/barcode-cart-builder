describe('Controller: EditItemCtrl', function () {

    // load the controller's module
    beforeEach(module('barcodeCartBuilder', 'ionic', 'barcodeCartBuilder.services'));

    var EditItemCtrl,
        scope,
        itemMock = {},
        stateMock = {},
        stateParamsMock = {};

    var fakeBarcode1 = "123456789012";
    var fakeBarcode2 = "888888888888";
    var sampleItems = [
        {itemId: "Yoohoo-1", itemGroupId: "1", itemDescription: "Yoohoo, 10 count", imageUrl: "http://upload.wikimedia.org/wikipedia/commons/b/b9/Yoohoo-boxes.jpg", quantity: 3}
    ];

    // Initialize variables & mocks before each test
    beforeEach(function () {
            stateMock.go = jasmine.createSpy('go');
            itemMock.clear = jasmine.createSpy('clear');
            itemMock.all = jasmine.createSpy('all').andReturn(sampleItems);
            itemMock.save = jasmine.createSpy('save');
            stateParamsMock.itemIndex = 0;

        }
    );

    it('should allow modification of quantity, saving and appropriate redirect', function () {

        inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();

            //$scope, $timeout, Items, $state, SubmitCartService, $window
            EditItemCtrl = $controller('EditItemCtrl', {
                $scope: scope,
                Items: itemMock,
                $state: stateMock,
                $stateParams: stateParamsMock
            });

            expect(scope.currentItem).toEqual(sampleItems[0]);

            scope.currentItem.quantity = 999;

            scope.processItem(scope.currentItem, false);

            expect(itemMock.save).toHaveBeenCalledWith(sampleItems);
            expect(stateMock.go).toHaveBeenCalledWith('home');

            scope.processItem(scope.currentItem, true);

            expect(itemMock.save).toHaveBeenCalledWith(sampleItems);
            expect(stateMock.go).toHaveBeenCalledWith('scan');

        })


    });


});