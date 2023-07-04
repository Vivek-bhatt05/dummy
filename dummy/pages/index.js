import { useRef, useState } from "react"

function HomePage() {

  const [feedback,setFeedback] = useState([]);

  const feedbackRef = useRef()
  const emailRef = useRef()


  function submitHandler(e){
    e.preventDefault();
    const mail = emailRef.current.value;
    const feed = feedbackRef.current.value;
    const reqBody = {email:mail,text:feed}

    fetch('/api/feedback',{
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then((res)=>res.json())
    .then((data)=>console.log(data))
  }

  function getFeedbackData(){
    fetch('/api/feedback').then((res)=>res.json())
    .then((data)=>{
      setFeedback(data.feedback)
      console.log(data.feedback)
    })
  }

  function getsingleFeedbackData(id){
    fetch(`/api/${id}`).then((res)=>res.json())
    .then((data)=>{
      // setFeedback(data.feedback)
      console.log(data)
    })
  }

  return (
    <>
     <h1>HomePage</h1>
     <form onSubmit={submitHandler}>
     <div>
      <label htmlFor="email">Email </label>
      <input id="email" type='email' ref={emailRef} />
     </div>
     <br />
     <div>
      <label htmlFor="feedback">Feedback </label>
      <textarea id="feedback" rows='3' ref={feedbackRef}></textarea>
     </div>
     <br />
     <button>Submit</button>
     </form>

     <hr />

     <button onClick={getFeedbackData}>Get Feedback</button>

     <ul>
      {feedback.length>0 && feedback.map((feed)=>(
        <li key={feed.id}><button onClick={getsingleFeedbackData(feed.id)}>{feed.text}</button></li>
      ))}
     </ul>
    </>
  )
}

export default HomePage


