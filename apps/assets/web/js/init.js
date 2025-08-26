// Initialize script after all dependencies are loaded
(function() {
    function initScript() {
        // Check if jQuery is loaded
        if (typeof jQuery === 'undefined') {
            console.warn('jQuery not loaded, retrying in 100ms...');
            setTimeout(initScript, 100);
            return;
        }

        // Check if lightcase plugin is loaded
        if (typeof jQuery.fn.lightcase === 'undefined') {
            console.warn('Lightcase plugin not loaded, retrying in 100ms...');
            setTimeout(initScript, 100);
            return;
        }

        // All dependencies are loaded, safe to proceed
        console.log('All dependencies loaded, initializing script...');
        
        // Load the main script
        var script = document.createElement('script');
        script.src = '/assets/web/js/script.js';
        script.onload = function() {
            console.log('Script loaded successfully');
        };
        script.onerror = function() {
            console.error('Failed to load script.js');
        };
        document.head.appendChild(script);
    }

    // Start initialization when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initScript);
    } else {
        initScript();
    }
})(); 