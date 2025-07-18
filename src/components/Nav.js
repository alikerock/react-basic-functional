import React from 'react'

const Nav = (props)=>{

  console.log('Nav.js 실행');
  let lists = [];
  let data = props.data;

  data.forEach(item=>{
    lists.push(
    <li key={item.id} onClick={(e)=>{
      e.preventDefault();
      props.onChangeMode(item.id);
    }}><a href="/">{item.title}</a></li>
  );
  })
  return (
    <>
      <nav>
        <ul>
          {lists}
        </ul>
      </nav>   
    </>
  )

}
const areEqual = (prevProps, nextProps)=>{
  console.log(prevProps, nextProps);
  return prevProps.data === nextProps.data;
};

export default React.memo(Nav, areEqual);
