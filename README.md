# Asciify

Page de liens pro dans l'esprit Watch Dogs : Portfolio, GitHub et LinkedIn.

Construite avec **React**, **Vite**, **Tailwind CSS** et des composants [React Bits](https://reactbits.dev) (Dither, DepthText, ElectricBorder, DecryptedText, ClickSpark, Magnet).

## Développement

```bash
npm install
npm run dev
```

## Build de production

```bash
npm run build
npm run preview
```

## Déploiement

Déployé sur **GitHub Pages** par [GitHub Actions](.github/workflows/deploy.yml) à chaque push sur `main` :
https://aziz-anakin.github.io/Aziz-Anakin-links/

Dans le repo : Settings → Pages → Source : **GitHub Actions**.

## Personnalisation

Toutes les infos et les liens se modifient en haut de [`src/App.jsx`](src/App.jsx) (constantes `PROFILE` et `LINKS`).
