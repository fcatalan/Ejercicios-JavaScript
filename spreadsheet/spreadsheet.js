let fs = require('fs');

//se descarga archivo txt del repositorio Git
function spreadsheet(input = 'input_spreadsheet.txt'){

    const data = fs.readFileSync(input, 'utf8');

     return data.split('\n')//delimitar los saltos de lineas para crear matriz con la información []
        .map((a) => 
        {
            return a.split('\t').map(a => parseInt(a, 10)); //delimitar los valores por tabulaciones y crear nuevos [] con las filas, tambien se parsea a int
        })
        .map((a) => {
        return Math.max(...a) - Math.min(...a) //se busca maximos y minimos para restar y encontrar diferencia
        })
        .reduce((a,b)=> a += b ); //se suman todos los valores del array
}

console.log(spreadsheet());