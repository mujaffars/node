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
var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

var gameQueId = '';
var gameContent = {};
var gameAnswer = [];
var usedItems = [];
var complexityCount = 0;

gameContent[1] = {0:'living in water', 1:'craniate animals', 2:'limbs', 3:'mammal', 4:'aquatic environment', 5:'gills', 6:'herbivorous', 7:'caudal fin', 8:'jaws'};
gameContent[2] = {0:'waves', 1:'coasts', 2:'fishing', 3:'swimming', 4:'diving', 5:'surfing', 6:'sailing', 7:'river'};
gameContent[3] = {0:'standing water', 1:'shallow water', 2:'natural process (formation)', 3:'water-lilies', 4:'production of fish (usage)'};
gameContent[4] = {0:'bloom', 1:'beautify environment (usage)', 2:'pollen', 3:'plant + bueaty (defination)', 4:'pollination', 5:'cultivate (usage)', 6:'wear (usage)', 7:'nectar'};
gameContent[5] = {0:'flowering plant (part of)', 1:'disseminate seeds', 2:'source of food', 3:'agricultural output', 4:'fleshy (property)', 5:'edible'};

gameContent[6] = {0:'web', 1:'spider', 2:'spider+man (formation)', 3:'superhuman', 4:'wall climb (property)', 5:'peter', 6:'6th sence', 7:'photographer'};
gameContent[7] = {0:'tony', 1:'jarvis', 2:'iron+man (formation)', 3:'superhuman', 4:'Stark Industries', 5:'War Machine', 6:'6th sence', 7:'photographer'};
gameContent[8] = {0:'circular shield', 1:'Tesseract', 2:'super-soldier', 3:'superhuman', 4:'Rogers', 5:'Peggy Carter'};

gameAnswer = ['', 'fish', 'sea', 'pond', 'flower', 'fruit', 'spider-man', 'iron-man', 'Captain America'];

var contentCnt = 0;
$.each(gameContent, function(index,val){
	contentCnt++;	
})


$(function () {
    $("#sortable, #sortable1").sortable({
        connectWith: ".connectedSortable"
    }).disableSelection();

	//document.addEventListener("deviceready", onDeviceReady, false);

	startGame();
});

function startGame() {
	// Clear both divs
	$('#sortable1').html('');
	$('#sortable').html('');
	complexityCount = 0;
	
	//Math.floor(Math.random() * 6) + 1
	var contentKey = Math.floor(Math.random() * contentCnt) + 1;
	gameQueId = contentKey;
	var propCnt = -1;
	$.each(gameContent[contentKey], function(index,val){
		propCnt++;	
	})
	
	usedItems = [];
	var randomKey = '';
	// Get 4 properties of item
	for(i=0; i<4; i++){	
		addComplexity(gameQueId);
		randomKey = generateRandomNo(usedItems, 0, propCnt);		
		usedItems.push(randomKey);		
		$('#sortable').append('<div class="elem btn btn-lg btn-success">'+gameContent[contentKey][randomKey]+'</div>');
	}
	
	addComplexity(gameQueId);
}

function generateRandomNo(usedItems, start, stop){
	
	if(!usedItems.length){
		randomKey = Math.floor(Math.random() * stop) + start;
		return randomKey;
	}else{
		randomKey = Math.floor(Math.random() * stop) + start;		
		
		var found = false;
		
		$.each(usedItems, function(index,val){
			if(val == randomKey){
				generateRandomNo(usedItems, start, stop);
			}
		})
		
		return randomKey;
	}
}

function addComplexity(gameQueId){
	
	if(complexityCount < 3){
		var addFlag = Math.floor(Math.random() * contentCnt) + 0;
		
		if(addFlag){
			var contentKey = Math.floor(Math.random() * contentCnt) + 1;
			if(contentKey === gameQueId){
				addComplexity(gameQueId);
			}else{
				var propCnt = -1;
				$.each(gameContent[contentKey], function(index,val){
					propCnt++;	
				})
				
				randomKey = Math.floor(Math.random() * propCnt) + 0;
				$('#sortable').append('<div class="elem btn btn-lg btn-info">'+gameContent[contentKey][randomKey]+'</div>');
				complexityCount++;
			}
		}
	}	
	
}

$('#btnGuess').click(function () {
	//$('#sortable1).
	var isCorrect = true;
	$("#sortable1").find(".btn").each(function () {
		var ansText = $(this).text();
		var ansValid = false;
		$.each(gameContent[gameQueId], function(index,val){
			if(ansText === val ){
				ansValid = true;	
			}
		})
		if(!ansValid){
			isCorrect = false;
			alert('Your answer is In-correct');
		}
	});
	
	if(isCorrect){
		alert('Your answer is correct '+gameAnswer[gameQueId]);
		startGame();
	}
})
	
/*
Sea

waves
coasts
fishing
swimming
diving
surfing
sailing
river

pond

standing water
shallow water
natural process (formation)
water-lilies 
production of fish (usage)

flower

bloom
beautify environment (usage)
pollen
plant + bueaty (defination)
pollination
cultivate (usage)
wear (usage)
nectar

fruit

flowering plant (part of)
disseminate seeds
source of food
agricultural output
fleshy (property)
edible
*/