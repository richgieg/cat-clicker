$(function() {

	/* ======= Model ======= */

	var model = {
		currentCat: null,
		cats: [
			{name: 'Sam', img: 'cat_picture1.jpg', clicks: 0},
			{name: 'Billy', img: 'cat_picture2.jpg', clicks: 0},
			{name: 'Jethro', img: 'cat_picture3.jpg', clicks: 0},
			{name: 'Melanie', img: 'cat_picture4.jpg', clicks: 0},
			{name: 'Taffy', img: 'cat_picture5.jpg', clicks: 0},
		]
	};


	/* ======= Octopus ======= */

	var octopus = {

		// Initializes the app
		init: function() {
			// Initialize the model's current cat variable
			model.currentCat = model.cats[0];

			// Initialize the views
			catListView.init();
			catView.init();
		},

		// Return the current cat object from the model
		getCurrentCat: function() {
			return model.currentCat;
		},

		// Update the model's current cat object
		setCurrentCat: function(cat) {
			model.currentCat = cat;
		},

		// Get the array of cat objects from the model
		getCats: function() {
			return model.cats;
		},

		// Increment the click counter on the model's current cat object
		incrementCounter: function() {
			model.currentCat.clicks++;
		}
	};


	/* ======= View ======= */

	var catListView = {

		// Initializes this view
		init: function() {
			// Initialize jQuery DOM element pointer
			this.$catList = $('#cat-list');

			// Render the view for the first time
			this.render();
		},

		// Renders this view
		render: function() {
			// Get the array of cats from the octopus
			var cats = octopus.getCats();
			var html = '';

			// Look over the cat objects, building a button for each
			for (var i = 0; i < cats.length; i++) {
				// Convenience variable pointing to the currently-indexed cat
				var cat = cats[i];

				// Create a new button element
				var btn = $('<button>' + cat.name + '</button>');

				// Utilizes an immediately-invoked function expression to
				// create a closure, ensuring that the registered click handler
				// calls setCurrentCat with the correct cat object
				btn.click((function(cat) {
					return function() {
						octopus.setCurrentCat(cat);
						catView.render();
					}
				})(cat));

				// Append the new button to the div
				this.$catList.append(btn);
			}
		}
	};

	var catView = {

		// Initializes this view
		init: function() {
			// Initialize jQuery DOM element pointers
			this.$cat = $('#cat');
			this.$name = $('#cat-name');
			this.$img = $('#cat-img');
			this.$count = $('#cat-count');

			// Create the click handler
			this.$img.click(function() {
				octopus.incrementCounter();
				catView.render();
			});

			// Render the view for the first time
			this.render();
		},

		// Renders this view
		render: function() {
			var cat = octopus.getCurrentCat();

			// Update the elements with the current cat's values
			this.$name.text(cat.name);
			this.$count.text(cat.clicks);
			this.$img.attr('src', cat.img);
		}
	};

	octopus.init();
});
