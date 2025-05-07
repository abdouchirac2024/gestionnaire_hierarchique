// js/utils/uiUtils.js
var UIUtils = (function($) {
    function showError(inputElement, message) {
        inputElement.addClass('is-invalid');
        inputElement.siblings('.error-message').text(message || Config.MESSAGES.FIELD_REQUIRED);
    }

    function clearError(inputElement) {
        inputElement.removeClass('is-invalid');
        inputElement.siblings('.error-message').text('');
    }

    function validateForm(formSelector, fieldsConfig) {
        let isValid = true;
        $(formSelector + ' .form-control').each(function() {
            clearError($(this));
        });

        fieldsConfig.forEach(config => {
            const inputElement = $(config.selector);
            if (inputElement.prop('required') && (!inputElement.val() || (typeof inputElement.val() === 'string' && !inputElement.val().trim()))) {
                showError(inputElement, config.message || Config.MESSAGES.FIELD_REQUIRED);
                isValid = false;
            }
        });
        return isValid;
    }

    function resetForm(formId) {
        const form = $(formId);
        if (form.length) {
            form[0].reset();
            form.find('.form-control').each(function() {
                clearError($(this));
            });
            form.find('input[type="hidden"]').val('');
        }
    }

    function formatDateForDisplay(dateString) {
        if (!dateString) return '';
        const parts = dateString.split('-');
        if (parts.length === 3) {
            return `${parts[2]}/${parts[1]}/${parts[0]}`;
        }
        return dateString;
    }

    function formatDateForInput(dateString) {
        if (!dateString) return '';
        if (dateString.includes('/')) {
            const parts = dateString.split('/');
            if (parts.length === 3) {
                const day = parts[0].padStart(2, '0');
                const month = parts[1].padStart(2, '0');
                const year = parts[2];
                return `${year}-${month}-${day}`;
            }
        }
        return dateString;
    }

    /**
     * Affiche une notification de type "Toast" Bootstrap.
     * @param {string} message Le message principal.
     * @param {string} type Type de notification ('success', 'danger', 'info', 'warning'). Défaut 'success'.
     * @param {number} delay Durée d'affichage en ms si autohide est true. Défaut 5000ms.
     * @param {boolean} autohide Cacher automatiquement le toast. Défaut true.
     */
    function showNotification(message, type = 'success', delay = 5000, autohide = true) {
        const toastContainer = $('#toastContainer');
        if (!toastContainer.length) {
            console.error("Conteneur de toasts #toastContainer introuvable.");
            return;
        }

        let title = '';
        let headerClass = '';
        switch(type) {
            case 'success': 
                title = 'Succès'; 
                headerClass = 'success'; 
                break;
            case 'danger': 
                title = 'Erreur'; 
                headerClass = 'danger'; 
                break;
            case 'warning': 
                title = 'Attention'; 
                headerClass = 'warning'; 
                break;
            case 'info': 
            default:
                title = 'Information'; 
                headerClass = 'info'; 
                type = 'info'; 
                break; 
        }

        const toastId = 'toast-' + Date.now(); 

        const toastHtml = `
            <div id="${toastId}" class="toast ${type}" role="alert" aria-live="assertive" aria-atomic="true" data-delay="${delay}" data-autohide="${autohide}">
                <div class="toast-header ${headerClass}">
                    <strong class="mr-auto">${title}</strong>
                    <small>${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</small>
                    <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="toast-body">
                    ${message}
                </div>
            </div>`;

        const $toast = $(toastHtml);
        toastContainer.append($toast);

        $toast.toast({ delay: delay, autohide: autohide });
        $toast.toast('show');

        $toast.on('hidden.bs.toast', function () {
            $(this).remove();
        });
    }

    return {
        showError,
        clearError,
        validateForm,
        resetForm,
        formatDateForDisplay,
        formatDateForInput,
        showNotification 
    };
})(jQuery);