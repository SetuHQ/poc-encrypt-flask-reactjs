import { useState, useEffect } from 'react';
import './App.css';
import { BASE_URL, call_get_api, call_post_api } from './api'

function App() {

  const [response, setResponse] = useState({})
  const [data, setData] = useState({})
  const [msg, setMsg] = useState('')
  const [age, setAge] = useState('30')

  useEffect(() => {
    console.log('getting pubkey...')
    fetch(BASE_URL + '/pubkey')
      .then(res => res.text())
      .then(body => localStorage.setItem('pubkey', body))
      .catch(err => console.error(err))
  }, [])


  return (
    <div className="App">
      {/* <div>Greet: {wasm && greet('pp')}</div> */}
      <button onClick={() => call_get_api(setResponse)}>GET /hello</button>
      <div className='api_response'>
        <div className="text-header">API Response:</div> {JSON.stringify(response)}
      </div>
      msg:
      <input type="text" onChange={(e) => setMsg(e.target.value)} />
      Age:{age}
      <input type="range" min='1' max='100' step='1' value={age} onChange={(e) => setAge(e.target.value)} />
      <button onClick={() => call_post_api(age, msg, setData)}>POST /data</button>
      <div className='api_response'>
        <div className="text-header">API Response:</div> {JSON.stringify(data)}
      </div>
    </div>
  );
}

export default App;
