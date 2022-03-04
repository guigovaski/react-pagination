import { useState, useEffect } from 'react'
import './App.css'

type PostType = {
  id: number;
  title: string;
}

function App() {
  const [postsList, setPostsList] = useState<PostType[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const getPosts = async () => {
    let offset = (currentPage - 1) * 10;
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=10&_start=${offset}`);
    const json = await res.json();
    setPostsList(json);
  }

  useEffect(() => {
    getPosts();
  }, [currentPage])

  useEffect(() => {
    const getAllPosts = async () => {
      if (postsList.length > 0) {
        let res = await fetch('https://jsonplaceholder.typicode.com/posts');
        let total = await res.json();
        setPageCount(Math.ceil(total.length / postsList.length));
      } else {
        setPageCount(0);
      }
    }
    getAllPosts();
  }, [postsList])

  let listPagination: number[] = [];
  for (let i = 0; i < pageCount; i++) {
    listPagination.push(i+1);
  }

  return (
    <div>
      <ul>
        {postsList.map((item, index) => (
          <li className="uniquePost" key={item.id}>{item.title}</li>
        ))}
      </ul>
      <div className="pagination">
          {listPagination.map((item, index) => (
            <div onClick={() => setCurrentPage(item)} key={index} className={item === currentPage ? 'pageItem active' : 'pageItem'}>{item}</div>
          ))}
      </div>
    </div>
  )
}

export default App;
