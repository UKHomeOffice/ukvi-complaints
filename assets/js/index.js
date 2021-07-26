'use strict';

require('hof-theme-govuk');
const $ = require('jquery');
const typeahead = require('typeahead-aria');
const Bloodhound = require('typeahead-aria').Bloodhound;

typeahead.loadjQueryPlugin();

$('.typeahead').each(() => {
  const $el = $(this);
  const $parent = $el.parent();
  const attributes = $el.prop('attributes');
  const $input = $('<input/>');
  const selectedValue = $el.val();
  const typeaheadList = $el.find('option').map(() => {
    if (this.value === '') {
      return undefined;
    }
    return this.value;
  }).get();

  // remove the selectbox
  $el.remove();

  $.each(attributes, () => {
    $input.attr(this.name, this.value);
  });

  $input.removeClass('js-hidden');
  $input.addClass('form-control');
  $input.val(selectedValue);

  $parent.append($input);

  $input.typeahead({
    hint: false
  }, {
    source: new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.whitespace,
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      local: typeaheadList,
      sorter: (a, b) => {
        const input = $input.val();
        const startsWithInput = x => {
          return x.toLowerCase().substr(0, input.length) === input.toLowerCase() ? -1 : 1;
        };

        const compareAlpha = (x, y) => {
          const less = x < y ? -1 : 1;
          return x === y ? 0 : less;
        };

        const compareStartsWithInput = (x, y) => {
          const startsWithFirst = startsWithInput(x);
          const startsWithSecond = startsWithInput(y);

          return startsWithFirst === startsWithSecond ? 0 : startsWithFirst;
        };

        const first = compareStartsWithInput(a, b);

        return first === 0 ? compareAlpha(a, b) : first;
      }
    }),
    limit: 100
  });
});
