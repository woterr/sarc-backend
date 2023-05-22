const projectModel = require("./Schemas/project.js");

async function projectUpload(data) {
  await projectModel
    .create({
      title: data.title,
      description: data.description,
      link: data.link,
      timestamp: Date.now(),
    })
    .then(console.log("Nice!"));
}

module.exports = { projectUpload };
