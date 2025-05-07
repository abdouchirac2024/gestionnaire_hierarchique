// js/app.js
// Application de Gestion Hiérarchique
// Développé par : njutapmvoui abdou arahamanou chirac | Portfolio : https://chirac-portfolio-abdouchirac2024s-projects.vercel.app/

$(document).ready(function() {
    ModalEtablissement.init();
    ModalClasse.init();
    ModalEleve.init();
    // ModalConfirm est appelé directement, pas besoin d'init() ici s'il n'attache pas d'événements globaux.

    $(Config.BTN_OPEN_MODAL_AJOUTER_ETABLISSEMENT_ID).on('click', function() {
        ModalEtablissement.openForAdd();
    });

    $(Config.TABLE_ETABLISSEMENTS_BODY_ID).on('click', '.btn-modifier-etablissement', function() {
        const id = $(this).data('id');
        ModalEtablissement.openForEdit(id);
    });

    $(Config.TABLE_ETABLISSEMENTS_BODY_ID).on('click', '.btn-supprimer-etablissement', function() {
        const id = $(this).data('id');
        const name = $(this).data('name');
        ModalEtablissement.handleDelete(id, name);
    });

    RenderUtils.renderEtablissementsTable(DataStore.getEtablissements());
});