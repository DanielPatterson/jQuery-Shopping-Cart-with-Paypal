# jQuery-Shopping-Cart-with-Paypal
An example using jQueryCartand jPalcart to create a jQuery Shopping Cart with Paypal

#### CSS Dependencies:
- alertify.core.css
- alertify.default.css

#### JS Dependencies:
- jquery-1.11.3.min.js
- jQueryCart.js
- jPayPalCart.js
- alertify.min.js

#### The jQuery:
```js
$(document).ready(function () {

	// Settings for PayPal and cart population of products added/removed
	$("#thebasket").PayPalCart({ business: 'yourname@youremail.com', // this is where your email goes
	
		notifyURL: 'http://www.yournotifyURL.com/notify.php', // this is where your notification is located
		virtual: false,             // set to true when you are selling virtual items such as downloads (false enables shipping option /true disbles shipping option)
		quantityupdate: true,       // set to false if you want to disable quantity updates in the cart 
		currency: 'AUS',            // set to your trading currency - see PayPal for valid options
		currencysign: '&dollar;',   // set the currency symbol
		minicartid: 'minicart, mincart2',     // element to show the number of items and net value
		persitdays: 7               // set to -1 for cookie-less cart for single page of products, 
									// 0 (default) persits for the session, 
									// x (number of days) the basket will persits between visits
	});
		
	// ITEM 01 - Add/Remove an item to the cart
	$(".item01").click(function () {
		
		$(".item-01 span").toggleClass("hidden");
		
		if ($(this).attr("checked") == "checked") {
			$("#thebasket").PayPalCart('add', $(this).val(), $(this).val().replace("_", " "), 1, 59.95);
			alertify.success("<i class='fa fa-check'></i> C64 Cassette player added to your cart");
			
		} else {
			$("#thebasket").PayPalCart('remove', $(this).val());
			alertify.error("<i class='fa fa-times'></i> C64 Cassette player removed from your cart");
			
		}
	});
	
	// ITEM 02 - Add/Remove an item to the cart
	$(".item02").click(function () {
		
		$(".item-02 span").toggleClass("hidden");
		
		if ($(this).attr("checked") == "checked") {
			$("#thebasket").PayPalCart('add', $(this).val(), $(this).val().replace("_", " "), 1, 124.95);
			alertify.success("<i class='fa fa-check'></i> C64 PC Keyboard added to your cart");
			
		} else {
			$("#thebasket").PayPalCart('remove', $(this).val());
			alertify.error("<i class='fa fa-times'></i> C64 PC Keyboard removed from your cart");
			
		}
	});
	
	// ITEM 03 - Add/Remove an item to the cart
	$(".item03").click(function () {
		
		$(".item-03 span").toggleClass("hidden");
		
		if ($(this).attr("checked") == "checked") {
			$("#thebasket").PayPalCart('add', $(this).val(), $(this).val().replace("_", " "), 1, 264.95);
			alertify.success("<i class='fa fa-check'></i> C64 Monitor added to your cart");
			
		} else {
			$("#thebasket").PayPalCart('remove', $(this).val());
			alertify.error("<i class='fa fa-times'></i> C64 Monitor removed from your cart");
			
		}
	});

});
