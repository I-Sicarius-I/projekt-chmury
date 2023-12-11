import PostPage from './Pages/PostPage';
import UserPage from './Pages/UserPage';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { UserProvider } from './Context/UserContext';
import { PostProvider } from './Context/PostsContext';
import Navbar from './Components/Navbar';
import { CommentProvider } from './Context/CommentContext';
import { ReactionProvider } from './Context/ReactionContext';


function App() 
{
  return (
    <UserProvider>
      <PostProvider>
        <CommentProvider>   
          <ReactionProvider>       
            <div className="App">
              <Navbar />
              <Routes>
                <Route path="/" element={<PostPage />}/>
                <Route path="/users" element={<UserPage />}/>
              </Routes>
            </div>
          </ReactionProvider>
        </CommentProvider>
      </PostProvider>
    </UserProvider>
  );
}

export default App;
