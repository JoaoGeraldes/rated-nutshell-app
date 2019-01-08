- Instalar o node.js em https://nodejs.org para podermos usar o node package manager (npm).
- Fazer o clone ou download do projeto no GitHub https://github.com/JoaoGeraldes/rated-nutshell-app
- Abrir o IDE favorito, e na consola executar o comando npm install. Em alternativa, o mesmo procedimento poderá ser realizado através da linha de comandos do windows, contudo, deve-se direcionar para o diretório root do projeto. Neste passo, todas as dependências serão instaladas.
- Criar um novo projeto na firebase e posteriormente uma Realtime Database. 
- Último passo, adicionar a constante config com os dados da firebase criada no passo anterior, no ficheiro fire.js do diretório /components/firebase

**const config = {
    apiKey: "",\
    authDomain: "",\
    databaseURL: "",\
    projectId: "",\
    storageBucket: "",\
    messagingSenderId: ""\
};**

Na página do firebase > Autenticação > Método de login  - Ativar o provedor Facebook e Google -> Salvar.
Estando estes passos realizados, executa-se o comando npm start e aplicação abrirá no localhost com o browser pré-definido.
Depois destas configurações, a aplicação está pronta a ser usada, escrever e ler dados na Realtime Database e autenticar através do Google. Para usar o facebook é preciso configurar na própria aplicação do facebook o OAUTH URI.

------------------------

The FIREBASE file named fire.js on components/firebase/ directory should be configured to your own Firebase Realtime Database values to get the app working.

// config constant is holding all the data you need to establish connection to firebase
const config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: ""
};


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
# rated-nutshell-app
