import PostPage from './Pages/PostPage';
import UserPage from './Pages/UserPage';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { UserProvider } from './Context/UserContext';
import { PostProvider } from './Context/PostsContext';
import Navbar from './Components/Navbar';
import { CommentProvider } from './Context/CommentContext';
import { ReactionProvider } from './Context/ReactionContext';
import { ThemeProvider, createTheme } from '@mui/material';


function App() 
{
  const theme = createTheme({
    components:{
      MuiButton: {
        defaultProps: {
          disableRipple: true,
          variant: "contained"
        },
        styleOverrides: {
          root:
          {
            color: "white",
            backgroundColor: "#13206e",
            marginBottom: "3%"
          }
        }
      },
      MuiContainer:{
        styleOverrides:
        {
          root:
          {
            backgroundColor: "#e9eff5",
            color: "black",
            borderRadius: "8px",
            marginTop: "2px",
            marginBottom: "2px",
          }
        }
      }
    }
  })



  
  return (
    <UserProvider>
      <PostProvider>
        <CommentProvider>   
          <ReactionProvider>
            <ThemeProvider theme={theme}>       
              <div className="App">
                <Navbar />
                <Routes>
                  <Route path="/" element={<PostPage />}/>
                  <Route path="/posts" element={<PostPage />}/>
                  <Route path="/users" element={<UserPage />}/>
                </Routes>
              </div>
            </ThemeProvider>
          </ReactionProvider>
        </CommentProvider>
      </PostProvider>
    </UserProvider>
  );
}

export default App;
