# Projet Crossword

## Presentation

Ce projet a ete realise dans le cadre d'un exercice scolaire.
Il s'agit d'un solveur de grille de mots croises en JavaScript (Node.js).

Le programme prend en entree:

1. Une grille
2. Une liste de mots

Puis il tente de remplir la grille automatiquement.
Si la resolution est impossible et/ou si les donnees sont invalides, (`Error`).

## Prerequis

- Node.js installe sur la machine

## Installation

Si un `package.json` est present:

```bash
npm install
```

Sinon, aucune installation supplementaire n'est necessaire.

## Execution

Lancer le programme avec la commande:

```bash
node index.js
```

Le script demande ensuite:

1. La grille (utiliser `\\n` pour separer les lignes)
2. Les mots (format: `mot1, mot2, mot3`)

## Format de la grille

- `.` represente une case bloquee
- `0` represente une case libre pour une lettre
- `1`, `2`, ... representent le nombre de mots qui commencent dans la case

## Exemple d'utilisation

Saisie possible:

- Grille: `2001\n0..0\n1000\n0..0`
- Mots: `casa, asia, sa`

Sortie attendue:

- La grille completee si une solution existe
- `Error` sinon

## Structure du projet

- `index.js` : interface en ligne de commande
- `wordcrossSolver.js` : algorithme principal de resolution
- `utils.js` : fonctions utilitaires