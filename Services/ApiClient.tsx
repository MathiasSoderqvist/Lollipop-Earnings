const BASE_URL = 'https://api.compound.finance/api/v2/ctoken/'

const fetchRequest = async () => {
  return fetch(BASE_URL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({
        "addresses": ["0x5d3a536e4d6dbd6114cc1ead35777bab948e3643", "0x39aa39c021dfbae8fac545936693ac917d5e7563", "0xf650c3d88d12db855b8bf7d11be6c55a4e07dcc9"] 
      })
    })
      .then((res) => res.json())
      .catch((err) => console.log(`${err.message} while fetching coin rates.`))
  };

  export default fetchRequest;
