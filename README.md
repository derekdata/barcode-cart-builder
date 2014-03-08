barcode-cart-builder [![Build Status](https://travis-ci.org/derekdata/barcode-cart-builder.png?branch=master)](https://travis-ci.org/derekdata/barcode-cart-builder)
====================

Cordova/Phonegap application that builds a cart on a mobile device by scanning barcodes.

Built using AngularJS, Ionic Framework.  Tested with Jasmine, Karma, angular-mocks.  Dependency management with Bower.

Screenshots
-----------
<img src="https://raw.github.com/derekdata/barcode-cart-builder/master/sampleData/screenshots/android/cart_350.png" alt="Cart"/>

<img src="https://raw.github.com/derekdata/barcode-cart-builder/master/sampleData/screenshots/android/editQuantity_350.png" alt="Edit Quantity"/>

Cordova plugins required
-------------------------
com.phonegap.plugins.barcodescanner
org.apache.cordova.device

Setting up your development environment
---------------------------------------
1. `git clone` this repository
2. run `node install` from the project directory
3. install cordova `sudo npm install -g cordova`
4. Follow the Cordova platform guides for Android and iOS to make sure you have everything needed for development on those platforms
5. Add whichever platforms you want to Cordova using the command `cordova add <platform>` (see Cordova documentation for more detailed information on this)

Running the application
-----------------------
Run the application on an device emulator or physical device using the `cordova run <platform>` command

