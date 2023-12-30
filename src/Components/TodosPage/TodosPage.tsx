import React from 'react'
import PropTypes from 'prop-types'

import { useSelector,useDispatch } from 'react-redux'
import { addTodo, fetchPosts } from '../../features/todoSlice'


function TodosComponent() {
  const todos = useSelector((state)=>state.todos.todos);
  const dispatch = useDispatch();
  // dispatch(addTodo());
  dispatch(fetchPosts());



  return (
    <div>TodosComponent</div>
  )
}

TodosComponent.propTypes = {}

export default TodosComponent
