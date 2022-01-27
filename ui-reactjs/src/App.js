import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [response, setResponse] = useState({})
  const [data, setData] = useState({})
  const [msg, setMsg] = useState('')
  const [age, setAge] = useState('1')
  const BASE_URL='http://192.168.1.7:5000'

  useEffect(() => {
    console.log('getting pubkey...')
    fetch(BASE_URL + '/pubkey')
      .then(res => res.text())
      .then(body => localStorage.setItem('pubkey', body))
      .catch(err => console.error(err))
  }, [])

  function encrypt(request) {
    return JSON.stringify(request)
  }

  function call_post_api() {
    fetch(BASE_URL + '/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: encrypt({
        'age': Number(age),
        'message': msg
      })
    })
      .then(response => response.json())
      .then(res => setData(res))
      .catch(err => console.error(err))
  }

  function call_api() {
    fetch(BASE_URL + '/hello')
      .then(response => response.json())
      .then(res => setResponse(res['message']))
      .catch(err => console.log(err))
  }

  return (
    <div className="App">
      <button onClick={call_api}>GET /hello</button>
      <div className='api_response'>
      <div className="text-header">API Response:</div> {JSON.stringify(response)}
      </div>
        msg: 
      <input type="text" onChange={(e) => setMsg(e.target.value)} />
      Age:{age}
      <input type="range" min='1' max='100' step='1'  onChange={(e) => setAge(e.target.value)}/>
      <button onClick={call_post_api}>POST /data</button>
      <div className='api_response'>
        <div className="text-header">API Response:</div> {JSON.stringify(data)}
      </div>
    </div>
  );
}

export default App;
