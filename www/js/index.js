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
var readNFC = 0;

var app = {
    // Application Constructor
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

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
        console.log(JSON.stringify(nfcEvent));
        var tagData = nfcEvent.tag;
        document.querySelector("#nfc").innerText = nfc.bytesToString(nfcEvent.tag.ndefMessage[0].payload);
    }
};

var t = Date()
function genList(x, y, n){
  var array = Array(n);
  for (var i = 0; i < n; i++){
    array[i] = Math.round((Math.random()*y)-x);
  }
  return array;
}

function levelStart(x, amountOfTags, difficulty){
  levelList = genList(x, amountOfTags, difficulty);
  var t1 = t.getDate();

  var itemIterator = 0;
  var levelComplete = false;
  while(levelComplete == false){
    var currentNFC = levelList[itemIterator];
    var nextNFC = levelList[itemIterator + 1];
    if (itemIterator == levelList.length){
      levelComplete = true;
    }
    if (readNFC == nextNFC){
      itemIterator += 1;
      console.log("Your next tag is " + nextNFC);
    }
    else{
      console.log("SEARCHING");


    }
  }
  var t2 = t.getDate();
  return t2 - t1;
}


function game(){
  var x = 1;
  var difficulty = 4;
  var amountOfTags = 3;

  var score1 = levelStart(x, amountOfTags, difficulty);
  console.log(score1);
 //GET LEVEL array

 //START - Timer start, show next tag
}

app.initialize();
