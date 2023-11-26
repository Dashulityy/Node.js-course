const path = require("path") // для работы с путями файлов
const util = require("util") // для работы изменения API 
const fs = require("fs") //для работы с файловой системой

const readdir = util.promisify(fs.readdir) //переделали API readdir в промиз

const config = {
    titleDirs: [
        { title: "a", directory: "A"},
        { title: "b", directory: "B"},
        { title: "c", directory: "C"},
        { title: "d", directory: "D"},
        { title: "e", directory: "E"},
        { title: "f", directory: "F"},
        { title: "g", directory: "G"},
        { title: "h", directory: "H"},
        { title: "i", directory: "I"},
        { title: "j", directory: "J"},
        { title: "k", directory: "K"},
        { title: "l", directory: "L"},
        { title: "m", directory: "M"},
        { title: "n", directory: "N"},
        { title: "o", directory: "O"},
        { title: "p", directory: "P"},
        { title: "q", directory: "Q"},
        { title: "r", directory: "R"},
        { title: "s", directory: "S"},
        { title: "t", directory: "T"},
        { title: "u", directory: "U"},
        { title: "v", directory: "V"},
        { title: "w", directory: "W"},
        { title: "x", directory: "X"},
        { title: "y", directory: "Y"},
        { title: "z", directory: "Z"}
    ]
}

const directory = process.argv[2] //папка, в которой хотим выполнить
const newDirectory = 'allFilesSort'; 
const needtoDelete = process.argv[3];
if(!directory){
    console.log("Укажите папку для сортировки")
    return;
}
if(!needtoDelete){
    console.log("Укажите нужно ли удалять исходную папку (y/n)")
    return;
}

if(directory && needtoDelete){
    fs.mkdirSync(newDirectory); 
    [...config.titleDirs, {directory: "other"}].map(d => {
        const titleDir = `${newDirectory}/${d.directory}` 
        if(!fs.existsSync(titleDir)){
            fs.mkdirSync(titleDir)
        }
    });
    
    (async () => {
        const files = await readdir(directory)
        files.forEach(file => {
            const titleFirstSymbol = path.basename(file)[0].toLowerCase();
            console.log(titleFirstSymbol)
            if (!titleFirstSymbol){
                return;
            }
            const { directory: targetDir = "other" } = config.titleDirs.find(dir => dir.title == titleFirstSymbol) || {}
            const fromPath = path.join(__dirname, directory, file) 
            const toPath = path.join(__dirname, newDirectory, targetDir, file) 
    
            fs.rename(fromPath, toPath, function(err) {
                if(err){
                    throw err;
                }
            });
        });
        if( needtoDelete == 'y'){
            fs.rmdir(directory, err => {
                if(err) throw err; 
             });
        }
    })();
}
