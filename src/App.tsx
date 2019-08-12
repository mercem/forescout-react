import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'
import Posts from './containers/Posts';
import Post from './containers/Post';
import Layout from './containers/Layout';
import Home from './containers/Home';


const App = () => {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route path="/posts" exact render={(routeProps) => 
            <Layout>
              <Posts {...routeProps}/>
            </Layout>
          }/> 
          <Route path="/posts/:id" render={(routeProps) => 
            <Layout>
              <Post {...routeProps}/>
            </Layout>
          }/>
          <Route path="/" exact render={(routeProps) => 
            <Layout>
              <Home />
            </Layout>
          }/>
          <Route render={(routeProps) => 
            <Layout>
              <Home />
            </Layout>
          }/>  
        </Switch>
      </Router>    
    </div> 
  );
}

export default App;
