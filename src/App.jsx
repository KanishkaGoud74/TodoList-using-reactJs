import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import Navbar from './components/navbar'

function App() {
  const [todo, settodo] = useState("")
  const [alltodos, setAlltodos] = useState([])
  const [Editindex, setEditindex] = useState(null)
  const [showfinished, setshowfinished] = useState(true)

  useEffect(() => {
    let todosinlocalstorage = localStorage.getItem("alltodos")
    if (todosinlocalstorage) {
      let fromlocalstoragetodos = JSON.parse(localStorage.getItem("alltodos"))
      setAlltodos(fromlocalstoragetodos)
    }
  }, [])


  let savetodos = () => {
    localStorage.setItem("alltodos", JSON.stringify(alltodos))
  }


  let handleChange = (e) => {
    settodo(e.target.value)
    savetodos()
  }

  let handledelete = (index) => {
    setAlltodos(alltodos.filter((_, i) =>
      i !== index
    ))
    savetodos()
  }
  let handleedit = (index) => {
    settodo(alltodos[index])
    setEditindex(index)
    savetodos()
  }

  let handletoggle = (index) => {
    let updated = [...alltodos]
    updated[index].completed = !updated[index].completed
    setAlltodos(updated)
    savetodos()
  }


  let handleadd = () => {
    let updated = [...alltodos]
    if (Editindex === null) {
      updated.push({ text: todo, completed: false })
    }
    else {
      updated[Editindex] = { text: todo }
    }
    setAlltodos(updated)
    setEditindex(null)
    settodo("")
    savetodos()
  }

  let handleshowfinished = () => {
    let finished = showfinished
    finished = !finished
    setshowfinished(finished)
    console.log(showfinished)
  }




  return (
    <>
      <div className='bg-green-50 w-full min-h-screen'>
        <Navbar />
        <div className='bg-green-100 min-h-[85vh] w-11/12 md:w-3/4 mx-auto my-4 p-4 rounded-xl'>
          <div className=' md:flex gap-x-8 font-bold text-xl justify-center'>

            {/* ADD TODO , INPUT , ADD BUTTON */}
            <li className='list-none whitespace-nowrap mb-1'>Add todo</li>
            <div className='flex'>

              <input className='rounded-2xl w-3/4 sm:w-4/6 mr-4' type="text" value={todo} onChange={handleChange} />
              <button disabled={todo.length < 2} className='bg-green-600 h-10 w-16 sm:w-24 rounded-md cursor-pointer hover:bg-green-800' onClick={handleadd}>
                {Editindex === null ? "ADD" : "UPDATE"}
              </button>
            </div>
          </div>

          {/* SHOW BUTTON, YOUR TODOS */}
          <button className='font-bold text-xl flex gap-x-2' onClick={handleshowfinished}>
            {showfinished ? <i className="mt-2 fa-solid fa-circle-check"></i> : <i className=" mt-2 fa-regular fa-circle"></i>}
            Show Finished
          </button>
          <div className='font-bold text-2xl mt-12'>Your Todos</div>

          {/* TODOS MAP ARRAY USAGE */}
          {alltodos.map((e, index) => {
            return (showfinished || !e.completed) && <div key={index} className='w-[99%] relative text-lg bg-green-50 flex gap-x-2 sm:gap-x-7 my-8'>

              {/* BUTTON TOGGLE */}
              <div className='flex-shrink-0' onClick={() => {
                handletoggle(index)
              }}>
                {e.completed ? (<i className="fa-solid fa-circle-check"></i>) : (<i className="fa-regular fa-circle"></i>)}
              </div>

              {/* TODO TEXT  */}

                <div style={{ textDecoration: e.completed ? "line-through" : "none" }} className='rounded-lg h-8 pl-0 sm:pl-3 truncate'>
                  {e.text}
                </div>

                {/* EDIT BUTTON , DELETE BUTTON */}
                <div className='absolute flex gap-x-3 sm:gap-x-9 right-4 flex-shrink-0'>
                  <button className='' onClick={() => handleedit(index)}>
                    <i className="fa-solid fa-pen-to-square"></i>
                  </button>
                  <button className='' onClick={() => handledelete(index)}>
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                </div>
            </div>

          })}

        </div>
      </div>
    </>
  )
}

export default App
