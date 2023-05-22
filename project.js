const projectModel = require("./Schemas/project.js");

async function projectUpload(data) {
  //   console.log(data);
  await projectModel
    .create({
      title: data.title,
      description: data.description,
      link: data.link,
    })
    .then(console.log("Nice!"));
}

module.exports = { projectUpload };
