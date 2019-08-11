import React from 'react';
import { Header } from 'semantic-ui-react';
import './style.css';

const Home = () => (
  <div className='Home' style={{color:'white'}}>
    <Header style={{color: 'white'}} as='h2'>This is a simple blog-like application</Header>
    <Header style={{color: 'white'}} as='h4'>
      You can see all the posts by selecting <span style={{fontStyle:'italic', color:'yellow'}}>Posts </span> 
      from the left menu or by going <span style={{fontStyle:'italic', color:'yellow'}}>/posts</span>.
    </Header>
    <Header style={{color: 'white'}} as='h4'>
      You can search post by its ID (i.e. 0,1,2) from the search bar on the left menu.
    </Header>
    <Header style={{color: 'white'}} as='h4'>
      You can also go to  <span style={{fontStyle:'italic', color:'yellow'}}>/posts/:id</span> for a specific post.
    </Header>
    <Header style={{color: 'white'}} as='h4'>
      You can add and remove posts or group posts by their tags.
    </Header>
    <Header style={{color: 'white'}} as='h4'>
      Posts API runs at <a style={{fontStyle:'italic'}} href="https://forescout-server.herokuapp.com/">https://forescout-server.herokuapp.com/</a>
      <ul>  
        <li>GET to '/posts' => All the posts</li>  
        <li>GET to '/posts/:id' => Post with given ID</li>
        <li>POST to '/posts' => Add new post (must include title, categories, content) </li>
        <li>DELETE to '/posts/:id' => Deletes the post with the given ID </li>
      </ul>  
    </Header>
    <Header style={{fontStyle:'italic', color: 'white'}} as='h4'>
      Typescript is used through out the project.
    </Header>
    <Header style={{fontStyle:'italic', color: 'white'}} as='h4'>
      Redux is used for state management. Redux-thunk is used for async calls.
    </Header>

  </div>
);

export default Home ;