
var fs = require('fs');
var path = require('path');
const helpers = require('../utils/helpers');

function parseVcfToJson(data){
    var result = [];
    var arrayData = [];
    var vcf = data;
    var vcfs = vcf.replace(/END\:VCARD/g, "").split('BEGIN:VCARD');
    var exclude = vcfs.map(d=>{
        if(d) return d.split("\r\n");
    });
    var purge = exclude.filter(el => el!=null);
    purge.forEach(element => {
        const p = element.filter(el => el!="");
        const p2 = p.map(m => m.replace(";", " ").replace(";", " ").replace(";;", "").replace(";;;", "").split(":"));
        // const p3 = p2.map(r => r);
        arrayData.push(p2);
    });

    arrayData.forEach(ards =>{
        const json = {};
        ards.forEach((ard, id) =>{
            const value = ard[0] == "PHOTO" ? ard[1] + ard[2] + ards[id+1][0].replace(" ", "") : ard[1]
            json[ard[0]] = value;
        });
        result.push(json);
    })
    

    return result;
}

exports.vcfParse = async (req, res) => {
    
    console.log("start");
    console.log("-------");

    const {files} = req;
    const uploads_folder = process.env.UPLOAD_PATH;

    helpers.createUplaodFolder(uploads_folder);
    if (!files) {
        return res.status(500).send({ msg: "file is not found" })
    }

    const myFile = files.file;
    const current_extension = myFile.name.split('.')[1];

    console.log("extension ", current_extension)

    helpers.verifyExtension(current_extension);

    const filePath = uploads_folder+myFile.name;

    helpers.uploadFile(uploads_folder, myFile);

    setTimeout(()=>{
        var data = fs.readFileSync(filePath, 'utf8');
        const dataParse = parseVcfToJson(data);
        res.send(dataParse);
    }, 1000);
    
    

    console.log("-------");
    console.log("End");
};

exports.test = function (req, res) {
    var data = fs.readFileSync(path.resolve(__dirname, '../assets/contacts.vcf'), 'utf8');
    const dataParse = parseVcfToJson(data);
    res.send(dataParse);
};

