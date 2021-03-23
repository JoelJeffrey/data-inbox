import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import logo from './../../logo.svg';
import './dataInbox.css';
import TableRow from './TableRow';
import { removeItems, selectAll, fetchData } from './dataInboxSlice';

const DataInbox = () => {
  const records = useSelector(state => state.inboxData.records);
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(fetchData());
  }, [dispatch])

  return (
    <div className='data-inbox'>
      <header className='data-header'>
        <img src={logo} className='data-logo' alt='logo' />
        Data Inbox
      </header>
      <main className="content-wrapper">
        <button data-testid="remove" onClick={() => dispatch(removeItems())} className="button">Remove</button>
        <span onClick={() => dispatch(selectAll())} className="select-all">Select All</span>
        <div className="table">
          <div className='table-row table-head'>
            <div className='table-cell'></div>
            <div className='table-cell'>
              Name
            </div>
            <div className='table-cell'>
              Date Created
            </div>
            <div className='table-cell'>
              Fund Name
            </div>
            <div className='table-cell'>
              Due Date
            </div>
            <div className='table-cell'>
              Price
            </div>
          </div>
          {records?.length > 0 &&
            records.map((data, index) => {
              return <TableRow key={index} isChecked={data.isChecked} record={data.record} />
          })}
        </div>
      </main>
    </div>
  );
}

export default DataInbox;
