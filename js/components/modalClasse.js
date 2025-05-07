var ModalClasse = (function($, Config, UIUtils, DataStore, RenderUtils, ModalEleve, ModalConfirm) {
    let currentClasseEtablissementId = null;
    let currentClasseId = null;

    function init() {
        $(Config.BTN_SAVE_CLASSE_ID).on('click', saveClasse);
        $(Config.BTN_OPEN_MODAL_AJOUTER_ELEVE_ID).on('click', handleOpenAjouterEleve);
        $(Config.MODAL_CLASSE_ID).on('hidden.bs.modal', function() {
            resetContext();
            if ($(Config.MODAL_ETABLISSEMENT_ID).hasClass('show')) {
                $('body').addClass('modal-open');
            }
        });
        
        $(Config.TABLE_ELEVES_BODY_ID).on('click', '.btn-modifier-eleve', function() {
            const eleveId = $(this).data('id');
            if (currentClasseEtablissementId && currentClasseId && eleveId) {
                ModalEleve.openForEdit(currentClasseEtablissementId, currentClasseId, eleveId);
            }
        });
        $(Config.TABLE_ELEVES_BODY_ID).on('click', '.btn-supprimer-eleve', function() {
            const eleveId = $(this).data('id');
            const eleveName = $(this).data('name');
            if (currentClasseEtablissementId && currentClasseId && eleveId) {
                ModalEleve.handleDelete(currentClasseEtablissementId, currentClasseId, eleveId, eleveName);
            }
        });
    }

    function openForAdd(etablissementId) {
        resetContext();
        currentClasseEtablissementId = etablissementId;
        UIUtils.resetForm(Config.FORM_CLASSE_ID);
        $(Config.MODAL_CLASSE_LABEL_ID).text(Config.MESSAGES.ADD_CLASSE_TITLE);
        $(Config.BTN_SAVE_CLASSE_ID).text(Config.MESSAGES.SAVE_BUTTON_TEXT).data('mode', 'add');
        RenderUtils.renderElevesTable(null);
        $(Config.MODAL_CLASSE_ID).modal('show');
    }

    function openForEdit(etablissementId, classeId) {
        resetContext();
        const classe = DataStore.findClasseInEtablissementById(etablissementId, classeId);
        if (classe) {
            currentClasseEtablissementId = etablissementId;
            currentClasseId = classe.id;
            UIUtils.resetForm(Config.FORM_CLASSE_ID);
            $(Config.MODAL_CLASSE_LABEL_ID).text(Config.MESSAGES.EDIT_CLASSE_TITLE);
            $(Config.BTN_SAVE_CLASSE_ID).text(Config.MESSAGES.MODIFY_BUTTON_TEXT).data('mode', 'edit');

            $(Config.CLASSE_ID_FIELD).val(classe.id);
            $(Config.CLASSE_NOM_FIELD).val(classe.nom);
            $(Config.CLASSE_FILIERE_FIELD).val(classe.filiere);
            $(Config.CLASSE_PROFESSEUR_FIELD).val(classe.professeurTitulaire);
            
            RenderUtils.renderElevesTable(classe);
            $(Config.MODAL_CLASSE_ID).modal('show');
        } else {
            console.error("Classe non trouvée pour modification:", {etablissementId, classeId});
            alert("Classe non trouvée.");
        }
    }
    
    function saveClasse() {
        if (!currentClasseEtablissementId) {
            alert(Config.MESSAGES.ERROR_ETAB_NOT_FOUND);
            return;
        }

        const fieldsToValidate = [
            { selector: Config.CLASSE_NOM_FIELD, message: 'Le nom de la classe est obligatoire.' },
            { selector: Config.CLASSE_FILIERE_FIELD, message: 'La filière est obligatoire.' },
            { selector: Config.CLASSE_PROFESSEUR_FIELD, message: 'Le professeur titulaire est obligatoire.' }
        ];
        if (!UIUtils.validateForm(Config.FORM_CLASSE_ID, fieldsToValidate)) {
            return;
        }

        const classeData = {
            nom: $(Config.CLASSE_NOM_FIELD).val(),
            filiere: $(Config.CLASSE_FILIERE_FIELD).val(),
            professeurTitulaire: $(Config.CLASSE_PROFESSEUR_FIELD).val()
        };

        const mode = $(Config.BTN_SAVE_CLASSE_ID).data('mode');
        let savedClasse;
        let successMessage = '';

        if (mode === 'add') {
            savedClasse = DataStore.addClasseToEtablissement(currentClasseEtablissementId, classeData);
            if (savedClasse) {
                currentClasseId = savedClasse.id;
                $(Config.CLASSE_ID_FIELD).val(savedClasse.id);
                $(Config.BTN_SAVE_CLASSE_ID).text(Config.MESSAGES.MODIFY_BUTTON_TEXT).data('mode', 'edit');
                $(Config.MODAL_CLASSE_LABEL_ID).text(Config.MESSAGES.EDIT_CLASSE_TITLE);
                RenderUtils.renderElevesTable(savedClasse);
                successMessage = "Classe ajoutée avec succès.";
            }
        } else {
            const classeId = parseInt($(Config.CLASSE_ID_FIELD).val());
            savedClasse = DataStore.updateClasseInEtablissement(currentClasseEtablissementId, classeId, classeData);
             if (savedClasse) { 
                RenderUtils.renderElevesTable(savedClasse);
                successMessage = "Classe modifiée avec succès.";
            }
        }

        if (savedClasse) {
            if (typeof ModalEtablissement !== 'undefined' && ModalEtablissement.refreshClassesTableIfVisible) {
                ModalEtablissement.refreshClassesTableIfVisible();
            }
            // Afficher la notification après la mise à jour de la table parente
            // Utiliser un léger délai pour s'assurer que l'utilisateur la voit bien avant une potentielle fermeture manuelle
             setTimeout(() => UIUtils.showNotification(successMessage, 'success'), 100); 
        } else {
            UIUtils.showNotification("Erreur lors de l'enregistrement de la classe.", 'danger');
        }
    }

    function handleOpenAjouterEleve() {
        if (!currentClasseEtablissementId) {
            alert(Config.MESSAGES.ERROR_ETAB_NOT_FOUND);
            return;
        }
        if (!currentClasseId) {
            saveClasse();
            if (!currentClasseId) {
                alert(Config.MESSAGES.ERROR_CLASSE_REQUIRED_FOR_ELEVE);
                return;
            }
        }
        ModalEleve.openForAdd(currentClasseEtablissementId, currentClasseId);
    }
    
    function handleDelete(etablissementId, classeId, classeName) {
        ModalConfirm.open(
            Config.MESSAGES.CONFIRM_DELETE_CLASSE_MSG,
            classeName,
            function() { // Callback après confirmation
                DataStore.deleteClasseFromEtablissement(etablissementId, classeId);
                if (typeof ModalEtablissement !== 'undefined' && ModalEtablissement.refreshClassesTableIfVisible) {
                    ModalEtablissement.refreshClassesTableIfVisible();
                }
                UIUtils.showNotification("Classe supprimée avec succès.", 'success'); // Notification après suppression
            }
        );
    }

    function resetContext() {
        currentClasseEtablissementId = null;
        currentClasseId = null;
        if (typeof ModalEleve !== 'undefined') ModalEleve.resetContext();
    }

    function refreshElevesTableIfVisible() {
        if ($(Config.MODAL_CLASSE_ID).hasClass('show') && currentClasseEtablissementId && currentClasseId) {
            const classe = DataStore.findClasseInEtablissementById(currentClasseEtablissementId, currentClasseId);
            RenderUtils.renderElevesTable(classe);
        }
    }

    return {
        init,
        openForAdd,
        openForEdit,
        handleDelete,
        resetContext,
        refreshElevesTableIfVisible
    };
})(jQuery, Config, UIUtils, DataStore, RenderUtils, ModalEleve, ModalConfirm);