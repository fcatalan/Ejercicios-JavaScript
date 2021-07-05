// No editar
const clients = [
    { id: 1, taxNumber: '86620855', name: 'HECTOR ACUÑA BOLAÑOS'},
    { id: 2, taxNumber: '7317855K', name: 'JESUS RODRIGUEZ ALVAREZ'},
    { id: 3, taxNumber: '73826497', name: 'ANDRES NADAL MOLINA'},
    { id: 4, taxNumber: '88587715', name: 'SALVADOR ARNEDO MANRIQUEZ'},
    { id: 5, taxNumber: '94020190', name: 'VICTOR MANUEL ROJAS LUCAS'},
    { id: 6, taxNumber: '99804238', name: 'MOHAMED FERRE SAMPER' }
  ];
  const accounts = [
    { clientId: 6, bankId: 1, balance: 15000 },
    { clientId: 1, bankId: 3, balance: 18000 },
    { clientId: 5, bankId: 3, balance: 135000 },
    { clientId: 2, bankId: 2, balance: 5600 },
    { clientId: 3, bankId: 1, balance: 23000 },
    { clientId: 5, bankId: 2, balance: 15000 },
    { clientId: 3, bankId: 3, balance: 45900 },
    { clientId: 2, bankId: 3, balance: 19000 },
    { clientId: 4, bankId: 3, balance: 51000 },
    { clientId: 5, bankId: 1, balance: 89000 },
    { clientId: 1, bankId: 2, balance: 1600 }, 
    { clientId: 5, bankId: 3, balance: 37500 },
    { clientId: 6, bankId: 1, balance: 19200 },
    { clientId: 2, bankId: 3, balance: 10000 },
    { clientId: 3, bankId: 2, balance: 5400 },
    { clientId: 3, bankId: 1, balance: 9000 },
    { clientId: 4, bankId: 3, balance: 13500 },
    { clientId: 2, bankId: 1, balance: 38200 },
    { clientId: 5, bankId: 2, balance: 17000 },
    { clientId: 1, bankId: 3, balance: 1000 },
    { clientId: 5, bankId: 2, balance: 600 },
    { clientId: 6, bankId: 1, balance: 16200 },
    { clientId: 2, bankId: 2, balance: 10000 }
  ]
  const banks = [
    { id: 1, name: 'SANTANDER' },
    { id: 2, name: 'CHILE' },
    { id: 3, name: 'ESTADO' }
  ];

  //Se crea una función para retornar la información de los bancos y sus cuentas la cual nos ayudara a optimizar las consultas solicitadas.
  function bancksAccounts()
  {
    return banks.map((banck)=>{
        return {
            id: banck.id,
            name: banck.name,
            accounts : accounts.filter(account => account.bankId === banck.id)
          };
    }); 
  }

// 0 Arreglo con los ids de clientes
function listClientsIds() {
  return clients.map((client) => client.id);
};
  
  // 1 Arreglo con los ids de clientes ordenados por rut
function listClientsIdsSortByTaxNumber() {
  // CODE HERE
  return clients.sort((a, b)=>{
        return parseInt(a.taxNumber.slice(0, -1), 10) - parseInt(b.taxNumber.slice(0, -1), 10);
  }).map((client) => client.id);
};
 
// 2 Arreglo con los nombres de cliente ordenados de mayor a menor por la suma TOTAL de los saldos de cada cliente en los bancos que participa.
function sortClientsTotalBalances(clientes = clients, cuentas = accounts) {
  // CODE HERE
  return clientes.map((client)=>{
      return {
          id: client.id,
          name: client.name,
          balanceTotal: cuentas.filter(account => account.clientId === client.id).reduce((a, b) => a += b.balance, 0)
      }
  }).sort((a, b)=>{ // se ordena los clientes por los montos de la suma
        return parseInt(b.balanceTotal, 10) - parseInt(a.balanceTotal, 10);
  }).map((client)=> client.name); // Se selecciona solo por el campo nombre
}

// 3 Objeto en que las claves sean los nombres de los bancos y los valores un arreglo con los ruts de sus clientes ordenados alfabeticamente por nombre.
function banksClientsTaxNumbers() {
  // CODE HERE
  return bancksAccounts().map((banckAccount) =>
  {
      const clientesRut = Array.from(new Set ( banckAccount.accounts.map(account => account.clientId) ))

      .map((id)=>{
          return clients.find(client => client.id === id);
      })
      .sort((a, b)=> {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }          
          return 0;
        }).map((client => client.taxNumber)); //despues del ordenamiento alfabeticamente se crea un nuevo array solo con los rut

        return {
          banco: banckAccount.name,
          rutClientes : clientesRut
        };
  }).reduce((banco, elemento)=>({ // se crea salida de objeto según lo solicitado
      ...banco,
      [elemento.banco] : elemento.rutClientes  
    }),{});
}

