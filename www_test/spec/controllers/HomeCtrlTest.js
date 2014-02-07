describe('Controller: HomeCtrl', function () {

    // load the controller's module
    beforeEach(module('barcodeCartBuilder', 'ionic', 'barcodeCartBuilder.services'));

    var HomeCtrl,
        scope,
        itemMock = {},
        submitCartServiceMock = {},
        windowMockTrueConfirm;

    var sampleItems = [
        {itemId: "Yoohoo-1", itemGroupId: "1", itemDescription: "Yoohoo, 10 count", imageUrl: "http://upload.wikimedia.org/wikipedia/commons/b/b9/Yoohoo-boxes.jpg", quantity: 3}
    ];

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();

        windowMockTrueConfirm = { confirm: function (msg) {
            return true
        } };
        itemMock.clear = jasmine.createSpy('clear');
        itemMock.all = jasmine.createSpy('all').andReturn(sampleItems);
        itemMock.save = jasmine.createSpy('save');
        submitCartServiceMock.submitCart = jasmine.createSpy('submitCart');

        //$scope, $timeout, Items, $state, SubmitCartService, $window
        HomeCtrl = $controller('HomeCtrl', {
            $scope: scope,
            $window: windowMockTrueConfirm,
            Items: itemMock,
            SubmitCartService: submitCartServiceMock
        });

    }));

    it('should clear items from the cart & scope on clear cart', function () {
        scope.clearCart();
        expect(itemMock.clear).toHaveBeenCalled();
        expect(scope.items).toEqual([]);
    });

    it('should submit the cart on submitCart', function () {
        scope.submitCart(scope);
        expect(submitCartServiceMock.submitCart).toHaveBeenCalled();
    });

    it('should save items when they change', function () {
        scope.$digest();
        scope.items = scope.items.concat(sampleItems);
        scope.$digest();
        expect(itemMock.save).toHaveBeenCalled();
        expect(scope.items.length).toEqual(2);
    });


});