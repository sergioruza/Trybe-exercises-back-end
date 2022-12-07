const fs = require('fs').promises;

const read = async () => { // exercicios 6-A
  const response = await fs.readFile('./simpsons.json', 'utf-8');
  const simpsons = JSON.parse(response);
  const resultado = simpsons.map(({ id, name }) => `${id} - ${name}`);
  resultado.forEach(e => console.log(e));
}

const getSimpson = async (idFInd) => { // exercicios 6-B
  const response = await fs.readFile('./simpsons.json', 'utf-8');
  const simpsons = JSON.parse(response);
  const findSimpson = simpsons.find((e) => +e.id === idFInd);
  if (!findSimpson) {
    throw new Error('id nao encontrado');
  }
  return findSimpson;
}

const removeSimpson = async () => { // exercicios 6-C
  const response = await fs.readFile('./simpsons.json', 'utf-8');
  const simpson = JSON.parse(response);
  const filter = simpson.filter(e => e.id !== '10' && e.id !== '6');
  await fs.writeFile('./simpsons.json', JSON.stringify(filter));
}

const newFamily = async () => { // exercicios 6-D
  const response = await fs.readFile('./simpsons.json', 'utf-8');
  const simpson = JSON.parse(response);
  const filter = simpson.filter(({ id }) => +id  <= 4);
  await fs.writeFile('./simpsonsFamily.json', JSON.stringify(filter))
}

const addSimpson = async (obj) => { // exercicios 6-E
  const response = await fs.readFile('./simpsonsFamily.json', 'utf-8');
  const simpson = JSON.parse(response);
  await fs.writeFile('./simpsonsFamily.json', JSON.stringify([...simpson, obj]));
}



const main = async () => {
  // await read();

  // const findSimpson = await getSimpson(2);
  // console.log(findSimpson);

 // await removeSimpson();

//  await newFamily();

//  await addSimpson({id: '8', name: 'Nelson Muntz'});


};

main();
