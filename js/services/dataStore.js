var DataStore = (function() {
    let etablissements = [];
    let nextEtablissementId = 1;
    let nextClasseId = 1;
    let nextEleveId = 1;

    function generateId(type) {
        if (type === 'etablissement') return nextEtablissementId++;
        if (type === 'classe') return nextClasseId++;
        if (type === 'eleve') return nextEleveId++;
        return Date.now() + Math.floor(Math.random() * 1000);
    }

    function getEtablissements() {
        return etablissements;
    }

    function addEtablissement(data) {
        const newEtab = { 
            id: generateId('etablissement'), 
            nom: data.nom,
            quartier: data.quartier,
            dateCreation: data.dateCreation,
            classes: [] 
        };
        etablissements.push(newEtab);
        return newEtab;
    }

    function updateEtablissement(id, data) {
        const etab = findEtablissementById(id);
        if (etab) {
            etab.nom = data.nom || etab.nom;
            etab.quartier = data.quartier || etab.quartier;
            etab.dateCreation = data.dateCreation || etab.dateCreation;
            return etab;
        }
        return null;
    }

    function deleteEtablissement(id) {
        etablissements = etablissements.filter(etab => etab.id !== parseInt(id));
    }

    function findEtablissementById(id) {
        return etablissements.find(etab => etab.id === parseInt(id));
    }

    function addClasseToEtablissement(etablissementId, data) {
        const etab = findEtablissementById(etablissementId);
        if (etab) {
            const newClasse = { 
                id: generateId('classe'),
                nom: data.nom,
                filiere: data.filiere,
                professeurTitulaire: data.professeurTitulaire,
                eleves: [] 
            };
            if (!etab.classes) etab.classes = [];
            etab.classes.push(newClasse);
            return newClasse;
        }
        return null;
    }
    
    function findClasseInEtablissementById(etablissementId, classeId) {
        const etab = findEtablissementById(etablissementId);
        return etab && etab.classes ? etab.classes.find(cl => cl.id === parseInt(classeId)) : null;
    }

    function updateClasseInEtablissement(etablissementId, classeId, data) {
        const classe = findClasseInEtablissementById(etablissementId, classeId);
        if (classe) {
            classe.nom = data.nom || classe.nom;
            classe.filiere = data.filiere || classe.filiere;
            classe.professeurTitulaire = data.professeurTitulaire || classe.professeurTitulaire;
            return classe;
        }
        return null;
    }

    function deleteClasseFromEtablissement(etablissementId, classeId) {
        const etab = findEtablissementById(etablissementId);
        if (etab && etab.classes) {
            etab.classes = etab.classes.filter(cl => cl.id !== parseInt(classeId));
        }
    }

    function addEleveToClasse(etablissementId, classeId, data) {
        const classe = findClasseInEtablissementById(etablissementId, classeId);
        if (classe) {
            const newEleve = { 
                id: generateId('eleve'),
                nom: data.nom,
                prenom: data.prenom,
                dateNaissance: data.dateNaissance,
                sexe: data.sexe
            };
            if (!classe.eleves) classe.eleves = [];
            classe.eleves.push(newEleve);
            return newEleve;
        }
        return null;
    }

    function findEleveInClasseById(etablissementId, classeId, eleveId) {
        const classe = findClasseInEtablissementById(etablissementId, classeId);
        return classe && classe.eleves ? classe.eleves.find(el => el.id === parseInt(eleveId)) : null;
    }
    
    function updateEleveInClasse(etablissementId, classeId, eleveId, data) {
        const eleve = findEleveInClasseById(etablissementId, classeId, eleveId);
        if (eleve) {
            eleve.nom = data.nom || eleve.nom;
            eleve.prenom = data.prenom || eleve.prenom;
            eleve.dateNaissance = data.dateNaissance || eleve.dateNaissance;
            eleve.sexe = data.sexe || eleve.sexe;
            return eleve;
        }
        return null;
    }

    function deleteEleveFromClasse(etablissementId, classeId, eleveId) {
        const classe = findClasseInEtablissementById(etablissementId, classeId);
        if (classe && classe.eleves) {
            classe.eleves = classe.eleves.filter(el => el.id !== parseInt(eleveId));
        }
    }

    return {
        getEtablissements,
        addEtablissement,
        updateEtablissement,
        deleteEtablissement,
        findEtablissementById,
        addClasseToEtablissement,
        findClasseInEtablissementById,
        updateClasseInEtablissement,
        deleteClasseFromEtablissement,
        addEleveToClasse,
        findEleveInClasseById,
        updateEleveInClasse,
        deleteEleveFromClasse
    };
})();