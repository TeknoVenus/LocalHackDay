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
  var dt = t.getDate();


  return dt;
}

function game(){
  var x = 1;
  var difficulty = 4;
  var amountOfTags = 3;

  levelStart(x, amountOfTags, difficulty);
  //GET LEVEL array

  //START - Timer start, show next tag
}

var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        function failure(reason) {
            alert("There was a problem - " + reason);
        }

        nfc.addNdefListener(
            app.onNdef,
            function() {
                console.log("Listening for NDEF tags.");
            },
            failure
        );

        if (device.platform == "Android") {
            // Android reads non-NDEF tag. BlackBerry and Windows don't.
            nfc.addTagDiscoveredListener(
                app.onNfc,
                function() {
                    console.log("Listening for non-NDEF tags.");
                },
                failure
            );

            // Android launches the app when tags with mime type text/pg are scanned
            // because of an intent in AndroidManifest.xml.
            // phonegap-nfc fires an ndef-mime event (as opposed to an ndef event)
            // the code reuses the same onNfc handler
            nfc.addMimeTypeListener(
                'text/pg',
                app.onNdef,
                function() {
                    console.log("Listening for NDEF mime tags with type text/pg.");
                },
                failure
            );
        }
    },

    onNfc: function (nfcEvent) {

        var tag = nfcEvent.tag;

        alert("NFC");
        console.log(JSON.stringify(nfcEvent.tag));
        navigator.notification.vibrate(100);
    },
    onNdef: function (nfcEvent) {
        console.log(JSON.stringify(nfcEvent.tag));
        var tag = nfcEvent.tag;

        // BB7 has different names, copy to Android names
        if (tag.serialNumber) {
            tag.id = tag.serialNumber;
            tag.isWritable = !tag.isLocked;
            tag.canMakeReadOnly = tag.isLockable;
        }

        alert("NDEF");
        alert(app.tagTemplate(tag));

        navigator.notification.vibrate(100);
    }
};

app.initialize();
