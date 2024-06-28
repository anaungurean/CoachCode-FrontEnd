# Proiect CoachCode FrontEnd React

Acest proiect include o aplicație front-end construită folosind React cu Vite și JavaScript. Mai jos găsiți detalii despre structura directoarelor și modulele principale ale front-end-ului.

 
## Modulele Principale ale Front-end-ului

### 1. Auth

Directorul `Auth` conține componente pentru gestionarea autentificării utilizatorilor.

### 2. Chatbot

Directorul `Chatbot` include componente pentru funcționalitățile de chat.

### 3. Coding Practice

Directorul `CodingPractice` oferă componente pentru practica de codare, inclusiv listări de exerciții   și detalii despre exerciții .

### 4. CommunityFolder și HelpFolder

Aceste directoare, `CommunityFolder` și `HelpFolder`, conțin componente pentru interacțiunea în comunitate și resurse de ajutor. 

### 5. ProblemFolder

Directorul `ProblemFolder` include componente pentru gestionarea și afișarea problemelor tehnice sau întrebărilor. 

### Constants, Lib și Scripts

- **constants/** conține fișiere de configurare sau constante globale, cum ar fi rutele aplicației (`routes.js`) sau setări pentru API-uri (`api.js`).
- **lib/** include funcții de utilitate și module pentru gestionarea autentificării (`auth.js`), utilități generale (`utils.js`).
- **assets/** conține fișiere statice, cum ar fi imagini (`images/`) și stiluri (`styles/main.css`).

## Deploy Front-end

Pentru a face deploy-ul aplicației front-end:

1. **Instalare dependințe**: Asigurați-vă că aveți toate dependințele instalate. Utilizați `npm install` sau `yarn install` în directorul proiectului pentru a instala pachetele necesare.

2. **Configurare API-uri**: Verificați și actualizați fișierele din directorul `constants/` pentru a specifica API-urile backend-ului.

3. **Pornire server de dezvoltare**: Folosiți `npm run dev` sau `yarn dev` pentru a porni serverul de dezvoltare Vite.

4. **Build pentru producție**: Pentru a construi aplicația pentru producție, rulați `npm run build` sau `yarn build`. Aceasta va crea o versiune optimizată a aplicației în directorul `dist/`.

5. **Deploy**: Implementați aplicația pe serverul de producție folosind fișierele din directorul `dist/`.

 
