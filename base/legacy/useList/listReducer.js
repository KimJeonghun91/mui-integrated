import _extends from "@babel/runtime/helpers/esm/extends";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import { ListActionTypes } from './listActions.types';
/**
 * Looks up the next valid item to highlight within the list.
 *
 * @param currentIndex The index of the start of the search.
 * @param lookupDirection Whether to look for the next or previous item.
 * @param items The array of items to search.
 * @param includeDisabledItems Whether to include disabled items in the search.
 * @param isItemDisabled A function that determines whether an item is disabled.
 * @param wrapAround Whether to wrap around the list when searching.
 * @returns The index of the next valid item to highlight or -1 if no valid item is found.
 */
function findValidItemToHighlight(currentIndex, lookupDirection, items, includeDisabledItems, isItemDisabled, wrapAround) {
  if (items.length === 0 || !includeDisabledItems && items.every(function (item, itemIndex) {
    return isItemDisabled(item, itemIndex);
  })) {
    return -1;
  }
  var nextFocus = currentIndex;
  for (;;) {
    // No valid items found
    if (!wrapAround && lookupDirection === 'next' && nextFocus === items.length || !wrapAround && lookupDirection === 'previous' && nextFocus === -1) {
      return -1;
    }
    var nextFocusDisabled = includeDisabledItems ? false : isItemDisabled(items[nextFocus], nextFocus);
    if (nextFocusDisabled) {
      nextFocus += lookupDirection === 'next' ? 1 : -1;
      if (wrapAround) {
        nextFocus = (nextFocus + items.length) % items.length;
      }
    } else {
      return nextFocus;
    }
  }
}

/**
 * Gets the next item to highlight based on the current highlighted item and the search direction.
 *
 * @param previouslyHighlightedValue The item from which to start the search for the next candidate.
 * @param offset The offset from the previously highlighted item to search for the next candidate or a special named value ('reset', 'start', 'end').
 * @param context The list action context.
 *
 * @returns The next item to highlight or null if no item is valid.
 */
export function moveHighlight(previouslyHighlightedValue, offset, context) {
  var _items$nextIndex;
  var items = context.items,
    isItemDisabled = context.isItemDisabled,
    disableListWrap = context.disableListWrap,
    disabledItemsFocusable = context.disabledItemsFocusable,
    itemComparer = context.itemComparer,
    focusManagement = context.focusManagement; // TODO: make this configurable
  // The always should be an item highlighted when focus is managed by the DOM
  // so that it's accessible by the `tab` key.
  var defaultHighlightedIndex = focusManagement === 'DOM' ? 0 : -1;
  var maxIndex = items.length - 1;
  var previouslyHighlightedIndex = previouslyHighlightedValue == null ? -1 : items.findIndex(function (item) {
    return itemComparer(item, previouslyHighlightedValue);
  });
  var nextIndexCandidate;
  var lookupDirection;
  var wrapAround = !disableListWrap;
  switch (offset) {
    case 'reset':
      if (defaultHighlightedIndex === -1) {
        return null;
      }
      nextIndexCandidate = 0;
      lookupDirection = 'next';
      wrapAround = false;
      break;
    case 'start':
      nextIndexCandidate = 0;
      lookupDirection = 'next';
      wrapAround = false;
      break;
    case 'end':
      nextIndexCandidate = maxIndex;
      lookupDirection = 'previous';
      wrapAround = false;
      break;
    default:
      {
        var newIndex = previouslyHighlightedIndex + offset;
        if (newIndex < 0) {
          if (!wrapAround && previouslyHighlightedIndex !== -1 || Math.abs(offset) > 1) {
            nextIndexCandidate = 0;
            lookupDirection = 'next';
          } else {
            nextIndexCandidate = maxIndex;
            lookupDirection = 'previous';
          }
        } else if (newIndex > maxIndex) {
          if (!wrapAround || Math.abs(offset) > 1) {
            nextIndexCandidate = maxIndex;
            lookupDirection = 'previous';
          } else {
            nextIndexCandidate = 0;
            lookupDirection = 'next';
          }
        } else {
          nextIndexCandidate = newIndex;
          lookupDirection = offset >= 0 ? 'next' : 'previous';
        }
      }
  }
  var nextIndex = findValidItemToHighlight(nextIndexCandidate, lookupDirection, items, disabledItemsFocusable, isItemDisabled, wrapAround);

  // If there are no valid items to highlight, return the previously highlighted item (if it's still valid).
  if (nextIndex === -1 && previouslyHighlightedValue !== null && !isItemDisabled(previouslyHighlightedValue, previouslyHighlightedIndex)) {
    return previouslyHighlightedValue;
  }
  return (_items$nextIndex = items[nextIndex]) != null ? _items$nextIndex : null;
}

