
import styled from 'styled-components'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { UserProvider } from './Components/Context/UserContext';

import GlobalStyle from './Components/Style/GlobalStyles';

import Home_Page from './Components/HomePages/Home_Page';
import Blog_Page from './Components/HomePages/Blog_Page';
import BlogPost_Page from './Components/HomePages/BlogPost_Page';
import About_Page from './Components/HomePages/About_Page';
import SignIn_Page from './Components/HomePages/SignIn_Page';
import ProjectManager_Page from './Components/UX/ProjectManager_Page';
import ScreenWriter_Page from './Components/UX/ScreenWriter_Page';
import Map_Page from './Components/UX/Map_Page';
import Calendar_Page from './Components/UX/Calendar_Page';


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
              <Route path='/ux/project/:projectName' element={<ScreenWriter_Page />} />
              <Route path='/ux/project/:projectName/map' element={<Map_Page />} />
              <Route path='/ux/project/:projectName/calendar' element={<Calendar_Page />} />
              <Route path='/ux/project/:projectName/contacts' element={<Calendar_Page />} />

            </Routes>
          </Router>
        </UserProvider>
    </AppWrapper>
  );
}

const AppWrapper = styled.div`

`

export default App;
