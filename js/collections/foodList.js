var app = app || {};

// Food Collection
// ---------------
app.FoodList = Backbone.Collection.extend({
	// Model reference.
	model: app.Food,
	url: 'https://api.nutritionix.com/v1_1/search',
	// Override Backbone's collection `parse` function because
	// the object is different from what the collection expects.
	parse: function(response) {
		// Cache the current scope reference.
		var self = this;
		// Loop over the response object items.
		_.each(response.hits, function(item, index) {
			

			// If serving weight is null (for example a cup of coffee is returned),
			// replace it with the serving size.
			var servingQuantity = item.fields.nf_serving_weight_grams !== null ?
					(item.fields.nf_serving_weight_grams + ' gr') : (item.fields.nf_serving_size_qty + ' (portion serving size)');

			
			// Define a new model.
			var member = new self.model();
			// Set its default properties.
			member.set('brandName', item.fields.brand_name);
			member.set('itemName', item.fields.item_name);
			member.set('itemCalories', item.fields.nf_calories);
			member.set('itemQuantity', servingQuantity);

			// Insert the model inside the collection.
			self.push(member);
		});
		// Check the collection.
		console.log('length of this collection: ' + this.length);
		console.log(this);
		return this.models;
	}
});
