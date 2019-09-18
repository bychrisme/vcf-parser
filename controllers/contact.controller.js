
const Contact = require('../models/contact.model');

var fs = require('fs');
var path = require('path');

//Simple version, without validation or sanitation
function vcfToJson(stringa){
    var json = [];
    var vcf = stringa;
    var vcfs = vcf.replace(/END\:VCARD/g, "").split('BEGIN:VCARD'); //Rimuove la fine dei tag e splitta le aperture in modo da avere un array di VCF singoli
    var nextIsCustomLabel = false;

    for(var i = 0; i < vcfs.length; i++){
        if(!vcfs[i]) continue;
	    vcfs[i] = vcfs[i].split('\n'); //Splitta gli \n per ottenere le righe
        
        
        var VCFJsonContainer = {};
        var skipNext = false;
    	for(var k = 0; k < vcfs[i].length; k++){
    		if(!vcfs[i][k]) continue; //Se la riga che sto analizzando è vuota -> continua
    		if(skipNext){
    		    skipNext = false;
    		    continue;
    		}
    
    		var key = vcfs[i][k].split(/[;:]/)[0]; //È la parte più a sinistra della stringa splittata
    		var value = vcfs[i][k].split(':'); //È la parte a destra dei due punti
    		
    		if(value.length > 2){
    		    value = value.splice(1).join(':');
    		}else{
    		    value = value[1];
    		}
    		
    		var additionalAttributes = vcfs[i][k].split(':')[0].split(';').splice(1).join(';'); //Prendo la parte a sinistra dei due punti, tolgo la prima voce (key) e tengo tutto il resto

            var isCustomField = false;
            if(key.indexOf('item') == 0){
                //Custom Field
                key = key.split('.')[1]; //item1.EMAIL -> EMAIL
                isCustomField = true;
            }
            
            var tmpObj = {value: value, attributes: additionalAttributes };
            if(isCustomField){
                tmpObj.customLabel = vcfs[i][k+1].split(':')[1];
                skipNext = true;
            }
            
            if(!VCFJsonContainer[key]){
                VCFJsonContainer[key] = [tmpObj];
            }else{
                VCFJsonContainer[key].push(tmpObj);
            }
        }
        json.push(VCFJsonContainer);
    }
    console.log(json);
    return json;
}

function parseVcfToJson(data){
    var json = [];
    var vcf = data;
    var vcfs = vcf.replace(/END\:VCARD/g, "").split('BEGIN:VCARD');
    return vcfs;
}

exports.test = function (req, res) {
    /* Use readFile() if the file is on disk. */
    console.log("start");
    console.log("-------");

    var data = fs.readFileSync(path.resolve(__dirname, '../assets/contacts.vcf'), 'utf8');
    res.send(parseVcfToJson(data));

    console.log("-------");
    console.log("End");
};