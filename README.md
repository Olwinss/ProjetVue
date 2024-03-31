# Dossier contenant le projet View js utilisant l'api de potterdb. 

## Université Clermont Auvergne - Campus Le Puy-en-Velay
 
BUT Informatique - 2ème Année
 
Ressource R4.A.10 - Développement Web

Pour lancer ce projet, il suffit d'installer les node-modules (si non présent)

Il faut ensuite exécuter la commande npm run dev. 

Pour ce projet, la hiérarchie est la suivante : 

dist : fichiers générés par view js et vite js.
node_modules : fichiers permettant d'utiliser les modules nodesjs
public : fichiers accessibles sans permissions particulères par le client 
site : des plugins 
src : les fichiers sources pour faire tourner l'application. Les dossiers/fichiers suivants peuvent être trouvés dans le dossier src.  
- dossier assets : fichiers générés automatiquement pour les images utilisées dans les templates.
- dossier components : contient les templates (fichier vue) pour les différentes pages de notre site.
- le fichier main.js : permet de créer l'application et de lui assigner un router
- le fichier router.js : permet de renvoyer l'utilisateur sur la route souhaiter, permettant ainsi de switch entre les différents affichages.

index.html est notre fichier html de base, permettant l'intégration des modules au html. 
Les fichiers restant sont des fichiers de configuration pour le projet.

## © IMBAUD Florian - LAROSSE Olivier
