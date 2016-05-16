(function(){

	var settings = {
		channel: 'smart-home',
		publish_key: 'pub-c-21d3cb4c-7809-43f5-938e-2c6139510cc9',
		subscribe_key: 'sub-c-108945de-0ffa-11e6-a5b5-0619f8945a4f'
	};
	
	var lights = {
		channel: 'lights',
		publish_key: 'pub-c-21d3cb4c-7809-43f5-938e-2c6139510cc9',
		subscribe_key: 'sub-c-108945de-0ffa-11e6-a5b5-0619f8945a4f'
	}
	var servo = {
		channel: 'door',
		publish_key: 'pub-c-21d3cb4c-7809-43f5-938e-2c6139510cc9',
		subscribe_key: 'sub-c-108945de-0ffa-11e6-a5b5-0619f8945a4f'
	}

	var pubnub = PUBNUB(settings);

	var door = document.getElementById('door');
	var lightLiving = document.getElementById('lightLiving');
	var lightPorch = document.getElementById('lightPorch');
	var fireplace = document.getElementById('fireplace');

	pubnub.subscribe({
		channel: settings.channel,
		callback: function(m) {
			if(m.temperature) {
				document.querySelector('[data-temperature]').dataset.temperature = m.temperature;
			}
			if(m.humidity) {
				document.querySelector('[data-humidity]').dataset.humidity = m.humidity;
			}
		}
	})

	/* 
		Data settings:

		Servo

		item: 'door'
		open: true | false

		LED

		item: 'light-*'
		brightness: 0 - 10

	*/

	function publishUpdate(data) {
		pubnub.publish({
			channel: lights.channel, 
			message: data
		});
	}
	function updateDoor(data) {
		pubnub.publish({
			channel: servo.channel, 
			message: data
		});
	}

	// UI EVENTS

	door.addEventListener('change', function(e){
		updateDoor({item: 'door', open: this.checked});
	}, false);

	lightLiving.addEventListener('change', function(e){
		publishUpdate({item: 'light-living', brightness: +this.value});
	}, false);

	lightPorch.addEventListener('change', function(e){
		publishUpdate({item: 'light-porch', brightness: +this.value});
	}, false);

	fireplace.addEventListener('change', function(e){
		publishUpdate({item: 'fireplace', brightness: +this.value});
	}, false);
})();
