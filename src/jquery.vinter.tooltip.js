(function ($, undef) {

	$.fn.tooltip = function (settings) {
		var defaults = {
			tooltipClass: 'ttip',
			closeClass: undef,
			contentAttributes: {
				heading: undef,
				text: 'title'
			},
			showEvent: 'mouseenter',
			hideEvent: 'mouseleave'
		};

		settings = $.extend(true, defaults, settings);

		return this.each(function () {

			var self = $(this);

			/**
			* Show the tooltip
			*
			* @method showTooltip
			*/
			function showTooltip() {

				var html, tooltip;

				if (settings.closeClass) {
					self.on('click', '.' + settings.closeClass, hideTooltip);
				}
				else {
					self.on(settings.hideEvent, hideTooltip);
				}

				html = '<div class="' + settings.tooltipClass + '">';

				if (settings.closeClass) {
					html += '<a class="' + settings.closeClass + '">x</a>';
				}

				if (settings.contentAttributes.heading) {
					html += '<h6>' + getAttributeValue(settings.contentAttributes.heading) + '</h6>';
				}

				html += '<p>' + getAttributeValue(settings.contentAttributes.text) + '</p>';
				html += '</div>';

				tooltip = self.append(html).show();
			}

			/**
			* Get the attribute value and store the original
			* title attribute in a in a data attribute
			*
			* @method getAttributeValue
			*/
			function getAttributeValue(attr) {

				if (attr !== 'title') {
					return self.attr(settings.contentAttributes.heading);
				}

				var val = self.attr("title");
				self.removeAttr("title");
				self.data("original-title", val);

				return val;
			}

			/**
			* Hide the tooltip and restore the title attribute
			*
			* @method hideTooltip
			*/
			function hideTooltip() {

				var title = self.data("original-title");

				if (title.length > 0) {
					self.attr("title", title);
				}

				self.find('.' + settings.tooltipClass).remove();
			}

			self.on(settings.showEvent, showTooltip);
		});
	};

} (jQuery));