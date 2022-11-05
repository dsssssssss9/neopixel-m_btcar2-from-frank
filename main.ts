function Rück () {
    robotbit.rgb().showColor(neopixel.colors(NeoPixelColors.Red))
    robotbit.MotorRun(robotbit.Motors.M1A, 0 - speed)
    robotbit.MotorRun(robotbit.Motors.M1B, 0 - speed)
    robotbit.MotorRun(robotbit.Motors.M2A, 0 - speed)
    robotbit.MotorRun(robotbit.Motors.M2B, 0 - speed)
}
function doMode () {
    if (uartdata == "S") {
        basic.showIcon(IconNames.Confused)
    } else if (uartdata == "T") {
        basic.showIcon(IconNames.Angry)
    } else if (uartdata == "U") {
        basic.showIcon(IconNames.EigthNote)
    } else if (uartdata == "V") {
        basic.showLeds(`
            . . . . .
            # . . . #
            # # # # #
            # . . . #
            . # # # .
            `)
    }
}
bluetooth.onBluetoothDisconnected(function () {
    basic.showIcon(IconNames.Sad)
    connected = false
})
function doMotors () {
    if (uartdata == "A") {
        Vor()
        basic.showLeds(`
            . # . # .
            . # # # .
            # # # # #
            . # # # .
            . . # . .
            `)
    } else if (uartdata == "B") {
        Rück()
        basic.showIcon(IconNames.House)
    } else if (uartdata == "C") {
        basic.showLeds(`
            . . # . .
            . # # # #
            # # # # .
            . # # # #
            . . # . .
            `)
    } else if (uartdata == "D") {
        basic.showLeds(`
            . . # . .
            # # # # .
            . # # # #
            # # # # .
            . . # . .
            `)
    } else if (uartdata == "E") {
        basic.showLeds(`
            . # # # .
            # . . . #
            # # # . #
            # # . . #
            # . . . .
            `)
    } else if (uartdata == "F") {
        basic.showLeds(`
            . # # # .
            # . . . #
            # . # # #
            # . . # #
            . . . . #
            `)
    } else if (uartdata == "0") {
        Stop()
        basic.showIcon(IconNames.No)
    }
}
bluetooth.onBluetoothConnected(function () {
    basic.showIcon(IconNames.Happy)
    basic.pause(1000)
    connected = true
    while (connected) {
        uartdata = bluetooth.uartReadUntil(serial.delimiters(Delimiters.Hash))
        doMotors()
        doMode()
        doLEDColor()
    }
})
function Vor () {
    robotbit.rgb().showColor(neopixel.colors(NeoPixelColors.Green))
    robotbit.MotorRun(robotbit.Motors.M1A, speed)
    robotbit.MotorRun(robotbit.Motors.M1B, speed)
    robotbit.MotorRun(robotbit.Motors.M2A, speed)
    robotbit.MotorRun(robotbit.Motors.M2B, speed)
}
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    Stop()
})
function doLEDColor () {
    // Red
    // Green
    // Blue
    // Yellow
    // Cyan
    // Pink
    // Off
    if (uartdata == "G") {
        robotbit.rgb().showColor(neopixel.colors(NeoPixelColors.Red))
        speed = 35
    } else if (uartdata == "H") {
        robotbit.rgb().showColor(neopixel.colors(NeoPixelColors.Green))
        speed = 70
    } else if (uartdata == "I") {
        robotbit.rgb().showColor(neopixel.colors(NeoPixelColors.Blue))
        speed = 105
    } else if (uartdata == "J") {
        robotbit.rgb().showColor(neopixel.colors(NeoPixelColors.Yellow))
        speed = 140
    } else if (uartdata == "K") {
        robotbit.rgb().showColor(neopixel.colors(NeoPixelColors.Indigo))
        speed = 175
    } else if (uartdata == "L") {
        robotbit.rgb().showColor(neopixel.colors(NeoPixelColors.Purple))
        speed = 210
    } else if (uartdata == "M") {
        robotbit.rgb().showColor(neopixel.colors(NeoPixelColors.Black))
        speed = 255
    }
}
function Stop () {
    robotbit.rgb().showColor(neopixel.colors(NeoPixelColors.White))
    robotbit.MotorStopAll()
}
let strip2: neopixel.Strip = null
let uartdata = ""
let speed = 0
let connected = false
led.enable(false)
bluetooth.setTransmitPower(7)
bluetooth.startUartService()
basic.showIcon(IconNames.Heart)
connected = false
speed = 255
basic.forever(function () {
    basic.pause(200)
})
basic.forever(function () {
    strip2 = neopixel.create(DigitalPin.P2, 16, NeoPixelMode.RGB)
})
