var fs = require('fs');

const helpers = {};

helpers.createUplaodFolder = (uploads_folder) => {
    if (!fs.existsSync(uploads_folder)){
        console.log("create ", uploads_folder, "folder")
        const folders = uploads_folder.split("/")
        let folder_to_create = "";
        console.log(folders)
        for(let i =1; i<folders.length - 1; i++){
            const folder = folders[i];
            if(folder !== "" || folder !== "."){
                folder_to_create = folder_to_create + folder + "/";
            }
            console.log(folder_to_create)
            if (!fs.existsSync(folder_to_create))fs.mkdirSync(folder_to_create);
        }
    }
}

helpers.verifyExtension = (current_extension) => {
    const array_accept = ["vcf"];
    if (!array_accept.includes(current_extension)) {
        return res.status(500).send({ msg: "file not supported, it must be VCF file" })
    }
}

helpers.uploadFile = (uploads_folder, myFile) => {
    myFile.mv(`${uploads_folder}${myFile.name}`, function (err) {
        if (err) {
            console.log(err)
            return res.status(500).send({ 
                msg: "Error occured",
                error: err
            });
        }
        console.log("file is uploaded correctly !!!")
    });
}

module.exports = helpers;