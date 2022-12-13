import React, {useEffect, useMemo, useRef, useState} from "react";
import './styles/App.css';
import PostList from "./componets/PostList";
import MyButton from "./componets/UI/button/MyButton";
import MyInput from "./componets/UI/input/MyInput";
import PostForm from "./componets/PostForm";
import MySelect from "./componets/UI/select/MySelect";
import PostFilter from "./componets/PostFilter";
import MyModal from "./componets/UI/MyModal/MyModal";
import {usePosts} from "./hooks/usePosts";
import axios from "axios";
import PostService from "./API/PostService";

function App() {
    const [posts, setPosts] = useState([])
    const [filter, setFilter] = useState({sort: '', query: ''})
    const [modal, setModal] = useState(false)
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
    const [isPostLoading, setIsPostLoading] = useState(false)

    useEffect(() => {
        fetchPosts();
    }, [])

    const createPost = (newPost) =>{
        setPosts([...posts, newPost])
        setModal(false)
    }

    async function fetchPosts() {
        setIsPostLoading(true)
        setTimeout(async () =>{
            const posts = await PostService.getAll();
            setPosts(posts)
            setIsPostLoading(false)
        }, 1000)
    }

    //Получаем пост из дочерного компонента
    const removePost = (post) => {
        setPosts(posts.filter(p => p.id!==post.id))
    }

  return (
    <div className="App">
        <MyButton style={{marginTop: 25}} onClick={() => setModal(true)}>
            Create Post
        </MyButton>
        <MyModal visible={modal} setVisible={setModal}>
            <PostForm create={createPost}/>
        </MyModal>
        <hr style={{margin: '15px 0'}}/>
        <PostFilter
            filter={filter}
            setFilter={setFilter}
        />
        {isPostLoading
            ? <h1>Loading...</h1>
            : <PostList remove={removePost} posts={sortedAndSearchedPosts} title={"Post List 1"}/>
        }
    </div>
  );
}

export default App;
