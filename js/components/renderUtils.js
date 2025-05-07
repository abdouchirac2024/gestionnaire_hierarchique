var RenderUtils = (function($, UIUtils, Config) {

    function renderEtablissementsTable(etablissements) {
        const tbody = $(Config.TABLE_ETABLISSEMENTS_BODY_ID);
        tbody.empty();
        if (!etablissements || etablissements.length === 0) {
            tbody.append('<tr><td colspan="4" class="text-center">Liste vide</td></tr>');
        } else {
            etablissements.forEach(etab => {
                tbody.append(`
                    <tr data-id="${etab.id}">
                        <td>${etab.nom || ''}</td>
                        <td>${etab.quartier || ''}</td>
                        <td>${UIUtils.formatDateForDisplay(etab.dateCreation)}</td>
                        <td>
                            <button class="btn btn-sm btn-info btn-modifier-etablissement" data-id="${etab.id}">Modifier</button>
                            <button class="btn btn-sm btn-danger btn-supprimer-etablissement" data-id="${etab.id}" data-name="${etab.nom || 'cet établissement'}">Supprimer</button>
                        </td>
                    </tr>
                `);
            });
        }
    }

    function renderClassesTable(etablissement) {
        const tbody = $(Config.TABLE_CLASSES_BODY_ID);
        tbody.empty();
        if (!etablissement || !etablissement.classes || etablissement.classes.length === 0) {
            tbody.append('<tr><td colspan="4" class="text-center">Liste vide</td></tr>');
        } else {
            etablissement.classes.forEach(cl => {
                tbody.append(`
                    <tr data-id="${cl.id}">
                        <td>${cl.nom || ''}</td>
                        <td>${cl.filiere || ''}</td>
                        <td>${cl.professeurTitulaire || ''}</td>
                        <td>
                            <button class="btn btn-sm btn-info btn-modifier-classe" data-id="${cl.id}">Modifier</button>
                            <button class="btn btn-sm btn-danger btn-supprimer-classe" data-id="${cl.id}" data-name="${cl.nom || 'cette classe'}">Supprimer</button>
                        </td>
                    </tr>
                `);
            });
        }
    }

    function renderElevesTable(classe) {
        const tbody = $(Config.TABLE_ELEVES_BODY_ID);
        tbody.empty();
        if (!classe || !classe.eleves || classe.eleves.length === 0) {
            tbody.append('<tr><td colspan="5" class="text-center">Liste vide</td></tr>');
        } else {
            classe.eleves.forEach(el => {
                tbody.append(`
                    <tr data-id="${el.id}">
                        <td>${el.nom || ''}</td>
                        <td>${el.prenom || ''}</td>
                        <td>${UIUtils.formatDateForDisplay(el.dateNaissance)}</td>
                        <td>${el.sexe || ''}</td>
                        <td>
                            <button class="btn btn-sm btn-info btn-modifier-eleve" data-id="${el.id}">Modifier</button>
                            <button class="btn btn-sm btn-danger btn-supprimer-eleve" data-id="${el.id}" data-name="${(el.nom || '') + ' ' + (el.prenom || 'cet élève')}">Supprimer</button>
                        </td>
                    </tr>
                `);
            });
        }
    }

    return {
        renderEtablissementsTable,
        renderClassesTable,
        renderElevesTable
    };
})(jQuery, UIUtils, Config);