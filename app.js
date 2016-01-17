$(function() {

	var model = {
		init: function() {
			this.currentCat = 0;
			this.cats = [
				{name: 'Sam', img: 'cat_picture1.jpg', clicks: 0},
				{name: 'Billy', img: 'cat_picture2.jpg', clicks: 0},
				{name: 'Jethro', img: 'cat_picture3.jpg', clicks: 0},
				{name: 'Melanie', img: 'cat_picture4.jpg', clicks: 0},
				{name: 'Taffy', img: 'cat_picture5.jpg', clicks: 0},
			];
		},
		getCats: function() {
			return this.cats;
		},
		updateCurrentCat: function(index) {
			this.currentCat = index;
		},
		getCurrentCat: function() {
			return this.cats[this.currentCat];
		}
	};

	var octopus = {
		init: function() {
			model.init();
			catListView.init();
			catView.init();
		},
		getCats: function() {
			return model.getCats();
		},
		getCurrentCat: function() {
			return model.getCurrentCat();
		},
		changeCat: function(index) {
			model.updateCurrentCat(index);
			catView.render();
		},
		catClicked: function() {
			var cat = model.getCurrentCat();
			cat.clicks++;
		}
	};

	var catListView = {
		init: function() {
			this.$catList = $('#catlist');
			this.render();
		},
		render: function() {
			var cats = octopus.getCats();
			var html = '';
			for (var i = 0; i < cats.length; i++) {
				var btn = $('<button>' + cats[i].name + '</button>');
				btn.click((function(index) {
					return function() {
						octopus.changeCat(index);
					}
				})(i));
				this.$catList.append(btn);
			}
		}
	};

	var catView = {
		init: function() {
			this.$cat = $('#cat');
			this.render();
		},
		render: function() {
			var cat = octopus.getCurrentCat();
			this.$cat.empty();
			this.$cat.append('<h2>' + cat.name + '</h2>');
			var img = $('<img src="' + cat.img + '">');
			img.click(function() {
				octopus.catClicked();
				catView.render();
			});
			this.$cat.append(img);
			this.$cat.append('<p>Clicks: ' + cat.clicks + '</p>');
		}
	};

	octopus.init();
});
