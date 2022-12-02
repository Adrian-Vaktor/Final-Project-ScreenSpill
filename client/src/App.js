
import styled from 'styled-components'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { UserProvider } from './Components/Context/UserContext';

import GlobalStyle from './Components/Style/GlobalStyles';

import Home_Page from './Components/HomePages/Home_Page';
import Blog_Page from './Components/HomePages/Blog_Page';
import BlogPost_Page from './Components/HomePages/BlogPost_Page';
import About_Page from './Components/HomePages/About_Page';
import SignIn_Page from './Components/HomePages/SignIn_Page';
import ProjectManager_Page from './Components/UI/ProjectManager_Page';
import Project_HomePage from './Components/UI/Project_HomePage';


function App() {
  return (
    <AppWrapper>
        <UserProvider>
          <GlobalStyle />
          <Router>
            <Routes>
              <Route path='/' element={<Home_Page />} />
              <Route path='/blog' element={<Blog_Page />} />
              <Route path='/blog/:postName' element={<BlogPost_Page />} />
              <Route path='/about' element={<About_Page />} />
              <Route path='/signin' element={<SignIn_Page />} />
              <Route path='/ux/project-manager' element={<ProjectManager_Page />} />
              <Route path='/ux/profile-setup' element={<ProjectManager_Page />} />
              <Route path='/ux/project/:projectId' element={<Project_HomePage />} />
              <Route path='/ux/project/:projectId/map' element={<>map</>} />
              <Route path='/ux/project/:projectId/organizer' element={<>calendar</>} />
              <Route path='/ux/project/:projectId/contacts' element={<>contacts</>} />
              <Route path="*" element={<>Not found</>} />
            </Routes>
          </Router>
        </UserProvider>
    </AppWrapper>
  );
}

const AppWrapper = styled.div`

`

export default App;
