// Utility functions for typed.js management

declare global {
  interface Window {
    $: any;
  }
}

export const restartTypedAnimation = (strings: string[], options: any = {}) => {
  if (typeof window === 'undefined' || !window.$) {
    console.warn('jQuery not available');
    return null;
  }

  const $typed = window.$(".typed");
  if ($typed.length === 0) {
    console.warn('Typed element not found');
    return null;
  }

  // Update strings in DOM
  const typedStringsElement = window.$('.typed-strings');
  if (typedStringsElement.length > 0) {
    typedStringsElement.html(
      strings.map(str => `<span>${str}</span>`).join('')
    );
  }

  // Destroy existing instance if it exists
  try {
    if ($typed.data('typed')) {
      $typed.typed('destroy');
    }
  } catch (error) {
    console.warn('Failed to destroy existing typed instance:', error);
  }

  // Default options
  const defaultOptions = {
    stringsElement: typedStringsElement,
    typeSpeed: 20,
    backDelay: 500,
    loop: true,
    autoplay: true,
    autoplayTimeout: 500,
    contentType: 'html',
    loopCount: true
  };

  // Merge options
  const mergedOptions = { ...defaultOptions, ...options };

  // Remove problematic resetCallback
  delete mergedOptions.resetCallback;

  try {
    const instance = $typed.typed(mergedOptions);
    return instance;
  } catch (error) {
    console.error('Failed to initialize typed.js:', error);
    return null;
  }
};

export const destroyTypedAnimation = () => {
  if (typeof window === 'undefined' || !window.$) {
    return;
  }

  const $typed = window.$(".typed");
  if ($typed.length > 0) {
    try {
      if ($typed.data('typed')) {
        $typed.typed('destroy');
      }
    } catch (error) {
      console.warn('Failed to destroy typed instance:', error);
    }
  }
};

export const updateTypedStrings = (strings: string[]) => {
  if (typeof window === 'undefined' || !window.$) {
    return;
  }

  const typedStringsElement = window.$('.typed-strings');
  if (typedStringsElement.length > 0) {
    typedStringsElement.html(
      strings.map(str => `<span>${str}</span>`).join('')
    );
  }
}; 