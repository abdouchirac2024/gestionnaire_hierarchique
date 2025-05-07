// js/config.js
var Config = {
    // IDs des Modales
    MODAL_ETABLISSEMENT_ID: '#modalEtablissement',
    MODAL_CLASSE_ID: '#modalClasse',
    MODAL_ELEVE_ID: '#modalEleve',
    MODAL_CONFIRM_DELETE_ID: '#modalConfirmationDelete',

    // IDs des Forms
    FORM_ETABLISSEMENT_ID: '#formEtablissement',
    FORM_CLASSE_ID: '#formClasse',
    FORM_ELEVE_ID: '#formEleve',

    // IDs des Labels de Modales
    MODAL_ETABLISSEMENT_LABEL_ID: '#modalEtablissementLabel',
    MODAL_CLASSE_LABEL_ID: '#modalClasseLabel',
    MODAL_ELEVE_LABEL_ID: '#modalEleveLabel',
    MODAL_CONFIRM_DELETE_LABEL_ID: '#modalConfirmationDeleteLabel',

    // IDs des Boutons de Sauvegarde
    BTN_SAVE_ETABLISSEMENT_ID: '#btnSaveEtablissement',
    BTN_SAVE_CLASSE_ID: '#btnSaveClasse',
    BTN_SAVE_ELEVE_ID: '#btnSaveEleve',
    BTN_CONFIRM_DELETE_ID: '#btnConfirmDelete',

    // IDs des Boutons d'Ouverture de Modale (Ajout)
    BTN_OPEN_MODAL_AJOUTER_ETABLISSEMENT_ID: '#btnOpenModalAjouterEtablissement',
    BTN_OPEN_MODAL_AJOUTER_CLASSE_ID: '#btnOpenModalAjouterClasse',
    BTN_OPEN_MODAL_AJOUTER_ELEVE_ID: '#btnOpenModalAjouterEleve',

    // IDs des Tableaux (corps)
    TABLE_ETABLISSEMENTS_BODY_ID: '#tableEtablissementsBody',
    TABLE_CLASSES_BODY_ID: '#tableClassesBody',
    TABLE_ELEVES_BODY_ID: '#tableElevesBody',

    // Champs de formulaire Établissement
    ETABLISSEMENT_ID_FIELD: '#etablissementId',
    ETABLISSEMENT_NOM_FIELD: '#etablissementNom',
    ETABLISSEMENT_QUARTIER_FIELD: '#etablissementQuartier',
    ETABLISSEMENT_DATE_CREATION_FIELD: '#etablissementDateCreation',

    // Champs de formulaire Classe
    CLASSE_ID_FIELD: '#classeId',
    CLASSE_NOM_FIELD: '#classeNom',
    CLASSE_FILIERE_FIELD: '#classeFiliere',
    CLASSE_PROFESSEUR_FIELD: '#classeProfesseur',

    // Champs de formulaire Élève
    ELEVE_ID_FIELD: '#eleveId',
    ELEVE_NOM_FIELD: '#eleveNom',
    ELEVE_PRENOM_FIELD: '#elevePrenom',
    ELEVE_DATE_NAISSANCE_FIELD: '#eleveDateNaissance',
    ELEVE_SEXE_FIELD: '#eleveSexe',

    // Modal de confirmation
    CONFIRMATION_MESSAGE_ID: '#confirmationMessage',
    CONFIRMATION_ITEM_NAME_ID: '#confirmationItemName',

    MESSAGES: {
        FIELD_REQUIRED: 'Ce champ est obligatoire.',
        ADD_ETABLISSEMENT_TITLE: 'Ajouter un établissement',
        EDIT_ETABLISSEMENT_TITLE: 'Modifier un établissement',
        ADD_CLASSE_TITLE: 'Ajouter une classe',
        EDIT_CLASSE_TITLE: 'Modifier une classe',
        ADD_ELEVE_TITLE: 'Ajouter un élève',
        EDIT_ELEVE_TITLE: 'Modifier un élève',
        SAVE_BUTTON_TEXT: 'Enregistrer',
        MODIFY_BUTTON_TEXT: 'Modifier',
        ERROR_ETAB_REQUIRED_FOR_CLASSE: "Veuillez d'abord enregistrer l'établissement avant d'ajouter une classe.",
        ERROR_CLASSE_REQUIRED_FOR_ELEVE: "Veuillez d'abord enregistrer la classe avant d'ajouter un élève.",
        ERROR_ETAB_NOT_FOUND: "Erreur: Établissement parent non trouvé.",
        ERROR_CLASSE_NOT_FOUND: "Erreur: Classe parente non trouvée.",
        CONFIRM_DELETE_ETAB_MSG: "Êtes-vous sûr de vouloir supprimer l'établissement suivant, ainsi que toutes ses classes et élèves associés ?",
        CONFIRM_DELETE_CLASSE_MSG: "Êtes-vous sûr de vouloir supprimer la classe suivante, ainsi que tous ses élèves associés ?",
        CONFIRM_DELETE_ELEVE_MSG: "Êtes-vous sûr de vouloir supprimer l'élève suivant ?"
    }
};