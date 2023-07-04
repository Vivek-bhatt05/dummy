import { useRef } from "react"

function HomePage() {


  const feedbackRef = useRef()
  const emailRef = useRef()


  function submitHandler(e){
    e.preventDefault();


    const mail = emailRef.current.value;
    const feed = feedbackRef.current.value;

    // console.log(feed,mail)
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
    </>
  )
}

export default HomePage


