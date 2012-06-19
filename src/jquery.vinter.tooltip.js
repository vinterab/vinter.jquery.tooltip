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

				tooltip = self.find('.' + settings.tooltipClass);

				if (tooltip.length === 0) {

					html = '<div class="' + settings.tooltipClass + '">';

					if (settings.closeClass) {
						html += '<a class="' + settings.closeClass + '">x</a>';
					}

					if (settings.contentAttributes.heading) {
						html += '<h6>' + self.attr(settings.contentAttributes.heading) + '</h6>';
					}

					html += '<p>' + self.attr(settings.contentAttributes.text) + '</p>';
					html += '</div>';

					tooltip = self.append(html);
				}

				tooltip.show();
			}

			/**
			* Hide the tooltip
			*
			* @method hideTooltip
			*/
			function hideTooltip() {
				self.find('.' + settings.tooltipClass).hide();
			}

			self.on(settings.showEvent, showTooltip);
		});
	};

} (jQuery));