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
