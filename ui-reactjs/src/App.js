import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [response, setResponse] = useState({})
  const [data, setData] = useState({})
  const [msg, setMsg] = useState('')

  useEffect(() => {
    console.log('getting pubkey...')
    fetch('http://192.168.1.46:5000/pubkey')
    .then(res => res.text())
    .then(body => localStorage.setItem('pubkey', body))
    .catch(err => console.error(err))
  }, [])

  function encrypt(request){
    return JSON.stringify(request)
  }

  function call_post_api(){
    fetch('http://192.168.1.46:5000/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: encrypt({
        'age': 30,
        'message': msg
      })
    })
    .then(response => response.json())
    .then(res => setData(res))
    .catch(err => console.error(err))
  }

  function call_api(){
    fetch('http://192.168.1.46:5000/hello')
    .then(response => response.json())
    .then(res => setResponse(res['message']))
    .catch(err => console.log(err))
  }

  return (
    <div className="App">
      <button onClick={call_api}>Hello</button>
      <div className='api_response'>
        {JSON.stringify(response)}
      </div>
      <button onClick={call_post_api}>Get Data</button>
      <input type="text" onChange={(e) => setMsg(e.target.value)}/>
      <div className='api_response'>
        {JSON.stringify(data)}
      </div>
    </div>
  );
}

export default App;
