var ModalEtablissement = (function($, Config, UIUtils, DataStore, RenderUtils, ModalClasse, ModalConfirm) {
    let currentEtablissementId = null;

    function init() {
        $(Config.BTN_SAVE_ETABLISSEMENT_ID).on('click', saveEtablissement);
        $(Config.BTN_OPEN_MODAL_AJOUTER_CLASSE_ID).on('click', handleOpenAjouterClasse);
         $(Config.MODAL_ETABLISSEMENT_ID).on('hidden.bs.modal', resetContext);

        $(Config.TABLE_CLASSES_BODY_ID).on('click', '.btn-modifier-classe', function() {
            const classeId = $(this).data('id');
            if (currentEtablissementId && classeId) {
                ModalClasse.openForEdit(currentEtablissementId, classeId);
            }
        });
        $(Config.TABLE_CLASSES_BODY_ID).on('click', '.btn-supprimer-classe', function() {
            const classeId = $(this).data('id');
            const classeName = $(this).data('name');
            if (currentEtablissementId && classeId) {
                ModalClasse.handleDelete(currentEtablissementId, classeId, classeName);
            }
        });
    }

    function openForAdd() {
        resetContext();
        UIUtils.resetForm(Config.FORM_ETABLISSEMENT_ID);
        $(Config.MODAL_ETABLISSEMENT_LABEL_ID).text(Config.MESSAGES.ADD_ETABLISSEMENT_TITLE);
        $(Config.BTN_SAVE_ETABLISSEMENT_ID).text(Config.MESSAGES.SAVE_BUTTON_TEXT).data('mode', 'add');
        RenderUtils.renderClassesTable(null);
        $(Config.MODAL_ETABLISSEMENT_ID).modal('show');
    }

    function openForEdit(etablissementId) {
        resetContext();
        const etab = DataStore.findEtablissementById(etablissementId);
        if (etab) {
            currentEtablissementId = etab.id;
            UIUtils.resetForm(Config.FORM_ETABLISSEMENT_ID);
            $(Config.MODAL_ETABLISSEMENT_LABEL_ID).text(Config.MESSAGES.EDIT_ETABLISSEMENT_TITLE);
            $(Config.BTN_SAVE_ETABLISSEMENT_ID).text(Config.MESSAGES.MODIFY_BUTTON_TEXT).data('mode', 'edit');

            $(Config.ETABLISSEMENT_ID_FIELD).val(etab.id);
            $(Config.ETABLISSEMENT_NOM_FIELD).val(etab.nom);
            $(Config.ETABLISSEMENT_QUARTIER_FIELD).val(etab.quartier);
            $(Config.ETABLISSEMENT_DATE_CREATION_FIELD).val(UIUtils.formatDateForInput(etab.dateCreation));
            
            RenderUtils.renderClassesTable(etab);
            $(Config.MODAL_ETABLISSEMENT_ID).modal('show');
        } else {
            console.error("Établissement non trouvé pour modification:", etablissementId);
            alert("Établissement non trouvé.");
        }
    }

    function saveEtablissement() {
        const fieldsToValidate = [
            { selector: Config.ETABLISSEMENT_NOM_FIELD, message: 'Le nom de l\'établissement est obligatoire.' },
            { selector: Config.ETABLISSEMENT_QUARTIER_FIELD, message: 'Le quartier est obligatoire.' },
            { selector: Config.ETABLISSEMENT_DATE_CREATION_FIELD, message: 'La date de création est obligatoire.' }
        ];
        if (!UIUtils.validateForm(Config.FORM_ETABLISSEMENT_ID, fieldsToValidate)) {
            return;
        }

        const etabData = {
            nom: $(Config.ETABLISSEMENT_NOM_FIELD).val(),
            quartier: $(Config.ETABLISSEMENT_QUARTIER_FIELD).val(),
            dateCreation: $(Config.ETABLISSEMENT_DATE_CREATION_FIELD).val()
        };

        const mode = $(Config.BTN_SAVE_ETABLISSEMENT_ID).data('mode');
        let savedEtab;
        let successMessage = '';

        if (mode === 'add') {
            savedEtab = DataStore.addEtablissement(etabData);
            if (savedEtab) {
                currentEtablissementId = savedEtab.id;
                $(Config.ETABLISSEMENT_ID_FIELD).val(savedEtab.id);
                $(Config.BTN_SAVE_ETABLISSEMENT_ID).text(Config.MESSAGES.MODIFY_BUTTON_TEXT).data('mode', 'edit');
                $(Config.MODAL_ETABLISSEMENT_LABEL_ID).text(Config.MESSAGES.EDIT_ETABLISSEMENT_TITLE);
                RenderUtils.renderClassesTable(savedEtab);
                successMessage = "Établissement ajouté avec succès.";
            }
        } else {
            const etabId = parseInt($(Config.ETABLISSEMENT_ID_FIELD).val());
            savedEtab = DataStore.updateEtablissement(etabId, etabData);
             if (savedEtab) { 
                RenderUtils.renderClassesTable(savedEtab);
                successMessage = "Établissement modifié avec succès.";
            }
        }
        
        if (savedEtab) {
            RenderUtils.renderEtablissementsTable(DataStore.getEtablissements());
            // Afficher la notification après la mise à jour de la table principale
            // Utiliser un léger délai
             setTimeout(() => UIUtils.showNotification(successMessage, 'success'), 100);
        } else {
            UIUtils.showNotification("Erreur lors de l'enregistrement de l'établissement.", 'danger');
        }
    }

    function handleOpenAjouterClasse() {
        if (!currentEtablissementId) {
            saveEtablissement();
            if (!currentEtablissementId) {
                alert(Config.MESSAGES.ERROR_ETAB_REQUIRED_FOR_CLASSE);
                return;
            }
        }
        ModalClasse.openForAdd(currentEtablissementId);
    }
    
    function handleDelete(etablissementId, etabName) { // Appelé par app.js pour la table principale
        ModalConfirm.open(
            Config.MESSAGES.CONFIRM_DELETE_ETAB_MSG,
            etabName,
            function() { // Callback après confirmation
                DataStore.deleteEtablissement(etablissementId);
                RenderUtils.renderEtablissementsTable(DataStore.getEtablissements());
                UIUtils.showNotification("Établissement supprimé avec succès.", 'success'); // Notification après suppression
            }
        );
    }

    function resetContext() {
        currentEtablissementId = null;
        if (typeof ModalClasse !== 'undefined') ModalClasse.resetContext();
    }

    function refreshClassesTableIfVisible() {
        if ($(Config.MODAL_ETABLISSEMENT_ID).hasClass('show') && currentEtablissementId) {
            const etab = DataStore.findEtablissementById(currentEtablissementId);
            RenderUtils.renderClassesTable(etab);
        }
    }

    return {
        init,
        openForAdd,
        openForEdit,
        handleDelete,
        resetContext,
        refreshClassesTableIfVisible
    };
})(jQuery, Config, UIUtils, DataStore, RenderUtils, ModalClasse, ModalConfirm);