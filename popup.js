/**
 * Popup.
 * @constructor
 * @param {DOMElement} element - popup element.
 */
function Popup(element) {
  this.element = element;
  this.element.classList.add('popup');
  this.isOpen = false;
  this.addPrefixEvent(this.element, 'AnimationStart', this.onAnimationEvent.bind(this))
  this.addPrefixEvent(this.element, 'AnimationEnd', this.onAnimationEvent.bind(this))
}

/**
 * addPrefixEvent
 * @param {DOMElement} element -  popup element. 
 * @param {string} type - event type
 * @param {requestCallback} callback - The callback that handles the response.
 */
Popup.prototype.addPrefixEvent = function(element, type, callback) {
  var pfx = ["webkit", "moz", "MS", "o", ""];

  for (var p = 0; p < pfx.length; p++) {
    if (!pfx[p]) {
      type = type.toLowerCase();
    }
    element.addEventListener(pfx[p] + type, callback, false);
  }
};

/**
 * onAnimationEvent
 * @param {Object} event 
 */
Popup.prototype.onAnimationEvent = function(event) {
  var element = event.currentTarget;

  if (event.type.toLowerCase().indexOf('animationstart') >= 0) {
    element.classList.remove('open');
    element.classList.remove('close');
  } else if (event.type.toLowerCase().indexOf('animationend') >= 0) {
    if (element.classList.contains('closing')) {
      element.classList.add('close');
      this.isOpen = false;
    }
    if (element.classList.contains('opening')) {
      element.classList.add('open');
      this.isOpen = true;
    }
    element.classList.remove('opening');
    element.classList.remove('closing');
  }
};

/**
 * open
 * added opening class to element
 */
Popup.prototype.open = function() {
  this.element.classList.remove('close');
  this.element.classList.add('opening');
};

/**
 * close
 * add closing class to element
 */
Popup.prototype.close = function() {
  this.element.classList.remove('open');
  this.element.classList.add('closing');
};