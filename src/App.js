import './App.css';

import React, { Component, useState } from 'react'
import Header from './components/Header';
import Nav from './components/Nav';
import Main from './components/Main';
import Button from 'react-bootstrap/Button';
import Create from './components/Create';
import Modify from './components/Modify';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = ()=>{
  const [mode,setMode] = useState('welcome');
  const [selected_id,setSelected_id] = useState('welcome');
  const [max_id,setMax_id] = useState('welcome');
  const [menus,setMenus] = useState([
    {id:1, title:'HTML', desc:'Hypertext markup language', difficulty: 1},
    {id:2, title:'CSS', desc:'CSS is for Design', difficulty: 2},
    {id:3, title:'Javascript', desc:'Javascript is for interation', difficulty: 3}
  ]);

  const subject = {title:'React', desc:'Single page application'};
  const welcome = {title:'Welcome', desc:'Welcome to React'};

  const getArticles = ()=>{
    let _main = null;

    if(mode === 'welcome'){
      _main = <Main data={welcome} mode={mode} />;
    } else if(mode === 'read'){
      _main = 
      <Main 
        data={getReadArticle()} 
        onChangeMode={()=>{
          setMode('modify');         
        }}
        deleteForm={(id)=>{
          console.log(id);
          if(window.confirm('정말 삭제할까요')){
            let _menus = [...menus];

            let del_id = _menus.findIndex(m=>m.id === id);
            _menus.splice(del_id,1); 
            setMode('welcome');
            setMenus(_menus);           
          }
        }}   
      />;

    } else if(mode === 'create'){
      _main = <Create createForm={(title,desc, difficulty)=>{

        let new_max_id = max_id + 1;

        let _menus =  menus.concat(
          {id:new_max_id, title:title, desc:desc, difficulty: difficulty}
        )
        setMode('welcome');
        setMenus(_menus);
        setMax_id(new_max_id);
      }}/>;
    }else if(mode === 'modify'){
      _main = <Modify 
        data={getReadArticle()} 
        modifyForm={(title,desc,difficulty)=>{
          
          //메뉴 내용 수정
          let _menus = menus.map(m =>           
            m.id === selected_id 
            // ? {id:m.id, title:title, desc:desc} 
            ? {...m, title, desc, difficulty} 
            :  m
          );
          setMode('read');
          setMenus(_menus);

        }}      
   
      />;
    }
    return _main;
  }
  const getReadArticle = ()=>{
    let data = menus.find(m=> m.id === selected_id);
    return data;
  }
  return (
    <div className='container'>
      <Header title={subject.title} desc={subject.desc} onChangeMode={()=>{
        setMode('welcome');
      }} />

      <Nav data={menus} onChangeMode={(id)=>{
        console.log(id);
        setMode('read');
        setSelected_id(id);
      }} />        
      {getArticles()}
      <hr/>
      <div className='d-flex justify-content-end'>
        <Button variant="primary" onClick={()=>{
          setMode('create');
        }}>Create</Button>
      </div>
      
    </div>        
  )

}

export default App;
/*
function App() {
  return (
    <>
      <header>
        <h1>React</h1>
        <p>Single page application</p>
      </header>
      <nav>
        <ul>
          <li><a href="">HTML</a></li>
          <li><a href="">CSS</a></li>
          <li><a href="">Javascript</a></li>
        </ul>
      </nav>
      <main>
        <article>
          <h2>HTML</h2>
          <p>Hypertext Markup language</p>
        </article>
      </main>
    </>
  );
}

export default App;
*/
