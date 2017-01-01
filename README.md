# MemoDash
A memory game using NFC tags built in 12 hours. Built by @TeknoVenus and @TheWispy

# Playing the game
Once the game is launched, you will be greeted with some basic instructions. The instructions will then disappear and you will be given a countdown before the game starts.

For each round, a list of colours will be displayed. You must touch the respective NFC tags in the order displayed. If you touch the wrong tag, then the game will end. You will be given a score based on how many rounds you sucessfully complete and how quickly you complete each round in.

# Building the project
## NFC Tags
You will need NFC tags to play the game. It is recommended you use NTAG213 based tags such as these: [NFC TAG STICKER Pack of 10. NEW NTAG213 chipset](https://www.amazon.co.uk/STICKER-waterproof-compatible-NFC-enabled-including/dp/B00NG4W3K2/ref=sr_1_cc_5?s=aps&ie=UTF8&qid=1483298112&sr=1-5-catcorr&keywords=nfc+tags)

Each NFC tag must have a custom record written to it. NFCTools for Android is a good choice for doing this. The content type must be `text/simon` and the data should be a number from `0` to `the number of tags you have - 1`. Each tag will be therefore associated with the colours declared in the `readableColours` object in `index.js`. The game will work best if the NFC tags are affixed to coloured card.
## Cordova
The game is designed using Apache cordova. To build the game from source:

Install the Android SDK (with or without Android studio): [https://developer.android.com/studio/index.html](https://developer.android.com/studio/index.html). Once installed, open `SDK Manager` and ensure that the `Android 7.0 (API 24)` is checked. Click `Install <x> packages`.

Install Node.js ([https://nodejs.org/en/](https://nodejs.org/en/)).

*Connect your android phone to your machine and ensure it is connected via [ADB](https://developer.android.com/studio/command-line/adb.html)* 

Run the following Node commands:
* `npm install -g cordova`
* `cordova platform add android`
* `cordova run android`
