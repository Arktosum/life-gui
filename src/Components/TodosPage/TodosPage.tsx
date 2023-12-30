import React from 'react'
import PropTypes from 'prop-types'

import { addTodo, fetchPosts } from '../../features/todoSlice'
import { useAppDispatch, useAppSelector } from '../../app/hooks';


function TodosComponent() {
  const todos = useAppSelector(state=>state.todo.todos);
  const dispatch = useAppDispatch();

  dispatch(addTodo());
  dispatch(fetchPosts());

  return (
    <div>TodosComponent</div>
  )
}

TodosComponent.propTypes = {}

export default TodosComponent
