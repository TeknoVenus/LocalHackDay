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
var difficulty = 1;
var totalSeconds = 0;
var colours = ["red", "rebeccapurple", "blue", "cyan", "yellow", "green", "white"];

var app = {
    // Application Constructor
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        app.levelStart(0, 6, difficulty);
        console.log(levelList);
        app.timer();
    },

    genList: function(x, y, n){//Generates a random array
      var array = new Array(n);
      for (var i = 0; i < n; i++){
        array[i] = Math.round((Math.random()*y)+x);
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
      document.body.style.background = colours[itemIterator];

      if (readNFC == nextNFC){
        itemIterator += 1;
        console.log("SUCCESS");
        currentNFC = levelList[itemIterator];
        nextNFC = levelList[itemIterator + 1];

      }
      if (!(nextNFC in levelList)){
        console.log("NEXT LEVEL");
        difficulty += 1;
        app.levelStart(0, 6, difficulty);
      }
    },

    levelStart: function (x, amountOfTags, difficulty) {//Initialises and handles levels
        levelList = app.genList(x, amountOfTags, difficulty);
        currentNFC = levelList[0];
        nextNFC = levelList[1];
        app.showSteps();
    },

    showSteps: function () {
        var modal = document.querySelector('.modal');
        modal.style.display = "block";
            document.querySelector('#instructions #list').innerHTML = '';

        levelList.forEach(function(item, index) {
            var node = document.createElement("li");
            var text = document.createTextNode(item.toString());
            node.appendChild(text);
            document.querySelector('#instructions #list').appendChild(node);
        });

        window.setTimeout(function () {
            modal.style.display = "none";
        }, 2000)
    },

    timer: function () {
        setInterval(function() {
            totalSeconds += 1;
            document.querySelector('#secs').innerText = totalSeconds%60;
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
    },
    onNdef: function (nfcEvent) {
        navigator.vibrate(300);
        //console.log(JSON.stringify(nfcEvent));
        var tagData = nfcEvent.tag;
        var tagValue = nfc.bytesToString(nfcEvent.tag.ndefMessage[0].payload);
        document.querySelector("#nfc").innerText = tagValue;
        readNFC = parseInt(tagValue);
        app.updateLevel();
        console.log("The read tag was "+readNFC);
        console.log("Next tag to be read is "+ levelList[itemIterator + 1]);
    },







};


app.initialize();
