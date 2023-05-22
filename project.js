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

async function projectDelete(id) {
  await projectModel
    .deleteOne({_id: id
    })
    .then(console.log("Delete!"));
}


module.exports = { projectUpload, projectDelete };
