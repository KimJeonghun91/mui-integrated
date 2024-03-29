import _extends from "@babel/runtime/helpers/esm/extends";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import * as React from 'react';
import useEventCallback from 'my-mui/utils/useEventCallback';
import { useUtils } from '../useUtils';
import { changeSectionValueFormat, cleanDigitSectionValue, doesSectionFormatHaveLeadingZeros, getDateSectionConfigFromFormatToken, getDaysInWeekStr, getLetterEditingOptions } from './useField.utils';

/**
 * The letter editing and the numeric editing each define a `CharacterEditingApplier`.
 * This function decides what the new section value should be and if the focus should switch to the next section.
 *
 * If it returns `null`, then the section value is not updated and the focus does not move.
 */

/**
 * Function called by `applyQuery` which decides:
 * - what is the new section value ?
 * - should the query used to get this value be stored for the next key press ?
 *
 * If it returns `{ sectionValue: string; shouldGoToNextSection: boolean }`,
 * Then we store the query and update the section with the new value.
 *
 * If it returns `{ saveQuery: true` },
 * Then we store the query and don't update the section.
 *
 * If it returns `{ saveQuery: false },
 * Then we do nothing.
 */

var QUERY_LIFE_DURATION_MS = 5000;
var isQueryResponseWithoutValue = function isQueryResponseWithoutValue(response) {
  return response.saveQuery != null;
};

/**
 * Update the active section value when the user pressed a key that is not a navigation key (arrow key for example).
 * This hook has two main editing behaviors
 *
 * 1. The numeric editing when the user presses a digit
 * 2. The letter editing when the user presses another key
 */
