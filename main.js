
// Get references to UI elements

let connectButton = document.getElementById('connect');
let disconnectButton = document.getElementById('disconnect');
let ledOn = document.getElementById('ledon');
let ledOff = document.getElementById('ledoff');
let terminalContainer = document.getElementById('terminal');

// Connect to the device on Connect button click
connectButton.addEventListener('click', function () {
    connect();
});


// Disconnect from the device on Disconnect button click
disconnectButton.addEventListener('click', function () {
    disconnect();
});

// Connect to the device on Connect button click
ledOn.addEventListener('click', function () {
    ledon();
});


// Disconnect from the device on Disconnect button click
ledOff.addEventListener('click', function () {
    ledoff();
});

// Selected device object cache
let deviceCache = null;

// Launch Bluetooth device chooser and connect to the selected
function connect() {
    log('+connect1');
    return (deviceCache ? Promise.resolve(deviceCache) :
        requestBluetoothDevice()).
        then(device => connectDeviceAndCacheCharacteristic(device)).
        then(characteristic => startNotifications(characteristic)).
        catch(error => log(error));
}

function requestBluetoothDevice() {

    log('Requesting bluetooth device...');
    return navigator.bluetooth.requestDevice({
        filters: [{ name: ['LED'] }],
    }).
        then(device => {
            log('"' + device.name + '" bluetooth device selected');
            deviceCache = device;

            return deviceCache;
        });
        log('-connect');
}



// Characteristic object cache
let characteristicCache = null;

// Connect to the device specified, get service and characteristic
function connectDeviceAndCacheCharacteristic(device) {

    if (device.gatt.connected && characteristicCache) {
        return Promise.resolve(characteristicCache);
        }

    log('Connecting to GATT server...');

    return device.gatt.connect().
        then(server => {
            log('GATT server connected, getting service...');

            return server.getPrimaryService('19b10000-e8f2-537e-4f6c-d104768a1214');
        }).
        then(service => {
            log('Service found, getting characteristic...');

            return service.getCharacteristic('19b10001-e8f2-537e-4f6c-d104768a1214');
        }).
        then(characteristic => {

            log('Characteristic found');
            characteristicCache = characteristic;

            return characteristicCache;

        });
}


// Enable the characteristic changes notification

function startNotifications(characteristic) {

    log('Starting notifications...');

  return characteristic.startNotifications().

      then(() => {

        log('Notifications started');

      });
    

}



// Output to terminal

function log(data, type = '') {

    return characteristic.startNotifications().
        then(() => {
            log('Notifications started');
        });

}


// Disconnect from the connected device
function disconnect() {

    //

}

// Launch Bluetooth device chooser and connect to the selected
function ledon() {

    //

}


// Disconnect from the connected device
function ledoff() {

    //

}


// Send data to the connected device

function send(data) {

    //

}

// Output to terminal

function log(data, type = '') {

    terminalContainer.insertAdjacentHTML('beforeend',
  
        '<div' + (type ? ' class="' + type + '"' : '') + '>' + data + '</div>');
  
  }


