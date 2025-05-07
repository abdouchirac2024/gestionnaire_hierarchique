var ModalConfirm = (function($, Config) {

    function open(message, itemName, callbackOnConfirm) {
        $(Config.CONFIRMATION_MESSAGE_ID).text(message);
        $(Config.CONFIRMATION_ITEM_NAME_ID).text(itemName ? `"${itemName}"` : "");
        $(Config.BTN_CONFIRM_DELETE_ID).off('click').on('click', function() {
            if (typeof callbackOnConfirm === 'function') {
                callbackOnConfirm();
            }
            $(Config.MODAL_CONFIRM_DELETE_ID).modal('hide');
        });
        $(Config.MODAL_CONFIRM_DELETE_ID).modal('show');
    }

    return {
        open: open
    };
})(jQuery, Config);