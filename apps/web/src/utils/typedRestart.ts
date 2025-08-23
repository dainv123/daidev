// Script to restart typed.js animation when strings change

declare global {
  interface Window {
    $: any;
  }
}

let currentTypedInstance: any = null;

export const restartTypedWithNewStrings = (strings: string[]) => {
  if (typeof window === 'undefined' || !window.$) {
    console.warn('jQuery not available');
    return;
  }

  const $typed = window.$(".typed");
  if ($typed.length === 0) {
    console.warn('Typed element not found');
    return;
  }

  // Update strings in DOM
  const typedStringsElement = window.$('.typed-strings');
  if (typedStringsElement.length > 0) {
    typedStringsElement.html(
      strings.map(str => `<span>${str}</span>`).join('')
    );
  }

  // Destroy existing instance
  if (currentTypedInstance) {
    try {
      $typed.typed('destroy');
    } catch (error) {
      console.warn('Failed to destroy existing typed instance:', error);
    }
    currentTypedInstance = null;
  }

  // Create new instance
  try {
    currentTypedInstance = $typed.typed({
      stringsElement: typedStringsElement,
      typeSpeed: 20,
      backDelay: 500,
      loop: true,
      autoplay: true,
      autoplayTimeout: 500,
      contentType: 'html',
      loopCount: true
      // Note: resetCallback removed to avoid newTyped error
    });
  } catch (error) {
    console.error('Failed to initialize typed.js:', error);
  }
};

export const destroyTypedInstance = () => {
  if (typeof window === 'undefined' || !window.$) {
    return;
  }

  const $typed = window.$(".typed");
  if ($typed.length > 0 && currentTypedInstance) {
    try {
      $typed.typed('destroy');
    } catch (error) {
      console.warn('Failed to destroy typed instance:', error);
    }
    currentTypedInstance = null;
  }
}; 