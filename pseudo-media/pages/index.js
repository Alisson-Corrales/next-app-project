import {useEffect, useState} from  'react'
import axios from 'axios'
import {Message} from 'semantic-ui-react'
const tasksURL = 'https://jsonplaceholder.typicode.com/todos'

export default function Home() {
  const [page, setPage] = useState(1)
  const [list, setList] = useState([])
  const [sublist, setSublist] = useState([])

  useEffect(async () => {
    const res = await axios.get(tasksURL)
    setList(res.data)
  }, [])

  useEffect(() => {
    const nItems = 10
    setSublist(list.slice(nItems*page - 9, nItems*page ))
  }, [page, list])

  return (
    <>
      {sublist.map((item) => {
        const {title, userId, completed, id} = item
        return <Message 
          key = {id}
          icon = {completed ? "check" : "close"}
          header = {userId}
          content = {title}
          color = {completed ? "green" : "red"}
        />
      })}
    </>
  )
}
