var ModalEleve = (function($, Config, UIUtils, DataStore, ModalConfirm) {
    let currentEleveEtablissementId = null;
    let currentEleveClasseId = null;

    function init() {
        $(Config.BTN_SAVE_ELEVE_ID).on('click', saveEleve);
        $(Config.MODAL_ELEVE_ID).on('hidden.bs.modal', resetContext);
    }

    function openForAdd(etablissementId, classeId) {
        resetContext();
        currentEleveEtablissementId = etablissementId;
        currentEleveClasseId = classeId;
        UIUtils.resetForm(Config.FORM_ELEVE_ID);
        $(Config.MODAL_ELEVE_LABEL_ID).text(Config.MESSAGES.ADD_ELEVE_TITLE);
        $(Config.BTN_SAVE_ELEVE_ID).text(Config.MESSAGES.SAVE_BUTTON_TEXT).data('mode', 'add');
        $(Config.MODAL_ELEVE_ID).modal('show');
    }

    function openForEdit(etablissementId, classeId, eleveId) {
        resetContext();
        const eleve = DataStore.findEleveInClasseById(etablissementId, classeId, eleveId);
        if (eleve) {
            currentEleveEtablissementId = etablissementId;
            currentEleveClasseId = classeId;
            UIUtils.resetForm(Config.FORM_ELEVE_ID);
            $(Config.MODAL_ELEVE_LABEL_ID).text(Config.MESSAGES.EDIT_ELEVE_TITLE);
            $(Config.BTN_SAVE_ELEVE_ID).text(Config.MESSAGES.MODIFY_BUTTON_TEXT).data('mode', 'edit');

            $(Config.ELEVE_ID_FIELD).val(eleve.id);
            $(Config.ELEVE_NOM_FIELD).val(eleve.nom);
            $(Config.ELEVE_PRENOM_FIELD).val(eleve.prenom);
            $(Config.ELEVE_DATE_NAISSANCE_FIELD).val(UIUtils.formatDateForInput(eleve.dateNaissance));
            $(Config.ELEVE_SEXE_FIELD).val(eleve.sexe);
            
            $(Config.MODAL_ELEVE_ID).modal('show');
        } else {
            console.error("Élève non trouvé pour modification:", {etablissementId, classeId, eleveId});
            alert("Élève non trouvé.");
        }
    }

    function saveEleve() {
        if (!currentEleveEtablissementId || !currentEleveClasseId) {
            alert(Config.MESSAGES.ERROR_CLASSE_NOT_FOUND);
            return;
        }

        const fieldsToValidate = [
            { selector: Config.ELEVE_NOM_FIELD, message: 'Le nom est obligatoire.' },
            { selector: Config.ELEVE_PRENOM_FIELD, message: 'Le prénom est obligatoire.' },
            { selector: Config.ELEVE_DATE_NAISSANCE_FIELD, message: 'La date de naissance est obligatoire.' },
            { selector: Config.ELEVE_SEXE_FIELD, message: 'Le sexe est obligatoire.' }
        ];
        if (!UIUtils.validateForm(Config.FORM_ELEVE_ID, fieldsToValidate)) {
            return;
        }

        const eleveData = {
            nom: $(Config.ELEVE_NOM_FIELD).val(),
            prenom: $(Config.ELEVE_PRENOM_FIELD).val(),
            dateNaissance: $(Config.ELEVE_DATE_NAISSANCE_FIELD).val(),
            sexe: $(Config.ELEVE_SEXE_FIELD).val()
        };

        const mode = $(Config.BTN_SAVE_ELEVE_ID).data('mode');
        let savedEleve;
        let successMessage = '';

        if (mode === 'add') {
            savedEleve = DataStore.addEleveToClasse(currentEleveEtablissementId, currentEleveClasseId, eleveData);
            successMessage = "Élève ajouté avec succès.";
        } else { 
            const eleveId = parseInt($(Config.ELEVE_ID_FIELD).val());
            savedEleve = DataStore.updateEleveInClasse(currentEleveEtablissementId, currentEleveClasseId, eleveId, eleveData);
            successMessage = "Élève modifié avec succès.";
        }

        if (savedEleve) {
            if (typeof ModalClasse !== 'undefined' && ModalClasse.refreshElevesTableIfVisible) {
                 ModalClasse.refreshElevesTableIfVisible();
            }
            $(Config.MODAL_ELEVE_ID).modal('hide');
            UIUtils.showNotification(successMessage, 'success'); // Notification après fermeture
        } else {
            UIUtils.showNotification("Erreur lors de l'enregistrement de l'élève.", 'danger');
        }
    }
    
    function handleDelete(etablissementId, classeId, eleveId, eleveName) {
        ModalConfirm.open(
            Config.MESSAGES.CONFIRM_DELETE_ELEVE_MSG,
            eleveName,
            function() { // Callback après confirmation
                DataStore.deleteEleveFromClasse(etablissementId, classeId, eleveId);
                if (typeof ModalClasse !== 'undefined' && ModalClasse.refreshElevesTableIfVisible) {
                    ModalClasse.refreshElevesTableIfVisible();
                }
                UIUtils.showNotification("Élève supprimé avec succès.", 'success'); // Notification après suppression
            }
        );
    }

    function resetContext() {
        currentEleveEtablissementId = null;
        currentEleveClasseId = null;
    }
    
    return {
        init,
        openForAdd,
        openForEdit,
        handleDelete,
        resetContext
    };
})(jQuery, Config, UIUtils, DataStore, ModalConfirm);