/**
 * Toggles the selection of an item.
 *
 * @param item Item to toggle.
 * @param selectedValues Already selected items.
 * @param selectionMode The number of items that can be simultanously selected.
 * @param itemComparer A custom item comparer function.
 *
 * @returns The new array of selected items.
 */
export function toggleSelection(item, selectedValues, selectionMode, itemComparer) {
  if (selectionMode === 'none') {
    return [];
  }
  if (selectionMode === 'single') {
    // if the item to select has already been selected, return the original array
    if (itemComparer(selectedValues[0], item)) {
      return selectedValues;
    }
    return [item];
  }

  // The toggled item is selected; remove it from the selection.
  if (selectedValues.some(function (sv) {
    return itemComparer(sv, item);
  })) {
    return selectedValues.filter(function (sv) {
      return !itemComparer(sv, item);
    });
  }

  // The toggled item is not selected - add it to the selection.
  return [].concat(_toConsumableArray(selectedValues), [item]);
}

/**
 * Handles item selection in a list.
 *
 * @param item - The item to be selected.
 * @param state - The current state of the list.
 * @param context - The context of the list action.
 * @returns The new state of the list after the item has been selected, or the original state if the item is disabled.
 */
export function handleItemSelection(item, state, context) {
  var itemComparer = context.itemComparer,
    isItemDisabled = context.isItemDisabled,
    selectionMode = context.selectionMode,
    items = context.items;
  var selectedValues = state.selectedValues;
  var itemIndex = items.findIndex(function (i) {
    return itemComparer(item, i);
  });
  if (isItemDisabled(item, itemIndex)) {
    return state;
  }

  // if the item is already selected, remove it from the selection, otherwise add it
  var newSelectedValues = toggleSelection(item, selectedValues, selectionMode, itemComparer);
  return _extends({}, state, {
    selectedValues: newSelectedValues,
    highlightedValue: item
  });
}
function handleKeyDown(key, state, context) {
  var previouslySelectedValue = state.highlightedValue;
  var orientation = context.orientation,
    pageSize = context.pageSize;
  switch (key) {
    case 'Home':
      return _extends({}, state, {
        highlightedValue: moveHighlight(previouslySelectedValue, 'start', context)
      });
    case 'End':
      return _extends({}, state, {
        highlightedValue: moveHighlight(previouslySelectedValue, 'end', context)
      });
    case 'PageUp':
      return _extends({}, state, {
        highlightedValue: moveHighlight(previouslySelectedValue, -pageSize, context)
      });
    case 'PageDown':
      return _extends({}, state, {
        highlightedValue: moveHighlight(previouslySelectedValue, pageSize, context)
      });
    case 'ArrowUp':
      if (orientation !== 'vertical') {
        break;
      }
      return _extends({}, state, {
        highlightedValue: moveHighlight(previouslySelectedValue, -1, context)
      });
    case 'ArrowDown':
      if (orientation !== 'vertical') {
        break;
      }
      return _extends({}, state, {
        highlightedValue: moveHighlight(previouslySelectedValue, 1, context)
      });
    case 'ArrowLeft':
      {
        if (orientation === 'vertical') {
          break;
        }
        var offset = orientation === 'horizontal-ltr' ? -1 : 1;
        return _extends({}, state, {
          highlightedValue: moveHighlight(previouslySelectedValue, offset, context)
        });
      }
    case 'ArrowRight':
      {
        if (orientation === 'vertical') {
          break;
        }
        var _offset = orientation === 'horizontal-ltr' ? 1 : -1;
        return _extends({}, state, {
          highlightedValue: moveHighlight(previouslySelectedValue, _offset, context)
        });
      }
    case 'Enter':
    case ' ':
      if (state.highlightedValue === null) {
        return state;
      }
      return handleItemSelection(state.highlightedValue, state, context);
    default:
      break;
  }
  return state;
}
function handleBlur(state, context) {
  if (context.focusManagement === 'DOM') {
    return state;
  }
  return _extends({}, state, {
    highlightedValue: null
  });
}
function textCriteriaMatches(nextFocus, searchString, stringifyItem) {
  var _stringifyItem;
  var text = (_stringifyItem = stringifyItem(nextFocus)) == null ? void 0 : _stringifyItem.trim().toLowerCase();
  if (!text || text.length === 0) {
    // Make item not navigable if stringification fails or results in empty string.
    return false;
  }
  return text.indexOf(searchString) === 0;
}
function handleTextNavigation(state, searchString, context) {
  var items = context.items,
    isItemDisabled = context.isItemDisabled,
    disabledItemsFocusable = context.disabledItemsFocusable,
    getItemAsString = context.getItemAsString;
  var startWithCurrentItem = searchString.length > 1;
  var nextItem = startWithCurrentItem ? state.highlightedValue : moveHighlight(state.highlightedValue, 1, context);
  for (var _index = 0; _index < items.length; _index += 1) {
    // Return un-mutated state if looped back to the currently highlighted value
    if (!nextItem || !startWithCurrentItem && state.highlightedValue === nextItem) {
      return state;
    }
    if (textCriteriaMatches(nextItem, searchString, getItemAsString) && (!isItemDisabled(nextItem, items.indexOf(nextItem)) || disabledItemsFocusable)) {
      // The nextItem is the element to be highlighted
      return _extends({}, state, {
        highlightedValue: nextItem
      });
    }
    // Move to the next element.
    nextItem = moveHighlight(nextItem, 1, context);
  }

  // No item matches the text search criteria
  return state;
}
function handleItemsChange(items, previousItems, state, context) {
  var _state$selectedValues;
  var itemComparer = context.itemComparer,
    focusManagement = context.focusManagement;
  var newHighlightedValue = null;
  if (state.highlightedValue != null) {
    var _items$find;
    newHighlightedValue = (_items$find = items.find(function (item) {
      return itemComparer(item, state.highlightedValue);
    })) != null ? _items$find : null;
  } else if (focusManagement === 'DOM' && previousItems.length === 0) {
    newHighlightedValue = moveHighlight(null, 'reset', context);
  }

  // exclude selected values that are no longer in the items list
  var selectedValues = (_state$selectedValues = state.selectedValues) != null ? _state$selectedValues : [];
  var newSelectedValues = selectedValues.filter(function (selectedValue) {
    return items.some(function (item) {
      return itemComparer(item, selectedValue);
    });
  });
  return _extends({}, state, {
    highlightedValue: newHighlightedValue,
    selectedValues: newSelectedValues
  });
}
function handleResetHighlight(state, context) {
  return _extends({}, state, {
    highlightedValue: moveHighlight(null, 'reset', context)
  });
}
function handleHighlightLast(state, context) {
  return _extends({}, state, {
    highlightedValue: moveHighlight(null, 'end', context)
  });
}
function handleClearSelection(state, context) {
  return _extends({}, state, {
    selectedValues: [],
    highlightedValue: moveHighlight(null, 'reset', context)
  });
}
export function listReducer(state, action) {
  var type = action.type,
    context = action.context;
  switch (type) {
    case ListActionTypes.keyDown:
      return handleKeyDown(action.key, state, context);
    case ListActionTypes.itemClick:
      return handleItemSelection(action.item, state, context);
    case ListActionTypes.blur:
      return handleBlur(state, context);
    case ListActionTypes.textNavigation:
      return handleTextNavigation(state, action.searchString, context);
    case ListActionTypes.itemsChange:
      return handleItemsChange(action.items, action.previousItems, state, context);
    case ListActionTypes.resetHighlight:
      return handleResetHighlight(state, context);
    case ListActionTypes.highlightLast:
      return handleHighlightLast(state, context);
    case ListActionTypes.clearSelection:
      return handleClearSelection(state, context);
    default:
      return state;
  }
}