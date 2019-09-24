const readline = require("readline");
const writePkg = require("write-pkg");
const package = require("../package.json");
const colors = require("colors");
const { spawn } = require("child_process");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const questionMap = {
  author: "",
  packageName: "",
  repositoryURL: "",
  repositoryType: "",
  description: ""
};

const questions = Object.assign({}, questionMap, {
  author: "author",
  packageName: "package name (kebab-case)",
  repositoryURL: "repository",
  repositoryType: "repository type (git, svn)",
  description: "description"
});

const answers = Object.assign({}, questionMap);
let currentQuestionIndex = 0;

function setup() {
  writePkg({
    ...package,
    author: answers.author,
    description: answers.description,
    name: answers.packageName,
    repository: {
      type: answers.repositoryType,
      url: answers.repositoryURL
    }
  })
    .then(() => {
      const root = __dirname + "/..";
      const child = spawn("npm", ["install"], {
        cwd: root,
        stdio: "inherit"
      });
      child.on("exit", (code, signal) => {
        if (!code) {
          console.log(
            "Project ready! Run `npm start` to start working on your awesome new project!"
          );
        }
        process.exit(code);
      });
    })
    .catch(e => {
      console.log("Uh-oh", e);
      process.exit(1);
    });
}

function urlify(a) {
  const r = a
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "-")
    .replace(/^-+|-+$/g, "");
  return r;
}

function askQuestion() {
  const question = questions[Object.keys(questions)[currentQuestionIndex]];
  if (question) {
    rl.question(`${question}: `, handleInput);
  } else {
    console.log("Thank you! Setting up your project...\n");
    setup();
  }
}

function answerQuestion(value) {
  answers[Object.keys(answers)[currentQuestionIndex]] = value;
}

function isValidAnswer(value) {
  if (!value || value.length === 0) {
    return false;
  }

  const question = Object.keys(questionMap)[currentQuestionIndex];

  switch (question) {
    case "packageName":
      const correctLength = value.length <= 214;
      return correctLength ? urlify(value) : false;

    default:
      return value;
  }
}

function handleInput(data) {
  if (data === "exit\n") {
    process.exit();
  } else {
    const answer = isValidAnswer(data);
    if (answer) {
      answerQuestion(answer);
      currentQuestionIndex++;
    }
    askQuestion();
  }
}

console.log(colors.bold("\nLet's set up your brand new project!"));
askQuestion();
