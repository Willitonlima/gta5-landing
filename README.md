# GTA V — Landing Page

Fan page temática do Grand Theft Auto V com Gulp + SASS.

## 📁 Estrutura

```
gta5-landing/
├── src/
│   ├── scss/
│   │   ├── main.scss              ← Entry point
│   │   ├── abstracts/
│   │   │   ├── _variables.scss    ← Cores, fontes, espaçamentos
│   │   │   └── _mixins.scss       ← Mixins reutilizáveis
│   │   ├── base/
│   │   │   ├── _reset.scss        ← Reset CSS
│   │   │   └── _typography.scss   ← Tipografia global
│   │   ├── layout/
│   │   │   ├── _header.scss       ← Hero / Header
│   │   │   ├── _sections.scss     ← About, Characters, Gallery, World
│   │   │   └── _footer.scss       ← Rodapé
│   │   └── components/
│   │       ├── _nav.scss          ← Navegação fixa
│   │       ├── _buttons.scss      ← Botões reutilizáveis
│   │       ├── _carousel.scss     ← Carrossel de slides
│   │       └── _cards.scss        ← Cards de personagens
│   └── js/
│       └── main.js                ← JS principal (não minificado)
├── dist/
│   ├── css/
│   │   └── main.min.css           ← CSS compilado pelo Gulp
│   └── js/
│       └── main.min.js            ← JS bundled pelo Gulp
├── index.html
├── gulpfile.js
└── package.json
```

## 🚀 Como usar

### Instalar dependências
```bash
npm install
```

### Modo desenvolvimento (com BrowserSync + watch)
```bash
npm start
# ou
gulp
```

### Build para produção
```bash
npm run build
# ou
gulp build
```

## 🎨 Features

- **Header full-screen** com imagem central do logo GTA V em destaque, efeito float e glow animado
- **Grid de perspectiva** no fundo com linhas douradas sutis
- **Navegação fixa** que muda de estilo ao rolar
- **Seção About** com estatísticas do jogo
- **Cards de personagens** (Michael, Trevor, Franklin) com efeito hover e cores individuais
- **Galeria** tipo mosaico com hover reveal
- **Carrossel** com autoplay, touch/swipe, dots e controles
- **Cursor glow** seguindo o mouse
- **Scroll reveal** nas seções
- **Footer** completo com links

## 🛠 Tecnologias

- **Gulp 4** — task runner
- **SASS/SCSS** — 7-1 pattern adaptado
- **BrowserSync** — live reload
- **Autoprefixer** — compatibilidade cross-browser
- **CleanCSS + Uglify** — minificação

## ⚠️ Aviso

Este projeto é uma fan page para fins educacionais/portfólio.  
GTA V e todos os assets são propriedade da Rockstar Games.
