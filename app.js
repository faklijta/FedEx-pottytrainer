var player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('video-placeholder', {
        width: 1920,
        height: 1080,
        videoId: 'DyA4Bys6BWU',
        playerVars: {
            color: 'white',
            playlist: 'taJ60kskkns,FG0fTKAqZ5g'
        },
        events: {
            onReady: initialize
        }
    });
}

function initialize(){

        // Update the controls on load
        updateTimerDisplay();
        updateProgressBar();

        // Clear any old interval.
        clearInterval(time_update_interval);

        // Start interval to update elapsed time display and
        // the elapsed part of the progress bar every second.
        time_update_interval = setInterval(function () {
            updateTimerDisplay();
            updateProgressBar();
        }, 1000)

    }

    // This function is called by initialize()
function updateTimerDisplay(){
    // Update current time text display.
    $('#current-time').text(formatTime( player.getCurrentTime() ));
    $('#duration').text(formatTime( player.getDuration() ));
};

function formatTime(time){
    time = Math.round(time);

    var minutes = Math.floor(time / 60),
    seconds = time - minutes * 60;

    seconds = seconds < 10 ? '0' + seconds : seconds;

    return minutes + ":" + seconds;
};

let s = {

	init: function() {
		$('.star').click(function(e) {
			$("#" + e.currentTarget.id).toggleClass('selected');
			if(s.stickers[e.currentTarget.id]) {
				delete s.stickers[e.currentTarget.id];
			} else {
				s.stickers[e.currentTarget.id] = true;
			}
            s.save(true);
        });

		$('body').click(function(e) {
			$('#ship').css({top:e.clientY, left: e.clientX});
        });

		s.load(true)
	},

	stickers: {},

	save: function(local) {
	    if (local) {
	        localStorage.stickers = JSON.stringify(s.stickers);
	        localStorage.fedexpottytrainer = localStorage.fedexpottytrainer;
		}
	},

	load: function(local) {
		$('.stickers').removeClass('selected');
		if(local) {
			if(localStorage.stickers === undefined) {
				s.reset(true);
			}
			if(localStorage.fedexpottytrainer === undefined | localStorage.fedexpottytrainer == "") {
				localStorage.fedexpottytrainer = "My potty chart";
			}
			s.stickers = JSON.parse(localStorage.stickers);
		}
		for(var sticker in s.stickers) {
			$('#' + sticker).addClass('selected');
		}
	},

	reset: function(local) {
		if(local) {
		    s.stickers = {star01:true};
		    localStorage.fedexpottytrainer = "My potty chart";
		    s.save(true);
		}
		s.load(true);
	}


}

$(s.init);
