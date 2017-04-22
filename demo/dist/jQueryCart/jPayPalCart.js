// jPayPalCart v1.0

(function ($) {
    var methods = {
        init: function (options) {
            return this.each(function () {
                var defaults = {
                    currency: 'AUS',
                    currencysign: '$',
                    business: '',
                    virtual: false,
                    quantityupdate: true,
                    notifyurl: '',
                    minicartid: '',
					persitdays: 7
                };
                this.settings = $.extend(defaults, options, { 'cartItems': new Array() });
                PayPalCartdisplay(this);
            });
        },
        add: function (code, description, quantity, value) {
            return this.each(function () {
                this.settings.cartItems.push({ 'code': code, 'description': description, 'quantity': quantity, 'value': value });
                PayPalCartdisplay(this);
            });
        },
        remove: function (code) {
            return this.each(function () {
                var itemcount = this.settings.cartItems.length;
                var newarray = new Array();
                for (var i = 0; i < itemcount; i++) {
                    if (this.settings.cartItems[i]['code'] != code) {
                        newarray.push(this.settings.cartItems[i]);
                    }
                }
                this.settings.cartItems = newarray;
                PayPalCartdisplay(this);
            });
        },
        update: function (code, quantity) {
            return this.each(function () {
                var itemcount = this.settings.cartItems.length;
                for (var i = 0; i < itemcount; i++) {
                    if (this.settings.cartItems[i]['code'] == code) {
                        this.settings.cartItems[i]['quantity'] = quantity;
                    }
                }
                PayPalCartdisplay(this);
            });
        }
    };

    $.fn.PayPalCart = function (method) {
        // Method calling logic
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.tooltip');
        }
    };

    function PayPalCartdisplay(theDiv) {
        var overalltotal = 0;
        var totalitems = 0;
        var theform = '<form action="https://www.paypal.com/uk/cgi-bin/webscr" method="post">\r\n'; // Localise the country
        theform += '<input type="hidden" name="cmd" value="_cart" />\r\n';
        theform += '<input type="hidden" name="upload" value="1" />\r\n';
        theform += '<input type="hidden" name="currency_code" value="' + theDiv.settings.currency + '" />\r\n';
        theform += '<input type="hidden" name="business" value="' + theDiv.settings.business + '" />\r\n';
        if (theDiv.settings.virtual) {
            theform += '<input type="hidden" name="no_shipping" value="1">\r\n';
        }
        if (theDiv.settings.notifyURL != '') {
            theform += '<input type="hidden" name="notify_url" value="' + theDiv.settings.notifyURL + '" />\r\n';
        }
        theform += '<table class="PayPalCart">\r\n';
        theform += '<tr><th>&nbsp;</th><th class="desc">Description</th><th align="center">Qty</th><th class="price">Price</th></tr>\r\n';
        for (var i = 0; i < theDiv.settings.cartItems.length; i++) {
            overalltotal += (theDiv.settings.cartItems[i]['quantity'] * theDiv.settings.cartItems[i]['value']);
            totalitems += theDiv.settings.cartItems[i]['quantity'];
            theform += '<tr>\r\n<td><a href="javascript:void(0)" onclick="$(\'#' + theDiv.id + '\').PayPalCart(\'remove\', \'' + theDiv.settings.cartItems[i]['code'] + '\');"><i class="fa fa-times"></i></a>\r\n';
            theform += '<input type="hidden" name="item_number_' + (i + 1).toString() + '" value="' + theDiv.settings.cartItems[i]['code'] + '" />\r\n';
            theform += '<input type="hidden" name="item_name_' + (i + 1).toString() + '" value="' + theDiv.settings.cartItems[i]['description'] + '" />\r\n';
            theform += '<input type="hidden" name="quantity_' + (i + 1).toString() + '" value="' + theDiv.settings.cartItems[i]['quantity'] + '" />\r\n';
            theform += '<input type="hidden" name="amount_' + (i + 1).toString() + '" value="' + theDiv.settings.cartItems[i]['value'] + '" />\r\n';
            theform += '</td>\r\n';
            theform += '<td align="left">' + theDiv.settings.cartItems[i]['description'] + '</td>\r\n';
            if (theDiv.settings.quantityupdate) {
                theform += '<td align="center"><input type="text" size="2" name="' + theDiv.settings.cartItems[i]['code'] + '" value="' + theDiv.settings.cartItems[i]['quantity'] + '" onblur="$(\'#' + theDiv.id + '\').PayPalCart(\'update\',\'' + theDiv.settings.cartItems[i]['code'] + '\', $(this).val());" /></td>\r\n';
            } else {
                theform += '<td align="center">' + theDiv.settings.cartItems[i]['quantity'] + '</td>\r\n';
            }
            theform += '<td align="right">' + theDiv.settings.currencysign + parseFloat(theDiv.settings.cartItems[i]['value']).toFixed(2) + '</td></tr>\r\n';
        }
        theform += '<tr class="PayPalCartTotals"><td colspan="3" align="left">Total</td><td align="right">' + theDiv.settings.currencysign + parseFloat(overalltotal).toFixed(2) + '</td></tr>\r\n';
        theform += '<tr><td colspan="4" align="right"><input type="submit" value="Buy Now" class="btn btn-sm btn-success"></td></tr>\r\n';
        theform += '</table>\r\n';
        theform += '</form>\r\n';
        $(theDiv).html(theform).ready(function () {
            $(this).find('input').keypress(function (e) {
                if (e.which == 13) {
                    var thisitem = $(this).attr("name");
                    var thisval = $(this).val();
                    $(theDiv).PayPalCart('update', thisitem, thisval);
                    return false;
                }
            });
        });
        //setup the mini cart
        if (theDiv.settings.minicartid != "") {
            var minicart = '';

            minicart += totalitems.toString() + " <span class='items'>items</span><br />" + theDiv.settings.currencysign + parseFloat(overalltotal).toFixed(2);
            minicart += '';
            $('#' + theDiv.settings.minicartid).html(minicart);
        }
    }
})(jQuery);