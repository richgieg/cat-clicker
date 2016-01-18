$(function() {

	/* ======= Model ======= */

	var model = {
		adminVisible: false,
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
			adminView.init();
		},

		// Return the current cat object from the model
		getCurrentCat: function() {
			return model.currentCat;
		},

		// Update the model's current cat object
		setCurrentCat: function(cat) {
			model.currentCat = cat;
			catView.render();
			adminView.hide();
		},

		// Get the array of cat objects from the model
		getCats: function() {
			return model.cats;
		},

		// Increment the click counter on the model's current cat object
		incrementCounter: function() {
			model.currentCat.clicks++;
			catView.render();
			adminView.render();
		},

		showAdminView: function() {
			adminView.render();
		},

		hideAdminView: function() {
			adminView.hide();
		},

		saveData: function(name, img, clicks) {
			var cat = model.currentCat;
			cat.name = name;
			cat.img = img;
			cat.clicks = clicks;
			adminView.hide();
			catListView.render();
			catView.render();
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
			// Clear the element
			this.$catList.empty();

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
			this.$adminBtn = $('#admin-btn');

			// Create click handler for cat image
			this.$img.click(function() {
				octopus.incrementCounter();
			});

			// Create click handler for the admin button
			this.$adminBtn.click(function() {
				octopus.showAdminView();
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

	var adminView = {

		// Initializes this view
		init: function() {
			// Initialize jQuery DOM element pointers
			this.$admin = $('#cat-admin');
			this.$headerName = $('#cat-admin-name');
			this.$name = $('#input-name');
			this.$img = $('#input-img');
			this.$clicks = $('#input-clicks');
			this.$cancelBtn = $('#cancel-btn');
			this.$submitBtn = $('#submit-btn');

			// Create click handler for the cancel button
			this.$cancelBtn.click(function() {
				octopus.hideAdminView();
			});

			// Create submit handler for the admin form
			this.$admin.submit(function() {
				name = adminView.$name.val();
				img = adminView.$img.val();
				clicks = parseInt(adminView.$clicks.val(), 10);
				octopus.saveData(name, img, clicks);
				return false;
			});

			// Hide this view
			this.hide();
		},

		// Renders this view
		render: function() {
			cat = octopus.getCurrentCat();
			this.$headerName.text(cat.name);
			this.$name.val(cat.name);
			this.$img.val(cat.img);
			this.$clicks.val(cat.clicks);
			this.$admin.show();
		},

		// Hides this view
		hide: function() {
			this.$admin.hide();
		}
	};

	octopus.init();
});
