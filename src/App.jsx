import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [ranking, setRanking] = useState([])
  const [ordenarID, setOrdenarID] = useState(true)
  const [ordenarNome, setOrdenarNome] = useState(true)
  const [ordenarValor, setOrdenarValor] = useState(true)

  async function getRanking() {
    const req = await fetch('https://joguinho1-7bb71-default-rtdb.firebaseio.com/ranking.json')
    const data = await req.json()
    setRanking(serializador(data))
  }

  function serializador(data) {
    let nomes = Object.keys(data)
    let valores = Object.values(data)
    let rankingSerializado = []

    for (let i in nomes) {
      rankingSerializado.push({ id: +i + 1, nome: nomes[i].toUpperCase(), valor: valores[i] })
    }
    return rankingSerializado
  }

  function ordenador(tipo) {
    if (tipo === 'id') {
      if (ordenarID)
        setRanking(ranking.sort((a, b) => +a[tipo] - +b[tipo]))
      else
        setRanking(ranking.sort((a, b) => +b[tipo] - +a[tipo]))

      setOrdenarID(!ordenarID)
    } else if (tipo === 'nome') {
      if (ordenarNome)
        setRanking(ranking.sort((a, b) => {
          const nomeA = a.nome.toUpperCase()
          const nomeB = b.nome.toUpperCase()

          return nomeA < nomeB ? -1 : nomeA > nomeB ? 1 : 0
        }))
      else
        setRanking(ranking.sort((a, b) => {
          const nomeA = a.nome.toUpperCase()
          const nomeB = b.nome.toUpperCase()

          return nomeA > nomeB ? -1 : nomeA < nomeB ? 1 : 0
        }))
      setOrdenarNome(!ordenarNome)
    } else {
      if (ordenarValor)
        setRanking(ranking.sort((a, b) => +a[tipo] - +b[tipo]))
      else
        setRanking(ranking.sort((a, b) => +b[tipo] - +a[tipo]))

      setOrdenarValor(!ordenarValor)
    }
  }

  useEffect(() => {
    getRanking()
  }, [])

  return (
    <>
      <main>
        <nav className='navbar navbar-expand-lg text-bg-dark p-3'>
          <ul>
            <a href="https://monumental-florentine-45f272.netlify.app/" target="_blank" rel="noopener noreferrer"><li>Acesse o jogo</li></a>
            <a href='https://github.com/murillotlopes/dashboard_jogo' target="_blank" rel="noopener noreferrer"><li>Repositório</li></a>
            <li onClick={() => ordenador('id')}>Ordenar numero</li>
            <li onClick={() => ordenador('nome')}>Ordenar Jogador</li>
            <li onClick={() => ordenador('valor')}>Ordenar Pontuação</li>
          </ul>
        </nav>
        <table className="table table-dark table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Jogador</th>
              <th scope="col">Pontuação</th>
            </tr>
          </thead>
          <tbody>
            {ranking.map((jogador, i) =>
            (<tr>
              <th key={i} >{jogador.id}</th>
              <th key={i} >{jogador.nome}</th>
              <td key={i} >{jogador.valor}</td>
            </tr>)
            )}
          </tbody>
        </table>
      </main>
    </>
  );
}

export default App;
