import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const SingleBook = () => {
  const {id} = useParams()
  const [book,setBook] = useState({})
  const navigate = useNavigate() 
  const fetchBook = async ()=>{
    const response = await axios.get(`http://localhost:3000/book/${id}`) 
    if(response.status === 200){
      setBook(response.data.data)
    }
  }
  useEffect(()=>{
    fetchBook()
  },[])
//delete pass
const handleDelete = async () =>{
        console.log(id)
        const response = await axios.delete(`http://localhost:3000/book/${id}`)
        navigate("/")
        console.log(response)

}
  return (
    <>
    <Navbar />
  <img class="w-full" src={book.imageUrl ? book.imageUrl : "https://img.freepik.com/free-photo/book-composition-with-open-book_23-2147690555.jpg?size=626&ext=jpg&ga=GA1.1.1395880969.1709251200&semt=sph"} alt="Sunset in the mountains" />
  <div class="px-6 py-4">
    <div class="font-bold text-xl mb-2">{book.bookName}</div>
    <p class="text-gray-700 text-base">
      Rs. {book.bookPrice}
    </p>
    <p class="text-black-700 text-base">
      {book.isbnNumber}

    </p>
    <p class="text-black-700 text-base">
      {book.authorName}
      
    </p>
    <p class="text-black-700 text-base">
      {book.publishedAt}
      
    </p>
    <button onClick={handleDelete} className='bg-blue-300 p-2'>Delete</button>
   
    <Link to={`/editBook/${book._id}`} >
    <button className='bg-blue-300 p-2 ml-2'>Edit</button>
    </Link>
  </div>
    </>
  )
}

export default SingleBook