export var useFieldCharacterEditing = function useFieldCharacterEditing(_ref) {
  var sections = _ref.sections,
    updateSectionValue = _ref.updateSectionValue,
    sectionsValueBoundaries = _ref.sectionsValueBoundaries,
    setTempAndroidValueStr = _ref.setTempAndroidValueStr,
    timezone = _ref.timezone;
  var utils = useUtils();
  var _React$useState = React.useState(null),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    query = _React$useState2[0],
    setQuery = _React$useState2[1];
  var resetQuery = useEventCallback(function () {
    return setQuery(null);
  });
  React.useEffect(function () {
    var _sections$query$secti;
    if (query != null && ((_sections$query$secti = sections[query.sectionIndex]) == null ? void 0 : _sections$query$secti.type) !== query.sectionType) {
      resetQuery();
    }
  }, [sections, query, resetQuery]);
  React.useEffect(function () {
    if (query != null) {
      var timeout = setTimeout(function () {
        return resetQuery();
      }, QUERY_LIFE_DURATION_MS);
      return function () {
        window.clearTimeout(timeout);
      };
    }
    return function () {};
  }, [query, resetQuery]);
  var applyQuery = function applyQuery(_ref2, getFirstSectionValueMatchingWithQuery, isValidQueryValue) {
    var keyPressed = _ref2.keyPressed,
      sectionIndex = _ref2.sectionIndex;
    var cleanKeyPressed = keyPressed.toLowerCase();
    var activeSection = sections[sectionIndex];

    // The current query targets the section being editing
    // We can try to concatenated value
    if (query != null && (!isValidQueryValue || isValidQueryValue(query.value)) && query.sectionIndex === sectionIndex) {
      var concatenatedQueryValue = "".concat(query.value).concat(cleanKeyPressed);
      var _queryResponse = getFirstSectionValueMatchingWithQuery(concatenatedQueryValue, activeSection);
      if (!isQueryResponseWithoutValue(_queryResponse)) {
        setQuery({
          sectionIndex: sectionIndex,
          value: concatenatedQueryValue,
          sectionType: activeSection.type
        });
        return _queryResponse;
      }
    }
    var queryResponse = getFirstSectionValueMatchingWithQuery(cleanKeyPressed, activeSection);
    if (isQueryResponseWithoutValue(queryResponse) && !queryResponse.saveQuery) {
      resetQuery();
      return null;
    }
    setQuery({
      sectionIndex: sectionIndex,
      value: cleanKeyPressed,
      sectionType: activeSection.type
    });
    if (isQueryResponseWithoutValue(queryResponse)) {
      return null;
    }
    return queryResponse;
  };
  var applyLetterEditing = function applyLetterEditing(params) {
    var findMatchingOptions = function findMatchingOptions(format, options, queryValue) {
      var matchingValues = options.filter(function (option) {
        return option.toLowerCase().startsWith(queryValue);
      });
      if (matchingValues.length === 0) {
        return {
          saveQuery: false
        };
      }
      return {
        sectionValue: matchingValues[0],
        shouldGoToNextSection: matchingValues.length === 1
      };
    };
    var testQueryOnFormatAndFallbackFormat = function testQueryOnFormatAndFallbackFormat(queryValue, activeSection, fallbackFormat, formatFallbackValue) {
      var getOptions = function getOptions(format) {
        return getLetterEditingOptions(utils, timezone, activeSection.type, format);
      };
      if (activeSection.contentType === 'letter') {
        return findMatchingOptions(activeSection.format, getOptions(activeSection.format), queryValue);
      }

      // When editing a digit-format month / weekDay and the user presses a letter,
      // We can support the letter editing by using the letter-format month / weekDay and re-formatting the result.
      // We just have to make sure that the default month / weekDay format is a letter format,
      if (fallbackFormat && formatFallbackValue != null && getDateSectionConfigFromFormatToken(utils, fallbackFormat).contentType === 'letter') {
        var _fallbackOptions = getOptions(fallbackFormat);
        var response = findMatchingOptions(fallbackFormat, _fallbackOptions, queryValue);
        if (isQueryResponseWithoutValue(response)) {
          return {
            saveQuery: false
          };
        }
        return _extends({}, response, {
          sectionValue: formatFallbackValue(response.sectionValue, _fallbackOptions)
        });
      }
      return {
        saveQuery: false
      };
    };
    var getFirstSectionValueMatchingWithQuery = function getFirstSectionValueMatchingWithQuery(queryValue, activeSection) {
      switch (activeSection.type) {
        case 'month':
          {
            var formatFallbackValue = function formatFallbackValue(fallbackValue) {
              return changeSectionValueFormat(utils, fallbackValue, utils.formats.month, activeSection.format);
            };
            return testQueryOnFormatAndFallbackFormat(queryValue, activeSection, utils.formats.month, formatFallbackValue);
          }
        case 'weekDay':
          {
            var _formatFallbackValue = function _formatFallbackValue(fallbackValue, fallbackOptions) {
              return fallbackOptions.indexOf(fallbackValue).toString();
            };
            return testQueryOnFormatAndFallbackFormat(queryValue, activeSection, utils.formats.weekday, _formatFallbackValue);
          }
        case 'meridiem':
          {
            return testQueryOnFormatAndFallbackFormat(queryValue, activeSection);
          }
        default:
          {
            return {
              saveQuery: false
            };
          }
      }
    };
    return applyQuery(params, getFirstSectionValueMatchingWithQuery);
  };
  var applyNumericEditing = function applyNumericEditing(params) {
    var getNewSectionValue = function getNewSectionValue(queryValue, section) {
      var queryValueNumber = Number("".concat(queryValue));
      var sectionBoundaries = sectionsValueBoundaries[section.type]({
        currentDate: null,
        format: section.format,
        contentType: section.contentType
      });
      if (queryValueNumber > sectionBoundaries.maximum) {
        return {
          saveQuery: false
        };
      }

      // If the user types `0` on a month section,
      // It is below the minimum, but we want to store the `0` in the query,
      // So that when he pressed `1`, it will store `01` and move to the next section.
      if (queryValueNumber < sectionBoundaries.minimum) {
        return {
          saveQuery: true
        };
      }
      var shouldGoToNextSection = Number("".concat(queryValue, "0")) > sectionBoundaries.maximum || queryValue.length === sectionBoundaries.maximum.toString().length;
      var newSectionValue = cleanDigitSectionValue(utils, timezone, queryValueNumber, sectionBoundaries, section);
      return {
        sectionValue: newSectionValue,
        shouldGoToNextSection: shouldGoToNextSection
      };
    };
    var getFirstSectionValueMatchingWithQuery = function getFirstSectionValueMatchingWithQuery(queryValue, activeSection) {
      if (activeSection.contentType === 'digit' || activeSection.contentType === 'digit-with-letter') {
        return getNewSectionValue(queryValue, activeSection);
      }

      // When editing a letter-format month and the user presses a digit,
      // We can support the numeric editing by using the digit-format month and re-formatting the result.
      if (activeSection.type === 'month') {
        var hasLeadingZerosInFormat = doesSectionFormatHaveLeadingZeros(utils, timezone, 'digit', 'month', 'MM');
        var response = getNewSectionValue(queryValue, {
          type: activeSection.type,
          format: 'MM',
          hasLeadingZerosInFormat: hasLeadingZerosInFormat,
          hasLeadingZerosInInput: true,
          contentType: 'digit',
          maxLength: 2
        });
        if (isQueryResponseWithoutValue(response)) {
          return response;
        }
        var formattedValue = changeSectionValueFormat(utils, response.sectionValue, 'MM', activeSection.format);
        return _extends({}, response, {
          sectionValue: formattedValue
        });
      }

      // When editing a letter-format weekDay and the user presses a digit,
      // We can support the numeric editing by returning the nth day in the week day array.
      if (activeSection.type === 'weekDay') {
        var _response = getNewSectionValue(queryValue, activeSection);
        if (isQueryResponseWithoutValue(_response)) {
          return _response;
        }
        var _formattedValue = getDaysInWeekStr(utils, timezone, activeSection.format)[Number(_response.sectionValue) - 1];
        return _extends({}, _response, {
          sectionValue: _formattedValue
        });
      }
      return {
        saveQuery: false
      };
    };
    return applyQuery(params, getFirstSectionValueMatchingWithQuery, function (queryValue) {
      return !Number.isNaN(Number(queryValue));
    });
  };
  var applyCharacterEditing = useEventCallback(function (params) {
    var activeSection = sections[params.sectionIndex];
    var isNumericEditing = !Number.isNaN(Number(params.keyPressed));
    var response = isNumericEditing ? applyNumericEditing(params) : applyLetterEditing(params);
    if (response == null) {
      setTempAndroidValueStr(null);
    } else {
      updateSectionValue({
        activeSection: activeSection,
        newSectionValue: response.sectionValue,
        shouldGoToNextSection: response.shouldGoToNextSection
      });
    }
  });
  return {
    applyCharacterEditing: applyCharacterEditing,
    resetCharacterQuery: resetQuery
  };
};