
var fs = require('fs');
var path = require('path');

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

exports.test = function (req, res) {
    /* Use readFile() if the file is on disk. */
    console.log("start");
    console.log("-------");

    var data = fs.readFileSync(path.resolve(__dirname, '../assets/contacts.vcf'), 'utf8');
    const dataParse = parseVcfToJson(data);
    // console.log("taille ", dataParse[6][0]);
    res.send(dataParse);

    console.log("-------");
    console.log("End");
};

exports.vcfParse = function (path) {
    var data = fs.readFileSync(path.resolve(__dirname, path), 'utf8');
    const dataParse = parseVcfToJson(data);
    res.send(dataParse);
};