// 4 Arreglo ordenado decrecientemente con los saldos de clientes que tengan más de 25.000 en el Banco SANTANDER
function richClientsBalances() {
  // CODE HERE  
  return accounts.filter(account=> account.balance > 25000 
                                  && account.bankId === banks.find(banck => banck.name === 'SANTANDER').id)
  .sort((a, b)=>{
    return a.balance + b.balance;
  }).map(account => account.balance);
}

// 5 Arreglo con ids de bancos ordenados crecientemente por la cantidad TOTAL de dinero que administran.
function banksRankingByTotalBalance() {
  // CODE HERE
  return bancksAccounts().map((banckAccount) =>
  {
      return {        
          id: banckAccount.id,
          balanceTotal: banckAccount.accounts.reduce((a, b) => a += b.balance, 0)
      }
  })
  .sort((a, b)=>{ // se ordena los clientes por los montos de la suma
      return a.balanceTotal - b.balanceTotal;
  })
  .map((banco)=> banco.id); // Se selecciona solo por el campo nombre
}

// 6 Objeto en que las claves sean los nombres de los bancos y los valores el número de clientes que solo tengan cuentas en ese banco.
function banksFidelity() {
  // CODE HERE
  return bancksAccounts().map((banckAccount) =>
  {
      return {        
          name: banckAccount.name,
          amountClient: Array.from(new Set ( banckAccount.accounts.map(account => account.clientId) )).length
      }
  }).reduce((banco, elemento)=>({ // se crea salida de objeto según lo solicitado
      ...banco,
      [elemento.name] : elemento.amountClient
    }),{});
}

// 7 Objeto en que las claves sean los nombres de los bancos y los valores el id de su cliente con menos dinero.
function banksPoorClients() {
  // CODE HERE
  return bancksAccounts().map((banckAccount) =>
  {
      const accounts = banckAccount.accounts;
      const arrayBalances = accounts.map(account => account.balance)
      const index = arrayBalances.indexOf(Math.min(...arrayBalances));

      return {
          name: banckAccount.name,
          clientId: accounts[index].clientId
      }
  })
  .reduce((banco, elemento)=>({ // se crea salida de objeto según lo solicitado
      ...banco,
      [elemento.name] : elemento.clientId
    }),{});
}

// 8 Agregar nuevo cliente con datos ficticios a "clientes" y agregar una cuenta en el BANCO ESTADO con un saldo de 9000 para este nuevo empleado. 
// Luego devolver el lugar que ocupa este cliente en el ranking de la pregunta 2.
// No modificar arreglos originales para no alterar las respuestas anteriores al correr la solución
function newClientRanking() {
  // CODE HERE
  //se busca el ID máximo de los clientes para luego sumar 1 y dar un nuevo id unico, no se toma el valor con length al array ya que solo en una situación 
  //real no sería consigo con los id ya que puede tomar otro extraxto de ejemplo
  //Se crea una copia de ambos Array, clients y accounts
  let clientsCopy = clients.slice(0, clients.length);
  let accountsCopy = accounts.slice(0, accounts.length);

  const clienteNuevo = { id: Math.max(...clients.map(client => client.id)) + 1,  
                        taxNumber: '123456789', 
                        name: 'New Person'};

  const cuentaNueva = { clientId: clienteNuevo.id, 
                      bankId: 3, 
                      balance: 9000 }
  
  clientsCopy.push(clienteNuevo);
  accountsCopy.push(cuentaNueva);

  index = sortClientsTotalBalances(clientsCopy, accountsCopy).findIndex(nombre => nombre === clienteNuevo.name) + 1;
  return (`El nuevo cliente: ${clienteNuevo.name}, ocupa el lugar ${index} del ranking`);
}

// No modificar, eliminar o alterar cualquier línea de código o comentario de acá para abajo
// Cualquier cambio hará que su prueba quede invalidada automáticamente
console.log('Pregunta 0');
console.log(listClientsIds());
console.log('Pregunta 1');
console.log(listClientsIdsSortByTaxNumber());
console.log('Pregunta 2');
console.log(sortClientsTotalBalances());
console.log('Pregunta 3');
console.log(banksClientsTaxNumbers());
console.log('Pregunta 4');
console.log(richClientsBalances());
console.log('Pregunta 5');
console.log(banksRankingByTotalBalance());
console.log('Pregunta 6');
console.log(banksFidelity());
console.log('Pregunta 7');
console.log(banksPoorClients());
console.log('Pregunta 8');
console.log(newClientRanking());
