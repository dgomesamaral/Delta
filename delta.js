var fs = require('graceful-fs');
var found = 0

var flocs_prod = []
var flocs_acc = []
console.log("Reading file 1...");

fs.readFileSync('FLOCs.csv').toString().split('\n').forEach((content, index, array) => {
    if (index !== 0) {
        content = content.trim();
        var fields = content.split(';')

        var name = fields[1]
        flocs_prod.push(name)
    }
})


console.log("Stopped file 1... " + flocs_prod.length);
console.log("Reading file 2...");
fs.readFileSync('FLOCS_ACC.csv').toString().split('\n').forEach((contentACC, index, array) => {
    if (index !== 0) {
        contentACC = contentACC.trim();
        var fieldsACC = contentACC.split(';')

        var nameACC = fieldsACC[1]
        flocs_acc.push(nameACC)
    }
})

console.log("Stopped file 2... " + flocs_acc.length);

flocs_prod.forEach((item) => {
    if (!flocs_acc.includes(item)) {
        LoggingUtil("delta.txt", item)
    }
})

console.log("Finished");

function LoggingUtil(file, content) {
    fs.appendFile(file, content + '\n', (err) => {
        if (err) throw err;
    })
}
