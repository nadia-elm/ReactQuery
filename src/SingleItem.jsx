
import {useMutation, useQueryClient} from '@tanstack/react-query'
import {useState} from 'react'
import customFetch from './utils';
import { toast } from 'react-toastify'



const SingleItem = ({ item }) => {
  //  const [isDone, setIsDone] = useState(false);
  const queryClient = useQueryClient();
  // give an alias of createTask to mutate that we destruct from useMutation
  const {mutate : editTask} = useMutation({
    mutationFn: ({isDone, taskId})=> customFetch.patch(`/${taskId}`, {isDone :isDone }),
    onSuccess : ()=> {
      queryClient.invalidateQueries({ queryKey : ['tasks']});
      toast.success('task edited')
      
    },
    onError: (error)=> {
      toast.error(error.response.data.msg)
      // response coming from the server has property msg
    }
  })
  
  // give an alias of createTask to mutate that we destruct from useMutation
  const {mutate : deleteTask, isLoading} = useMutation({
    mutationFn: ({taskId})=> customFetch.delete(`/${taskId}`),
    onSuccess : ()=> {
      queryClient.invalidateQueries({ queryKey : ['tasks']});
      toast.success('task deleted')
      
    },
    onError: (error)=> {
      toast.error(error.response.data.msg)
      // response coming from the server has property msg
    }
  })
  return (
    <div className='single-item'>
      <input
        type='checkbox'
        checked={item.isDone}
        onChange={() => editTask({taskId:item.id, isDone:!item.isDone})}
      />
      <p
        style={{
          textTransform: 'capitalize',
          textDecoration: item.isDone && 'line-through',
        }}
      >
        {item.title}
      </p>
      <button
        className='btn remove-btn'
        type='button'
        disabled={isLoading}
        onClick={() => deleteTask({taskId:item.id})}
      >
        delete
      </button>
    </div>
  );
};
export default SingleItem;
