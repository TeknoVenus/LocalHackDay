/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var readNFC;
var nextNFC;
var currentNFC;
var t = new Date();
var itemIterator = 0;
var levelComplete = false;
var levelList;
var difficulty = 2;
var totalSeconds = 0;
var colours = ["rgb(220,30,120)", "rgb(230,50,20)", "rgb(130,20,140)", "tgb(150,230,50)", "rgb(230,230,50)", "rgb(40, 180, 230)", "rgb(250, 110, 10)"];
var readableColours = {
    0: "Pink",
    1: "Red",
    2: "Purple",
    3: "Green",
    4: "Yellow",
    5: "Blue",
    6: "Orange"
};
var score = 0;
var scoreboard = document.getElementById("score");
var countdown = 3;

var app = {
    // Application Constructor
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    startGame: function() {
        app.playGameMusic();
        app.levelStart(0, 6, difficulty);
        console.log(levelList);
        app.timer();
    },

    showCountdown: function() {
        var countdownModal = document.querySelector('#countdown');
        var content = document.querySelector('#countdown .modal-content');
        countdownModal.style.display = "block";

        var interval = setInterval(function () {
            content.innerHTML = "<p>" + countdown.toString() + "</p>";
            countdown -= 1;
        }, 1000);

        window.setTimeout(function () {
            clearInterval(interval);
            countdownModal.style.display = "none";
            app.startGame();
        }, 4000);
    },

    genList: function (x, y, n) {//Generates a random array
        var array = new Array(n);
        for (var i = 0; i < n; i++) {
            array[i] = Math.round((Math.random() * y) + x);
        }
        return array;
    },

    isNext: function () {
        if (readNFC == nextNFC) {
            return true;
        }
    },

    updateLevel: function(){
      var currentNFC = levelList[itemIterator];
      var nextNFC = levelList[itemIterator + 1];

      scoreboard.innerText = score;

      if (readNFC == nextNFC){
        itemIterator += 1;
        console.log("SUCCESS");
        readNFC = "";
        currentNFC = levelList[itemIterator];
        nextNFC = levelList[itemIterator + 1];


      }




      if (!(Number.isInteger(nextNFC))){
        console.log("NEXT LEVEL");
        itemIterator = 0;
        difficulty += 1;
        score += parseInt(2*difficulty*(30/totalSeconds));
        app.levelStart(0, 6, difficulty);
      }
    },

    levelStart: function (x, amountOfTags, difficulty) {//Initialises and handles levels
        totalSeconds = 0;
        itemIterator = 0;
        levelList = app.genList(x, amountOfTags, difficulty);
        currentNFC = levelList[0];
        nextNFC = levelList[1];

        app.updateLevel();
        app.showSteps();

        if (levelList.length > 2) {
            app.showSteps();
        }

    },

    showSteps: function () {
        var modal = document.querySelector('.modal');
        modal.style.display = "block";
        document.querySelector('#instructions #list').innerHTML = '';

        levelList.forEach(function (item, index) {
            if (index > 0) {
                var node = document.createElement("li");
                var text = document.createTextNode(readableColours[item]);
                node.appendChild(text);
                document.querySelector('#instructions #list').appendChild(node);
            }
        });

        window.setTimeout(function () {
            modal.style.display = "none";
        }, 2000)
    },

    showInstructions: function () {
        var modal = document.querySelector('.modal');
        modal.style.display = "block";
        var node = document.createElement("p");
        var text = document.createTextNode("Welcome to MEMO DASH! You will be shown a sequence of colours, run to them and tap them with a compatible device running the app");
        node.appendChild(text);
        document.querySelector('#instructions #list').appendChild(node);


        window.setTimeout(function () {
            modal.style.display = "none";
            app.showCountdown();
        }, 10000);
    },

    timer: function () {
        setInterval(function () {
            totalSeconds += 1;
            document.querySelector('#secs').innerText = totalSeconds % 60;
            document.querySelector('#mins').innerText = parseInt(totalSeconds / 60);
        }, 1000)
    },


    //GET LEVEL array

    //START - Timer start, show next tag


    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function () {
        function failure(reason) {
            alert("There was a problem - " + reason);
        }

        nfc.addMimeTypeListener(
            'text/simon',
            app.onNdef,
            function () {
                console.log("Listening for NDEF mime tags with type text/simon.");
            },
            failure
        );
        app.showInstructions();
    },
    onNdef: function (nfcEvent) {
        app.playScanSound();
        navigator.vibrate(300);
        //console.log(JSON.stringify(nfcEvent));
        var tagData = nfcEvent.tag;
        var tagValue = nfc.bytesToString(nfcEvent.tag.ndefMessage[0].payload);
        document.querySelector("#nfc").innerText = tagValue;
        readNFC = parseInt(tagValue);
          document.body.style.background = colours[readNFC];
        if (readNFC != levelList[itemIterator+1]){
          console.log(readNFC);
          console.log(nextNFC);
        alert("GAME OVER!");
        location.reload();
      }
        app.updateLevel();



        console.log("The read tag was " + readNFC);
        console.log("Next tag to be read is " + levelList[itemIterator + 1]);
    },

    playScanSound: function() {
        var media = new Media('file:///android_asset/www/scan.wav', function() {console.log("Audio success")}, function() { console.log("Audio error scan sfx")});
        media.play();
    },

    playGameMusic: function() {
        var media = new Media('file:///android_asset/www/song.mp3');
        media.play();
    }
};

app.initialize();
