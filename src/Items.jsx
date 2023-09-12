

import { useQuery } from '@tanstack/react-query';
import SingleItem from './SingleItem';
import customFetch from './utils';
const Items = ({ items }) => {
  const {isLoading, data, error, isError} = useQuery({
    queryKey: ['tasks'],
    queryFn :() =>  customFetch.get('/')
  })
 
  if(isLoading){
    return <p>Loading...</p>
  }
  if(isError){
    return <p>something went wrong...</p>
  }
  return (
    <div className='items'>
      {data.data.taskList.map((item) => {
        return <SingleItem key={item.id} item={item} />;
      })}
    </div>
  );
};
export default Items;
